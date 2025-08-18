export interface IBase {
  id: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  getObjectForCreate: () => Record<string, any>;
  getObjectForEdit: () => Record<string, any>;
}
