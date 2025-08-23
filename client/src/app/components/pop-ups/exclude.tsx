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
import { deleteNoteAtom, saveNoteAtom, selectedNoteAtom } from "@/app/store";
import { toast } from "sonner";
import { ToastSuccessStyle } from "@/app/shared";
import { useRouter } from "next/navigation";

export const PopupExclude = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const deleteNote = useSetAtom(deleteNoteAtom);
  const router = useRouter();

  const handleSubmit = () => {
    deleteNote();
    router.push("/notes");
    toast.success("get ripped out", ToastSuccessStyle);
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
          <Tag label="are u sure?" />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Button onClick={handleSubmit}>do it</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
