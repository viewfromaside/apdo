import { atom } from "jotai";
import { unwrap } from "jotai/utils";
import { Note, NoteRequest } from "@/app/services";
import { NoteVisibility } from "@/app/shared";

const noteService = new NoteRequest();

export const notesAtomWritable = atom<Note[]>([]);
export const notesAtom = unwrap(notesAtomWritable, (prev) => prev ?? []);

export const selectedNoteIndexAtom = atom<number | null>(null);

export const selectedNoteAtom = atom<Note | null>((get) => {
  const notes = get(notesAtom);
  const index = get(selectedNoteIndexAtom);
  return index !== null && notes.length > index ? notes[index] : null;
});

export const loadNotesAtom = atom(null, async (_get, set) => {
  const notes = await noteService.sendFindMany();
  const sorted = [...notes].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );
  set(notesAtomWritable, sorted);
});

export const saveNoteAtom = atom(
  null,
  async (get, set, updatedNote: Partial<Note>) => {
    const selectedNote = get(selectedNoteAtom);
    if (!selectedNote) return;

    const savedNote = await noteService.sendEdit(selectedNote.id!, updatedNote);

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

export const deleteNoteAtom = atom(null, async (get, set) => {
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
