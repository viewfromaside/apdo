import { useTheme } from "next-themes";
import { ComponentProps } from "react";
import { Toaster } from "sonner";
import { twMerge } from "tailwind-merge";
import { PopupManager } from "./pop-ups";

export const Panel = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div
      className={twMerge(
        "bg-accent/10 dark:bg-black/20 w-full xl:w-[70%] h-full xl:h-[80%] relative flex rounded-sm p-5",
        className
      )}
      {...props}
    >
      {children}
      <PopupManager />
      <Toaster
        className="bg-red-500"
        toastOptions={{
          duration: 1600,
          style: {
            backgroundColor: isDarkTheme
              ? "var(--color-dark-background)"
              : "var(--color-background)",
            color: isDarkTheme ? "white" : "var(--color-dark-background)",
            border: "1px solid var(--color-accent)",
          },
        }}
        style={{
          position: "absolute",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};
