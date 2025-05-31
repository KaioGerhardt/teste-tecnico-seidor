import { AutomovelService } from '../../src/services/automovel.service';
import { __test_only__ as testRepoTools } from '../../src/repositories/automovel.repository';

// Reset do repositório de dados em memória
const resetRepository = () => {
  // @ts-ignore
  testRepoTools.reset();
};

describe('AutomovelService.list', () => {
  beforeEach(() => {
    resetRepository();
  });

    it('deve retornar lista vazia se nenhum automóvel estiver cadastrado', async () => {
        const lista = await AutomovelService.list();
        expect(lista).toEqual([]);
    });

    it('deve listar todos os automóveis cadastrados', async () => {
        await AutomovelService.create({ id: 0, placa: 'AAA1111', cor: 'Preto', marca: 'Fiat' });
        await AutomovelService.create({ id: 0, placa: 'BBB2222', cor: 'Vermelho', marca: 'Ford' });

        const lista = await AutomovelService.list();
        expect(lista.length).toBe(2);
        expect(lista[0].placa).toBe('AAA1111');
        expect(lista[1].placa).toBe('BBB2222');
    });

    it('deve listar automóveis filtrados por cor', async () => {
        await AutomovelService.create({ id: 0, placa: 'X1', cor: 'Branco', marca: 'Fiat' });
        await AutomovelService.create({ id: 0, placa: 'X2', cor: 'Preto', marca: 'Ford' });
        await AutomovelService.create({ id: 0, placa: 'X3', cor: 'Preto', marca: 'GM' });

        const lista = await AutomovelService.list('Preto', undefined);
        expect(lista.length).toBe(2);
        expect(lista.every(a => a.cor === 'Preto')).toBe(true);
    });

    it('deve listar automóveis filtrados por marca', async () => {
        await AutomovelService.create({ id: 0, placa: 'Y1', cor: 'Azul', marca: 'VW' });
        await AutomovelService.create({ id: 0, placa: 'Y2', cor: 'Prata', marca: 'VW' });
        await AutomovelService.create({ id: 0, placa: 'Y3', cor: 'Preto', marca: 'GM' });

        const lista = await AutomovelService.list(undefined, 'VW');
        expect(lista.length).toBe(2);
        expect(lista.every(a => a.marca === 'VW')).toBe(true);
    });

    it('deve listar automóveis filtrados por cor e marca simultaneamente', async () => {
        await AutomovelService.create({ id: 0, placa: 'Z1', cor: 'Branco', marca: 'Fiat' });
        await AutomovelService.create({ id: 0, placa: 'Z2', cor: 'Branco', marca: 'VW' });
        await AutomovelService.create({ id: 0, placa: 'Z3', cor: 'Preto', marca: 'VW' });

        const lista = await AutomovelService.list('Branco', 'VW');
        expect(lista.length).toBe(1);
        expect(lista[0].placa).toBe('Z2');
    });

    it('deve retornar lista vazia se filtros não encontrarem nenhum item', async () => {
        await AutomovelService.create({ id: 0, placa: 'A1', cor: 'Azul', marca: 'Ford' });

        const lista = await AutomovelService.list('Preto', 'Toyota');
        expect(lista.length).toBe(0);
    });
});