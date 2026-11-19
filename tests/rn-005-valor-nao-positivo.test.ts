import { describe, expect, it } from 'vitest';
import { avaliar } from '../src/motor.js';
import { verificarValor } from '../src/regras/valor.js';
import { montarSaida } from '../src/saida.js';
import { avaliarDespesas, despesa, doExemplo, entradaDoExemplo } from './fabrica.js';

describe('RN-005 — valores não positivos', () => {
  it('AC: d-009 transporte −R$ 45,00 em 11/07 → recusada, "valor não positivo"', () => {
    expect(verificarValor(doExemplo('d-009'))).toBe('valor não positivo');
  });

  it('AC: d-009 → R$ 0,00 na saída e o total do período não é reduzido', () => {
    const exemplo = entradaDoExemplo();
    const totalCom = (ids: string[]) => {
      const entrada = { ...exemplo, despesas: exemplo.despesas.filter((d) => ids.includes(d.id)) };
      return montarSaida(entrada, avaliar(entrada));
    };
    const com = totalCom(['d-003', 'd-009']);
    expect(com.despesas[1]).toMatchObject({ id: 'd-009', status: 'recusada', valor_reembolsado: 0, valor_original: -45 });
    expect(com.totais.valor_reembolsado).toBe(totalCom(['d-003']).totais.valor_reembolsado);
  });

  it('AC: despesa de R$ 0,00 → recusada com o mesmo motivo', () => {
    expect(verificarValor(despesa({ valor: 0 }))).toBe('valor não positivo');
  });

  it('AC: transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R$ 70,00 recebe R$ 70,00 (o negativo não altera a soma do dia)', () => {
    const dia = { data: '2026-07-20', categoria: 'transporte_urbano', temNotaFiscal: false };
    const r = avaliarDespesas([despesa({ ...dia, id: 'a', valor: 70 }), despesa({ ...dia, id: 'b', valor: -20 })]);
    expect(r.get('a')!.reembolsoExato.toString()).toBe('70');
    expect(r.get('a')!.cortadaPorLimite).toBe(false);
    expect(r.get('b')!.reembolsoExato.toString()).toBe('0');
    expect(r.get('b')!.motivosRecusa).toEqual(['valor não positivo']);
  });

  it('valor positivo, mesmo mínimo, é aceito', () => {
    expect(verificarValor(despesa({ valor: 70 }))).toBeNull();
    expect(verificarValor(despesa({ valor: '0.001' }))).toBeNull();
  });
});
