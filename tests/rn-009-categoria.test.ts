import { describe, expect, it } from 'vitest';
import { normalizarCategoria, verificarCategoria } from '../src/regras/categoria.js';
import { avaliarDespesas, doExemplo, entradaDoExemplo } from './fabrica.js';

const avaliar = (categoria: string) => verificarCategoria(normalizarCategoria(categoria));

describe('RN-009 — categorias reembolsáveis', () => {
  it('AC: d-005 coworking, R$ 89,00 → recusada, "categoria fora da política"', () => {
    expect(avaliar(doExemplo('d-005').categoria)).toBe('categoria fora da política');
  });

  it('AC: d-014 ALIMENTACAO → tratada como alimentacao', () => {
    expect(normalizarCategoria(doExemplo('d-014').categoria)).toBe('alimentacao');
    expect(avaliar('ALIMENTACAO')).toBeNull();
  });

  it('AC: d-014 ALIMENTACAO, R$ 61,00 em 31/07 → tratada como alimentacao; recebe R$ 60,00 (parcial)', () => {
    const a = avaliarDespesas(entradaDoExemplo().despesas).get('d-014')!;
    expect(a.categoria).toBe('alimentacao');
    expect(a.reembolsoExato.toString()).toBe('60');
    expect(a.cortadaPorLimite).toBe(true);
  });

  it('AC: Alimentação (acento e inicial maiúscula) → tratada como alimentacao', () => {
    expect(normalizarCategoria('Alimentação')).toBe('alimentacao');
    expect(avaliar('Alimentação')).toBeNull();
  });

  it('AC: transporte urbano (espaço no lugar do sublinhado) → "categoria fora da política"', () => {
    expect(normalizarCategoria('transporte urbano')).toBe('transporte urbano');
    expect(avaliar('transporte urbano')).toBe('categoria fora da política');
  });

  it('as três categorias da política são aceitas', () => {
    for (const c of ['alimentacao', 'transporte_urbano', 'hospedagem']) expect(avaliar(c)).toBeNull();
    expect(avaliar('HOSPEDAGEM')).toBeNull();
    expect(avaliar('Transporte_Urbano')).toBeNull();
  });
});
