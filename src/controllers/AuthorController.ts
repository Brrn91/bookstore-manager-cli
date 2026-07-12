import { AuthorService } from "../services/AuthorService";
import { ask } from "../utils/inputHelper";
import { askNumber } from "../utils/inputHelper";

export class AuthorController {
  private service = new AuthorService();

  async create() {
    try {
      console.log("\n--- Cadastrar Autor ---");
      const name = await ask("Nome: ");
      const nationality = await ask("Nacionalidade: ");
      const birthDate = await ask("Data de nascimento (AAAA-MM-DD): ");
      await this.service.create(name, nationality, birthDate);
      console.log("\n✅ Autor cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async list() {
    try {
      console.log("\n--- Listando Autores ---");
      const listAuthors = await this.service.findAll();
      for (const author of listAuthors) {
        console.log(author.name);
      }
      console.log("\n✅ Autores listados com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async findById() {
    try {
      const id = await askNumber("ID do autor: ");
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
      const id = await askNumber("ID do autor: ");
      const name = await ask("Novo nome: ");
      const nationality = await ask("Nova nacionalidade: ");
      const birthDate = await ask("Nova data de nascimento (AAAA-MM-DD): ");

      const updateService = await this.service.update(
        id,
        name,
        nationality,
        birthDate,
      );
      console.log("\n✅ Autor atualizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async remove() {
    try {
      const id = await askNumber("ID do autor: ");
      await this.service.remove(id);

      console.log("\n✅ Autor deletado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
