import { AutomovelService } from '../../src/services/automovel.service';
import { AutomovelRepository } from '../../src/repositories/automovel.repository';
import { __test_only__ as testRepoTools } from '../../src/repositories/automovel.repository';

// Reset do repositório de dados em memória
const resetRepository = () => {
  // @ts-ignore
  testRepoTools.reset();
};

describe('AutomovelService.update', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve atualizar um automóvel com todos os campos', async () => {
    const criado = await AutomovelService.create({
      id: 0,
      placa: 'ABC1234',
      cor: 'Preto',
      marca: 'Fiat',
    });

    const atualizado = await AutomovelService.update(criado.id, {
      placa: 'XYZ5678',
      cor: 'Branco',
      marca: 'VW',
    });

    expect(atualizado.id).toBe(criado.id);
    expect(atualizado.placa).toBe('XYZ5678');
    expect(atualizado.cor).toBe('Branco');
    expect(atualizado.marca).toBe('VW');
  });

  it('deve atualizar apenas a cor do automóvel', async () => {
    const criado = await AutomovelService.create({
      id: 0,
      placa: 'AAA0001',
      cor: 'Azul',
      marca: 'Toyota',
    });

    const atualizado = await AutomovelService.update(criado.id, {
      cor: 'Verde',
    });

    expect(atualizado.placa).toBe('AAA0001');
    expect(atualizado.cor).toBe('Verde');
    expect(atualizado.marca).toBe('Toyota');
  });

  it('deve atualizar apenas a marca do automóvel', async () => {
    const criado = await AutomovelService.create({
      id: 0,
      placa: 'JJJ9999',
      cor: 'Cinza',
      marca: 'Renault',
    });

    const atualizado = await AutomovelService.update(criado.id, {
      marca: 'Nissan',
    });

    expect(atualizado.placa).toBe('JJJ9999');
    expect(atualizado.cor).toBe('Cinza');
    expect(atualizado.marca).toBe('Nissan');
  });

  it('deve lançar erro ao tentar atualizar um automóvel inexistente', async () => {
    await expect(
      AutomovelService.update(999, { cor: 'Laranja' })
    ).rejects.toThrow('Automóvel não encontrado');
  });

  it('não deve sobrescrever campos não passados no update', async () => {
    const criado = await AutomovelService.create({
      id: 0,
      placa: 'PPP1234',
      cor: 'Roxo',
      marca: 'Peugeot',
    });

    const atualizado = await AutomovelService.update(criado.id, {
      placa: 'PPP5678'
    });

    expect(atualizado.placa).toBe('PPP5678');
    expect(atualizado.cor).toBe('Roxo');     // não deve ter mudado
    expect(atualizado.marca).toBe('Peugeot'); // não deve ter mudado
  });
});