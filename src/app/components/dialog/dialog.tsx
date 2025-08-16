"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { createContext, useContext } from "react";

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

type DialogProps = ComponentProps<"div"> & {
  required?: boolean;
  open: boolean;
  toggle: () => void;
};

export const Dialog = ({
  children,
  className,
  required,
  toggle,
  ...props
}: DialogProps) => {
  return (
    <DialogContext.Provider value={{ required, toggle }}>
      <div
        onClick={(e) => {
          if (required) {
            console.log("dialogue fechado");
          }
        }}
        className={twMerge(
          "absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center bg-black/60 w-full h-full rounded-sm ",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DialogContext.Provider>
  );
};
