"use client";

import React, { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { Input } from "../input";
import { Button } from "../button";
import { PopupProps } from ".";
import { useSetAtom } from "jotai";
import { togglePopupAtom } from "@/store/pop-up";
import { Tag } from "../tag";
import { useKeyboardShortcut } from "@/hooks";
import { toast } from "sonner";
import { ToastMinimumStyle } from "@/shared";
import { useTranslations } from "next-intl";

type PopupSearchProps = PopupProps & {
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
};

export const PopupSearch = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  setSearchValue,
  searchValue,
  ...props
}: PopupSearchProps) => {
  const t = useTranslations("general");
  const togglePopup = useSetAtom(togglePopupAtom);

  const handleSubmit = () => {
    if (!searchValue) {
      toast.error(t("popups.errors.fieldsMissing"), ToastMinimumStyle);
      return;
    }
    togglePopup("notes");
  };

  useKeyboardShortcut({
    key: "Enter",
    onKeyPress: handleSubmit,
    enabled: open,
    deps: [open, searchValue],
  });

  return (
    <Dialog open={open} toggle={toggle} {...props}>
      <DialogBody draggable mainClassName={dialogClassName}>
        <DialogHeader textClassName="text-start">
          <Tag label={t("popups.search.title")} />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Input
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("popups.search.placeholder")}
            className="mb-2"
          />
          <Button onClick={handleSubmit}>{t("popups.search.submit")}</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
