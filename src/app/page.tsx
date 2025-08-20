"use client";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  FileName,
  GoBack,
  HeaderSettingsDropdown,
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

export default function Home() {
  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-3"></Panel>
    </div>
  );
}
