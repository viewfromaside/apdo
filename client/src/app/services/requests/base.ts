import { getCookie } from "@/app/lib/utils";
import { IBase } from "@/app/services/models";
import { ToastErrorStyle, ToastSuccessStyle } from "@/app/shared";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getDefaultStore } from "jotai";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export class BaseRequest<T extends IBase> {
  protected url: string;
  protected client: AxiosInstance;

  constructor(url: string, jwt?: string, config?: AxiosRequestConfig) {
    this.url = process.env.NEXT_PUBLIC_BACKEND_API_URL + url;

    this.client = axios.create({
      baseURL: this.url,
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : undefined,
      },
      ...config,
    });
  }

  async sendCreate(data: Partial<T>): Promise<T> {
    const { data: res, status } = await this.client.post<T>(
      `/create`,
      data.getObjectForCreate!()
    );

    return res;
  }

  async sendRemove(id: string): Promise<boolean> {
    const res = await this.client.delete(`/${id}/remove`);
    let hasSuccess = res.status >= 200 && res.status < 300;

    return hasSuccess;
  }

  async sendEdit(id: string, data: Partial<T>): Promise<T> {
    const { data: res, status } = await this.client.put<T>(
      `/${id}/edit`,
      data.getObjectForEdit!()
    );

    return res;
  }

  async sendFindMany(params?: Record<string, any>): Promise<T[]> {
    if (params?.field) {
      this.url += `?field=${params.field}`;
    }
    if (params?.value) {
      this.url += `?value=${params.value}`;
    }
    const { data: res, status } = await this.client.get<T[]>("", { params });

    return res;
  }

  async sendFindOne(id: string): Promise<T | null> {
    try {
      const { data: res, status } = await this.client.get<T>(`/${id}`);

      return res;
    } catch (err: any) {
      if (err.response?.status == 404) return null;
      return err;
    }
  }
}
