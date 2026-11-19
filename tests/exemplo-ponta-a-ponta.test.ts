import { describe, expect, it } from 'vitest';
import { avaliar, motivosDe, statusDe } from '../src/motor.js';
import { arredondarReembolso } from '../src/regras/arredondamento.js';
import { montarSaida } from '../src/saida.js';
import { entradaDoExemplo } from './fabrica.js';

// Spec §7 — exemplos/despesas-exemplo.json, linha a linha.
const LD = 'limite diário excedido';
const esperado = {
  'd-001': { categoria: 'alimentacao', status: 'parcial', reembolso: '22.00', motivos: [LD], limite: '60', emViagem: false, diarias: null },
  'd-002': { categoria: 'alimentacao', status: 'integral', reembolso: '38.00', motivos: [], limite: '60', emViagem: false, diarias: null },
  'd-003': { categoria: 'transporte_urbano', status: 'parcial', reembolso: '80.00', motivos: [LD], limite: '80', emViagem: false, diarias: null },
  'd-004': { categoria: 'transporte_urbano', status: 'recusada', reembolso: '0.00', motivos: ['nota fiscal ausente'], limite: null, emViagem: false, diarias: null },
  'd-005': { categoria: 'coworking', status: 'recusada', reembolso: '0.00', motivos: ['categoria fora da política'], limite: null, emViagem: false, diarias: null },
  'd-006': { categoria: 'alimentacao', status: 'integral', reembolso: '54.90', motivos: [], limite: '60', emViagem: false, diarias: null },
  'd-007': { categoria: 'alimentacao', status: 'recusada', reembolso: '0.00', motivos: ['duplicata de d-006'], limite: null, emViagem: false, diarias: null },
  'd-008': { categoria: 'alimentacao', status: 'recusada', reembolso: '0.00', motivos: ['fora do período de competência'], limite: null, emViagem: false, diarias: null },
  'd-009': { categoria: 'transporte_urbano', status: 'recusada', reembolso: '0.00', motivos: ['valor não positivo'], limite: null, emViagem: false, diarias: null },
  'd-010': { categoria: 'hospedagem', status: 'integral', reembolso: '480.00', motivos: [], limite: '750', emViagem: true, diarias: 2 },
  'd-011': { categoria: 'alimentacao', status: 'integral', reembolso: '33.33', motivos: [], limite: '90', emViagem: true, diarias: null },
  'd-012': { categoria: 'alimentacao', status: 'integral', reembolso: '47.20', motivos: [], limite: '60', emViagem: false, diarias: null },
  'd-013': { categoria: 'hospedagem', status: 'recusada', reembolso: '0.00', motivos: ['nota fiscal ausente'], limite: null, emViagem: false, diarias: null },
  'd-014': { categoria: 'alimentacao', status: 'parcial', reembolso: '60.00', motivos: [LD], limite: '60', emViagem: false, diarias: null },
} as const;

const avaliacoes = avaliar(entradaDoExemplo());

describe('Spec §7 — exemplo de ponta a ponta (motor)', () => {
  it.each(Object.entries(esperado))('%s', (id, linha) => {
    const a = avaliacoes.find((x) => x.despesa.id === id)!;
    expect({
      categoria: a.categoria,
      status: statusDe(a),
      reembolso: arredondarReembolso(a.reembolsoExato).toFixed(2),
      motivos: motivosDe(a),
      limite: a.limiteAplicado?.toString() ?? null,
      emViagem: a.emViagem,
      diarias: a.diarias,
    }).toEqual(linha);
  });

  it('avalia as 14 despesas, na ordem do arquivo', () => {
    expect(avaliacoes.map((a) => a.despesa.id)).toEqual(Object.keys(esperado));
  });

  it('em viagem só as despesas de 14/07 e 15/07 (dentro de 14–16/07, gerado por d-010; 16/07 não tem despesa)', () => {
    const emViagem = avaliacoes.filter((a) => a.emViagem).map((a) => a.despesa.id);
    expect(emViagem).toEqual(['d-010', 'd-011']);
  });

  it('totais: R$ 815,43; integral 5, parcial 3, recusada 6', () => {
    const entrada = entradaDoExemplo();
    expect(montarSaida(entrada, avaliar(entrada)).totais).toEqual({
      valor_reembolsado: 815.43,
      quantidade: { integral: 5, parcial: 3, recusada: 6 },
    });
  });
});
