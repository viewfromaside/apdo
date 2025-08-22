"use client";
import { ComponentProps, useRef, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Draggable from "react-draggable";

type DialogBodyProps = ComponentProps<"div"> & {
  draggable?: boolean;
  mainClassName?: string;
};

export const DialogBody = ({
  className,
  mainClassName,
  children,
  draggable = false,
  ...props
}: DialogBodyProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const shouldBeDraggable = draggable && isDesktop;

  if (!shouldBeDraggable) {
    return (
      <div
        ref={nodeRef}
        className={twMerge(
          "dark:bg-dark-background relative bg-background border border-accent/20 cursor-default rounded-sm p-3 text-[13px]",
          className,
          mainClassName
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <Draggable
      handle=".dialog-handle"
      defaultClassName={twMerge(mainClassName)}
      defaultClassNameDragging="cursor-grabbing"
      nodeRef={nodeRef}
      bounds="parent"
      disabled={!shouldBeDraggable}
    >
      <div
        ref={nodeRef}
        className={twMerge(
          "dark:bg-dark-background bg-background border border-accent/20 dialog-handle rounded-sm p-3 text-[13px]",
          " cursor-default",
          className,
          mainClassName
        )}
        {...props}
      >
        {children}
      </div>
    </Draggable>
  );
};
