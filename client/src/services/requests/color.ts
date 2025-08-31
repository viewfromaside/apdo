import { Color } from "@/services";
import { BaseRequest } from "./base";

export class ColorRequest extends BaseRequest<Color> {
  constructor(jwt?: string) {
    super("/api/colors", jwt);
  }

  async sendEdit(id: string, data: Record<string, any>): Promise<Color> {
    const { data: res, status } = await this.client.put<Color>(
      `/${id}/edit`,
      data
    );

    return res;
  }
}
