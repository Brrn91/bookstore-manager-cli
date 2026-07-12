import { AppError } from "./errors";

export function validateDateFormat(date: string, fieldName: string): void {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new AppError(
      `O campo "${fieldName}" deve estar no formato AAAA-MM-DD.`,
    );
  }
}
