export interface IBase {
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;

  getObjectForCreate(): Record<string, any>;
  getObjectForEdit(): Record<string, any>;
}

export class BaseEntity implements IBase {
  public id: string;
  public createdBy: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(obj: Partial<Record<string, any>>) {
    this.id = obj.id;
    this.createdBy = obj.created_by;
    this.createdAt = obj.created_at ? new Date(obj.created_at) : new Date();
    this.updatedAt = obj.updated_at ? new Date(obj.updated_at) : new Date();
  }

  getObjectForCreate(): Record<string, any> {
    throw new Error(
      `${this.constructor.name}: getObjectForCreate() not implemented.`
    );
  }

  getObjectForEdit(): Record<string, any> {
    throw new Error(
      `${this.constructor.name}: getObjectForEdit() not implemented.`
    );
  }
}
