import { User } from "@/services";
import { BaseRequest } from "@/services";

export class UserRequest extends BaseRequest<User> {
  constructor() {
    super("/api/users");
  }
}
