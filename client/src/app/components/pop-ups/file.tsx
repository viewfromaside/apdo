import { ComponentProps } from "react";
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
import { useAtom, useAtomValue } from "jotai";
import { selectedNoteAtom } from "@/store";
import { useTranslations } from "next-intl";

type callbacksType = {
  rename?: () => void;
  exclude?: () => void;
};

type PopupFileProps = PopupProps & {
  callbacks?: callbacksType;
};

export const PopupFile = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  callbacks,
  ...props
}: PopupFileProps) => {
  const t = useTranslations("general");
  return (
    <Dialog
      open={open}
      toggle={toggle}
      {...props}
      className={twMerge("", dialogClassName)}
    >
      <DialogBody draggable>
        <DialogHeader></DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full gap-3 h-fit items-center justify-center",
            contentClassName
          )}
        >
          <Button
            onClick={() => {
              callbacks?.rename && callbacks.rename();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            {t("popups.file.rename")}
          </Button>
          <Button
            onClick={() => {
              callbacks?.exclude && callbacks.exclude();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            {t("popups.file.exclude")}
          </Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
