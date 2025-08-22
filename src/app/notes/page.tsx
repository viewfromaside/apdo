"use client";

import {
  Card,
  Logo,
  NoContent,
  NoteSettings,
  Panel,
  PopupSearch,
  PopupSettings,
} from "@/app/components";
import { useEffect, useState } from "react";
import { Note } from "../services";
import { useSetAtom } from "jotai";
import { togglePopupAtom } from "../store/pop-up";
import { deleteNoteAtom, saveNoteAtom } from "../store";

export default function NotesHome() {
  const [notes, setNotes] = useState<Note[]>([]);

  const togglePopup = useSetAtom(togglePopupAtom);

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-4">
        <div className="flex flex-row w-full justify-between items-center">
          <Logo href="/notes" />
          <NoteSettings onClick={() => togglePopup("settings")} />
        </div>
        <div className="flex w-full md:p-5 md:pt-0 md:border-l-1  border-accent h-full overflow-x-hidden overflow-auto flex-row flex-wrap gap-2 content-start">
          <h2 className="md:text-[32px] font-extrabold text-accent">
            so there are my notes
          </h2>
          {notes.length == 0 ? (
            <>
              <Card title={"random note about work"}></Card>
              <Card title={"random note about work"}></Card>
              <Card title={"random note about work"}></Card>
              <Card title={"random note about work"}></Card>
              <Card title={"random note about work"}></Card>
            </>
          ) : (
            <NoContent />
          )}
        </div>
      </Panel>
    </div>
  );
}
