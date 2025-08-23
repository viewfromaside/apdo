"use client";

import { createPortal } from "react-dom";
import { PopupSettings } from "./settings";
import { PopupSearch } from "./search";
import { useAtomValue, useSetAtom } from "jotai";
import { openPopupsAtom, togglePopupAtom } from "@/app/store/pop-up";
import { useEffect, useState } from "react";
import { PopupNotes } from "./notes";
import { PopupCreateNote } from "./create-note";
import { PopupAppearence } from "./appearence";
import { PopupReport } from "./report";
import { PopupFile } from "./file";
import { PopupRename } from "./rename";
import { PopupExclude } from "./exclude";
import { PopupConfirmEmail } from "./confirm-email";

export const PopupManager = () => {
  const openPopups = useAtomValue(openPopupsAtom);
  const togglePopup = useSetAtom(togglePopupAtom);

  const [searchValue, setSearchValue] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <PopupSettings
        contentClassName="w-[200px] md:w-[140px]"
        open={openPopups.settings}
        toggle={() => togglePopup("settings")}
        callbacks={{
          search: () => togglePopup("search"),
          appearence: () => togglePopup("appearence"),
          report: () => togglePopup("report"),
          fileSettings: () => togglePopup("file"),
        }}
      />

      <PopupSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        dialogClassName="top-0"
        open={openPopups.search}
        toggle={() => togglePopup("search")}
      />

      <PopupConfirmEmail
        dialogClassName="top-0"
        open={openPopups.confirmEmail}
        toggle={() => togglePopup("confirmEmail")}
      />

      <PopupNotes
        searchValue={searchValue}
        contentClassName="w-[300px] h-[300px]"
        open={openPopups.notes}
        toggle={() => togglePopup("notes")}
      />

      <PopupCreateNote
        open={openPopups.createNote}
        toggle={() => togglePopup("createNote")}
      />

      <PopupAppearence
        contentClassName="w-[300px] h-[400px]"
        open={openPopups.appearence}
        toggle={() => togglePopup("appearence")}
      />

      <PopupReport
        contentClassName="w-[200px] md:w-[140px]"
        open={openPopups.report}
        toggle={() => togglePopup("report")}
      />

      <PopupFile
        contentClassName="w-[200px] md:w-[140px]"
        open={openPopups.file}
        toggle={() => togglePopup("file")}
        callbacks={{
          rename: () => togglePopup("rename"),
          exclude: () => togglePopup("exclude"),
        }}
      />

      <PopupRename
        open={openPopups.rename}
        toggle={() => togglePopup("rename")}
      />

      <PopupExclude
        open={openPopups.exclude}
        toggle={() => togglePopup("exclude")}
      />
    </>
  );
};
