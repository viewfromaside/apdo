import { IBase } from "@/app/services/models";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class BaseRequest<T extends IBase> {
  protected url: string;
  protected client: AxiosInstance;

  constructor(url: string, config?: AxiosRequestConfig) {
    this.url = url;
    this.client = axios.create({
      baseURL: url,
      ...config,
    });
  }

  async sendCreate(data: Partial<T>): Promise<T> {
    const { data: res } = await this.client.post<T>("", data);
    return res;
  }

  async sendRemove(id: string): Promise<boolean> {
    const res = await this.client.delete(`/${id}`);
    return res.status >= 200 && res.status < 300;
  }

  async sendEdit(id: string, data: Partial<T>): Promise<T> {
    const { data: res } = await this.client.put<T>(`/${id}`, data);
    return res;
  }

  async sendFindMany(params?: Record<string, any>): Promise<T[]> {
    const { data: res } = await this.client.get<T[]>("", { params });
    return res;
  }

  async sendFindOne(id: string): Promise<T | null> {
    try {
      const { data: res } = await this.client.get<T>(`/${id}`);
      return res;
    } catch (err: any) {
      if (err.response?.status == 404) return null;
      return err;
    }
  }
}
