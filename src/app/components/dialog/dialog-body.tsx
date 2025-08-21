"use client";
import { ComponentProps, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Draggable from "react-draggable";

type DialogBodyProps = ComponentProps<"div"> & {
  draggable?: boolean;
};

export const DialogBody = ({
  className,
  children,
  draggable,
  ...props
}: DialogBodyProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable handle=".dialog-handle" nodeRef={nodeRef} bounds="parent">
      <div
        ref={nodeRef}
        className={twMerge(
          `dark:bg-dark-background bg-background h-fit border border-accent/20 ${
            draggable && "dialog-handle"
          } cursor-default rounded-sm p-3 text-[13px]`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Draggable>
  );
};
