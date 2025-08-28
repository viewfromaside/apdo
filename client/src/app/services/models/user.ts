import { BaseEntity, IBase } from "./base";

export interface IUser extends IBase {
  username: string;
  email: string;
}

export class User extends BaseEntity implements IUser {
  public username: string;
  public email: string;

  constructor(obj: Partial<IBase & IUser>) {
    super();
    this.username = obj.username || "";
    this.email = obj.email || "";
  }
}
