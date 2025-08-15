"use client";

import {
  ArrowLeft,
  Ellipsis,
  EyeClosedIcon,
  EyeIcon,
  Plus,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { ComponentProps, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export const NoteModeSettings = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const [markdownActive, setMarkdownActive] = useState(false);

  const toggleMarkdownMode = () => {
    setMarkdownActive((prev) => !prev);
  };

  return (
    <div
      onClick={toggleMarkdownMode}
      className={twMerge(
        "-mt-2 px-2 cursor-pointer hover:opacity-60 duration-200 w-fit select-none font-mono py-1 text-[12px] tracking-wide bg-gray-500/20 rounded-md h-fit",
        className
      )}
      {...props}
    >
      {markdownActive ? <EyeIcon size={18} /> : <EyeClosedIcon size={18} />}
    </div>
  );
};
