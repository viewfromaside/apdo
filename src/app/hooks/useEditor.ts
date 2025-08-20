import { MDXEditorMethods } from "@mdxeditor/editor";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { throttle } from "lodash";
import { saveNoteAtom, selectedNoteAtom } from "../store";
import { Note } from "../services";

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const editorRef = useRef<HTMLDivElement & MDXEditorMethods>(null);

  return {
    editorRef,
    selectedNote,
  };
};
