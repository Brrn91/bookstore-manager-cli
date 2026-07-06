import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

export async function ask(question: string): Promise<string> {
  const answer = await rl.question(question);
  return answer.trim();
}

export async function askNumber(question: string): Promise<number> {
  const answer = await ask(question);
  const value = Number(answer);
  if (Number.isNaN(value)) {
    throw new Error("Valor numérico inválido. Digite apenas números.");
  }
  return value;
}
