import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input"> & {};

export const Input = ({ onChange, className, value, ...props }: InputProps) => {
  const [fulfilled, setFulfilled] = useState<boolean>();

  useEffect(() => {
    setFulfilled(true);
  }, [value]);

  return (
    <input
      onChange={onChange}
      value={value}
      className={twMerge(
        "px-3 text-center select-none outline-none hover:scale-x-200 font-mono py-1 text-[12px] bg-gray-500/10 focus:bg-accent/10 duration-200 rounded-md h-fit",
        className
      )}
      {...props}
    />
  );
};
