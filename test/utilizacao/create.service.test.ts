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

describe('UtilizacaoService.create', () => {
  beforeEach(() => {
    resetRepositories();
  });

  it('deve criar uma utilização com sucesso', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Lucas' });
    const automovel = await AutomovelService.create({ id: 0, placa: 'ABC1234', cor: 'Prata', marca: 'Fiat' });

    const utilizacao = await UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: automovel.id!,
      motivo: 'Viagem de trabalho',
      dataInicio: new Date(),
      dataFim: null
    });

    expect(utilizacao.idMotorista).toBe(motorista.id);
    expect(utilizacao.idAutomovel).toBe(automovel.id);
    expect(utilizacao.motivo).toBe('Viagem de trabalho');
    expect(utilizacao.dataFim).toBeNull();
    expect(utilizacao.dataInicio).toBeInstanceOf(Date);
  });

  it('deve lançar erro se id do motorista ou do automóvel estiver ausente', async () => {
    await expect(UtilizacaoService.create({} as any)).rejects.toThrow('O id do motorista e do automóvel são obrigatórios');
  });

  it('deve lançar erro se o automóvel não existir', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Ana' });

    await expect(UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: 999,
      motivo: 'Indisponível',
      dataInicio: new Date(),
      dataFim: null
    })).rejects.toThrow('Automóvel não encontrado');
  });

  it('deve lançar erro se o motorista não existir', async () => {
    const automovel = await AutomovelService.create({ id: 0, placa: 'XYZ0001', cor: 'Preto', marca: 'Honda' });

    await expect(UtilizacaoService.create({
      idMotorista: 999,
      idAutomovel: automovel.id!,
      motivo: 'Entrega',
      dataInicio: new Date(),
      dataFim: null
    })).rejects.toThrow('Motorista não encontrado');
  });

  it('deve lançar erro se o automóvel já estiver em utilização', async () => {
    const motorista1 = await MotoristaService.create({ id: 0, nome: 'João' });
    const motorista2 = await MotoristaService.create({ id: 0, nome: 'Pedro' });
    const automovel = await AutomovelService.create({ id: 0, placa: 'GHI4321', cor: 'Azul', marca: 'VW' });

    // Cria uma utilização ativa
    await UtilizacaoService.create({
      idMotorista: motorista1.id!,
      idAutomovel: automovel.id!,
      motivo: 'Uso exclusivo',
      dataInicio: new Date(),
      dataFim: null
    });

    // Tenta nova utilização com outro motorista
    await expect(UtilizacaoService.create({
      idMotorista: motorista2.id!,
      idAutomovel: automovel.id!,
      motivo: 'Tentativa duplicada',
      dataInicio: new Date(),
      dataFim: null
    })).rejects.toThrow('O automóvel já está em utilização');
  });

  it('deve lançar erro se o motorista já estiver utilizando outro automóvel', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Paulo' });
    const automovel1 = await AutomovelService.create({ id: 0, placa: 'DEF9876', cor: 'Verde', marca: 'Chevrolet' });
    const automovel2 = await AutomovelService.create({ id: 0, placa: 'LMN1234', cor: 'Branco', marca: 'Ford' });

    // utilização valida
    await UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: automovel1.id!,
      motivo: 'Atividade A',
      dataInicio: new Date(),
      dataFim: null
    });

    // utilização com outro automóvel, mas com o mesmo motorista
    await expect(UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: automovel2.id!,
      motivo: 'Atividade B',
      dataInicio: new Date(),
      dataFim: null
    })).rejects.toThrow('O motorista já está utilizando algum automóvel');
  });

  it('deve listar registros de utilização com nome do motorista e dados do automóvel', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Carlos Lima' });
    const automovel = await AutomovelService.create({
      id: 0,
      placa: 'MNO1234',
      cor: 'Cinza',
      marca: 'Hyundai'
    });

    await UtilizacaoService.create({
      idMotorista: motorista.id!,
      idAutomovel: automovel.id!,
      motivo: 'Serviço externo',
      dataInicio: new Date(),
      dataFim: null
    });

    const lista = await UtilizacaoService.list();

    expect(lista).toHaveLength(1);
    expect(lista[0].motorista).toBe('Carlos Lima');
    expect(lista[0].automovel).toMatchObject({
      id: automovel.id,
      placa: 'MNO1234',
      cor: 'Cinza',
      marca: 'Hyundai'
    });
  });

  it('deve retornar lista vazia quando não houver registros de utilização', async () => {
    const resultado = await UtilizacaoService.list();
    expect(resultado).toEqual([]);
  });
});