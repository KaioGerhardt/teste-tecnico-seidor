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

  static async findAll(cor?: string, marca?: string) {
    if (cor && marca) {
      return this.findAllByCorAndMarca(cor, marca);
    }

    if(cor) {
      return this.findAllByCor(cor);
    }

    if(marca) {
      return this.findAllByMarca(marca);
    }

    return automoveis;
  }

  static async findAllByCor(cor: string) {
    return automoveis.filter(a => a.cor === cor);
  }

  static async findAllByMarca(marca: string) {
    return automoveis.filter(a => a.marca === marca);
  }

  static async findAllByCorAndMarca(cor: string, marca: string) {
    return automoveis.filter(a => a.cor === cor && a.marca === marca);
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