export class Client {
  name: string;
  email: string;
  phone: string;
  id?: number;

  constructor(name: string, email: string, phone: string, id?: number) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = id;
  }
}
