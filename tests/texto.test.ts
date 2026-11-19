import { describe, expect, it } from 'vitest';
import { compararIds, semAcentoMinusculo } from '../src/texto.js';

const ordenar = (ids: string[]) => [...ids].sort(compararIds);

describe('Spec §5 — ordem de id (AMB-015)', () => {
  it('algarismos pelo valor numérico: d-9 antes de d-10', () => {
    expect(ordenar(['d-10', 'd-9', 'd-100', 'd-2'])).toEqual(['d-2', 'd-9', 'd-10', 'd-100']);
  });

  it('ids com zeros à esquerda (como no exemplo) mantêm a ordem esperada', () => {
    expect(ordenar(['d-014', 'd-002', 'd-010'])).toEqual(['d-002', 'd-010', 'd-014']);
  });

  it('empate numérico (d-01 × d-1) resolvido caractere a caractere do id inteiro', () => {
    expect(compararIds('d-01', 'd-1')).toBe(-1); // '0' < '1'
    expect(compararIds('d-1', 'd-01')).toBe(1);
  });

  it('trechos de texto comparados caractere a caractere', () => {
    expect(ordenar(['b-1', 'a-2', 'a-10'])).toEqual(['a-2', 'a-10', 'b-1']);
  });

  it('prefixo mais curto vem antes; id igual empata', () => {
    expect(compararIds('d-1', 'd-1a')).toBe(-1);
    expect(compararIds('d-7', 'd-7')).toBe(0);
  });

  it('número com muitos dígitos não perde precisão', () => {
    expect(compararIds('x-99999999999999999998', 'x-99999999999999999999')).toBe(-1);
  });
});

describe('normalização de texto (RN-009, RN-006)', () => {
  it('minúsculas e sem acento, nada além disso', () => {
    expect(semAcentoMinusculo('Alimentação Diárias')).toBe('alimentacao diarias');
    expect(semAcentoMinusculo('transporte urbano')).toBe('transporte urbano');
  });
});
