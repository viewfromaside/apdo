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
        "flex flex-row w-full pb-1 items-center justify-between ",
        className
      )}
      {...props}
    >
      <div className={twMerge(`flex-1 font-mono text-start`, textClassName)}>
        {children}
      </div>
      {!required && (
        <DialogClose
          className={`${!children && "absolute top-[0.7rem] right-[0.7rem]"}`}
        >
          <XIcon size={18} />
        </DialogClose>
      )}
    </div>
  );
};
