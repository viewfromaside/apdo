"use client";

import { ComponentProps, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { closeAllPopupAtom, openPopupsAtom } from "@/app/store/pop-up";
import { Card } from "../notes";
import { Tag } from "../tag";
import { SearchIcon } from "lucide-react";

type PopupNotesProps = PopupProps & {};

export const PopupNotes = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupNotesProps) => {
  const openPopups = useAtomValue(openPopupsAtom);
  const closeAllPopups = useSetAtom(closeAllPopupAtom);

  useEffect(() => {
    if (openPopups.notes) {
      console.log("o popup de notes acaba de executar um fetch");
    }
  }, [openPopups]);

  return (
    <Dialog open={open} toggle={toggle} {...props} className={twMerge("")}>
      <DialogBody>
        <DialogHeader>
          <Tag icon={SearchIcon} label="viewfromaside" />
        </DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full p-3 gap-5 overflow-auto overflow-x-hidden",
            contentClassName
          )}
        >
          <Card
            onClick={closeAllPopups}
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
          <Card
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
          <Card
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
          <Card
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
          <Card
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
          <Card
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
          <Card
            className="w-full shadow-sm mb-1"
            title={"random note about work"}
          ></Card>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
