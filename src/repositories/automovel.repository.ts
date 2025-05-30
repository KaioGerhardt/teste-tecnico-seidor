import { Automovel } from '../models/automovel.model';

let automoveis : Automovel[] = [];
let id = 1;

export class AutomovelRepository {
  static async create(placa: string, cor: string, marca: string) {

    const novoAutomovel = {id: id++, placa, cor, marca};
    automoveis.push(novoAutomovel);

    return novoAutomovel;
  }

  static async findByPlaca(placa: string) {
    return automoveis.find(a => a.placa === placa) || null;
  }

  static async findAll() {
    return automoveis;
  }

  static async findById(id: number) {
    return automoveis.find(a => a.id === id) || null;
  }

  static async update(id: number, placa: string, cor: string, marca: string) {
    const automovel = automoveis.find(a => a.id === id);
    if (!automovel) {
      return null;
    }
    
    automovel.placa = placa;
    automovel.cor = cor;
    automovel.marca = marca;
    return automovel;
  }

  static async delete(id: number) {
    const index = automoveis.findIndex(a => a.id === id);
    
    if (index !== -1) {
      const [removed] = automoveis.splice(index, 1);
      return removed;
    }
    return null;
  }
}