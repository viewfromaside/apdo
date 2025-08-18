import { BaseEntity, IBase } from "./base";

export interface IUser extends IBase {
  fullName: string;
  email: string;
}

export class User extends BaseEntity implements IUser {
  public fullName: string;
  public email: string;

  constructor(obj: Partial<IBase & IUser>) {
    super();
    this.fullName = obj.fullName || "";
    this.email = obj.email || "";
  }
}
