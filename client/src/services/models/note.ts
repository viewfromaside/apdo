function normalizeNotePayload(raw: any) {
  return {
    id: raw.id,
    created_by: raw.created_by ?? raw.createdBy,
    created_at: raw.created_at ?? raw.createdAt,
    updated_at: raw.updated_at ?? raw.updatedAt,
    title: raw.title,
    content: raw.content,
    visibility: raw.visibility,
  };
}

import { NoteVisibility } from "@/shared";
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
    const normalized = normalizeNotePayload(obj);
    super(normalized);
    this.title = normalized.title || "";
    this.content = normalized.content || "";
    this.visibility =
      normalized.visibility === NoteVisibility.PRIVATE
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
