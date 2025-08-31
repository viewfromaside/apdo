import { MDXEditorMethods } from "@mdxeditor/editor";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import { selectedNoteAtom } from "@/store";

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const editorRef = useRef<HTMLDivElement & MDXEditorMethods>(null);

  return {
    editorRef,
    selectedNote,
  };
};
