import { ComponentProps } from "react";
import { Button } from "../../button";
import { twMerge } from "tailwind-merge";

export const Save = ({
  onClick,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <Button onClick={onClick} className={twMerge("", className)}>
      ctrl + s
    </Button>
  );
};
