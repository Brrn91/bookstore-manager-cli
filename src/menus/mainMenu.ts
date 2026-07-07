import { ask } from "../utils/inputHelper";
import { authorMenu } from "./authorMenu";
import { bookMenu } from "./bookMenu";

export async function mainMenu(): Promise<void> {
  let running = true;

  while (running) {
    console.log(`
=============================================
   BOOKSTORE MANAGER CLI - Menu Principal
=============================================
1. Autores
2. Livros
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
      case "0":
        running = false;
        break;
      default:
        console.log("\n⚠️ Opção inválida.");
    }
  }
}
