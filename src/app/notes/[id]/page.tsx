"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  FileName,
  GoBack,
  HeaderSettingsDropdown,
  MarkdownEditor,
  NoteModeToggle,
  Panel,
  RawEditor,
  UnsavedBottomBar,
} from "@/app/components";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  loadNotesAtom,
  saveNoteAtom,
  selectedNoteAtom,
  selectedNoteIndexAtom,
} from "@/app/store";
import editor from "@/app/assets/main.json";

export default function NoteHome() {
  const [alertDialog, setAlertDialog] = useState<boolean>(false);
  const [localContent, setLocalContent] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>();

  const [saved, setSaved] = useState<boolean>(true);
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  const selectedNote = useAtomValue(selectedNoteAtom);
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(
    selectedNoteIndexAtom
  );
  const saveNote = useSetAtom(saveNoteAtom);
  const loadNotes = useSetAtom(loadNotesAtom);

  // useEffect(() => {
  //   loadNotes();
  // }, [loadNotes]);

  useEffect(() => {
    if (selectedNote) {
      setLocalContent(selectedNote.content || "");
      setLocalTitle(selectedNote.title || "new file");
    } else {
      setLocalContent("");
      setLocalTitle("new file");
    }
  }, [selectedNote]);

  useEffect(() => {
    if (selectedNote) {
      const hasContentChanged = localContent !== (selectedNote.content || "");
      const hasTitleChanged = localTitle !== (selectedNote.title || "new file");
      setSaved(!hasContentChanged && !hasTitleChanged);
    }
  }, [localContent, localTitle, selectedNote]);

  const toggleAlertDialog = () => {
    toast(String.fromCodePoint(0x1f4af) + " File Saved");
    setAlertDialog((prev) => !prev);
  };

  const saveActualContent = () => {
    toast(String.fromCodePoint(0x1f4af) + " File Saved");
    setSaved(true);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-3">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center">
            <GoBack href="/notes" />
            <FileName className="w-fit">{localTitle}</FileName>
          </div>
          <div className="flex flex-row gap-2">
            <NoteModeToggle
              formatMarkdownToggle={formatMarkdownToggle}
              setFormatMarkdownToggle={setAlertDialog}
            />
            <HeaderSettingsDropdown setSaved={setSaved} />
          </div>
        </div>
        {formatMarkdownToggle ? (
          <MarkdownEditor content={localContent} setContent={setLocalContent} />
        ) : (
          <RawEditor content={localContent} setContent={setLocalContent} />
        )}
        <Dialog open={alertDialog} toggle={toggleAlertDialog}>
          <DialogBody className="w-[250px]">
            <DialogHeader>Permission</DialogHeader>
            <DialogContent textClassName="text-justify">
              You dont have permission to do that action
            </DialogContent>
          </DialogBody>
        </Dialog>
        <UnsavedBottomBar show={saved} />
      </Panel>
    </div>
  );
}
