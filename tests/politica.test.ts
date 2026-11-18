import { describe, expect, it } from 'vitest';
import {
  CASAS_DECIMAIS_REEMBOLSO,
  CATEGORIAS_REEMBOLSAVEIS,
  DIARIAS_PADRAO,
  FATOR_VIAGEM,
  LIMIAR_NOTA_FISCAL,
  LIMITE_DIARIO,
  LIMITE_POR_DIARIA_HOSPEDAGEM,
  MOTIVOS,
  PALAVRAS_DIARIA,
} from '../src/politica.js';

describe('Política (plan §4) — constantes conferidas contra a spec', () => {
  it('RN-009: categorias reembolsáveis são alimentacao, transporte_urbano e hospedagem', () => {
    expect([...CATEGORIAS_REEMBOLSAVEIS]).toEqual(['alimentacao', 'transporte_urbano', 'hospedagem']);
  });

  it('RN-001: limite diário de alimentação R$ 60,00 e de transporte urbano R$ 80,00', () => {
    expect(LIMITE_DIARIO.alimentacao.toString()).toBe('60');
    expect(LIMITE_DIARIO.transporte_urbano.toString()).toBe('80');
  });

  it('RN-006: R$ 250,00 por diária; N padrão 1; palavras diária(s) e noite(s)', () => {
    expect(LIMITE_POR_DIARIA_HOSPEDAGEM.toString()).toBe('250');
    expect(DIARIAS_PADRAO).toBe(1);
    expect([...PALAVRAS_DIARIA]).toEqual(['diaria', 'diarias', 'noite', 'noites']);
  });

  it('RN-007: ampliação de 50% em viagem (fator 1,5) → 90, 120 e 375', () => {
    expect(FATOR_VIAGEM.toString()).toBe('1.5');
    expect(LIMITE_DIARIO.alimentacao.times(FATOR_VIAGEM).toString()).toBe('90');
    expect(LIMITE_DIARIO.transporte_urbano.times(FATOR_VIAGEM).toString()).toBe('120');
    expect(LIMITE_POR_DIARIA_HOSPEDAGEM.times(FATOR_VIAGEM).toString()).toBe('375');
  });

  it('RN-002: limiar de nota fiscal R$ 100,00', () => {
    expect(LIMIAR_NOTA_FISCAL.toString()).toBe('100');
  });

  it('RN-008: reembolso arredondado para 2 casas', () => {
    expect(CASAS_DECIMAIS_REEMBOLSO).toBe(2);
  });

  it('Spec §4 e §8: textos dos motivos', () => {
    expect(MOTIVOS.categoriaForaDaPolitica).toBe('categoria fora da política');
    expect(MOTIVOS.valorNaoPositivo).toBe('valor não positivo');
    expect(MOTIVOS.foraDoPeriodo).toBe('fora do período de competência');
    expect(MOTIVOS.duplicataDe('d-006')).toBe('duplicata de d-006');
    expect(MOTIVOS.notaFiscalAusente).toBe('nota fiscal ausente');
    expect(MOTIVOS.limiteDiarioExcedido).toBe('limite diário excedido');
    expect(MOTIVOS.limiteHospedagemExcedido).toBe('limite de hospedagem excedido');
  });
});
