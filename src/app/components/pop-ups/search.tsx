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

export const PopupSearch = ({
  open,
  toggle,
  contentClassName,
  dialogClassName,
  ...props
}: PopupProps) => {
  return (
    <Dialog
      open={open}
      toggle={toggle}
      {...props}
      className={twMerge("", dialogClassName)}
    >
      <DialogBody>
        <DialogHeader></DialogHeader>
        <DialogContent
          className={twMerge(
            "flex flex-col w-full gap-3 h-fit items-center justify-center",
            contentClassName
          )}
        >
          <Button variant="ghost">search</Button>
          <Button variant="ghost">my profile</Button>
          <Button variant="ghost">appearence</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
