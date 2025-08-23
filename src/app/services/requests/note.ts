import { Note } from "../models";
import { BaseRequest } from "./base";

export class NoteRequest extends BaseRequest<Note> {
  constructor() {
    super("/api/notes");
  }
}
