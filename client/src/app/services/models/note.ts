import { NoteVisibility } from "@/app/shared/enums/note";
import { BaseEntity, IBase } from "./base";

export interface INote extends IBase {
  title: string;
  content: string;
  visibility: NoteVisibility;
}

export class Note extends BaseEntity implements INote {
  public title: string;
  public content: string;
  public visibility: NoteVisibility;

  constructor(obj: Partial<Record<string, any>>) {
    super(obj);
    this.title = obj.title || "";
    this.content = obj.content || "";
    this.visibility =
      obj.visibility === NoteVisibility.PRIVATE
        ? NoteVisibility.PRIVATE
        : NoteVisibility.PUBLIC;
  }

  getObjectForCreate() {
    return {
      title: this.title,
      content: this.content,
      visibility: this.visibility.toLowerCase(),
      created_by: this.createdBy,
    };
  }

  getObjectForEdit() {
    return {
      title: this.title,
      content: this.content,
      visibility: this.visibility,
      created_by: this.createdBy,
    };
  }
}
