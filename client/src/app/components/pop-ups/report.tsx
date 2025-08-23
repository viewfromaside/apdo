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
import { selectedNoteAtom } from "@/app/store";
import { Textarea } from "../textarea";

type callbacksType = {
  report?: () => void;
  appearence?: () => void;
  fileReport?: () => void;
};

type PopupReportProps = PopupProps & {
  callbacks?: callbacksType;
};

export const PopupReport = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  callbacks,
  ...props
}: PopupReportProps) => {
  const selectedNote = useAtomValue(selectedNoteAtom);
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
              callbacks?.report && callbacks.report();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            sensitive
          </Button>
          <Button
            onClick={() => {
              callbacks?.appearence && callbacks.appearence();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            inappropriate
          </Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
