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
import { useState } from "react";
import { Note } from "../services";
import { useSetAtom } from "jotai";
import { togglePopupAtom } from "../store/pop-up";

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
        <div className="flex w-full md:p-2 h-full overflow-x-hidden overflow-auto flex-row flex-wrap gap-2 content-start">
          {notes.length > 0 ? (
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
