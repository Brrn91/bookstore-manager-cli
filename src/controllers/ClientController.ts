import { ClientService } from "../services/ClientService";
import { ask, askNumber } from "../utils/inputHelper";

export class ClientController {
  private service = new ClientService();

  async create() {
    try {
      console.log("\n--- Cadastrar Cliente ---");
      const name = await ask("Nome: ");
      const email = await ask("E-mail: ");
      const phone = await ask("Telefone: ");

      await this.service.create(name, email, phone);
      console.log("\n✅ Cliente cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async list() {
    console.log("\n--- Listando Clientes ---");
    const listClients = await this.service.findAll();
    for (const client of listClients) {
      console.log(client.name);
    }
    console.log("\n✅ Clientes listados com sucesso!");
  }

  async findById() {
    try {
      const id = await askNumber("ID do cliente: ");
      const result = await this.service.getById(id);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async update() {
    try {
      const id = await askNumber("ID do cliente: ");
      const name = await ask("Novo nome: ");
      const email = await ask("Novo e-mail: ");
      const phone = await ask("Novo telefone: ");
      const updateService = await this.service.update(id, name, email, phone);
      console.log("\n✅ Cliente atualizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async remove() {
    try {
      const id = await askNumber("ID do cliente: ");
      await this.service.remove(id);

      console.log("\n✅ Cliente deletado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
