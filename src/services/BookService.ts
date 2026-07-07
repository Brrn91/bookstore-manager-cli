import { BookRepository } from '../repositories/BookRepository';
import { AuthorService } from './AuthorService';
import { Book } from '../models/Book';
import { availableMemory } from 'node:process';

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
    const book = new Book(title, authorId, genre, publishedYear, totalCopies, totalCopies);
    return await this.repository.create(book);
  }
}
