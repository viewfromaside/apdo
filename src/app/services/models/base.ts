export interface IBase {
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  getObjectForCreate: () => Record<string, any>;
  getObjectForEdit: () => Record<string, any>;
}

export class BaseEntity implements IBase {
  public id: string;
  public createdBy: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  constructor(obj?: Partial<IBase>) {
    this.id = obj?.id || "";
    this.createdBy = obj?.createdBy || "";
    this.createdAt = obj?.createdAt || new Date();
    this.updatedAt = obj?.updatedAt || new Date();
    this.deletedAt = obj?.deletedAt || new Date();
  }

  getObjectForCreate() {
    return this;
  }

  getObjectForEdit() {
    return this;
  }
}
