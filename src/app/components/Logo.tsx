"use client";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";

export const Logo = ({ className, ...props }: ComponentProps<"div">) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!textRef.current || !imageRef.current) return;

    const text = textRef.current.innerText;
    textRef.current.innerHTML = text
      .split("")
      .map((char) => `<span class="inline-block">${char}</span>`)
      .join("");

    const chars = textRef.current.querySelectorAll("span");

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
        display: "block",
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    tl.to(textRef.current, { opacity: 1 }, ".1");

    tl.fromTo(
      chars,
      {
        y: 50,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.1,
      },
      "-=0.2"
    );
  }, []);

  return (
    <Link href={"/"}>
      <div
        {...props}
        className={twMerge(
          "flex flex-col justify-center items-center gap-1 group cursor-pointer relative",
          className
        )}
      >
        <div className="flex flex-row justify-center items-center gap-3">
          <Image
            ref={imageRef}
            src={"/logo.png"}
            width={35}
            height={35}
            className="hidden"
            alt="Logo"
            unoptimized
          />
          <span
            ref={textRef}
            className="text-[36px] opacity-0 -mt-3 font-bold tracking-tighter"
          >
            apdo
          </span>
        </div>
        <div className="w-0 h-[2px] bg-accent transition-all duration-300 ease-in-out group-hover:w-[80%]"></div>
      </div>
    </Link>
  );
};
