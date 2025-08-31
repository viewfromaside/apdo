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

type callbacksType = {
  search?: () => void;
  appearence?: () => void;
  fileSettings?: () => void;
  report?: () => void;
  logout?: () => void;
};

type PopupSettingsProps = PopupProps & {
  callbacks?: callbacksType;
};

export const PopupSettings = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  callbacks,
  ...props
}: PopupSettingsProps) => {
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
          {selectedNote && (
            <>
              <Button
                onClick={() => {
                  console.log(selectedNote);
                  callbacks?.fileSettings && callbacks.fileSettings();
                  toggle();
                }}
                className="text-[16px]"
                variant="ghost"
              >
                file
              </Button>
            </>
          )}
          <Button
            onClick={() => {
              callbacks?.search && callbacks.search();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            search
          </Button>
          <Button
            onClick={() => {
              callbacks?.appearence && callbacks.appearence();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            appearence
          </Button>
          <Button
            onClick={() => {
              callbacks?.logout && callbacks.logout();
              toggle();
            }}
            className="text-[16px]"
            variant="ghost"
          >
            logout
          </Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
