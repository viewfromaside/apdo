"use client";

import { ComponentProps, SetStateAction, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { closeAllPopupAtom, openPopupsAtom } from "@/app/store/pop-up";
import { Card } from "../notes";
import { Tag } from "../tag";
import { SearchIcon } from "lucide-react";
import { notesAtom } from "@/app/store";
import { Note } from "@/app/services";

type PopupNotesProps = PopupProps & {
  searchValue: string;
};

export const PopupNotes = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  searchValue,
  ...props
}: PopupNotesProps) => {
  const notes = useAtomValue(notesAtom);
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
          <Tag icon={SearchIcon} label={searchValue} />
        </DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full p-3 gap-5 overflow-auto overflow-x-hidden",
            contentClassName
          )}
        >
          {notes.map((note: Note) => (
            <Card
              key={`search-${note.id}`}
              model={note}
              className="shadow-md border border-neutral/10 mb-2"
            ></Card>
          ))}
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
