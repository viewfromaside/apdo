import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type DialogContentProps = ComponentProps<"form"> & {};

export const DialogForm = ({
  children,
  className,
  method,
  ...props
}: DialogContentProps) => {
  return (
    <form
      method={method}
      className={twMerge("flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </form>
  );
};
