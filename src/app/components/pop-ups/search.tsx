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
    <Dialog open={open} toggle={toggle} {...props}>
      <DialogBody draggable mainClassName={dialogClassName}>
        <DialogHeader></DialogHeader>
        <DialogContent
          className={twMerge("flex flex-col w-full h-full", contentClassName)}
        >
          <Input placeholder="note name or author" className="mb-2" />
          <Button>search</Button>
        </DialogContent>
      </DialogBody>
    </Dialog>
  );
};
