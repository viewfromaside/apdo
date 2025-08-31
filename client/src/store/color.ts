import { atom } from "jotai";

export const themeColorsAtom = atom({
  neutral: "#eaeaea",
  background: "#1e1e1e",
  accent: "#ffb86c",
});

export type ColorKey = keyof typeof themeColorsAtom.init;
