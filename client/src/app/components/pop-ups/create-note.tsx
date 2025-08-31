"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { Input } from "../input";
import { Button } from "../button";
import { PopupProps } from ".";
import { Note } from "@/services";
import { NoteVisibility, ToastErrorStyle } from "@/shared";
import { useSetAtom } from "jotai";
import { createNoteAtom } from "@/store";
import { toast } from "sonner";
import { useKeyboardShortcut } from "@/hooks";

export const PopupCreateNote = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const [formObject, setFormObject] = useState<Note>(new Note({}));
  const createNote = useSetAtom(createNoteAtom);

  const handleChange = (field: keyof Note, value: any) => {
    setFormObject((prev) => {
      return new Note({
        ...prev,
        [field]: value,
      });
    });
  };

  const clearFields = () => {
    setFormObject({} as Note);
  };

  const handleSubmit = () => {
    if (!formObject.title || !formObject.visibility)
      return toast.error("complete this, aight?", ToastErrorStyle);

    createNote(formObject);

    clearFields();
    toggle();
  };

  useKeyboardShortcut({
    key: "Enter",
    onKeyPress: handleSubmit,
    deps: [formObject, open],
    enabled: open,
  });

  return (
    <Dialog open={open} toggle={toggle} {...props}>
      <DialogBody draggable mainClassName={dialogClassName}>
        <DialogHeader></DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Input
            autoFocus
            placeholder="note name"
            className="mb-2"
            value={formObject.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <div className="flex flex-row w-full mb-2 gap-2 justify-center">
            <Button
              variant={
                formObject.visibility === NoteVisibility.PUBLIC
                  ? "primary"
                  : "secondary"
              }
              className="w-full"
              onClick={() => handleChange("visibility", NoteVisibility.PUBLIC)}
            >
              public
            </Button>
            <Button
              variant={
                formObject.visibility === NoteVisibility.PRIVATE
                  ? "primary"
                  : "secondary"
              }
              className="w-full"
              onClick={() => handleChange("visibility", NoteVisibility.PRIVATE)}
            >
              private
            </Button>
          </div>

          <Button onClick={handleSubmit}>do it</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
