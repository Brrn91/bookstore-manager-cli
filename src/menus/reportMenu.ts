import { ReportController } from "../controllers/ReportController";
import { ask } from "../utils/inputHelper";

export async function reportMenu(): Promise<void> {
  const controller = new ReportController();
  let running = true;

  while (running) {
    console.log(`
========== MENU RELATÓRIOS ==========
1. Livros disponíveis
2. Livros emprestados
3. Livros cadastrados por autor
4. Quantidade de empréstimos por livro
5. Clientes com empréstimos ativos
0. Voltar ao menu principal
===================================`);
    const option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1":
        await controller.availableBooks();
        break;
      case "2":
        await controller.loanedBooks();
        break;
      case "3":
        await controller.booksByAuthor();
        break;
      case "4":
        await controller.loansPerBook();
        break;
      case "5":
        await controller.clientsWithActiveLoans();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log("\n⚠️ Opção inválida.");
    }
  }
}
