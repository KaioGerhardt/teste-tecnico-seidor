import { MotoristaService } from '../../src/services/motorista.service';
import { Motorista } from '../../src/models/motorista.model';
import { __test_only__ as testRepoTools } from '../../src/repositories/motorista.repository';

// Utilitário para resetar o repositório em memória
const resetRepository = () => {
  // @ts-ignore - acesso forçado para fins de teste
  testRepoTools.reset();
};

describe('MotoristaService.delete', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve deletar um motorista com sucesso', async () => {
    const motorista: Motorista = {
      id: 0,
      nome: 'Carlos Alberto',
    };

    const criado = await MotoristaService.create(motorista);

    await expect(MotoristaService.delete(criado.id!)).resolves.toBeUndefined();
  });

  it('deve lançar erro ao tentar deletar um motorista inexistente', async () => {
    await expect(MotoristaService.delete(999)).rejects.toThrow('Motorista não encontrado');
  });
});