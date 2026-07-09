import { ask } from "../utils/inputHelper";
import { authorMenu } from "./authorMenu";
import { bookMenu } from "./bookMenu";
import { clientMenu } from "./clientMenu";
import { loanMenu } from "./loanMenu";

export async function mainMenu(): Promise<void> {
  let running = true;

  while (running) {
    console.log(`
=============================================
   BOOKSTORE MANAGER CLI - Menu Principal
=============================================
1. Autores
2. Livros
3. Clientes
4. Empréstimos
0. Encerrar aplicação
=============================================`);
    const option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1":
        await authorMenu();
        break;
      case "2":
        await bookMenu();
        break;
      case "3":
        await clientMenu();
        break;
      case "4":
        await loanMenu();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log("\n⚠️ Opção inválida.");
    }
  }
}
