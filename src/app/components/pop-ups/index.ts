import { DialogProps } from "../dialog";

export * from "@/app/components/pop-ups/manager";
export * from "@/app/components/pop-ups/settings";
export * from "@/app/components/pop-ups/notes";
export * from "@/app/components/pop-ups/search";
export * from "@/app/components/pop-ups/create-note";

export type PopupProps = DialogProps & {
  dialogClassName?: string;
  contentClassName?: string;
};
