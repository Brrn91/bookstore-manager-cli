import { testConnection } from "./database/connection";
import { mainMenu } from "./menus/mainMenu";

async function main(): Promise<void> {
  console.log("Iniciando BookStore Manager CLI");
  await testConnection();
  await mainMenu();
}

main();
