import { describe, expect, it } from 'vitest';
import { aplicarLimiteHospedagem, extrairDiarias } from '../src/regras/hospedagem.js';
import { despesa, doExemplo } from './fabrica.js';

const hospedagem = (descricao: string, valor: number) =>
  despesa({ categoria: 'hospedagem', descricao, valor, temNotaFiscal: true });

const resumo = (r: ReturnType<typeof aplicarLimiteHospedagem>) => ({
  diarias: r.diarias,
  limite: r.limiteAplicado.toString(),
  reembolso: r.reembolsoExato.toString(),
  parcial: r.cortadaPorLimite,
  motivo: r.motivoParcial,
});

describe('RN-006 — limite de hospedagem por diária', () => {
  it('AC: d-010 "Hotel Rio - 2 diarias", R$ 480,00 → N = 2, limite 750, recebe 480 (integral)', () => {
    expect(resumo(aplicarLimiteHospedagem(doExemplo('d-010')))).toEqual({
      diarias: 2, limite: '750', reembolso: '480', parcial: false, motivo: null,
    });
  });

  it('AC: "Hotel - 2 diarias", R$ 800,00 → limite 750, recebe 750 (parcial)', () => {
    expect(resumo(aplicarLimiteHospedagem(hospedagem('Hotel - 2 diarias', 800)))).toEqual({
      diarias: 2, limite: '750', reembolso: '750', parcial: true, motivo: 'limite de hospedagem excedido',
    });
  });

  it('AC: "Pousada", R$ 400,00 → sem padrão, N = 1, recebe 375 (parcial)', () => {
    expect(resumo(aplicarLimiteHospedagem(hospedagem('Pousada', 400)))).toEqual({
      diarias: 1, limite: '375', reembolso: '375', parcial: true, motivo: 'limite de hospedagem excedido',
    });
  });

  it('AC: "Hotel duas diarias", R$ 400,00 → número por extenso não reconhecido, N = 1, recebe 375 (parcial)', () => {
    expect(resumo(aplicarLimiteHospedagem(hospedagem('Hotel duas diarias', 400)))).toMatchObject({
      diarias: 1, reembolso: '375', parcial: true,
    });
  });

  it('AC: d-013 "Airbnb 3 noites" → o padrão daria N = 3', () => {
    expect(extrairDiarias(doExemplo('d-013').descricao)).toBe(3);
  });

  it.todo('AC: d-013 sem nota → recusada por RN-002 antes do limite (N = 3 não chega a ser aplicado) — via motor, T-013');

  describe('padrão de diárias (DT-005)', () => {
    it.each([
      ['1 diaria', 1],
      ['3 diárias', 3],
      ['2 NOITES no centro', 2],
      ['Hotel 4noites', 4],
      ['Hotel - 1 Noite', 1],
      ['0 diarias, depois 2 noites', 2],
      ['Quarto 12 - 3 diarias', 3],
      ['Hotel 2 pernoites', 1],
      ['Hotel 2 diariasx', 1],
      ['', 1],
    ])('"%s" → N = %i', (descricao, n) => {
      expect(extrairDiarias(descricao)).toBe(n);
    });
  });
});
