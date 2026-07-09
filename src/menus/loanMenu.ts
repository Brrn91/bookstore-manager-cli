import { LoanController } from "../controllers/LoanController";
import { ask } from "../utils/inputHelper";

export async function loanMenu(): Promise<void> {
  const controller = new LoanController();
  let running = true;

  while (running) {
    console.log(`
========== MENU EMPRÉSTIMOS ==========
1. Registrar empréstimo
2. Registrar devolução
3. Listar empréstimos
0. Voltar ao menu principal
==================================`);
    const option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1":
        await controller.create();
        break;
      case "2":
        await controller.registerReturn();
        break;
      case "3":
        await controller.list();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log("\n⚠️ Opção inválida.");
    }
  }
}
