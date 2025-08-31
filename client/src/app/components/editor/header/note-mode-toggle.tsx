"use client";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type RawEditorProps = ComponentProps<"div"> & {
  formatMarkdownToggle: boolean;
  setFormatMarkdownToggle: Dispatch<SetStateAction<boolean>>;
};

export const NoteModeToggle = ({
  className,
  formatMarkdownToggle,
  setFormatMarkdownToggle,
  ...props
}: RawEditorProps) => {
  const toggleMarkdownMode = () => {
    setFormatMarkdownToggle((prev) => !prev);
  };

  return (
    <div
      onClick={toggleMarkdownMode}
      className={twMerge(
        "px-2 cursor-pointer hover:opacity-60 duration-200 w-fit select-none font-mono py-1 text-[12px] tracking-wide bg-gray-500/20 rounded-md h-fit",
        className
      )}
      {...props}
    >
      {formatMarkdownToggle ? (
        <EyeClosedIcon size={18} />
      ) : (
        <EyeIcon size={18} />
      )}
    </div>
  );
};
