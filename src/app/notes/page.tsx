"use client";

import {
  Card,
  Logo,
  NoContent,
  NoteSettings,
  Panel,
  PopupSettings,
} from "@/app/components";
import { useState } from "react";
import { Note } from "../services";

export default function NotesHome() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [settingsPopup, setSettingsPopup] = useState<boolean>(false);

  const toggleSettingsPopup = () => {
    setSettingsPopup((prev) => !prev);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-4">
        <div className="flex flex-row w-full justify-between items-center">
          <Logo href="/notes" />
          <NoteSettings onClick={toggleSettingsPopup} />
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
        <PopupSettings
          contentClassName="w-[200px] md:w-[140px]"
          open={settingsPopup}
          toggle={toggleSettingsPopup}
        />
      </Panel>
    </div>
  );
}
