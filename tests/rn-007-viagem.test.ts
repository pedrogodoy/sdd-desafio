import { describe, expect, it } from 'vitest';
import { datasEmViagem } from '../src/regras/viagem.js';
import { despesa, doExemplo } from './fabrica.js';

const hospedagem = (data: string, descricao: string) =>
  despesa({ categoria: 'hospedagem', data, descricao, valor: 300 });

const ordenadas = (s: Set<string>) => [...s].sort();

describe('RN-007 — datas em viagem', () => {
  it('AC: d-010 (14/07, N = 2, aceita) → em viagem em 14/07, 15/07 e 16/07', () => {
    expect(ordenadas(datasEmViagem([doExemplo('d-010')]))).toEqual(['2026-07-14', '2026-07-15', '2026-07-16']);
  });

  it.todo('AC: d-011 R$ 33,333 em 15/07 → limite 90 → integral (R$ 33,33) — com o limite diário, T-012');
  it.todo('AC: alimentação R$ 85,00 em 16/07 (check-out) → integral, limite 90 — com o limite diário, T-012');
  it.todo('AC: alimentação R$ 85,00 em 17/07 → R$ 60,00 (parcial; fora da viagem) — com o limite diário, T-012');
  it.todo('AC: d-013 recusada → 22/07–25/07 não são viagem; alimentação R$ 70,00 em 23/07 → R$ 60,00 — via motor, T-013');

  it('sem hospedagem elegível, não há datas em viagem', () => {
    expect(datasEmViagem([]).size).toBe(0);
  });

  it('hospedagens sobrepostas somam as datas cobertas, sem repetir', () => {
    const datas = datasEmViagem([hospedagem('2026-07-14', '2 diarias'), hospedagem('2026-07-15', '2 noites')]);
    expect(ordenadas(datas)).toEqual(['2026-07-14', '2026-07-15', '2026-07-16', '2026-07-17']);
  });

  it('sem padrão de diárias, N = 1 → data de entrada e de check-out', () => {
    expect(ordenadas(datasEmViagem([hospedagem('2026-07-20', 'Pousada')]))).toEqual(['2026-07-20', '2026-07-21']);
  });

  it('atravessa a virada do mês', () => {
    expect(ordenadas(datasEmViagem([hospedagem('2026-07-30', '3 noites')]))).toEqual([
      '2026-07-30', '2026-07-31', '2026-08-01', '2026-08-02',
    ]);
  });
});
