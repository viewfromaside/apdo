import { atom } from "jotai";

export const themeColorsAtom = atom({
  neutral: "#2c2c2c",
  background: "#1e1e1e",
  accent: "#ffb86c",
});

export type ColorKey = keyof typeof themeColorsAtom.init;
