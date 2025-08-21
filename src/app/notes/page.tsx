"use client";

import { Card, HeaderSettingsDropdown, Logo, Panel } from "@/app/components";

export default function NotesHome() {
  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-4">
        <div className="flex flex-row w-full justify-between items-center">
          <Logo href="/notes" />
          <HeaderSettingsDropdown />
        </div>
        <div className="flex w-full h-full overflow-x-hidden overflow-auto flex-row flex-wrap gap-2 content-start">
          <Card title={"random note about work"}></Card>
          <Card title={"random note about work"}></Card>
          <Card title={"random note about work"}></Card>
          <Card title={"random note about work"}></Card>
          <Card title={"random note about work"}></Card>
        </div>
      </Panel>
    </div>
  );
}
