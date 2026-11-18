import { describe, expect, it } from 'vitest';
import { verificarPeriodo } from '../src/regras/periodo.js';
import { despesa, doExemplo, entradaDoExemplo } from './fabrica.js';

const { periodo } = entradaDoExemplo(); // 2026-07-01 a 2026-07-31

describe('RN-003 — período de competência', () => {
  it('AC: d-008 em 15/04, período 01/07–31/07 → recusada, "fora do período de competência"', () => {
    expect(verificarPeriodo(doExemplo('d-008'), periodo)).toBe('fora do período de competência');
  });

  it('AC: data igual a periodo.inicio (01/07) → elegível', () => {
    expect(verificarPeriodo(despesa({ data: '2026-07-01' }), periodo)).toBeNull();
  });

  it('AC: data igual a periodo.fim (31/07) → elegível', () => {
    expect(verificarPeriodo(despesa({ data: '2026-07-31' }), periodo)).toBeNull();
  });

  it('AC: data 01/08 → recusada', () => {
    expect(verificarPeriodo(despesa({ data: '2026-08-01' }), periodo)).toBe('fora do período de competência');
  });

  it('véspera do início (30/06) → recusada', () => {
    expect(verificarPeriodo(despesa({ data: '2026-06-30' }), periodo)).toBe('fora do período de competência');
  });

  it('spec §10 (D-001): com inicio depois de fim, nenhuma data cabe no período', () => {
    const invertido = { ...periodo, inicio: '2026-07-31', fim: '2026-07-01' };
    expect(verificarPeriodo(despesa({ data: '2026-07-15' }), invertido)).toBe('fora do período de competência');
  });
});
