import { User } from "../models/user";
import { BaseRequest } from "./base";

export class UserRequest extends BaseRequest<User> {
  constructor() {
    super("/api/users");
  }
}
