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
        `px-2 cursor-pointer hover:opacity-60 duration-200 w-fit select-none font-mono py-1 text-[12px] tracking-wide bg-gray-500/20 rounded-md h-fit `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
