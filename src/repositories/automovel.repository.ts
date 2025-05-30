import { db } from '../database/connection';

export class AutomovelRepository {
  static async create(placa: string, cor: string, marca: string) {
    const query = `
      INSERT INTO automoveis (placa, cor, marca)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await db.query(query, [placa, cor, marca]);
    return result.rows[0];
  }

  static async findByPlaca(placa: string) {
    const query = `
      SELECT * FROM automoveis WHERE placa = $1;
    `;
    const result = await db.query(query, [placa]);
    return result.rows[0] || null;
  }

  static async findAll() {
    const query = `
      SELECT * FROM automoveis ORDER BY id ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async findById(id: number) {
    const query = `
      SELECT * FROM automoveis WHERE id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, placa: string, cor: string, marca: string) {
    const query = `
      UPDATE automoveis
      SET placa = $1, cor = $2, marca = $3
      WHERE id = $4
      RETURNING *;
    `;
    const result = await db.query(query, [placa, cor, marca, id]);
    return result.rows[0];
  }

  static async delete(id: number) {
    const query = `
      DELETE FROM automoveis WHERE id = $1;
    `;
    return await db.query(query, [id]);
  }
}