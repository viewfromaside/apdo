"use client";

import {
  FileName,
  GoBack,
  MarkdownEditor,
  NoteSettings,
  Panel,
} from "./components";
import { useRef } from "react";

export default function Home() {
  const editorRef = useRef(null);
  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <GoBack href="/" />
            <FileName className="w-fit">welcome</FileName>
          </div>
          <NoteSettings href="/" />
        </div>
        <MarkdownEditor />
      </Panel>
    </div>
  );
}
