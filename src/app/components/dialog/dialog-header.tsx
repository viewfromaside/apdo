import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useDialogContext } from "./dialog";
import { Button } from "../shadcn-ui/button";
import { DialogClose } from "./dialog-close";
import { XIcon } from "lucide-react";

type DialogHeaderProps = ComponentProps<"div"> & {};

export const DialogHeader = ({
  className,
  children,
  ...props
}: DialogHeaderProps) => {
  const { required } = useDialogContext();
  return (
    <div
      className={twMerge(
        "flex flex-row gap-10 justify-between items-center",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <DialogClose>
          <XIcon size={14} />
        </DialogClose>
      )}
    </div>
  );
};
