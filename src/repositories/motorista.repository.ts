import { Motorista } from '../models/motorista.model';

let motoristas : Motorista[] = [];
let id = 1;

export class MotoristaRepository {

  static async create(nome: string) {

    const novoMotorista = {id: id++, nome};
    motoristas.push(novoMotorista);

    return novoMotorista;
  }

  static async findAll(nome?: string) {

    if(nome) {
      return this.findByName(nome);
    }

    return motoristas;
  }
    
  static async findById(id: number) {
    return motoristas.find(a => a.id === id) || null;
  }

  static async findByName(nome: string) {
    return motoristas.filter(a => a.nome === nome);
  }

  static async update(id: number, nome: string) {
    const motorista = motoristas.find(a => a.id === id);
    if (!motorista) {
      return null;
    }
    
    motorista.nome = nome;
    return motorista;
  }

  static async delete(id: number) {
    const index = motoristas.findIndex(a => a.id === id);

    if (index !== -1) {
      const [removed] = motoristas.splice(index, 1);
      return removed;
    }
    return null;
  }
}

// Apenas para testes
export const __test_only__ = {
  reset: () => {
    motoristas.length = 0;
    id = 1;
  }
};