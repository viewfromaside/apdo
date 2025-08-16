import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const UnsavedBottomBar = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge(
        "absolute bottom-0 left-0 rounded-b-sm w-full h-1 bg-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
