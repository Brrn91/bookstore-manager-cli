import { BookRepository } from "../repositories/BookRepository";
import { AuthorService } from "./AuthorService";
import { Book } from "../models/Book";
import { AppError } from "../utils/errors";

export class BookService {
  private repository = new BookRepository();
  private authorService = new AuthorService();

  async create(
    title: string,
    authorId: number,
    genre: string,
    publishedYear: number,
    totalCopies: number,
  ) {
    await this.authorService.getById(authorId);
    const book = new Book(
      title,
      authorId,
      genre,
      publishedYear,
      totalCopies,
      totalCopies,
    );
    return await this.repository.create(book);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: number) {
    return await this.repository.findById(id);
  }

  async getById(id: number): Promise<Book> {
    const books = await this.repository.findById(id);
    if (!books) {
      throw new AppError(`Livro com id ${id} não encontrado.`);
    }
    return books;
  }

  async update(
    id: number,
    title: string,
    authorId: number,
    genre: string,
    publishedYear: number,
    totalCopies: number,
  ) {
    const existingBook = await this.getById(id);
    await this.authorService.getById(authorId);

    const book = new Book(
      title,
      authorId,
      genre,
      publishedYear,
      totalCopies,
      existingBook.availableCopies,
      id,
    );
    return await this.repository.update(id, book);
  }

  async remove(id: number) {
    await this.getById(id);
    await this.repository.remove(id);
  }
}
