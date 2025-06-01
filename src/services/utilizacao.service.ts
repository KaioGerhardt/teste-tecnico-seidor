import { Utilizacao } from '../models/utilizacao.model';
import { UtilizacaoRepository } from '../repositories/utilizacao.repository';
import { AutomovelRepository } from '../repositories/automovel.repository';
import { MotoristaRepository } from '../repositories/motorista.repository';


export class UtilizacaoService {
  static async create(data: Utilizacao): Promise<Utilizacao> {
    try{
      const { idMotorista, idAutomovel, motivo } = data;

      if (!idMotorista || !idAutomovel) {
        throw new Error('O id do motorista e do automóvel são obrigatórios');
      }

      // Verifica se o automóvel existe
      const automovel = await AutomovelRepository.findById(idAutomovel);
      if (!automovel) {
        throw new Error('Automóvel não encontrado');
      }

      // Verifica se o motorista existe
      const motorista = await MotoristaRepository.findById(idMotorista);
      if (!motorista) {
        throw new Error('Motorista não encontrado');
      }

      // verifica se o automovel já está em utilização, se estiver lança um erro
      const automovelEmUtilizacao = await this.automovelEmUtilizacao(idAutomovel);
      if(automovelEmUtilizacao) {
        throw new Error('O automóvel já está em utilização');
      }

      // verifica se o motorista já está utilizando algum automóvel, se estiver lança um erro
      const motoristaEmUtilizacao = await this.motoristaEmUtilizacao(idMotorista);
      if(motoristaEmUtilizacao) {
        throw new Error('O motorista já está utilizando algum automóvel');
      }

      return await UtilizacaoRepository.create(idMotorista, idAutomovel, motivo);
    }catch (error) {
      throw new Error(`Erro ao criar utilização: ${(error as Error).message}`);
    }
  }

  // finaliza uma utilização de um automóvel por um motorista, utilizando o id do motorista
  static async finalize(idMotorista: number): Promise<Utilizacao | undefined> {
    try {
      let utilizacao = await UtilizacaoRepository.findByIdMotorista(idMotorista);

      if (!utilizacao) {
        throw new Error('Utilização não encontrada para o motorista informado');
      }

      return await UtilizacaoRepository.finalize(utilizacao);
    }catch (error) {
      throw new Error(`Erro ao finalizar utilização: ${(error as Error).message}`);
    }
  }

  // busca todas as utilizações com base no id do automóvel
  // se tiver alguma utilização sem dataFim, significa que o automóvel está em utilização ainda
  static async automovelEmUtilizacao(idAutomovel: number): Promise<boolean> {
    try {
      const utilizacoes = await UtilizacaoRepository.findByIdAutomovel(idAutomovel);
      let utilizando = utilizacoes.some(utilizacao => utilizacao.idAutomovel === idAutomovel && !utilizacao.dataFim);

      return utilizando ? true : false;
    } catch (error) {
      throw new Error(`Erro ao verificar utilização do automóvel: ${(error as Error).message}`);
    }
  }

  // busca todas as utilizações com base no id do motorista
  // se não tiver nenhuma utilização, significa que o motorista não está usando algum automóvel
  // se tiver alguma utilização sem dataFim, significa que o motorista está utilizando algum automóvel
  static async motoristaEmUtilizacao(idMotorista: number): Promise<boolean> {
    try {
      const utilizacao = await UtilizacaoRepository.findByIdMotorista(idMotorista);
      
      if (!utilizacao) {
        return false;
      }

      return !utilizacao.dataFim;
    } catch (error) {
      throw new Error(`Erro ao verificar utilização do motorista: ${(error as Error).message}`);
    }
  }

  // lista todas as utilizações de automóveis
  // pega as informações do automovel e do motorista para cada utilização
  static async list(): Promise<{ automovel: any; motorista: string }[]> {
    const utilizacoes = await UtilizacaoRepository.list();

    let utilizacoesDetalhadas: { automovel: any; motorista: any }[] = [];
    for (const utilizacao of utilizacoes) {
      const automovel = await AutomovelRepository.findById(utilizacao.idAutomovel);
      const motorista = await MotoristaRepository.findById(utilizacao.idMotorista);

      if (automovel && motorista) {
        utilizacoesDetalhadas.push({
          automovel: automovel,
          motorista: motorista.nome
        });
      }
    }

    return utilizacoesDetalhadas;
  }
}