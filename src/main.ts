import { testConnection } from "./database/connection";
import { authorMenu } from "./menus/authorMenu";

async function main(): Promise<void> {
  console.log("Iniciando BookStore Manager CLI");
  await testConnection();
  await authorMenu();
}

main();
