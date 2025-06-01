import { MotoristaService } from '../../src/services/motorista.service';
import { Motorista } from '../../src/models/motorista.model';
import { __test_only__ as testRepoTools } from '../../src/repositories/motorista.repository';

// Utilitário para resetar o repositório em memória
const resetRepository = () => {
  // @ts-ignore - acesso forçado para fins de teste
  testRepoTools.reset();
};

describe('MotoristaService.create', () => {
  beforeEach(() => {
    resetRepository();
  });

  it('deve criar um motorista com sucesso', async () => {
    const data: Motorista = {
      id: 0, // será sobrescrito
      nome: 'João da Silva',
    };

    const resultado = await MotoristaService.create(data);

    expect(resultado.id).toBe(1);
    expect(resultado.nome).toBe('João da Silva');
  });

  it('deve lançar erro ao criar motorista com nome duplicado', async () => {
    const base: Motorista = {
      id: 0,
      nome: 'Maria Oliveira',
    };

    await MotoristaService.create(base);

    await expect(MotoristaService.create(base)).rejects.toThrow('Já existe um motorista com esse nome');
  });

  it('deve lançar erro se nome estiver ausente', async () => {
    const data: Partial<Motorista> = {
      // nome ausente
    };

    // @ts-ignore
    await expect(MotoristaService.create(data)).rejects.toThrow('O nome do motorista é obrigatório');
  });
});