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

export const PopupConfirmEmail = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const togglePopup = useSetAtom(togglePopupAtom);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleSubmit = () => {
    toggle();
  };

  useKeyboardShortcut({
    key: "Enter",
    onKeyPress: handleSubmit,
    deps: [open],
    enabled: open,
  });

  return (
    <Dialog open={open} toggle={toggle} {...props}>
      <DialogBody draggable mainClassName={dialogClassName}>
        <DialogHeader textClassName="text-start">
          <Tag label="confirm email" />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Input autoFocus placeholder="enter received code" className="mb-2" />
          <Button onClick={handleSubmit}>u sure?</Button>
          <Button variant="ghost" className="mt-2 -mb-4">
            send again
          </Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
