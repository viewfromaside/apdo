import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";

type NoContentProps = ComponentProps<"div"> & {};

export const NoContent = ({ className, ...props }: NoContentProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col select-none gap-2 w-full h-full justify-center items-center",
        className
      )}
      {...props}
    >
      <h2 className="text-[32px] md:text-[42px] font-bold text-accent">
        Ayy, you made it
      </h2>
      <span className="text-[14px] -mt-1">
        All the notes, your way — modern, no cap
      </span>
      <div className="flex flex-row mt-5 gap-4">
        <Button className="bg-green-800 hover:bg-green-500 hover:text-white">
          drop a fresh one
        </Button>
        <Button className=" hover:bg-accent ">set ya vibe</Button>
      </div>
    </div>
  );
};
