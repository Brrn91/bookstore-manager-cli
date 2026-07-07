import { AuthorService } from "../services/AuthorService";
import { ask } from "../utils/inputHelper";
import { askNumber } from "../utils/inputHelper";

export class AuthorController {
  private service = new AuthorService();

  async create() {
    console.log("\n--- Cadastrar Autor ---");
    const name = await ask("Nome: ");
    const nationality = await ask("Nacionalidade: ");
    const birthDate = await ask("Data de nascimento (AAAA-MM-DD): ");

    await this.service.create(name, nationality, birthDate);
    console.log("\n✅ Autor cadastrado com sucesso!");
  }

  async list() {
    console.log("\n--- Listando Autores ---");
    const listAuthors = await this.service.findAll();
    for (const author of listAuthors) {
      console.log(author.name);
    }
    console.log("\n✅ Autores listados com sucesso!");
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
}
