import { AuthorRepository } from "../repositories/AuthorRepository";
import { Author } from "../models/Author";

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
}
