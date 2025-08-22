import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { Note, NoteRequest } from "@/app/services";
import { NoteVisibility } from "@/app/shared";
import { createRandomId } from "../lib/utils";

const noteService = new NoteRequest();

const mockNote = new Note({
  id: createRandomId(7),
  title: "welcome note",
  content: "# Bem-vindo!\n\nEsta é sua primeira nota. Comece editando aqui!",
  favorite: false,
  visibility: NoteVisibility.PUBLIC,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const notesAtomWritable = atom<Note[]>([]);
export const notesAtom = unwrap(notesAtomWritable, (prev) => prev ?? []);

export const selectedNoteIndexAtom = atom<number | null>(0);

export const selectedNoteAtom = atom<Note | null>((get) => {
  const notes = get(notesAtom);
  const index = get(selectedNoteIndexAtom);
  return index !== null && notes.length > index ? notes[index] : null;
});

export const loadNotesAtom = atom(null, async (_get, set) => {
  const notes = await noteService.sendFindMany();

  if (notes.length === 0) {
    set(notesAtomWritable, []);
    set(selectedNoteIndexAtom, 0);
    return;
  }

  const sorted = [...notes].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );
  set(notesAtomWritable, sorted);
});

export const saveNoteAtom = atom(
  null,
  (get, set, updatedNote: Partial<Note>) => {
    const selectedNote = get(selectedNoteAtom);
    if (!selectedNote) return;

    const savedNote = new Note({
      ...selectedNote,
      ...updatedNote,
      updatedAt: new Date(),
    });

    set(
      notesAtomWritable,
      get(notesAtomWritable).map((note) =>
        note.id === savedNote.id ? savedNote : note
      )
    );
  }
);

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const newNote = await noteService.sendCreate(
    new Note({
      title: "",
      content: "",
      favorite: false,
      visibility: NoteVisibility.PUBLIC,
    })
  );

  const currentNotes = get(notesAtomWritable);
  set(notesAtomWritable, [newNote, ...currentNotes]);
  set(selectedNoteIndexAtom, 0);
});

export const setSelectedNoteAtom = atom(null, (get, set, noteId: string) => {
  const notes = get(notesAtom);
  const index = notes.findIndex((n) => n.id === noteId);
  set(selectedNoteIndexAtom, index >= 0 ? index : null);
});

export const createNoteAtom = atom(
  null,
  async (get, set, data: Partial<Note>) => {
    const createdNote = new Note(data);
    createdNote.id = createRandomId(7);
    const currentNotes = get(notesAtomWritable);
    set(notesAtomWritable, [createdNote, ...currentNotes]);
    // set(selectedNoteIndexAtom, 0);
  }
);

export const deleteNoteAtom = atom(null, async (get, set) => {
  const selectedNote = get(selectedNoteAtom);
  if (!selectedNote) return;

  // const deleted = await noteService.sendRemove(selectedNote.id!);
  // if (!deleted) return;

  const currentNotes = get(notesAtomWritable);
  set(
    notesAtomWritable,
    currentNotes.filter((note) => note.id !== selectedNote.id)
  );

  set(selectedNoteIndexAtom, null);
});
