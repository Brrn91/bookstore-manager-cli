import { testConnection } from "./database/connection";

async function main(): Promise<void> {
    console.log('Iniciando BookStore Manager CLI');
    await testConnection();
}

main();
