import { LoanService } from "../services/LoanService";
import { ask, askNumber } from "../utils/inputHelper";

export class LoanController {
  private service = new LoanService();

  async create() {
    try {
      console.log("\n--- Cadastrar Empréstimo ---");
      const bookId = await askNumber("ID do livro: ");
      const clientId = await askNumber("ID do cliente: ");
      const duoDate = await ask("Data prevista de devolução: ");

      await this.service.create(bookId, clientId, duoDate);
      console.log("\n✅ Empréstimo cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async list() {
    console.log("\n--- Listando Empréstimos ---");
    const listLoans = await this.service.findAll();
    for (const loan of listLoans) {
      console.log(`${loan.bookTitle} - ${loan.clientName} - ${loan.loanDate}`);
    }
    console.log("\n✅ Empréstimos listados com sucesso!");
  }

  async registerReturn() {
    try {
      const id = await askNumber("ID do Empréstimo: ");
      const result = await this.service.registerReturn(id);
      console.log("\n✅ Devolução registrada com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
