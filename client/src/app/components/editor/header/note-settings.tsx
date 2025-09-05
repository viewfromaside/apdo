import { verifyItsLogged } from "@/store/user";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const NoteSettings = ({ className, ...props }: ComponentProps<"a">) => {
  const isLogged = verifyItsLogged();
  return (
    <Link
      className={twMerge(
        `${
          !isLogged && "hidden"
        } px-2 cursor-pointer hover:opacity-60 duration-200 w-fit select-none font-mono py-1 text-[12px] tracking-wide bg-gray-500/20 rounded-md h-fit`,
        className
      )}
      href={{ pathname: props.href }}
      {...props}
    >
      <Ellipsis size={18} />
    </Link>
  );
};
