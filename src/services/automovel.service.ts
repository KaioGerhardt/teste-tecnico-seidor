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
      const exists = await AutomovelRepository.findByPlaca(placa);
      if (exists) {
        throw new Error('Já existe um automóvel com essa placa');
      }

      return await AutomovelRepository.create(placa, cor, marca);

    }catch (error) {
      throw new Error(`Erro ao criar automóvel: ${(error as Error).message}`);
    }

  }

  static async list(cor?: string, marca?: string): Promise<Automovel[]> {
    try {
      return await AutomovelRepository.findAll(cor, marca);

    } catch (error) {
      throw new Error(`Erro ao listar automóveis: ${(error as Error).message}`);
    }
  }

  static async getById(id: number): Promise<Automovel | null> {
    try {
      const automovel = await AutomovelRepository.findById(id);
      return automovel;
      
    } catch (error) {
      throw new Error(`Erro ao buscar automóvel: ${(error as Error).message}`);
    }
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
    try{
      const automovel = await this.getById(id);
      if (!automovel) {
        throw new Error('Automóvel não encontrado');
      }

      await AutomovelRepository.delete(id);
    }catch(error) {
      throw new Error(`Erro ao deletar automóvel: ${(error as Error).message}`);
    }
  }
}