import { Decimal } from 'decimal.js';
import { describe, expect, it } from 'vitest';
import { arredondarReembolso } from '../src/regras/arredondamento.js';
import { aplicarLimiteDiario } from '../src/regras/limite-diario.js';
import { despesa, itensLimite } from './fabrica.js';

const arredondar = (v: string) => arredondarReembolso(new Decimal(v)).toFixed(2);

describe('RN-008 — precisão e arredondamento', () => {
  it('AC: d-011 R$ 33,333 → reembolso R$ 33,33', () => {
    expect(arredondar('33.333')).toBe('33.33');
  });

  it('AC: R$ 10,125 → R$ 10,12; R$ 10,135 → R$ 10,14 (meio para o par)', () => {
    expect(arredondar('10.125')).toBe('10.12');
    expect(arredondar('10.135')).toBe('10.14');
  });

  it('AC: alimentação R$ 33,333 + R$ 40,00 no dia (limite 60) → 33,33 e saldo exato 26,667 → 26,67; total 60,00', () => {
    const dia = { data: '2026-07-20', categoria: 'alimentacao' };
    const r = aplicarLimiteDiario(
      itensLimite([despesa({ ...dia, id: 'a', valor: '33.333' }), despesa({ ...dia, id: 'b', valor: 40 })]),
      new Set(),
    );
    expect(r.get('b')!.reembolsoExato.toString()).toBe('26.667');
    const a = arredondarReembolso(r.get('a')!.reembolsoExato);
    const b = arredondarReembolso(r.get('b')!.reembolsoExato);
    expect([a.toFixed(2), b.toFixed(2), a.plus(b).toFixed(2)]).toEqual(['33.33', '26.67', '60.00']);
  });

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
