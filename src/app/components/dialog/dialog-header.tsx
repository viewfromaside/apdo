import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useDialogContext } from "./dialog";
import { DialogClose } from "./dialog-close";
import { XIcon } from "lucide-react";

type DialogHeaderProps = ComponentProps<"div"> & {
  textClassName?: string;
};

export const DialogHeader = ({
  className,
  children,
  textClassName,
  ...props
}: DialogHeaderProps) => {
  const { required } = useDialogContext();
  return (
    <div
      className={twMerge(
        "flex flex-row w-full gap-10 justify-between items-center",
        className
      )}
      {...props}
    >
      <div className={twMerge("flex-1 font-mono uppercase", textClassName)}>
        {children}
      </div>
      {!required && (
        <DialogClose className="justify-self-end justify-end self-end">
          <XIcon size={14} />
        </DialogClose>
      )}
    </div>
  );
};
