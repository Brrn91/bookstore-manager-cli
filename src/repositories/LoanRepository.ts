import { pool } from "../database/connection";
import { Loan } from "../models/Loan";

export class LoanRepository {
  async create(loan: Loan) {
    await pool.query(
      "INSERT INTO loans (book_id, client_id, due_date) VALUES ($1, $2, $3)",
      [loan.bookId, loan.clientId, loan.dueDate],
    );
  }

  async findAll(): Promise<any[]> {
    const result = await pool.query(`
      SELECT l.id, b.title AS "bookTitle", c.name AS "clientName",
             l.loan_date AS "loanDate", l.due_date AS "dueDate",
             l.return_date AS "returnDate", l.status
      FROM loans l
      INNER JOIN books b ON b.id = l.book_id
      INNER JOIN clients c ON c.id = l.client_id
      ORDER BY l.loan_date DESC`);
    return result.rows;
  }

  async findById(id: number): Promise<Loan | undefined> {
    const result = await pool.query("SELECT * FROM loans WHERE id = $1", [id]);
    return result.rows[0];
  }

  async registerReturn(id: number): Promise<void> {
    await pool.query(
      "UPDATE loans SET status = 'DEVOLVIDO', return_date = NOW() WHERE id = $1",
      [id],
    );
  }
}
