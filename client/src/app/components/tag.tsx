import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type TagProps = ComponentProps<"div"> & {
  color?: string;
  label?: string;
  icon?: LucideIcon;
  size?: number;
};

export const Tag = ({
  icon: Icon,
  className,
  color,
  label,
  size = 12, // tamanho padrão do ícone
  ...props
}: TagProps) => {
  const isCustomColor = color?.startsWith("[") && color?.endsWith("]");
  const hexColor = isCustomColor ? color!.slice(1, -1) : null;

  return (
    <div
      className={twMerge(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md",
        "h-6 text-[11px] font-mono tracking-wide leading-none",
        !isCustomColor && color ? `bg-${color}/20` : "bg-accent/20",
        className
      )}
      style={hexColor ? { backgroundColor: `${hexColor}20` } : undefined}
      {...props}
    >
      {Icon && <Icon size={size} strokeWidth={2} />}
      <span className="whitespace-nowrap text-neutral">{label}</span>
    </div>
  );
};
