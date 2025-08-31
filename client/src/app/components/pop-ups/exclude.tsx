"use client";

import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { Button } from "../button";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { Tag } from "../tag";
import { useKeyboardShortcut } from "@/hooks";
import { deleteNoteAtom, selectedNoteAtom } from "@/store";
import { toast } from "sonner";
import { ToastSuccessStyle } from "@/shared";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const PopupExclude = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  const t = useTranslations("general");
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
          <Tag label={t("popups.exclude.title")} />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Button onClick={handleSubmit}>{t("popups.exclude.submit")}</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
