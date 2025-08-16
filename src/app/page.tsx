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
  UnsavedBottomBar,
} from "./components";
import { useRef, useState } from "react";
import { editor } from "@/app/assets/main.json";
import { DialogBody } from "./components/dialog/dialog-body";
import { DialogContent } from "./components/dialog/dialog-content";

export default function Home() {
  const [alertDialog, setAlertDialog] = useState<boolean>(true);
  const [content, setContent] = useState<string>(editor.content || "");
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  const toggleAlertDialog = () => {
    setAlertDialog((prev) => !prev);
  };

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
        <Dialog open={alertDialog} toggle={toggleAlertDialog}>
          <DialogBody className="w-[250px]">
            <DialogHeader>Permission</DialogHeader>
            <DialogContent textClassName="text-justify">
              You dont have permission to do that action
            </DialogContent>
          </DialogBody>
        </Dialog>
        <UnsavedBottomBar />
      </Panel>
    </div>
  );
}
