import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"div"> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  disableDelay?: number; // tempo para reabilitar o botão após clique (ms)
};

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent/40 hover:bg-accent text-neutral hover:text-black",
  secondary: "bg-gray-500/20 hover:bg-gray-500/60 text-neutral",
  outline:
    "border border-gray-500/10 bg-transparent hover:bg-gray-500/10 text-dark-background dark:text-neutral hover:!text-accent",
  ghost:
    "bg-transparent hover:bg-gray-500/10 text-dark-background dark:text-neutral hover:!text-accent",
};

export const Button = ({
  className,
  children,
  variant = "primary",
  disableDelay = 500, // 0.5s padrão
  onClick,
  ...props
}: ButtonProps) => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    setDisabled(true);
    onClick?.(e);
    setTimeout(() => setDisabled(false), disableDelay);
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      className={twMerge(
        `px-3 py-1 text-[12px] tracking-wide font-mono rounded-md 
         cursor-pointer select-none text-center duration-200 h-fit`,
        buttonVariants[variant],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};
