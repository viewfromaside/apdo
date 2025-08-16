"use client";

import {
  Dialog,
  DialogHeader,
  FileName,
  GoBack,
  HeaderSettingsDropdown,
  MarkdownEditor,
  NoteModeToggle,
  NoteSettings,
  Panel,
  RawEditor,
} from "./components";
import { useRef, useState } from "react";
import { editor } from "@/app/assets/main.json";
import { DialogBody } from "./components/dialog/dialog-body";

export default function Home() {
  const editorRef = useRef(null);

  const [content, setContent] = useState<string>(editor.content || "");
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <GoBack href="/" />
            <FileName className="w-fit">@viewfromaside/welcome</FileName>
          </div>
          <div className="flex flex-row gap-2">
            <NoteModeToggle
              formatMarkdownToggle={formatMarkdownToggle}
              setFormatMarkdownToggle={setFormatMarkdownToggle}
            />
            <HeaderSettingsDropdown />
          </div>
        </div>
        {formatMarkdownToggle ? (
          <MarkdownEditor content={content} setContent={setContent} />
        ) : (
          <RawEditor content={content} setContent={setContent} />
        )}
      </Panel>
    </div>
  );
}
