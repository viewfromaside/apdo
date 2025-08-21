"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  FileName,
  GoBack,
  HeaderSettingsDropdown,
  Logo,
  MarkdownEditor,
  NoteModeToggle,
  Panel,
  RawEditor,
  UnsavedBottomBar,
} from "./components";
import { useEffect, useRef, useState } from "react";
import { editor } from "@/app/assets/main.json";
import { toast } from "sonner";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  loadNotesAtom,
  saveNoteAtom,
  selectedNoteAtom,
  selectedNoteIndexAtom,
} from "./store";
import Link from "next/link";
import gsap from "gsap";

export default function Home() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !linkRef.current) return;

    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      buttonRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    // se n me engano essa porra aq eh a animacao do link
    tl.fromTo(
      linkRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-7 justify-center items-center">
        <Logo />
        <div className="flex flex-col gap-2">
          <Button ref={buttonRef} className="text-[14px]">
            sign in, aight?
          </Button>
          <Link
            ref={linkRef}
            className="text-[13px] duration-300 hover:text-accent text-dark-secondary font-mono tracking-wide transform transition-all hover:translate-x-1"
            href={"/notes"}
          >
            slide in, join the crew
          </Link>
        </div>
      </Panel>
    </div>
  );
}
