"use client";

import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type TextareaProps = ComponentProps<"textarea"> & {};

export const Textarea = ({
  onChange,
  className,
  value,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      onChange={onChange}
      value={value}
      className={twMerge(
        "px-3 text-center select-none outline-none font-mono py-1 text-[12px] bg-gray-500/10 focus:bg-accent/10 duration-200 rounded-md h-fit",
        className
      )}
      {...props}
    />
  );
};
