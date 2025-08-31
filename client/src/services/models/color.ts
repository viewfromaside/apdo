import { BaseEntity, IBase } from "@/services";

export interface IColor extends IBase {
  backgroundColor: string;
  accentColor: string;
  neutralColor: string;
  userId: string;
}

export class Color extends BaseEntity implements IColor {
  public backgroundColor: string;
  public accentColor: string;
  public neutralColor: string;
  public userId: string;

  constructor(obj: Partial<Record<string, any>>) {
    super(obj);
    this.backgroundColor = obj.background_color;
    this.accentColor = obj.accent_color;
    this.neutralColor = obj.neutral_color;
    this.userId = obj.userId;
  }

  getObjectForEdit(): Record<string, any> {
    return {
      background_color: this.backgroundColor,
      accent_color: this.accentColor,
      neutral_color: this.neutralColor,
      user_id: this.userId,
    };
  }
}
