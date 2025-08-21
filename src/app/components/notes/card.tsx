import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { FileName, Tag } from "@/app/components";
import { LockOpenIcon, StarIcon } from "lucide-react";
import Link from "next/link";

type CardProps = ComponentProps<"div"> & {};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <Link href={"/notes/askmdaskmd"} className="w-full md:w-[calc(33%-3px)]">
      <div
        className={twMerge(
          "bg-dark-background relative p-2 w-full hover:scale-103 rounded-sm cursor-pointer hover:bg-white/10 duration-200",
          className
        )}
        {...props}
      >
        {/* <div className="absolute rounded-t-sm h-[2px] bg-accent top-0 left-0 w-full"></div> */}

        <div className="flex flex-row gap-2">
          <FileName className="mt-0 cursor-pointer">{props.title}</FileName>
        </div>
        <div className="flex flex-row mt-2 gap-1">
          <Tag
            className="bg-[#FFC000]/60 font-bold"
            icon={StarIcon}
            label="32"
          />
          <Tag color="[#27BEF5]" icon={LockOpenIcon} label="public" />
        </div>
      </div>
    </Link>
  );
};
