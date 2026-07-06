import { AuthorService } from "../services/AuthorService";
import { ask } from "../utils/inputHelper";

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
}
