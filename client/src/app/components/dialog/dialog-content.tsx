import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/app/components";
import { useDialogContext } from "./dialog";

type DialogContentProps = ComponentProps<"div"> & {
  textClassName?: string;
};

export const DialogContent = ({
  children,
  className,
  onClick,
  textClassName,
  ...props
}: DialogContentProps) => {
  const { toggle } = useDialogContext();
  return (
    <div
      className={twMerge("flex flex-col w-full gap-2", className)}
      {...props}
    >
      <span className={twMerge("my-4 text-neutral", textClassName)}>
        {children}
      </span>
      {onClick && (
        <Button
          onClick={(event) => {
            onClick(event);
            toggle();
          }}
        >
          OK
        </Button>
      )}
    </div>
  );
};
