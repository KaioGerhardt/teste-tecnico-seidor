import { Motorista } from '../models/motorista.model';
import { MotoristaRepository } from '../repositories/motorista.repository';


export class MotoristaService {
  static async create(data: Motorista): Promise<Motorista> {
    const { nome } = data;

    if (!nome) {
      throw new Error('O nome do motorista é obrigatório');
    }

    try{
      const exists = await MotoristaRepository.findByName(nome);
      if (exists && exists.length > 0) {
        throw new Error('Já existe um motorista com esse nome');
      }

      return await MotoristaRepository.create(nome);
    }catch (error) {
      throw new Error(`Erro ao criar motorista: ${(error as Error).message}`);
    }
  }

  static async list(nome?: string): Promise<Motorista[]> {
    try {
      return await MotoristaRepository.findAll(nome);
    } catch (error) {
      throw new Error(`Erro ao listar motoristas: ${(error as Error).message}`);
    }
  }

  static async getById(id: number): Promise<Motorista | null> {
    try {
      return await MotoristaRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar motorista: ${(error as Error).message}`);
    }
  }

  static async update(id: number, data: Partial<Motorista>): Promise<Motorista> {
    try{
        const existing = await this.getById(id);
        if (!existing) {
            throw new Error('Motorista não encontrado');
        }

        // substitui os dados existentes do motorista pelos novos vindo da requisição
        const updatedMotorista = { ...existing, ...data };

        const { nome } = updatedMotorista;
        if (!nome) {
        throw new Error('O nome do motorista é obrigatório');
        }

        const updated = await MotoristaRepository.update(id, nome);
        if (!updated) {
        throw new Error('Erro ao atualizar motorista');
        }

        return updated;
    }catch (error) {
        throw new Error(`Erro ao buscar automóvel: ${(error as Error).message}`);
    }
  }

  static async delete(id: number): Promise<void> {
    try{
        const motorista = await this.getById(id);
        if (!motorista) {
        throw new Error('Motorista não encontrado');
        }

        await MotoristaRepository.delete(id);
    }catch(error) {
        throw new Error(`Erro ao deletar motorista: ${(error as Error).message}`);
    }
  }
}