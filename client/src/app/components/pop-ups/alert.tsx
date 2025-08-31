"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { Input } from "../input";
import { Button } from "../button";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { alertPopupTextAtom, togglePopupAtom } from "@/app/store/pop-up";
import { Tag } from "../tag";
import { useKeyboardShortcut } from "@/app/hooks";
import { deleteNoteAtom, saveNoteAtom, selectedNoteAtom } from "@/app/store";
import { toast } from "sonner";
import { ToastSuccessStyle } from "@/app/shared";
import { useRouter } from "next/navigation";

export const PopupAlert = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const alertPopupText = useAtomValue(alertPopupTextAtom);
  const selectedNote = useAtomValue(selectedNoteAtom);
  const deleteNote = useSetAtom(deleteNoteAtom);
  const router = useRouter();

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
          <Tag label="alert" />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <p className="text-center font-mono">{alertPopupText}</p>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
