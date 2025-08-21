import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TagProps = ComponentProps<"div"> & {
  color?: string;
  label?: string;
};

export const Tag = ({ className, color, label, ...props }: TagProps) => {
  const isCustomColor = color?.startsWith("[") && color?.endsWith("]");
  const hexColor = isCustomColor ? color!.slice(1, -1) : null;

  return (
    <div
      className={twMerge(
        `px-3 cursor-default select-none font-mono py-1 text-[10px] tracking-wide rounded-md h-fit`,
        !isCustomColor && color ? `bg-${color}/20` : "bg-accent/20",
        className
      )}
      style={
        hexColor
          ? { backgroundColor: `${hexColor}20` } // Adiciona transparência
          : undefined
      }
      {...props}
    >
      {label}
    </div>
  );
};
