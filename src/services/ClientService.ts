import { ClientRepository } from "../repositories/ClientRepository";
import { Client } from "../models/Client";
import { AppError } from "../utils/errors";

export class ClientService {
  private repository = new ClientRepository();

  async create(name: string, email: string, phone: string) {
    const existingClient = await this.repository.findByEmail(email);
    if (existingClient) {
      throw new AppError(
        `Já existe um cliente cadastrado com o e-mail "${email}".`,
      );
    }

    const client = new Client(name, email, phone);
    return await this.repository.create(client);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: number) {
    return await this.repository.findById(id);
  }

  async getById(id: number): Promise<Client> {
    const client = await this.repository.findById(id);
    if (!client) {
      throw new AppError(`Cliente com id ${id} não encontrado.`);
    }
    return client;
  }

  async update(id: number, name: string, email: string, phone: string) {
    await this.getById(id);
    const client = new Client(name, email, phone);
    return await this.repository.update(id, client);
  }

  async remove(id: number) {
    await this.getById(id);
    await this.repository.remove(id);
  }
}
