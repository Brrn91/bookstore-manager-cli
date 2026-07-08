import { ClientController } from "../controllers/ClientController";
import { ask } from "../utils/inputHelper";

export async function clientMenu(): Promise<void> {
  const controller = new ClientController();
  let running = true;

  while (running) {
    console.log(`
========== MENU CLIENTES ==========
1. Cadastrar cliente
2. Listar clientes
3. Consultar cliente por ID
4. Atualizar cliente
5. Remover cliente
0. Voltar ao menu principal
===================================`);
    const option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1":
        await controller.create();
        break;
      case "2":
        await controller.list();
        break;
      case "3":
        await controller.findById();
        break;
      case "4":
        await controller.update();
        break;
      case "5":
        await controller.remove();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log("\n⚠️ Opção inválida.");
    }
  }
}
