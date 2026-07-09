import { LoanRepository } from "../repositories/LoanRepository";
import { BookRepository } from "../repositories/BookRepository";
import { BookService } from "./BookService";
import { ClientService } from "./ClientService";
import { Loan } from "../models/Loan";
import { AppError } from "../utils/errors";

export class LoanService {
  private repository = new LoanRepository();
  private bookRepository = new BookRepository();
  private bookService = new BookService();
  private clientService = new ClientService();

  async create(bookId: number, clientId: number, dueDate: string) {
    const book = await this.bookService.getById(bookId);
    const client = await this.clientService.getById(clientId);
    if (book.availableCopies <= 0) {
      throw new AppError("livro sem exemplares disponíveis");
    }

    const loan = new Loan(bookId, clientId, dueDate);
    const resultado = await this.repository.create(loan);
    await this.bookRepository.decrementAvailableCopies(bookId);
    return resultado;
  }
}
