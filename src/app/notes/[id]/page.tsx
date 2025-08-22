"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  FileName,
  GoBack,
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
  const [localTitle, setLocalTitle] = useState<string>("new file");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [saved, setSaved] = useState<boolean>(true);
  const [formatMarkdownToggle, setFormatMarkdownToggle] =
    useState<boolean>(true);

  const selectedNote = useAtomValue(selectedNoteAtom);
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(
    selectedNoteIndexAtom
  );
  const saveNote = useSetAtom(saveNoteAtom);
  const loadNotes = useSetAtom(loadNotesAtom);

  useEffect(() => {
    console.log("selectedNote:", selectedNote);

    if (selectedNote) {
      console.log("Setting content from selectedNote:", selectedNote.content);
      setLocalContent(selectedNote.content || "");
      setLocalTitle(selectedNote.title || "new file");
    } else {
      console.log("No selectedNote, using defaults");
      setLocalContent("");
      setLocalTitle("new file");
    }

    setIsInitialized(true);
  }, [selectedNote]);

  useEffect(() => {
    if (selectedNote && isInitialized) {
      const hasContentChanged = localContent !== (selectedNote.content || "");
      const hasTitleChanged = localTitle !== (selectedNote.title || "new file");
      setSaved(!hasContentChanged && !hasTitleChanged);
    }
  }, [localContent, localTitle, selectedNote, isInitialized]);

  const toggleAlertDialog = () => {
    toast(String.fromCodePoint(0x1f4af) + " File Saved");
    setAlertDialog((prev) => !prev);
  };

  if (!isInitialized) {
    return (
      <div className="flex w-full justify-center items-center">
        <Panel className="flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-2 items-center">
              <GoBack href="/notes" />
              <FileName className="w-fit animate-pulse bg-neutral/20 rounded">
                Loading...
              </FileName>
            </div>
          </div>
          <div className="h-96 bg-neutral/10 rounded-lg animate-pulse flex items-center justify-center">
            <span className="text-neutral/50">Loading content...</span>
          </div>
        </Panel>
      </div>
    );
  }

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
              setFormatMarkdownToggle={setFormatMarkdownToggle}
            />
          </div>
        </div>

        {formatMarkdownToggle ? (
          <MarkdownEditor
            key={`md-${selectedNote?.id || "new"}-${isInitialized}`}
            content={localContent}
            setContent={setLocalContent}
          />
        ) : (
          <RawEditor
            key={`raw-${selectedNote?.id || "new"}-${isInitialized}`}
            content={localContent}
            setContent={setLocalContent}
          />
        )}

        <Dialog open={alertDialog} toggle={toggleAlertDialog}>
          <DialogBody className="w-[250px]">
            <DialogHeader>Permission</DialogHeader>
            <DialogContent textClassName="text-justify">
              You dont have permission to do that action
            </DialogContent>
          </DialogBody>
        </Dialog>

        <UnsavedBottomBar show={!saved} />
      </Panel>
    </div>
  );
}
