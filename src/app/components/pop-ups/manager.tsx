"use client";

import { createPortal } from "react-dom";
import { PopupSettings } from "./settings";
import { PopupSearch } from "./search";
import { useAtomValue, useSetAtom } from "jotai";
import { openPopupsAtom, togglePopupAtom } from "@/app/store/pop-up";
import { useEffect, useState } from "react";

export const PopupManager = () => {
  const openPopups = useAtomValue(openPopupsAtom);
  const togglePopup = useSetAtom(togglePopupAtom);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <PopupSettings
        contentClassName="w-[200px] md:w-[140px]"
        open={openPopups.settings}
        toggle={() => togglePopup("settings")}
        callbacks={{
          search: () => togglePopup("search"),
        }}
      />

      <PopupSearch
        dialogClassName="top-0"
        open={openPopups.search}
        toggle={() => togglePopup("search")}
      />
    </>,
    document.body
  );
};
