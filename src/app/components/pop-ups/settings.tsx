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

type callbacksType = {
  search?: () => void;
  appearence?: () => void;
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
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
