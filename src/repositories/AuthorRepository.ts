import { pool } from "../database/connection";
import { Author } from "../models/Author";

export class AuthorRepository {
  async create(author: Author) {
    await pool.query(
      "INSERT INTO authors (name, nationality, birth_date) VALUES ($1, $2, $3)",
      [author.name, author.nationality, author.birthDate],
    );
  }

  async findAll(): Promise<Author[]> {
    const result = await pool.query("SELECT * FROM authors ORDER BY name ASC");
    return result.rows;
  }

  async findById(id: number): Promise<Author | undefined> {
    const result = await pool.query("SELECT * FROM authors WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async update(id: number, author: Author): Promise<void> {
    await pool.query(
      "UPDATE authors SET name = $1, nationality = $2, birth_date = $3 WHERE id = $4",
      [author.name, author.nationality, author.birthDate, id],
    );
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM authors WHERE id = $1", [id]);
  }
}
