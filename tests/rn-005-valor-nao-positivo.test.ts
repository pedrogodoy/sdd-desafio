import { describe, expect, it } from 'vitest';
import { verificarValor } from '../src/regras/valor.js';
import { avaliarDespesas, despesa, doExemplo } from './fabrica.js';

describe('RN-005 — valores não positivos', () => {
  it('AC: d-009 transporte −R$ 45,00 em 11/07 → recusada, "valor não positivo"', () => {
    expect(verificarValor(doExemplo('d-009'))).toBe('valor não positivo');
  });

  it.todo('AC: d-009 → total do período não é reduzido — totais da saída, T-015');

  it('AC: despesa de R$ 0,00 → recusada com o mesmo motivo', () => {
    expect(verificarValor(despesa({ valor: 0 }))).toBe('valor não positivo');
  });

  it('AC: transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R$ 70,00 recebe R$ 70,00 (o negativo não altera a soma do dia)', () => {
    const dia = { data: '2026-07-20', categoria: 'transporte_urbano', temNotaFiscal: false };
    const r = avaliarDespesas([despesa({ ...dia, id: 'a', valor: 70 }), despesa({ ...dia, id: 'b', valor: -20 })]);
    expect(r.get('a')!.reembolsoExato.toString()).toBe('70');
    expect(r.get('a')!.cortadaPorLimite).toBe(false);
    expect(r.get('b')!.reembolsoExato.toString()).toBe('0');
    expect(r.get('b')!.motivosRecusa).toEqual(['valor não positivo']);
  });

  it('valor positivo, mesmo mínimo, é aceito', () => {
    expect(verificarValor(despesa({ valor: 70 }))).toBeNull();
    expect(verificarValor(despesa({ valor: '0.001' }))).toBeNull();
  });
});
