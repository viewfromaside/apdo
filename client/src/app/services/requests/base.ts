import { IBase } from "@/app/services/models";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

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
    const { data: res, status } = await this.client.post<T>(
      "",
      data.getObjectForCreate!()
    );
    if (status >= 200 && status < 300) {
      toast.success("Success!", {
        description: "The operation completed successfully.",
        duration: 3000,
      });
    } else {
      toast.error("Error", {
        description: "Internal error, please contact support.",
        duration: 5000,
      });
    }

    return res;
  }

  async sendRemove(id: string): Promise<boolean> {
    const res = await this.client.delete(`/${id}`);
    let hasSuccess = res.status >= 200 && res.status < 300;
    if (hasSuccess) {
      toast.success("Success!", {
        description: "The operation completed successfully.",
        duration: 3000,
      });
    } else {
      toast.error("Error", {
        description: "Internal error, please contact support.",
        duration: 5000,
      });
    }
    return hasSuccess;
  }

  async sendEdit(id: string, data: Partial<T>): Promise<T> {
    const { data: res, status } = await this.client.put<T>(
      `/${id}`,
      data.getObjectForEdit!()
    );

    if (status >= 200 && status < 300) {
      toast.success("Success!", {
        description: "The operation completed successfully.",
        duration: 3000,
      });
    } else {
      toast.error("Error", {
        description: "Internal error, please contact support.",
        duration: 5000,
      });
    }
    return res;
  }

  async sendFindMany(params?: Record<string, any>): Promise<T[]> {
    const { data: res, status } = await this.client.get<T[]>("", { params });

    if (status >= 200 && status < 300) {
    } else {
      toast.error("Error", {
        description: "Internal error, please contact support.",
        duration: 5000,
      });
    }
    return res;
  }

  async sendFindOne(id: string): Promise<T | null> {
    try {
      const { data: res, status } = await this.client.get<T>(`/${id}`);

      if (status >= 200 && status < 300) {
        toast.success("Success!", {
          description: "The operation completed successfully.",
          duration: 3000,
        });
      } else {
        toast.error("Error", {
          description: "Internal error, please contact support.",
          duration: 5000,
        });
      }
      return res;
    } catch (err: any) {
      if (err.response?.status == 404) return null;
      return err;
    }
  }
}
