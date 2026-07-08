import { pool } from "../database/connection";
import { Loan } from "../models/Loan";

export class LoanRepository {
  async create(loan: Loan) {
    await pool.query(
      "INSERT INTO loans (book_id, client_id, due_date) VALUES ($1, $2, $3)",
      [loan.bookId, loan.clientId, loan.dueDate],
    );
  }
}
