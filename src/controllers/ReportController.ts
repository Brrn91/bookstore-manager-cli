import { ReportService } from "../services/ReportService";

export class ReportController {
  private service = new ReportService();

  async availableBooks() {
    try {
      console.log("\n--- Relatório: Livros disponíveis ---");
      const rows = await this.service.availableBooks();
      for (const row of rows) {
        console.log(
          `${row.title} | Autor: ${row.authorName} | Disponíveis: ${row.availableCopies}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async loanedBooks() {
    try {
      console.log("\n--- Relatório: Livros emprestados ---");
      const rows = await this.service.loanedBooks();
      for (const row of rows) {
        console.log(
          `Nome do cliente: ${row.clientName} | Data do empréstimo: ${row.loanDate} | Data de devolução: ${row.dueDate}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async booksByAuthor() {
    try {
      console.log("\n--- Relatório: Livros de autores ---");
      const rows = await this.service.booksByAuthor();
      for (const row of rows) {
        console.log(
          `Autor: ${row.authorName} | Total de livros: ${row.totalBooks}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async loansPerBook() {
    try {
      console.log("\n--- Relatório: Empréstimo por livro ---");
      const rows = await this.service.loansPerBook();
      for (const row of rows) {
        console.log(
          `Título: ${row.title} | Total de empréstimos: ${row.totalLoans}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async clientsWithActiveLoans() {
    try {
      console.log("\n--- Relatório: Clientes com empréstimos ativos ---");
      const rows = await this.service.clientsWithActiveLoans();
      for (const row of rows) {
        console.log(
          `Nome do cliente: ${row.clientName} | Empréstimos: ${row.activeLoans}`,
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
