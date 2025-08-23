import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"div"> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
};

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent/40 hover:bg-accent text-white hover:text-black",
  secondary: "bg-gray-500/20 hover:bg-gray-500/60 text-white",
  outline:
    "border border-gray-500/10 bg-transparent hover:bg-gray-500/10 text-dark-background dark:text-neutral hover:!text-accent",
  ghost:
    "bg-transparent hover:bg-gray-500/10 text-dark-background dark:text-neutral hover:!text-accent",
};

export const Button = ({
  className,
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <div
      {...props}
      className={twMerge(
        `px-3 py-1 text-[12px] tracking-wide font-mono rounded-md 
         cursor-pointer select-none text-center duration-200 h-fit`,
        buttonVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};
