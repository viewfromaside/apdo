import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const FileName = ({
  className,
  children,
  ...props
}: ComponentProps<"span">) => {
  return (
    <span
      className={twMerge(
        "px-3 cursor-default select-none font-mono py-1 text-[12px] tracking-wide bg-accent/20 rounded-md h-fit",
        className
      )}
      {...props}
    >
      {children?.toString().replaceAll(" ", "_") || "untitled"}
    </span>
  );
};
