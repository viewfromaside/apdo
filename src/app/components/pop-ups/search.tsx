"use client";

import React, { ComponentProps, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogForm,
  DialogHeader,
  DialogProps,
} from "../dialog";
import { Input } from "../input";
import { Button } from "../button";
import { PopupProps } from ".";
import { useSetAtom } from "jotai";
import { togglePopupAtom } from "@/app/store/pop-up";
import { SearchIcon } from "lucide-react";
import { Tag } from "../tag";
import { useKeyboardShortcut } from "@/app/hooks";
import { toast } from "sonner";
import { ToastMinimumStyle } from "@/app/shared";

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
  const togglePopup = useSetAtom(togglePopupAtom);

  const handleSubmit = () => {
    if (!searchValue) {
      toast.error("try to search something", ToastMinimumStyle);
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
          <Tag label="where u lookin at" />
        </DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Input
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="note name or author"
            className="mb-2"
          />
          <Button onClick={handleSubmit}>search</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
