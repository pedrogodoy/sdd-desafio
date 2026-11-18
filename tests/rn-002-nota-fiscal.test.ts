import { describe, expect, it } from 'vitest';
import { aplicarLimiteDiario } from '../src/regras/limite-diario.js';
import { verificarNotaFiscal } from '../src/regras/nota-fiscal.js';
import { despesa, doExemplo, itensLimite } from './fabrica.js';

describe('RN-002 — nota fiscal obrigatória acima de R$ 100,00', () => {
  it('AC: d-003 transporte R$ 100,00 sem nota → não exige nota', () => {
    expect(verificarNotaFiscal(doExemplo('d-003'))).toBeNull();
  });

  it('AC: d-004 transporte R$ 100,01 sem nota → recusada, "nota fiscal ausente"', () => {
    expect(verificarNotaFiscal(doExemplo('d-004'))).toBe('nota fiscal ausente');
  });

  it.todo('AC: dia 06/07 (d-003 + d-004) → só d-003 entra no limite, recebe R$ 80,00 (parcial) — via motor, T-013');

  it('AC: transporte R$ 60,00 + R$ 55,00 no mesmo dia, sem nota → nenhuma exige nota; soma 115 → limite 80 por RN-001', () => {
    const dia = { data: '2026-07-20', categoria: 'transporte_urbano', temNotaFiscal: false };
    const a = despesa({ ...dia, id: 'a', valor: 60 });
    const b = despesa({ ...dia, id: 'b', valor: 55 });
    expect(verificarNotaFiscal(a)).toBeNull();
    expect(verificarNotaFiscal(b)).toBeNull();
    const r = aplicarLimiteDiario(itensLimite([a, b]), new Set());
    expect(r.get('b')!.reembolsoExato.toString()).toBe('55');
    expect(r.get('a')!.reembolsoExato.toString()).toBe('25');
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
