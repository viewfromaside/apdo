import { BaseRequest, Note } from "@/app/services";

export class NoteRequest extends BaseRequest<Note> {
  constructor() {
    super("/api/notes");
  }
}
