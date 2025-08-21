import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/components/shadcn-ui/dropdown-menu";
import { NoteSettings } from "../editor";
import React, { SetStateAction } from "react";

export function HeaderSettingsDropdown({
  setSaved,
}: {
  setSaved?: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NoteSettings />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-background dark:bg-dark-background  border-accent/20"
        align="end"
      >
        <DropdownMenuLabel>File</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Actions</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-56 bg-background dark:bg-dark-background border-accent/20">
                <DropdownMenuItem
                  onClick={() => {
                    if (setSaved) {
                      setSaved(true);
                    }
                  }}
                >
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Appearence</DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator className="bg-accent" />
        <DropdownMenuLabel>@viewfromaside</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>See Profile</DropdownMenuItem>
          <DropdownMenuItem>Appearence</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>Log out</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
