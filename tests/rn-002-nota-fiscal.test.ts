import { describe, expect, it } from 'vitest';
import { verificarNotaFiscal } from '../src/regras/nota-fiscal.js';
import { despesa, doExemplo } from './fabrica.js';

describe('RN-002 — nota fiscal obrigatória acima de R$ 100,00', () => {
  it('AC: d-003 transporte R$ 100,00 sem nota → não exige nota', () => {
    expect(verificarNotaFiscal(doExemplo('d-003'))).toBeNull();
  });

  it('AC: d-004 transporte R$ 100,01 sem nota → recusada, "nota fiscal ausente"', () => {
    expect(verificarNotaFiscal(doExemplo('d-004'))).toBe('nota fiscal ausente');
  });

  it.todo('AC: dia 06/07 (d-003 + d-004) → só d-003 entra no limite, recebe R$ 80,00 (parcial) — via motor, T-013');

  it('AC: transporte R$ 60,00 + R$ 55,00 no mesmo dia, sem nota → nenhuma exige nota (avaliação por despesa)', () => {
    const dia = { data: '2026-07-20', categoria: 'transporte_urbano', temNotaFiscal: false };
    expect(verificarNotaFiscal(despesa({ ...dia, valor: 60 }))).toBeNull();
    expect(verificarNotaFiscal(despesa({ ...dia, valor: 55 }))).toBeNull();
  });

  it('AC: R$ 150,00 com nota → não é recusada', () => {
    expect(verificarNotaFiscal(despesa({ valor: 150, temNotaFiscal: true }))).toBeNull();
  });

  it('AC (RN-008): R$ 100,004 sem nota → exige nota e é recusada', () => {
    expect(verificarNotaFiscal(despesa({ valor: '100.004', temNotaFiscal: false }))).toBe('nota fiscal ausente');
  });

  it('AC (RN-006): d-013 hospedagem R$ 690,00 sem nota → recusada', () => {
    expect(verificarNotaFiscal(doExemplo('d-013'))).toBe('nota fiscal ausente');
  });
});
