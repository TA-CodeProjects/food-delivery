export class UserModel {
  public id: string;
  public name: string;
  public email: string;

  public constructor(id: string, name: string, email: string) {
    this.id = id || "";
    this.name = name || "";
    this.email = email || "";
  }
}