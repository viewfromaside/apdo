import { ComponentProps } from "react";
import { CookiesProvider } from "react-cookie";
import { twMerge } from "tailwind-merge";

export const Layout = ({
  className,
  children,
  ...props
}: ComponentProps<"main">) => {
  return (
    <CookiesProvider>
      <main
        className={twMerge(
          "flex flex-row h-[100dvh] xl:p-5 bg-background dark:bg-dark-background",
          className
        )}
        {...props}
      >
        {children}
      </main>
    </CookiesProvider>
  );
};
