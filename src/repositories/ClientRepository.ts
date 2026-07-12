import { pool } from "../database/connection";
import { Client } from "../models/Client";

export class ClientRepository {
  async create(client: Client) {
    await pool.query(
      "INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3)",
      [client.name, client.email, client.phone],
    );
  }

  async findAll(): Promise<Client[]> {
    const result = await pool.query("SELECT * FROM clients ORDER BY name ASC");
    return result.rows;
  }

  async findById(id: number): Promise<Client | undefined> {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async update(id: number, client: Client): Promise<void> {
    await pool.query(
      "UPDATE clients SET name = $1, email = $2, phone = $3 WHERE id = $4",
      [client.name, client.email, client.phone, id],
    );
  }

  async remove(id: number): Promise<void> {
    await pool.query("DELETE FROM clients WHERE id = $1", [id]);
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const result = await pool.query("SELECT * FROM clients WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  async hasLoans(clientId: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM loans WHERE client_id = $1) AS "exists"',
      [clientId],
    );
    return result.rows[0].exists;
  }
}
