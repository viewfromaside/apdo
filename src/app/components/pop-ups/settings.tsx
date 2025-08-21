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

type PopupSettingsProps = DialogProps & {};

export const PopupSettings = ({
  open,
  toggle,
  className,
  ...props
}: PopupSettingsProps) => {
  return (
    <Dialog open={open} toggle={toggle}>
      <DialogBody>
        <DialogHeader>Create</DialogHeader>
        <DialogContent>teste</DialogContent>
      </DialogBody>
    </Dialog>
  );
};
