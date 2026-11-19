import { describe, expect, it } from 'vitest';
import { avaliar } from '../src/motor.js';
import type { Despesa } from '../src/modelo.js';
import { montarSaida } from '../src/saida.js';
import { despesa, entradaDoExemplo } from './fabrica.js';

/** Monta a saída com o colaborador e o período do exemplo e as despesas dadas. */
function saidaDe(despesas: Despesa[]) {
  const { colaborador, periodo } = entradaDoExemplo();
  const entrada = { colaborador, periodo, despesas: despesas.map((d, indice) => ({ ...d, indice })) };
  return montarSaida(entrada, avaliar(entrada));
}

function saidaDoExemploCom(ids: string[]) {
  return saidaDe(entradaDoExemplo().despesas.filter((d) => ids.includes(d.id)));
}

describe('Spec §4 — saída', () => {
  it('AC: exemplo da spec §4 (entrada só com d-001, d-002 e d-005) → documento idêntico', () => {
    expect(saidaDoExemploCom(['d-001', 'd-002', 'd-005'])).toEqual({
      colaborador: { id: 'c-0417', nome: 'Marina Volpi', centro_custo: 'CC-ENG-PLATAFORMA' },
      periodo: { competencia: '2026-07', inicio: '2026-07-01', fim: '2026-07-31' },
      despesas: [
        {
          id: 'd-001', data: '2026-07-03', categoria: 'alimentacao',
          valor_original: 72.5, valor_reembolsado: 22.0,
          status: 'parcial', motivos: ['limite diário excedido'],
          limite_aplicado: 60.0, em_viagem: false, diarias: null,
        },
        {
          id: 'd-002', data: '2026-07-03', categoria: 'alimentacao',
          valor_original: 38.0, valor_reembolsado: 38.0,
          status: 'integral', motivos: [],
          limite_aplicado: 60.0, em_viagem: false, diarias: null,
        },
        {
          id: 'd-005', data: '2026-07-07', categoria: 'coworking',
          valor_original: 89.0, valor_reembolsado: 0.0,
          status: 'recusada', motivos: ['categoria fora da política'],
          limite_aplicado: null, em_viagem: false, diarias: null,
        },
      ],
      totais: {
        valor_reembolsado: 60.0,
        quantidade: { integral: 1, parcial: 1, recusada: 1 },
      },
    });
  });

  it('despesas saem na ordem da entrada, mesmo quando o motor paga primeiro a menor', () => {
    const s = saidaDoExemploCom(['d-001', 'd-002']);
    expect(s.despesas.map((d) => d.id)).toEqual(['d-001', 'd-002']);
  });

  it('integral sai com motivos vazios', () => {
    const s = saidaDoExemploCom(['d-002']);
    expect(s.despesas[0]).toMatchObject({ status: 'integral', motivos: [] });
  });

  it('recusada sai com limite_aplicado nulo, diarias nulo e valor_reembolsado 0', () => {
    const s = saidaDoExemploCom(['d-013']);
    expect(s.despesas[0]).toMatchObject({
      status: 'recusada', valor_reembolsado: 0, limite_aplicado: null, diarias: null, motivos: ['nota fiscal ausente'],
    });
  });

  it('categoria sai normalizada e valor_original sai como veio (sem arredondar)', () => {
    const s = saidaDoExemploCom(['d-011', 'd-014']);
    expect(s.despesas.map((d) => [d.categoria, d.valor_original, d.valor_reembolsado])).toEqual([
      ['alimentacao', 33.333, 33.33],
      ['alimentacao', 61, 60],
    ]);
  });

  it('hospedagem elegível sai com diarias e limite de hospedagem', () => {
    const s = saidaDoExemploCom(['d-010']);
    expect(s.despesas[0]).toMatchObject({ status: 'integral', diarias: 2, limite_aplicado: 750, em_viagem: true });
  });

  it('entrada sem despesas → despesas vazio e totais zerados', () => {
    expect(saidaDe([]).despesas).toEqual([]);
    expect(saidaDe([]).totais).toEqual({ valor_reembolsado: 0, quantidade: { integral: 0, parcial: 0, recusada: 0 } });
  });
});

describe('RN-008 — totais são a soma dos valores já arredondados', () => {
  it('duas despesas de R$ 10,125 em dias diferentes → 10,12 cada; total 20,24 (não 20,25)', () => {
    const s = saidaDe([
      despesa({ id: 'a', data: '2026-07-20', valor: '10.125' }),
      despesa({ id: 'b', data: '2026-07-21', valor: '10.125' }),
    ]);
    expect(s.despesas.map((d) => d.valor_reembolsado)).toEqual([10.12, 10.12]);
    expect(s.totais.valor_reembolsado).toBe(20.24);
  });
});

describe('Spec §9 — invariantes da saída no exemplo completo', () => {
  const entrada = entradaDoExemplo();
  const s = montarSaida(entrada, avaliar(entrada));

  it('totais.valor_reembolsado é a soma dos valor_reembolsado (em centavos, sem erro de ponto flutuante)', () => {
    const centavos = s.despesas.reduce((soma, d) => soma + Math.round(d.valor_reembolsado * 100), 0);
    expect(Math.round(s.totais.valor_reembolsado * 100)).toBe(centavos);
  });

  it('recusada: R$ 0,00 e ao menos um motivo; parcial: exatamente um motivo; integral: nenhum', () => {
    for (const d of s.despesas) {
      if (d.status === 'recusada') {
        expect(d.valor_reembolsado).toBe(0);
        expect(d.motivos.length).toBeGreaterThan(0);
      } else if (d.status === 'parcial') {
        expect(d.motivos).toHaveLength(1);
      } else {
        expect(d.motivos).toEqual([]);
      }
    }
  });

  it('todos os campos do schema presentes em cada despesa', () => {
    for (const d of s.despesas) {
      expect(Object.keys(d).sort()).toEqual(
        ['categoria', 'data', 'diarias', 'em_viagem', 'id', 'limite_aplicado', 'motivos', 'status', 'valor_original', 'valor_reembolsado'],
      );
    }
  });
});
