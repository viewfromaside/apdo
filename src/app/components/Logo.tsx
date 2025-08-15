import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Logo = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <Link href={"/"}>
      <div
        {...props}
        className={twMerge(
          "flex flex-row justify-center items-center gap-3",
          className
        )}
      >
        <Image
          src={"/logo.png"}
          width={35}
          height={35}
          alt="asda"
          unoptimized
        />
        <span className="text-[36px] -mt-3 font-bold tracking-tighter">
          apdo.
        </span>
      </div>
    </Link>
  );
};
