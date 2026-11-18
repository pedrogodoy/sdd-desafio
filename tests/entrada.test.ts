import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ErroEntrada, interpretarEntrada } from '../src/entrada.js';

const exemplo = readFileSync(new URL('../exemplos/despesas-exemplo.json', import.meta.url), 'utf8');

function entradaCom(alterar: (e: any) => void): string {
  const e = JSON.parse(exemplo);
  alterar(e);
  return JSON.stringify(e);
}

function problemas(texto: string): string[] {
  try {
    interpretarEntrada(texto);
  } catch (e) {
    expect(e).toBeInstanceOf(ErroEntrada);
    return (e as ErroEntrada).problemas;
  }
  throw new Error('esperava ErroEntrada');
}

describe('Spec §4 — entrada', () => {
  it('aceita exemplos/despesas-exemplo.json com 14 despesas na ordem do arquivo', () => {
    const entrada = interpretarEntrada(exemplo);
    expect(entrada.colaborador.id).toBe('c-0417');
    expect(entrada.periodo).toEqual({ competencia: '2026-07', inicio: '2026-07-01', fim: '2026-07-31' });
    expect(entrada.despesas).toHaveLength(14);
    expect(entrada.despesas.map((d) => d.indice)).toEqual([...Array(14).keys()]);
    expect(entrada.despesas[13]).toMatchObject({ id: 'd-014', categoria: 'ALIMENTACAO', temNotaFiscal: true });
  });

  it('DT-002: 33.333 vira Decimal exato 33.333; −45 e 100.01 preservados', () => {
    const { despesas } = interpretarEntrada(exemplo);
    const valor = (id: string) => despesas.find((d) => d.id === id)!.valor.toString();
    expect(valor('d-011')).toBe('33.333');
    expect(valor('d-009')).toBe('-45');
    expect(valor('d-004')).toBe('100.01');
  });

  it('aceita lista de despesas vazia', () => {
    const entrada = interpretarEntrada(entradaCom((e) => (e.despesas = [])));
    expect(entrada.despesas).toEqual([]);
  });

  it('rejeita campo obrigatório ausente, citando o campo', () => {
    expect(problemas(entradaCom((e) => delete e.despesas[2].valor))).toEqual([
      'despesas[2].valor: campo obrigatório ausente',
    ]);
    expect(problemas(entradaCom((e) => delete e.periodo)))
      .toEqual(['periodo: campo obrigatório ausente']);
  });

  it('rejeita tipo errado, citando o campo', () => {
    expect(problemas(entradaCom((e) => (e.despesas[0].valor = '72.50')))).toEqual([
      'despesas[0].valor: tipo inválido: esperado número',
    ]);
    expect(problemas(entradaCom((e) => (e.despesas[1].tem_nota_fiscal = 'sim')))).toEqual([
      'despesas[1].tem_nota_fiscal: tipo inválido: esperado booleano',
    ]);
  });

  it('rejeita data inválida (formato e data inexistente)', () => {
    expect(problemas(entradaCom((e) => (e.despesas[0].data = '03/07/2026')))).toEqual([
      'despesas[0].data: data inválida: esperado AAAA-MM-DD',
    ]);
    expect(problemas(entradaCom((e) => (e.periodo.fim = '2026-02-30')))).toEqual([
      'periodo.fim: data inválida: esperado AAAA-MM-DD',
    ]);
  });

  it('rejeita id repetido', () => {
    expect(problemas(entradaCom((e) => (e.despesas[1].id = 'd-001')))).toEqual([
      'despesas[1].id: id repetido: d-001',
    ]);
  });

  it('rejeita competência fora do formato AAAA-MM', () => {
    expect(problemas(entradaCom((e) => (e.periodo.competencia = '07/2026')))).toEqual([
      'periodo.competencia: competência inválida: esperado AAAA-MM',
    ]);
  });

  it('rejeita JSON malformado e documento que não é objeto', () => {
    expect(problemas('{ "colaborador": ')[0]).toMatch(/^JSON malformado/);
    expect(problemas('[]')).toEqual(['tipo inválido: esperado objeto']);
  });

  it('lista todos os problemas encontrados de uma vez', () => {
    const lista = problemas(
      entradaCom((e) => {
        delete e.colaborador.nome;
        e.despesas[0].valor = null;
      }),
    );
    expect(lista).toHaveLength(2);
  });
});
