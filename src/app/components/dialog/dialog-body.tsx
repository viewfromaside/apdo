"use client";
import { ComponentProps, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Draggable from "react-draggable";

type DialogBodyProps = ComponentProps<"div"> & {};

export const DialogBody = ({
  className,
  children,
  ...props
}: DialogBodyProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable handle=".dialog-handle" nodeRef={nodeRef} bounds="parent">
      <div
        ref={nodeRef}
        className={twMerge(
          "dark:bg-dark-background bg-background w-fit h-fit border border-accent/20 dialog-handle cursor-default rounded-sm p-3 text-[13px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Draggable>
  );
};
