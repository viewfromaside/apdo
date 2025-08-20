"use client";

import { ComponentProps, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";

type UnsavedBottomBarProps = ComponentProps<"div"> & {
  show: boolean;
};

export const UnsavedBottomBar = ({
  className,
  children,
  show,
  ...props
}: UnsavedBottomBarProps) => {
  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!bar.current) return;

    if (show) {
      gsap.fromTo(
        bar.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    } else {
      gsap.to(bar.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [show]);

  return (
    <div
      ref={bar}
      className={twMerge(
        "unsaved-bottom-bar opacity-0 scale-x-0 absolute bottom-0 left-0 w-full h-1 bg-accent rounded-b-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
