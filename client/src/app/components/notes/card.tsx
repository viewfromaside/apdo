"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { FileName, Tag } from "@/app/components";
import { LockIcon, LockOpenIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Note } from "@/app/services";
import { NoteVisibility } from "@/app/shared";
import { useSetAtom } from "jotai";
import { setSelectedNoteAtom } from "@/app/store";
import { closeAllPopupAtom } from "@/app/store/pop-up";

type CardProps = ComponentProps<"div"> & {
  model: Note;
};

export const Card = ({ children, className, model, ...props }: CardProps) => {
  const router = useRouter();
  const selectNote = useSetAtom(setSelectedNoteAtom);
  const closeAllPopups = useSetAtom(closeAllPopupAtom);

  const goToNote = () => {
    selectNote(model.id);
    closeAllPopups();
    router.push(`/notes/${model.id}`);
  };

  return (
    <div key={`note-id-${model.id}`} onClick={goToNote} className="w-full">
      <div
        className={twMerge(
          "bg-dark-background relative p-2 w-full hover:scale-102 rounded-sm cursor-pointer hover:bg-white/10 duration-200",
          className
        )}
        {...props}
      >
        {/* <div className="absolute rounded-t-sm h-[2px] bg-accent top-0 left-0 w-full"></div> */}

        <div className="flex flex-row gap-2">
          <FileName className="mt-0 cursor-pointer">{model.title}</FileName>
        </div>
        <div className="flex flex-row mt-2 gap-1">
          {model.visibility === NoteVisibility.PUBLIC ? (
            <Tag color="[#27BEF5]" icon={LockOpenIcon} label="public" />
          ) : (
            <Tag color="[#EB3C1A]" icon={LockIcon} label="private" />
          )}
        </div>
      </div>
    </div>
  );
};
