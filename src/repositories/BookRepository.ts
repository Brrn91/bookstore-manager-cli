import { pool } from "../database/connection";
import { Book } from "../models/Book";

export class BookRepository {
  async create(book: Book) {
    await pool.query(
      "INSERT INTO books (title, author_id, genre, published_year, total_copies, available_copies) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        book.title,
        book.authorId,
        book.genre,
        book.publishedYear,
        book.totalCopies,
        book.availableCopies,
      ],
    );
  }

  async findAll(): Promise<any[]> {
    const result = await pool.query(`
        SELECT b.id, b.title, a.name AS "authorName", b.genre, b.available_copies
        FROM books b
        INNER JOIN authors a ON a.id = b.author_id
        ORDER BY b.title ASC`);
    return result.rows;
  }
}
