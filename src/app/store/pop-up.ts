"use client";

import { atom } from "jotai";

export type PopupKey =
  | "settings"
  | "search"
  | "notes"
  | "createNote"
  | "appearence"
  | "report"
  | "file"
  | "rename"
  | "exclude"
  | "confirmEmail";

export const openPopupsAtom = atom<Record<PopupKey, boolean>>({
  settings: false,
  search: false,
  notes: false,
  createNote: false,
  appearence: false,
  report: false,
  file: false,
  rename: false,
  exclude: false,
  confirmEmail: false,
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

export const closeAllPopupAtom = atom(null, (get, set) => {
  const keys = Object.keys(get(openPopupsAtom)) as PopupKey[];

  const closed = keys.reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {} as Record<PopupKey, boolean>
  );

  set(openPopupsAtom, closed);
});
