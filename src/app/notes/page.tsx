"use client";

import { Card, Logo, NoContent, Panel } from "@/app/components";
import { useState } from "react";
import { Note } from "../services";

export default function NotesHome() {
  const [notes, setNotes] = useState<Note[]>([]);
  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-4">
        <div className="flex flex-row w-full justify-between items-center">
          <Logo href="/notes" />
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
