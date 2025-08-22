import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { useDialogContext } from "./dialog";

export const DialogClose = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { toggle, required } = useDialogContext();
  return (
    <div
      onClick={() => {
        if (!required) toggle();
      }}
      className={twMerge(`cursor-pointer`, className)}
      {...props}
    >
      {children}
    </div>
  );
};
