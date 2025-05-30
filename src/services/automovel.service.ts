import { Automovel } from '../models/automovel.model';
import { db } from '../database/connection';
import { AutomovelRepository } from '../repositories/automovel.repository';


export class AutomovelService {
  static async create(data: Automovel): Promise<Automovel> {
    const { placa, cor, marca } = data;


    if (!placa || !cor || !marca) {
      throw new Error('Placa, cor e marca são obrigatórios');
    }

    try{
      console.log('Verificando se já existe um automóvel com a placa:', placa);
      const exists = await AutomovelRepository.findByPlaca(placa);
      if (exists) {
        throw new Error('Já existe um automóvel com essa placa');
      }

      console.log('teste', exists)

      console.log('Criando novo automóvel com os dados:', { placa, cor, marca });
  
      return await AutomovelRepository.create(placa, cor, marca);

    }catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao criar automóvel: ${error.message}`);
      } else {
        throw new Error('Erro ao criar automóvel: erro desconhecido');
      }
    }

  }

  static async list(): Promise<Automovel[]> {
    const result = await db.query('SELECT * FROM automoveis ORDER BY id ASC');
    return result.rows;
  }

  static async getById(id: number): Promise<Automovel | null> {
    const result = await db.query('SELECT * FROM automoveis WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, data: Partial<Automovel>): Promise<Automovel> {
    const existing = await this.getById(id);
    if (!existing) throw new Error('Automóvel não encontrado');

    const { placa, cor, marca } = { ...existing, ...data };

    const query = `
      UPDATE automoveis
      SET placa = $1, cor = $2, marca = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [placa, cor, marca, id];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id: number): Promise<void> {
    const result = await db.query('DELETE FROM automoveis WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      throw new Error('Automóvel não encontrado');
    }
  }
}