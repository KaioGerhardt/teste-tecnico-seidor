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

describe('UtilizacaoService.list', () => {
  beforeEach(() => {
    resetRepositories();
  });

  it('deve listar registros de utilização com nome do motorista e dados do automóvel', async () => {
    const motorista1 = await MotoristaService.create({ id: 0, nome: 'Carlos Silva' });
    const automovel1 = await AutomovelService.create({
      id: 0,
      placa: 'AAA1111',
      cor: 'Vermelho',
      marca: 'Fiat'
    });

    const motorista2 = await MotoristaService.create({ id: 0, nome: 'Luciana Andrade' });
    const automovel2 = await AutomovelService.create({
      id: 0,
      placa: 'BBB2222',
      cor: 'Azul',
      marca: 'Ford'
    });

    await UtilizacaoService.create({
      idMotorista: motorista1.id!,
      idAutomovel: automovel1.id!,
      motivo: 'Serviço externo',
      dataInicio: new Date(),
      dataFim: null
    });

    await UtilizacaoService.create({
      idMotorista: motorista2.id!,
      idAutomovel: automovel2.id!,
      motivo: 'Visita técnica',
      dataInicio: new Date(),
      dataFim: null
    });

    const resultado = await UtilizacaoService.list();

    expect(resultado).toHaveLength(2);

    expect(resultado).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          motorista: 'Carlos Silva',
          automovel: expect.objectContaining({
            placa: 'AAA1111',
            cor: 'Vermelho',
            marca: 'Fiat'
          })
        }),
        expect.objectContaining({
          motorista: 'Luciana Andrade',
          automovel: expect.objectContaining({
            placa: 'BBB2222',
            cor: 'Azul',
            marca: 'Ford'
          })
        })
      ])
    );
  });

  it('deve retornar lista vazia se não houver utilizações cadastradas', async () => {
    const resultado = await UtilizacaoService.list();
    expect(resultado).toEqual([]);
  });
});