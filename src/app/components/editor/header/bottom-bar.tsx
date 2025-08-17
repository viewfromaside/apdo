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
  useEffect(() => {
    if (!bar.current) return;

    if (show) {
      gsap.fromTo(
        bar.current,
        { scaleX: 0.42, transformOrigin: "right center" }, // 0%
        { scaleX: 1, duration: 1.4, ease: "power1.out" } // 100%
      );
    } else {
      gsap.to(bar.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 2,
        ease: "power1.in",
      });
    }
  }, [show]);

  return (
    <div
      ref={bar}
      className={twMerge(
        "unsaved-bottom-bar absolute bottom-0 left-0 rounded-b-sm w-full h-1 bg-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
