import { MotoristaService } from '../../src/services/motorista.service';
import { Motorista } from '../../src/models/motorista.model';
import { __test_only__ as testRepoTools } from '../../src/repositories/motorista.repository';

// Utilitário para resetar o repositório em memória
const resetRepository = () => {
  // @ts-ignore - acesso forçado para fins de teste
  testRepoTools.reset();
};

describe('MotoristaService.update', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve atualizar o nome de um motorista existente com sucesso', async () => {
    const original = await MotoristaService.create({
      id: 0,
      nome: 'Carlos Mendes',
    });

    const atualizado = await MotoristaService.update(original.id!, { nome: 'Carlos Eduardo Mendes' });

    expect(atualizado.id).toBe(original.id);
    expect(atualizado.nome).toBe('Carlos Eduardo Mendes');
  });

  it('deve lançar erro ao tentar atualizar um motorista inexistente', async () => {
    await expect(MotoristaService.update(999, { nome: 'Inexistente' }))
      .rejects.toThrow('Motorista não encontrado');
  });

  it('deve lançar erro ao tentar atualizar removendo o nome do motorista', async () => {
    const motorista = await MotoristaService.create({ id: 0, nome: 'Ana Paula' });

    // @ts-ignore: testando ausência do nome explicitamente
    await expect(MotoristaService.update(motorista.id, { nome: '' }))
      .rejects.toThrow('O nome do motorista é obrigatório');
  });
});