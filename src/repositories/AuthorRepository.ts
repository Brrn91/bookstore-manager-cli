import { pool } from "../database/connection";
import { Author } from "../models/Author";

export class AuthorRepository {
  async create(author: Author) {
    await pool.query(
      "INSERT INTO authors (name, nationality, birth_date) VALUES ($1, $2, $3)",
      [author.name, author.nationality, author.birthDate],
    );
  }
}
