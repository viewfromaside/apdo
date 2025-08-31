"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type DialogContextType = {
  required?: boolean;
  toggle: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialogContext = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog components must be used within <Dialog>");
  }
  return ctx;
};

export type DialogProps = ComponentProps<"div"> & {
  required?: boolean;
  open: boolean;
  toggle: () => void;
};

export const Dialog = ({
  children,
  className,
  required,
  toggle,
  open,
  ...props
}: DialogProps) => {
  const [render, setRender] = useState(open);
  const dialogRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    if (open) {
      setRender(true);
    } else if (dialogRef.current) {
      animationRef.current = gsap.to(dialogRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => setRender(false),
      });
    }
  }, [open]);

  useEffect(() => {
    if (render && dialogRef.current && open) {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.fromTo(
        dialogRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [render, open]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <DialogContext.Provider value={{ required, toggle }}>
      {render && (
        <div
          ref={dialogRef}
          className={twMerge(
            "absolute z-50 top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center",
            className
          )}
          {...props}
        >
          {children}
        </div>
      )}
    </DialogContext.Provider>
  );
};
