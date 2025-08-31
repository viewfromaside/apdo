import { toast } from "sonner";
import { Note } from "@/services";
import { BaseRequest } from "./base";
import { ToastErrorStyle } from "@/shared";

export class NoteRequest extends BaseRequest<Note> {
  constructor(jwt?: string) {
    super("/api/notes", jwt);
  }

  async sendFindMany(params?: Record<string, any>): Promise<Note[]> {
    throw new Error("this method does not exists on note");
  }

  async sendFindManyByUser(id: string): Promise<Note[]> {
    try {
      const { data: res, status } = await this.client.get<Note[]>(
        `/user/${id}`
      );

      if (status >= 200 && status < 300) {
      } else {
        toast.error("Error", ToastErrorStyle);
      }

      return res;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async sendFindManyOnlyPublic(): Promise<Note[]> {
    try {
      const { data: res, status } = await this.client.get<Note[]>(`/public`);

      if (status >= 200 && status < 300) {
      } else {
        toast.error("Error", ToastErrorStyle);
      }
      if (res) {
        return res.map((n) => new Note(n));
      }
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}
