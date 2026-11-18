import { describe, expect, it } from 'vitest';
import { normalizarCategoria } from '../src/regras/categoria.js';
import { detectarDuplicatas } from '../src/regras/duplicata.js';
import type { Despesa } from '../src/modelo.js';
import { despesa, doExemplo, entradaDoExemplo } from './fabrica.js';

const itens = (despesas: Despesa[]) =>
  despesas.map((d) => ({ despesa: d, categoria: normalizarCategoria(d.categoria) }));

const base = {
  data: '2026-07-09',
  categoria: 'alimentacao',
  descricao: 'Almoço',
  fornecedor: 'Bistro Central',
  valor: '54.90',
  temNotaFiscal: true,
};

describe('RN-004 — duplicatas', () => {
  it('AC: d-006 e d-007 idênticas → d-007 recusada "duplicata de d-006"; d-006 segue', () => {
    const motivos = detectarDuplicatas(itens([doExemplo('d-006'), doExemplo('d-007')]));
    expect(motivos.get('d-007')).toBe('duplicata de d-006');
    expect(motivos.has('d-006')).toBe(false);
  });

  it.todo('AC: d-006 segue para o limite e recebe R$ 54,90 — via motor, T-013');

  it('AC: iguais exceto pela descrição ("Almoço" × "Almoço equipe") → não são duplicatas', () => {
    const motivos = detectarDuplicatas(
      itens([despesa({ ...base, id: 'd-030' }), despesa({ ...base, id: 'd-031', descricao: 'Almoço equipe' })]),
    );
    expect(motivos.size).toBe(0);
  });

  it('AC: três idênticas d-020, d-021, d-022 → d-020 mantida; d-021 e d-022 "duplicata de d-020"', () => {
    // fora de ordem na entrada: o mantido é o menor id, não o primeiro da lista
    const motivos = detectarDuplicatas(
      itens([despesa({ ...base, id: 'd-022' }), despesa({ ...base, id: 'd-020' }), despesa({ ...base, id: 'd-021' })]),
    );
    expect(Object.fromEntries(motivos)).toEqual({
      'd-021': 'duplicata de d-020',
      'd-022': 'duplicata de d-020',
    });
  });

  it('AC (spec §8): ALIMENTACAO e alimentacao com os demais campos iguais → duplicatas', () => {
    const motivos = detectarDuplicatas(
      itens([despesa({ ...base, id: 'd-041', categoria: 'ALIMENTACAO' }), despesa({ ...base, id: 'd-040' })]),
    );
    expect(Object.fromEntries(motivos)).toEqual({ 'd-041': 'duplicata de d-040' });
  });

  it('qualquer campo diferente (valor, nota, fornecedor, data) desfaz a duplicata', () => {
    for (const diferenca of [
      { valor: '54.91' },
      { temNotaFiscal: false },
      { fornecedor: 'Outro' },
      { data: '2026-07-10' },
    ]) {
      const motivos = detectarDuplicatas(
        itens([despesa({ ...base, id: 'd-050' }), despesa({ ...base, id: 'd-051', ...diferenca })]),
      );
      expect(motivos.size).toBe(0);
    }
  });

  it('valor 54.9 e 54.90 são o mesmo valor', () => {
    const motivos = detectarDuplicatas(
      itens([despesa({ ...base, id: 'd-060', valor: '54.9' }), despesa({ ...base, id: 'd-061' })]),
    );
    expect(motivos.get('d-061')).toBe('duplicata de d-060');
  });

  it('no exemplo completo, só d-007 é duplicata', () => {
    const motivos = detectarDuplicatas(itens(entradaDoExemplo().despesas));
    expect(Object.fromEntries(motivos)).toEqual({ 'd-007': 'duplicata de d-006' });
  });
});
