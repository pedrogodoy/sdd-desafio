import { Decimal } from 'decimal.js';
import { describe, expect, it } from 'vitest';
import { arredondarReembolso } from '../src/regras/arredondamento.js';

const arredondar = (v: string) => arredondarReembolso(new Decimal(v)).toFixed(2);

describe('RN-008 — precisão e arredondamento', () => {
  it('AC: d-011 R$ 33,333 → reembolso R$ 33,33', () => {
    expect(arredondar('33.333')).toBe('33.33');
  });

  it('AC: R$ 10,125 → R$ 10,12; R$ 10,135 → R$ 10,14 (meio para o par)', () => {
    expect(arredondar('10.125')).toBe('10.12');
    expect(arredondar('10.135')).toBe('10.14');
  });

  it.todo('AC: alimentação R$ 33,333 + R$ 40,00 no dia → 33,33 e 26,67 (saldo exato 26,667); total 60,00 — com o limite diário, T-012');

  // O aceite "R$ 100,004 sem nota é recusada" está em tests/rn-002-nota-fiscal.test.ts:
  // é a RN-002 que compara o valor exato; aqui só se garante que nada arredonda antes.

  it('parte descartada acima de meio centavo arredonda para cima, abaixo para baixo', () => {
    expect(arredondar('26.667')).toBe('26.67');
    expect(arredondar('26.664')).toBe('26.66');
  });

  it('não altera valores que já têm 2 casas ou menos', () => {
    expect(arredondar('54.9')).toBe('54.90');
    expect(arredondar('480')).toBe('480.00');
  });
});
