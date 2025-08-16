import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const DialogClose = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge(
        " px-2 cursor-pointer hover:opacity-60 duration-200 w-fit select-none font-mono py-1 text-[12px] tracking-wide bg-gray-500/20 rounded-md h-fit",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
