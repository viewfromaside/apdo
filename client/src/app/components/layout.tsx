import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Layout = ({
  className,
  children,
  ...props
}: ComponentProps<"main">) => {
  return (
    <main
      className={twMerge(
        "flex flex-row h-screen xl:p-5 bg-background dark:bg-dark-background",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};
