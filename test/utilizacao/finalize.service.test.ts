import { UtilizacaoService } from '../../src/services/utilizacao.service';
import { __test_only__ as utilizacaoTestRepo } from '../../src/repositories/utilizacao.repository';
import { __test_only__ as motoristaTestRepo } from '../../src/repositories/motorista.repository';
import { __test_only__ as automovelTestRepo } from '../../src/repositories/automovel.repository';
import { MotoristaService } from '../../src/services/motorista.service';
import { AutomovelService } from '../../src/services/automovel.service';

const resetRepositories = () => {
  utilizacaoTestRepo.reset();
  motoristaTestRepo.reset();
  automovelTestRepo.reset();
};

describe('UtilizacaoService.finalize', () => {
  beforeEach(() => {
    resetRepositories();
  });

  it('deve finalizar uma utilização ativa com sucesso e registrar a data de finalização', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Fernanda Costa' });
    const automovel = await AutomovelService.create({
      id: 0,
      placa: 'JKL5678',
      cor: 'Branco',
      marca: 'Renault'
    });

    const utilizacao = await UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: automovel.id!,
      motivo: 'Viagem técnica',
      dataInicio: new Date(),
      dataFim: null
    });

    const finalizada = await UtilizacaoService.finalize(motorista.id!);

    expect(finalizada).toMatchObject({
        idMotorista: utilizacao.idMotorista,
        idAutomovel: utilizacao.idAutomovel,
        motivo: utilizacao.motivo,
        dataInicio: utilizacao.dataInicio
    });
    expect(finalizada?.dataFim).toBeInstanceOf(Date);
  });

  it('deve lançar erro ao tentar finalizar uma utilização inexistente', async () => {
    await expect(UtilizacaoService.finalize(999)).rejects.toThrow('Utilização não encontrada para o motorista informado');
  });

  it('deve lançar erro ao tentar finalizar uma utilização que já foi finalizada', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Ricardo Gomes' });
    const automovel = await AutomovelService.create({
      id: 0,
      placa: 'YUI9876',
      cor: 'Preto',
      marca: 'Peugeot'
    });

    await UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: automovel.id!,
      motivo: 'Entrega expressa',
      dataInicio: new Date(),
      dataFim: null
    });

    // Finaliza pela primeira vez
    await UtilizacaoService.finalize(motorista.id!);

    // Segunda tentativa deve lançar erro
    await expect(UtilizacaoService.finalize(motorista.id!)).rejects.toThrow('A utilização já foi finalizada');
  });
});