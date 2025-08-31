import { BaseEntity, IBase } from "./base";

export interface IUser extends IBase {
  active: boolean;
  username: string;
  email: string;
  password: string;
}

export class User extends BaseEntity implements IUser {
  public active: boolean;
  public username: string;
  public email: string;
  public password: string;

  constructor(obj: Partial<IBase & IUser>) {
    super(obj);
    this.active = obj.active || false;
    this.username = obj.username || "";
    this.email = obj.email || "";
    this.password = obj.password || "";
  }

  getObjectForCreate() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}
