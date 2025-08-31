import { toast } from "sonner";
import { User } from "../models/user";
import { BaseRequest } from "./base";
import { AxiosResponse } from "axios";

export class AccountRequest extends BaseRequest<User> {
  constructor() {
    super("/account");
  }

  async sendRegister(data: Partial<User>): Promise<User> {
    const { data: res, status } = await this.client.post<User>(
      `/register`,
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

  async sendLogin(data: Partial<User>): Promise<AxiosResponse> {
    const res = await this.client.post(`/login`, {
      username: data.username,
      password: data.password,
    });
    return res;
  }
}
