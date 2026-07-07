import { BookController } from "../controllers/BookController";
import { ask } from "../utils/inputHelper";

export async function bookMenu(): Promise<void> {
  const controller = new BookController();
  let running = true;

  while (running) {
    console.log(`
========== MENU LIVROS ==========
1. Cadastrar livro
2. Listar livros
3. Consultar livro por ID
4. Atualizar livro
5. Remover livro
0. Voltar ao menu principal
==================================`);
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
