import { pool } from "../database/connection";

export class ReportRepository {
  async availableBooks(): Promise<any[]> {
    const result = await pool.query(`
        SELECT b.id, b.title, a.name AS "authorName", b.available_copies AS "availableCopies"
        FROM books b
        INNER JOIN authors a ON a.id = b.author_id
        WHERE b.available_copies > 0
        ORDER BY b.title ASC`);
    return result.rows;
  }

  async loanedBooks(): Promise<any[]> {
    const result = await pool.query(`
        SELECT b.title, c.name AS "clientName", l.loan_date AS "loanDate", l.due_date AS "dueDate"
        FROM loans l
        INNER JOIN books b ON b.id = l.book_id
        INNER JOIN clients c ON c.id = l.client_id
        WHERE l.status = 'ATIVO'
        ORDER BY l.due_date ASC`);
    return result.rows;
  }

  async booksByAuthor(): Promise<any[]> {
    const result = await pool.query(`
        SELECT a.name AS "authorName", COUNT(b.id) AS "totalBooks"
        FROM authors a
        LEFT JOIN books b ON b.author_id = a.id
        GROUP BY a.name
        ORDER BY "totalBooks" DESC, a.name ASC`);
    return result.rows;
  }

  async loansPerBook(): Promise<any[]> {
    const result = await pool.query(`
        SELECT b.title, COUNT(l.id) AS "totalLoans"
        FROM books b
        LEFT JOIN loans l ON l.book_id = b.id
        GROUP BY b.title
        ORDER BY "totalLoans" DESC
        LIMIT 10`);
    return result.rows;
  }

  async clientsWithActiveLoans(): Promise<any[]> {
    const result = await pool.query(`
      SELECT c.name AS "clientName", c.email, COUNT(l.id) AS "activeLoans"
      FROM clients c
      INNER JOIN loans l ON l.client_id = c.id
      WHERE l.status = 'ATIVO'
      GROUP BY c.name, c.email
      ORDER BY "activeLoans" DESC`);
    return result.rows;
  }
}
