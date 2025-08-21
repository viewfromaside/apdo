"use client";

import { Card, HeaderSettingsDropdown, Panel } from "../components";

export default function NotesHome() {
  return (
    <div className="flex w-full justify-center items-center">
      <Panel className="flex flex-col gap-4">
        <div className="flex flex-row w-full justify-end">
          <HeaderSettingsDropdown />
        </div>
        <div className="flex w-full h-full overflow-auto flex-row flex-wrap gap-2 content-start">
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
