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
}
