import { AuthorController } from "../controllers/AuthorController";
import { ask } from "../utils/inputHelper";

export async function authorMenu(): Promise<void> {
  const controller = new AuthorController();
  let running = true;

  while (running) {
    console.log(`
========== MENU AUTORES ==========
1. Cadastrar autor
2. Listar autores
3. Consultar autor por ID
4. Atualizar autor
5. Remover autor
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
