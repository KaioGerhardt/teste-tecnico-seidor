import { AutomovelService } from '../../src/services/automovel.service';
import { Automovel } from '../../src/models/automovel.model';
import { __test_only__ as testRepoTools } from '../../src/repositories/automovel.repository';

// Utilitário para resetar o repositório em memória
const resetRepository = () => {
  // @ts-ignore - acesso forçado para fins de teste
  testRepoTools.reset();
};

describe('AutomovelService.create', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve criar um automóvel com sucesso', async () => {
    const data: Automovel = {
      id: 0, // será sobrescrito no repositório
      placa: 'ABC1234',
      cor: 'Preto',
      marca: 'Fiat',
    };

    const resultado = await AutomovelService.create(data);

    expect(resultado.id).toBe(1);
    expect(resultado.placa).toBe('ABC1234');
    expect(resultado.cor).toBe('Preto');
    expect(resultado.marca).toBe('Fiat');
  });

  it('deve lançar erro ao criar automóvel com placa duplicada', async () => {
    const base = {
      id: 0,
      placa: 'XYZ9999',
      cor: 'Vermelho',
      marca: 'Toyota',
    };

    await AutomovelService.create(base);

    await expect(AutomovelService.create(base)).rejects.toThrow('Já existe um automóvel com essa placa');
  });

  it('deve lançar erro se placa estiver ausente', async () => {
    const data: Partial<Automovel> = {
      cor: 'Azul',
      marca: 'Ford',
    };

    // @ts-ignore forçando o teste com campo ausente
    await expect(AutomovelService.create(data)).rejects.toThrow('Placa, cor e marca são obrigatórios');
  });

  it('deve lançar erro se cor estiver ausente', async () => {
    const data: Partial<Automovel> = {
      placa: 'TTT4444',
      marca: 'Ford',
    };

    // @ts-ignore
    await expect(AutomovelService.create(data)).rejects.toThrow('Placa, cor e marca são obrigatórios');
  });

  it('deve lançar erro se marca estiver ausente', async () => {
    const data: Partial<Automovel> = {
      placa: 'JJJ8888',
      cor: 'Prata',
    };

    // @ts-ignore
    await expect(AutomovelService.create(data)).rejects.toThrow('Placa, cor e marca são obrigatórios');
  });
});