import { Utilizacao } from '../models/utilizacao.model';
import { MotoristaRepository } from '../repositories/motorista.repository';

let utilizacoes : Utilizacao[] = [];
let id = 1;

export class UtilizacaoRepository {
  // cria uma nova utilização de um automóvel por um motorista
  // a data de inicio é a data atual e a data de fim é nula
  static async create(idMotorista: number, idAutomovel: number, motivo: string): Promise<Utilizacao> {

    const novaUtilizacao = {id: id++, idMotorista, idAutomovel, dataInicio: new Date(), dataFim: null, motivo} as Utilizacao;
    utilizacoes.push(novaUtilizacao);

    return novaUtilizacao;
  }

  static async finalize(utilizacao: Utilizacao): Promise<Utilizacao> {
    utilizacao.dataFim = new Date();

    return utilizacao;
  }

  static async list(): Promise<Utilizacao[]> {
    return utilizacoes;
  }

  static async findByIdMotorista(id: number): Promise<Utilizacao | undefined> {
    return utilizacoes.find(utilizacao => utilizacao.idMotorista === id);
  }

  // busca o id do motorista pelo nome e retorna as utilizacoes com base nesse id
  static async findByNomeMotorista(nome: string): Promise<Utilizacao | undefined> {
    let motorista = await MotoristaRepository.findByName(nome);
    return utilizacoes.find(utilizacao => utilizacao.idMotorista === motorista[0].id);
  }

  // busca todas as utilizações de um automóvel pelo id do automóvel
  static async findByIdAutomovel(id: number): Promise<Utilizacao[]> {
    return utilizacoes.filter(utilizacao => utilizacao.idAutomovel === id);
  }
}

// Apenas para testes
export const __test_only__ = {
  reset: () => {
    utilizacoes.length = 0;
    id = 1;
  }
};