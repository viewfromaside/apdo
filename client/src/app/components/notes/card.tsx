"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { FileName, Tag } from "@/app/components";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Note } from "@/services";
import { NoteVisibility } from "@/shared";
import { useSetAtom } from "jotai";
import { setSelectedNoteAtom } from "@/store";
import { closeAllPopupAtom } from "@/store/pop-up";
import { useTranslations } from "next-intl";

type CardProps = ComponentProps<"div"> & {
  model: Note;
  title?: string;
};

export const Card = ({
  children,
  className,
  model,
  title,
  ...props
}: CardProps) => {
  const t = useTranslations("general");
  const router = useRouter();
  const closeAllPopups = useSetAtom(closeAllPopupAtom);

  const goToNote = () => {
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
          <FileName className="mt-0 cursor-pointer">
            {title ? title : model.title}
          </FileName>
        </div>
        <div className="flex flex-row mt-2 gap-1">
          {model.visibility === NoteVisibility.PUBLIC ? (
            <Tag
              color="[#27BEF5]"
              icon={LockOpenIcon}
              label={t("notes.attributes.public")}
            />
          ) : (
            <Tag
              color="[#EB3C1A]"
              icon={LockIcon}
              label={t("notes.attributes.private")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
