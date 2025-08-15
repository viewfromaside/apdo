"use client";

import { FileName, MarkdownEditor, Panel } from "./components";
import { useRef } from "react";

export default function Home() {
  const editorRef = useRef(null);
  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-3">
        <FileName className="w-fit">nao sobra nada pro beta mesmo</FileName>
        <MarkdownEditor />
      </Panel>
    </div>
  );
}
