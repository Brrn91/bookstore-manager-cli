import { ReportRepository } from "../repositories/ReportRepository";

export class ReportService {
  private repository = new ReportRepository();

  async availableBooks() {
    return await this.repository.availableBooks();
  }

  async loanedBooks() {
    return await this.repository.loanedBooks();
  }

  async booksByAuthor() {
    return await this.repository.booksByAuthor();
  }

  async loansPerBook() {
    return await this.repository.loansPerBook();
  }

  async clientsWithActiveLoans() {
    return await this.repository.clientsWithActiveLoans();
  }
}
