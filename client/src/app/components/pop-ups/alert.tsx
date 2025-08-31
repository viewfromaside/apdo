"use client";

import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { alertPopupTextAtom } from "@/store/pop-up";
import { Tag } from "../tag";
import { useKeyboardShortcut } from "@/hooks";
import { deleteNoteAtom, selectedNoteAtom } from "@/store";
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
          <p className="text-center text-neutral font-mono">{alertPopupText}</p>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
