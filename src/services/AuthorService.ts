import { AuthorRepository } from "../repositories/AuthorRepository";
import { Author } from "../models/Author";
import { AppError } from "../utils/errors";

export class AuthorService {
  private repository = new AuthorRepository();

  async create(name: string, nationality: string, birthDate: string) {
    const author = new Author(name, nationality, birthDate);
    return await this.repository.create(author);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: number) {
    return await this.repository.findById(id);
  }

  async getById(id: number): Promise<Author> {
    const author = await this.repository.findById(id);
    if (!author) {
      throw new AppError(`Autor com id ${id} não encontrado.`);
    }
    return author;
  }

  async update(
    id: number,
    name: string,
    nationality: string,
    birthDate: string,
  ) {
    await this.getById(id);
    const author = new Author(name, nationality, birthDate);
    return await this.repository.update(id, author);
  }

  async remove(id: number): Promise<void> {
    await this.getById(id);

    const hasBooks = await this.repository.hasBooks(id);
    if (hasBooks) {
      throw new AppError(
        "Não é possível remover este autor, pois há livros cadastrados vinculados a ele.",
      );
    }

    await this.repository.remove(id);
  }
}
