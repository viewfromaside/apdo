import { IBase } from "./base";

export interface Note extends IBase {
  title: string;
  content: string;
  favorite: boolean;
}
