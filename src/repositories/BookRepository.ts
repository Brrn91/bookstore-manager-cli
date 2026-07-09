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

  async findById(id: number): Promise<Book | undefined> {
    const result = await pool.query(
      `SELECT id, title, author_id AS "authorId", genre, published_year AS "publishedYear",
            total_copies AS "totalCopies", available_copies AS "availableCopies"
     FROM books WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async update(id: number, books: Book): Promise<void> {
    await pool.query(
      "UPDATE books SET title = $1, author_id = $2, genre = $3, published_year = $4, total_copies = $5, available_copies = $6 WHERE id = $7",
      [
        books.title,
        books.authorId,
        books.genre,
        books.publishedYear,
        books.totalCopies,
        books.availableCopies,
        id,
      ],
    );
  }

  async remove(id: number): Promise<void> {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
  }

  async decrementAvailableCopies(id: number): Promise<void> {
    await pool.query(
      "UPDATE books SET available_copies = available_copies - 1 WHERE id = $1",
      [id],
    );
  }

  async incrementAvailableCopies(id: number): Promise<void> {
    await pool.query(
      "UPDATE books SET available_copies = available_copies + 1 WHERE id = $1",
      [id],
    );
  }
}
