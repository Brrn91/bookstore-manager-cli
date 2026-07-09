import { BookService } from "../services/BookService";
import { ask, askNumber } from "../utils/inputHelper";

export class BookController {
  private service = new BookService();

  async create() {
    try {
    console.log("\n--- Cadastrar Livro ---");
    const title = await ask("Título: ");
    const authorId = await askNumber("Autor(a): ");
    const genre = await ask("Gênero: ");
    const publishedYear = await askNumber("Ano de publicação: ");
    const totalCopies = await askNumber("Total de cópias: ");

      await this.service.create(
        title,
        authorId,
        genre,
        publishedYear,
        totalCopies,
      );
      console.log("\n✅ Livro cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async list() {
    console.log("\n--- Listando Livros ---");
    const listBooks = await this.service.findAll();
    for (const book of listBooks) {
      console.log(book.title);
    }
    console.log("\n✅ Livros listados com sucesso!");
  }

  async findById() {
    try {
      const id = await askNumber("ID do livro: ");
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
      const id = await askNumber("ID do livro: ");
      const title = await ask("Novo título: ");
      const idAuthor = await askNumber("Novo(a) Autor: ");
      const genre = await ask("Novo gênero: ");
      const publishedYear = await askNumber("Novo ano de publicação: ");
      const totalCopies = await askNumber("Novo total de cópias: ");

      const updateService = await this.service.update(
        id,
        title,
        idAuthor,
        genre,
        publishedYear,
        totalCopies,
      );
      console.log("\n✅ Livro atualizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async remove() {
    try {
      const id = await askNumber("ID do livro: ");
      await this.service.remove(id);

      console.log("\n✅ Livro deletado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
