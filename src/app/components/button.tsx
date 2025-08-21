import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  className,
  children,
  onClick,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "px-3 cursor-pointer text-center select-none font-mono py-1 text-[12px] tracking-wide bg-accent/40 duration-200 hover:bg-accent hover:text-black rounded-md h-fit",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
