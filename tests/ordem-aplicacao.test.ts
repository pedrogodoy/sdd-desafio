import { describe, expect, it } from 'vitest';
import { avaliar } from '../src/motor.js';
import { avaliarDespesas, despesa, entradaDoExemplo } from './fabrica.js';

describe('Spec §8 — ordem de aplicação das regras', () => {
  it('AC: alimentação em 15/04 (fora do período), R$ 150,00, sem nota → "fora do período de competência" e "nota fiscal ausente", nessa ordem', () => {
    const a = avaliarDespesas([
      despesa({ id: 'x', data: '2026-04-15', categoria: 'alimentacao', valor: 150, temNotaFiscal: false }),
    ]).get('x')!;
    expect(a.motivosRecusa).toEqual(['fora do período de competência', 'nota fiscal ausente']);
  });

  it('fase 1 acumula todos os motivos, na ordem da tabela (categoria → valor → período → duplicata → nota)', () => {
    const base = { data: '2026-04-15', categoria: 'Coworking', descricao: 'x', fornecedor: 'y', valor: -150, temNotaFiscal: false };
    const r = avaliarDespesas([despesa({ ...base, id: 'd-1' }), despesa({ ...base, id: 'd-2' })]);
    expect(r.get('d-1')!.motivosRecusa).toEqual([
      'categoria fora da política',
      'valor não positivo',
      'fora do período de competência',
    ]);
    expect(r.get('d-2')!.motivosRecusa).toEqual([
      'categoria fora da política',
      'valor não positivo',
      'fora do período de competência',
      'duplicata de d-1',
    ]);
  });

  it('AC: ALIMENTACAO e alimentacao com os demais campos iguais → duplicatas (a de maior id é recusada)', () => {
    const base = { data: '2026-07-09', descricao: 'Almoco', fornecedor: 'Bistro', valor: 30 };
    const r = avaliarDespesas([
      despesa({ ...base, id: 'd-201', categoria: 'ALIMENTACAO' }),
      despesa({ ...base, id: 'd-200', categoria: 'alimentacao' }),
    ]);
    expect(r.get('d-200')!.motivosRecusa).toEqual([]);
    expect(r.get('d-201')!.motivosRecusa).toEqual(['duplicata de d-200']);
  });

  it('AC: hospedagem sem nota acima de R$ 100,00 → recusada na fase 1 e não gera datas em viagem; diarias nulo', () => {
    const hotel = despesa({ id: 'h', data: '2026-07-20', categoria: 'hospedagem', descricao: '2 diarias', valor: 400, temNotaFiscal: false });
    const almoco = despesa({ id: 'a', data: '2026-07-21', categoria: 'alimentacao', valor: 80 });
    const r = avaliarDespesas([hotel, almoco]);
    expect(r.get('h')).toMatchObject({ motivosRecusa: ['nota fiscal ausente'], diarias: null, limiteAplicado: null, emViagem: false });
    expect(r.get('a')).toMatchObject({ emViagem: false, cortadaPorLimite: true });
    expect(r.get('a')!.limiteAplicado!.toString()).toBe('60');
  });

  it('a mesma hospedagem com nota gera viagem e amplia o limite do dia seguinte', () => {
    const hotel = despesa({ id: 'h', data: '2026-07-20', categoria: 'hospedagem', descricao: '2 diarias', valor: 400, temNotaFiscal: true });
    const almoco = despesa({ id: 'a', data: '2026-07-21', categoria: 'alimentacao', valor: 80 });
    const r = avaliarDespesas([hotel, almoco]);
    expect(r.get('h')).toMatchObject({ motivosRecusa: [], diarias: 2, emViagem: true });
    expect(r.get('a')).toMatchObject({ emViagem: true, cortadaPorLimite: false });
  });

  it('despesa recusada não consome limite diário', () => {
    const dia = { data: '2026-07-20', categoria: 'alimentacao' };
    const r = avaliarDespesas([
      despesa({ ...dia, id: 'fora', valor: 55, data: '2026-08-20' }),
      despesa({ ...dia, id: 'sem-nota', valor: 101, temNotaFiscal: false }),
      despesa({ ...dia, id: 'ok', valor: 60 }),
    ]);
    expect(r.get('ok')!.reembolsoExato.toString()).toBe('60');
    expect(r.get('ok')!.cortadaPorLimite).toBe(false);
  });

  it('o resultado sai na ordem da entrada', () => {
    const { despesas } = entradaDoExemplo();
    expect(avaliar(entradaDoExemplo()).map((a) => a.despesa.id)).toEqual(despesas.map((d) => d.id));
  });

  it('reordenar a entrada não altera nenhum valor reembolsado (spec §9)', () => {
    const entrada = entradaDoExemplo();
    const porId = (lista: ReturnType<typeof avaliar>) =>
      Object.fromEntries(lista.map((a) => [a.despesa.id, [a.reembolsoExato.toString(), a.motivosRecusa, a.emViagem]]));
    const original = porId(avaliar(entrada));
    for (const ordem of [[...entrada.despesas].reverse(), [...entrada.despesas].sort((a, b) => (a.valor.gt(b.valor) ? 1 : -1))]) {
      expect(porId(avaliar({ ...entrada, despesas: ordem }))).toEqual(original);
    }
  });
});
