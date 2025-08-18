import { BaseEntity, IBase } from "./base";

export interface INote extends IBase {
  title: string;
  content: string;
  favorite: boolean;
}

export class Note extends BaseEntity implements INote {
  public title: string;
  public content: string;
  public favorite: boolean;

  constructor(obj: Partial<INote & IBase>) {
    super();
    this.title = obj.title || "";
    this.content = obj.content || "";
    this.favorite = obj.favorite || false;
  }

  getObjectForCreate() {
    return {
      title: this.title,
      content: this.content,
      favorite: this.favorite,
    };
  }

  getObjectForEdit() {
    return {
      title: this.title,
      content: this.content,
      favorite: this.favorite,
    };
  }
}
