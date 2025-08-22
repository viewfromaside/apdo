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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Mata timeline anterior
    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (open) {
      setRender(true);
    } else if (render && dialogRef.current) {
      tlRef.current = gsap.timeline();
      tlRef.current.to(dialogRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
        onComplete: () => setRender(false),
      });
    }
  }, [open, render]);

  useEffect(() => {
    if (render && open && dialogRef.current) {
      // Mata timeline anterior

      tlRef.current = gsap.timeline();
      tlRef.current.fromTo(
        dialogRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power1.out" }
      );
    }
  }, [render, open]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  if (!render) return null;

  return (
    <DialogContext.Provider value={{ required, toggle }}>
      <div
        ref={dialogRef}
        className={twMerge(
          "fixed z-50 top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DialogContext.Provider>
  );
};
