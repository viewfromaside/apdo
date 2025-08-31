import { atom } from "jotai";
import { atomFamily, unwrap } from "jotai/utils";
import { Note, NoteRequest } from "@/services";
import { NoteVisibility } from "@/shared";
import { createRandomId } from "@/lib/utils";
import { getUser } from "./user";

export const noteServiceAtom = atomFamily((jwtParam?: string) =>
  atom(() => {
    const jwt = jwtParam != "" ? jwtParam : localStorage.getItem("jwt");
    return new NoteRequest(jwt!);
  })
);

const mockNote = new Note({
  id: createRandomId(7),
  title: "welcome note",
  content: "# Bem-vindo!\n\nEsta é sua primeira nota. Comece editando aqui!",
  visibility: NoteVisibility.PUBLIC,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const notesAtomWritable = atom<Note[]>([]);
export const notesAtom = unwrap(notesAtomWritable, (prev) => prev ?? []);

export const selectedNoteIndexAtom = atom<number | null>(0);

export const selectedNoteAtom = atom<Note | null>(null);

export const loadNotesAtom = atom(null, async (get, set, jwtParam?: string) => {
  const noteService = get(noteServiceAtom(jwtParam));
  const user = getUser();
  const response = await noteService.sendFindManyByUser(user!.username);

  if (response === null) {
    return;
  }

  const notes = response.map((n) => new Note(n));

  if (notes === null) {
    return;
  }

  if (notes.length === 0) {
    set(notesAtomWritable, []);
    set(selectedNoteIndexAtom, 0);
    return;
  }

  set(notesAtomWritable, notes);
});

export const saveNoteAtom = atom(
  null,
  async (get, set, updatedNote: Partial<Note>) => {
    const noteService = get(noteServiceAtom(""));
    const selectedNote = get(selectedNoteAtom);
    if (!selectedNote) return;

    const savedNote = new Note({
      ...selectedNote,
      ...updatedNote,
    });

    const user = getUser();

    if (!user) {
      throw new Error("internal client error");
    }

    savedNote.createdBy = user.username;

    await noteService.sendEdit(savedNote.id, savedNote);

    set(selectedNoteAtom, savedNote);
    set(
      notesAtomWritable,
      get(notesAtomWritable).map((note) =>
        note.id === savedNote.id ? savedNote : note
      )
    );
  }
);

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const noteService = get(noteServiceAtom(""));
  const newNote = await noteService.sendCreate(
    new Note({
      title: "",
      content: "",
      visibility: NoteVisibility.PUBLIC,
    })
  );

  const currentNotes = get(notesAtomWritable);
  set(notesAtomWritable, [newNote, ...currentNotes]);
  set(selectedNoteIndexAtom, 0);
});

export const setSelectedNoteAtom = atom(null, (get, set, note: Note | null) => {
  set(selectedNoteAtom, note);
});

export const createNoteAtom = atom(
  null,
  async (get, set, data: Partial<Note>) => {
    const noteService = get(noteServiceAtom(""));
    let user = getUser();
    if (!user) {
      throw new Error("internal client error");
    }

    data.createdBy = user.username;
    const createdNote = await noteService.sendCreate(data);
    const currentNotes = get(notesAtomWritable);
    set(notesAtomWritable, [createdNote, ...currentNotes]);
  }
);

export const deleteNoteAtom = atom(null, async (get, set) => {
  const noteService = get(noteServiceAtom(""));
  const selectedNote = get(selectedNoteAtom);
  if (!selectedNote) return;

  const deleted = await noteService.sendRemove(selectedNote.id!);
  if (!deleted) return;

  const currentNotes = get(notesAtomWritable);
  set(
    notesAtomWritable,
    currentNotes.filter((note) => note.id !== selectedNote.id)
  );

  set(selectedNoteIndexAtom, null);
});

export const resetNotesAtom = atom(null, (_get, set) => {
  set(notesAtomWritable, []);
  set(selectedNoteAtom, null);
  set(selectedNoteIndexAtom, null);
});
