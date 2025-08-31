import { toast } from "sonner";
import { User } from "../models/user";
import { BaseRequest } from "./base";
import { AxiosResponse } from "axios";

export class AccountRequest extends BaseRequest<User> {
  constructor() {
    super("/account");
  }

  async sendRegister(data: Partial<User>): Promise<AxiosResponse | null> {
    try {
      const response = await this.client.post<User>(
        `/register`,
        data.getObjectForCreate!()
      );

      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async sendLogin(data: Partial<User>): Promise<AxiosResponse | null> {
    try {
      const res = await this.client.post(`/login`, {
        username: data.username,
        password: data.password,
      });
      console.log(res.status);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
