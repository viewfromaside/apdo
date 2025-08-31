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
import { useTranslations } from "next-intl";

export const PopupAlert = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const t = useTranslations("general");
  const alertPopupText = useAtomValue(alertPopupTextAtom);

  const handleSubmit = () => {
    console.log("opa");
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
          <Tag label={t("popups.alert.title")} />
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
