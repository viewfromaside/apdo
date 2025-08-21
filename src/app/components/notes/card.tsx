import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { FileName } from "../editor";
import { Tag } from "../tag";

type CardProps = ComponentProps<"div"> & {};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={twMerge(
        "bg-dark-background relative p-2 w-full rounded-sm cursor-pointer hover:bg-white/10 duration-200",
        className
      )}
      {...props}
    >
      {/* <div className="absolute rounded-t-sm h-[2px] bg-accent top-0 left-0 w-full"></div> */}

      <FileName className="mt-0">{props.title}</FileName>
      <div className="flex flex-row mt-2 gap-1">
        <Tag color="[#ff0000]" label="tech" />
      </div>
    </div>
  );
};
