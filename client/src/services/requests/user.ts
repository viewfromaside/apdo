import { User } from "@/services";
import { BaseRequest } from "./base";

export class UserRequest extends BaseRequest<User> {
  constructor() {
    super("/api/users");
  }
}
