import { describe, expect, it } from 'vitest';
import { verificarValor } from '../src/regras/valor.js';
import { despesa, doExemplo } from './fabrica.js';

describe('RN-005 — valores não positivos', () => {
  it('AC: d-009 transporte −R$ 45,00 em 11/07 → recusada, "valor não positivo"', () => {
    expect(verificarValor(doExemplo('d-009'))).toBe('valor não positivo');
  });

  it.todo('AC: d-009 → total do período não é reduzido — via motor/saída, T-013/T-015');

  it('AC: despesa de R$ 0,00 → recusada com o mesmo motivo', () => {
    expect(verificarValor(despesa({ valor: 0 }))).toBe('valor não positivo');
  });

  it.todo('AC: transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R$ 70,00 recebe R$ 70,00 — via motor, T-013');

  it('valor positivo, mesmo mínimo, é aceito', () => {
    expect(verificarValor(despesa({ valor: 70 }))).toBeNull();
    expect(verificarValor(despesa({ valor: '0.001' }))).toBeNull();
  });
});
