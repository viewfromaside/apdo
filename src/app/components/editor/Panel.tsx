import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Panel = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={twMerge(
        "bg-accent/10 dark:bg-black/20 w-[70%] h-[80%] relative flex rounded-sm p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
