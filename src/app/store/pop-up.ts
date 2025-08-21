"use client";

import { atom } from "jotai";

export type PopupKey = "settings" | "search";

export const openPopupsAtom = atom<Record<PopupKey, boolean>>({
  settings: false,
  search: false,
});

export const togglePopupAtom = atom(null, (get, set, key: PopupKey) => {
  const current = get(openPopupsAtom);
  set(openPopupsAtom, { ...current, [key]: !current[key] });
});

export const openPopupAtom = atom(null, (get, set, key: PopupKey) => {
  const current = get(openPopupsAtom);
  set(openPopupsAtom, { ...current, [key]: true });
});

export const closePopupAtom = atom(null, (get, set, key: PopupKey) => {
  const current = get(openPopupsAtom);
  set(openPopupsAtom, { ...current, [key]: false });
});
