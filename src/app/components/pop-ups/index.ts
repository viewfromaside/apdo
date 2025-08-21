import { DialogProps } from "../dialog";

export * from "@/app/components/pop-ups/settings";
export * from "@/app/components/pop-ups/search";

export type PopupProps = DialogProps & {
  dialogClassName?: string;
  contentClassName?: string;
};
