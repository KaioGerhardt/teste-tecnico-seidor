import { AutomovelService } from '../../src/services/automovel.service';
import { __test_only__ as testRepoTools } from '../../src/repositories/automovel.repository';

// Reset para o repositório de dados em memória
const resetRepository = () => {
  // @ts-ignore
  testRepoTools.reset();
};

describe('AutomovelService.delete', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve deletar um automóvel existente com sucesso', async () => {
    const automovel = await AutomovelService.create({
      id: 0,
      placa: 'DEL1234',
      cor: 'Prata',
      marca: 'Honda',
    });

    await expect(AutomovelService.delete(automovel.id!)).resolves.toBeUndefined();

    const resultado = await AutomovelService.getById(automovel.id!);
    expect(resultado).toBeNull();
  });

  it('deve lançar erro ao tentar deletar um automóvel inexistente', async () => {
    await expect(AutomovelService.delete(999)).rejects.toThrow('Automóvel não encontrado');
  });

  it('deve deletar apenas o automóvel com o ID especificado', async () => {
    const auto1 = await AutomovelService.create({ id: 0, placa: 'A1', cor: 'Preto', marca: 'Ford' });
    const auto2 = await AutomovelService.create({ id: 0, placa: 'A2', cor: 'Branco', marca: 'VW' });

    await AutomovelService.delete(auto1.id!);

    const restante = await AutomovelService.list();
    expect(restante.length).toBe(1);
    expect(restante[0].id).toBe(auto2.id);
  });
});