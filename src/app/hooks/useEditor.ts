import { MDXEditorMethods } from "@mdxeditor/editor";
import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { throttle } from "lodash";
import { saveNoteAtom, selectedNoteAtom } from "@/app/store";
import { Note } from "@/app/services";

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const editorRef = useRef<HTMLDivElement & MDXEditorMethods>(null);

  return {
    editorRef,
    selectedNote,
  };
};
