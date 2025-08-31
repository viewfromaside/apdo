"use client";

import {
  ComponentProps,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { Dialog, DialogBody, DialogContent, DialogHeader } from "../dialog";
import { PopupProps } from ".";
import { useAtomValue, useSetAtom } from "jotai";
import { closeAllPopupAtom, openPopupsAtom } from "@/store/pop-up";
import { Card } from "../notes";
import { Tag } from "../tag";
import { SearchIcon } from "lucide-react";
import { noteServiceAtom } from "@/store";
import { Note } from "@/services";

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
  const [notes, setNotes] = useState<Note[]>([]);
  const noteService = useAtomValue(noteServiceAtom);
  const openPopups = useAtomValue(openPopupsAtom);
  const closeAllPopups = useSetAtom(closeAllPopupAtom);

  useEffect(() => {
    if (openPopups.notes) {
      async function getData() {
        if (!noteService) return;
        const response = await noteService.sendFindManyOnlyPublic();
        setNotes(response);
      }
      getData();
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
              title={`${note.createdBy}/${note.title}`}
              className="shadow-md border border-neutral/10 mb-2"
            ></Card>
          ))}
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
