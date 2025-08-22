import { DialogProps } from "../dialog";

export * from "@/app/components/pop-ups/manager";
export * from "@/app/components/pop-ups/settings";
export * from "@/app/components/pop-ups/notes";
export * from "@/app/components/pop-ups/search";
export * from "@/app/components/pop-ups/create-note";
export * from "@/app/components/pop-ups/appearence";
export * from "@/app/components/pop-ups/report";
export * from "@/app/components/pop-ups/file";
export * from "@/app/components/pop-ups/rename";
export * from "@/app/components/pop-ups/exclude";

export type PopupProps = DialogProps & {
  dialogClassName?: string;
  contentClassName?: string;
};
