import { atom } from "jotai";

export const themeColorsAtom = atom({
  primary: "#eaeaea",
  secondary: "#a0a0a0",
  neutral: "#2c2c2c",
  background: "#1e1e1e",
  accent: "#ffb86c",
});

export type ColorKey = keyof typeof themeColorsAtom.init;
