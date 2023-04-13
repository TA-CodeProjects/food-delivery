export class RegisterModel {
    public name: string
    public email: string
    public password: string
    public password2?: string

    public constructor(name: string, email: string, password: string, password2?: string) {
        this.name = name || ''
        this.email = email || ''
        this.password = password || ''
        this.password2 = password2 || ''
    }
}


export class LoginModel {
  public id: string;
  public name: string
  public email: string;
  public isAdmin: Boolean;
  public token: string;

  constructor(id: string, name: string, email: string, isAdmin: boolean, token: string) {
    this.id = id
    this.name = name
    this.email = email
    this.isAdmin = isAdmin
    this.token = token
  }
}

export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(email?: string, password?: string) {
    this.email = email || "";
    this.password = password || "";
  }
}