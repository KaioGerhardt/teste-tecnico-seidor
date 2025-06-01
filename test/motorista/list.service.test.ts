import { MotoristaService } from '../../src/services/motorista.service';
import { Motorista } from '../../src/models/motorista.model';
import { __test_only__ as testRepoTools } from '../../src/repositories/motorista.repository';

// Utilitário para resetar o repositório em memória
const resetRepository = () => {
  // @ts-ignore - acesso forçado para fins de teste
  testRepoTools.reset();
};

describe('MotoristaService.list', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve retornar todos os motoristas quando nenhum nome for especificado', async () => {
    await MotoristaService.create({ id: 0, nome: 'João' });
    await MotoristaService.create({ id: 0, nome: 'Maria' });

    const resultado = await MotoristaService.list();

    expect(resultado).toHaveLength(2);
    expect(resultado.map(m => m.nome)).toEqual(expect.arrayContaining(['João', 'Maria']));
  });

  it('deve retornar motoristas filtrados por nome exato', async () => {
    await MotoristaService.create({ id: 0, nome: 'José' });
    await MotoristaService.create({ id: 0, nome: 'Joana' });

    const resultado = await MotoristaService.list('José');

    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe('José');
  });

  it('deve retornar lista vazia se nenhum motorista corresponder ao nome', async () => {
    await MotoristaService.create({ id: 0, nome: 'Carlos' });

    const resultado = await MotoristaService.list('NomeInexistente');

    expect(resultado).toHaveLength(0);
  });

  it('deve retornar um motorista existente pelo ID', async () => {
    const criado = await MotoristaService.create({
      id: 0,
      nome: 'Fernando Rocha',
    });

    const encontrado = await MotoristaService.getById(criado.id!);

    expect(encontrado).not.toBeNull();
    expect(encontrado?.id).toBe(criado.id);
    expect(encontrado?.nome).toBe('Fernando Rocha');
  });

  it('deve retornar null se o motorista não existir', async () => {
    const resultado = await MotoristaService.getById(999);
    expect(resultado).toBeNull();
  });
});