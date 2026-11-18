import { describe, expect, it } from 'vitest';
import { aplicarLimiteDiario } from '../src/regras/limite-diario.js';
import type { Despesa } from '../src/modelo.js';
import { despesa, doExemplo, itensLimite } from './fabrica.js';

function limitar(despesas: Despesa[], datasEmViagem: string[] = []) {
  const r = aplicarLimiteDiario(itensLimite(despesas), new Set(datasEmViagem));
  return Object.fromEntries(
    [...r].map(([id, x]) => [
      id,
      { reembolso: x.reembolsoExato.toString(), limite: x.limiteAplicado.toString(), parcial: x.cortadaPorLimite, motivo: x.motivoParcial },
    ]),
  );
}

const alimentacao = (id: string, valor: number | string, data = '2026-07-20') =>
  despesa({ id, data, categoria: 'alimentacao', valor });

describe('RN-001 — limite diário por categoria', () => {
  it('AC: alimentação 03/07, d-001 R$ 72,50 + d-002 R$ 38,00 → d-002 38,00 integral, d-001 22,00 parcial; dia 60,00', () => {
    expect(limitar([doExemplo('d-001'), doExemplo('d-002')])).toEqual({
      'd-002': { reembolso: '38', limite: '60', parcial: false, motivo: null },
      'd-001': { reembolso: '22', limite: '60', parcial: true, motivo: 'limite diário excedido' },
    });
  });

  it('AC: uma alimentação de R$ 61,00 no dia → R$ 60,00 (parcial)', () => {
    expect(limitar([alimentacao('a', 61)]).a).toEqual({ reembolso: '60', limite: '60', parcial: true, motivo: 'limite diário excedido' });
  });

  it('AC: uma alimentação de R$ 60,00 no dia → R$ 60,00 (integral)', () => {
    expect(limitar([alimentacao('a', 60)]).a).toEqual({ reembolso: '60', limite: '60', parcial: false, motivo: null });
  });

  it('AC: alimentação R$ 50,00 e transporte R$ 70,00 na mesma data → ambas integrais (limites independentes)', () => {
    const r = limitar([
      alimentacao('a', 50),
      despesa({ id: 't', data: '2026-07-20', categoria: 'transporte_urbano', valor: 70 }),
    ]);
    expect(r.a).toMatchObject({ reembolso: '50', limite: '60', parcial: false });
    expect(r.t).toMatchObject({ reembolso: '70', limite: '80', parcial: false });
  });

  it('AMB-002: valores iguais desempatam por id crescente; as seguintes recebem R$ 0,00', () => {
    const r = limitar([alimentacao('d-102', 30), alimentacao('d-101', 30), alimentacao('d-100', 30)]);
    expect(r['d-100']).toMatchObject({ reembolso: '30', parcial: false });
    expect(r['d-101']).toMatchObject({ reembolso: '30', parcial: false });
    expect(r['d-102']).toMatchObject({ reembolso: '0', parcial: true, motivo: 'limite diário excedido' });
  });

  it('datas diferentes têm limites independentes', () => {
    const r = limitar([alimentacao('a', 60, '2026-07-20'), alimentacao('b', 60, '2026-07-21')]);
    expect(r.a).toMatchObject({ reembolso: '60', parcial: false });
    expect(r.b).toMatchObject({ reembolso: '60', parcial: false });
  });

  it('a ordem da entrada não altera o resultado', () => {
    const lista = [doExemplo('d-001'), doExemplo('d-002')];
    expect(limitar([...lista].reverse())).toEqual(limitar(lista));
  });

  describe('RN-007 — limite ampliado nas datas em viagem', () => {
    const viagem = ['2026-07-14', '2026-07-15', '2026-07-16'];

    it('AC: alimentação R$ 85,00 em 16/07 (check-out de d-010) → integral, limite 90', () => {
      expect(limitar([alimentacao('a', 85, '2026-07-16')], viagem).a).toEqual({ reembolso: '85', limite: '90', parcial: false, motivo: null });
    });

    it('AC: alimentação R$ 85,00 em 17/07 → R$ 60,00 (parcial; fora da viagem)', () => {
      expect(limitar([alimentacao('a', 85, '2026-07-17')], viagem).a).toEqual({ reembolso: '60', limite: '60', parcial: true, motivo: 'limite diário excedido' });
    });

    it('transporte urbano em viagem → limite R$ 120,00', () => {
      const r = limitar([despesa({ id: 't', data: '2026-07-15', categoria: 'transporte_urbano', valor: 130 })], viagem);
      expect(r.t).toMatchObject({ reembolso: '120', limite: '120', parcial: true });
    });
  });
});
