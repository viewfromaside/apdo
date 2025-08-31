"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { Input } from "../input";
import { Button } from "../button";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { togglePopupAtom } from "@/app/store/pop-up";
import { Tag } from "../tag";
import { useKeyboardShortcut } from "@/app/hooks";
import { saveNoteAtom, selectedNoteAtom } from "@/app/store";

export const PopupRename = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const togglePopup = useSetAtom(togglePopupAtom);
  const selectedNote = useAtomValue(selectedNoteAtom);
  const saveNote = useSetAtom(saveNoteAtom);
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    if (open) {
      if (selectedNote) {
        setNewTitle(selectedNote.title);
      }
    }
  }, [selectedNote, open]);

  const handleSubmit = () => {
    saveNote({
      ...selectedNote,
      title: newTitle,
    });
    toggle();
  };

  useKeyboardShortcut({
    key: "Enter",
    onKeyPress: handleSubmit,
    deps: [open, newTitle],
    enabled: open,
  });

  return (
    <Dialog open={open} toggle={toggle} {...props}>
      <DialogBody draggable mainClassName={dialogClassName}>
        <DialogHeader textClassName="text-start">
          <Tag label="so u confused?" />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="new note name"
            className="mb-2"
          />
          <Button onClick={handleSubmit}>do it</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
