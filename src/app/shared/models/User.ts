class User {
  id: string;
  fullName: string;
  email: string;
  password: string;

  constructor(fullName: string, email: string, password: string) {
    this.id = crypto.randomUUID();
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
