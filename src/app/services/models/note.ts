import { NoteVisibility } from "@/app/shared/enums/note";
import { BaseEntity, IBase } from "./base";

export interface INote extends IBase {
  title: string;
  content: string;
  favorite: boolean;
  visibility: NoteVisibility;
}

export class Note extends BaseEntity implements INote {
  public title: string;
  public content: string;
  public favorite: boolean;
  public visibility: NoteVisibility;

  constructor(obj: Partial<INote & IBase>) {
    super(obj);
    this.title = obj.title || "";
    this.content = obj.content || "";
    this.favorite = obj.favorite || false;
    this.visibility = obj.visibility || NoteVisibility.PUBLIC;
  }

  getObjectForCreate() {
    return {
      title: this.title,
      content: this.content,
      favorite: this.favorite,
      visibility: this.visibility,
    };
  }

  getObjectForEdit() {
    return {
      title: this.title,
      content: this.content,
      favorite: this.favorite,
      visibility: this.visibility,
    };
  }
}
