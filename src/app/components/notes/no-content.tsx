"use client";

import { ComponentProps, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";
import { useSetAtom } from "jotai";
import { togglePopupAtom } from "@/app/store/pop-up";
import gsap from "gsap";

type NoContentProps = ComponentProps<"div"> & {};

export const NoContent = ({ className, ...props }: NoContentProps) => {
  const togglePopup = useSetAtom(togglePopupAtom);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !buttonsRef.current
    )
      return;

    const buttons = buttonsRef.current.children;

    // Timeline de entrada
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    )
      .fromTo(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .fromTo(
        buttons,
        {
          y: 25,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
          stagger: 0.1,
        },
        "-=0.2"
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "flex flex-col select-none gap-2 w-full h-full justify-center items-center",
        className
      )}
      {...props}
    >
      <h2
        ref={titleRef}
        className="text-[32px] md:text-[42px] font-bold text-accent"
      >
        Ayy, you made it
      </h2>
      <span ref={subtitleRef} className="text-[14px] -mt-1">
        All the notes, your way — modern, no cap
      </span>
      <div ref={buttonsRef} className="flex flex-row mt-5 gap-4">
        <Button
          onClick={() => togglePopup("createNote")}
          className="bg-green-800 hover:bg-green-500 !text-white hover:text-white"
        >
          drop a fresh one
        </Button>
        <Button className=" hover:bg-accent">set ya vibe</Button>
      </div>
    </div>
  );
};
