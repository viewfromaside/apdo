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
      className={twMerge(
        `cursor-pointer absolute right-[.6rem] top-[.6rem]`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
