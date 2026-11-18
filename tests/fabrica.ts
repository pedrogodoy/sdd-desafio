// Fábricas de dados para os testes de regra (não é teste: não termina em .test.ts).
import { readFileSync } from 'node:fs';
import { Decimal } from 'decimal.js';
import { interpretarEntrada } from '../src/entrada.js';
import type { Despesa, Entrada } from '../src/modelo.js';

let sequencia = 0;

type DadosDespesa = Partial<Omit<Despesa, 'valor'>> & { valor?: string | number };

/** Despesa válida com valores neutros; sobrescreva só o que importa para o caso. */
export function despesa(dados: DadosDespesa = {}): Despesa {
  sequencia += 1;
  const { valor = '10', ...resto } = dados;
  return {
    id: `t-${String(sequencia).padStart(3, '0')}`,
    data: '2026-07-10',
    categoria: 'alimentacao',
    descricao: 'Despesa de teste',
    fornecedor: 'Fornecedor de teste',
    temNotaFiscal: true,
    indice: 0,
    ...resto,
    valor: new Decimal(String(valor)),
  };
}

export function textoDoExemplo(): string {
  return readFileSync(new URL('../exemplos/despesas-exemplo.json', import.meta.url), 'utf8');
}

export function entradaDoExemplo(): Entrada {
  return interpretarEntrada(textoDoExemplo());
}

/** Despesa do arquivo de exemplo pelo id (ex.: 'd-005'). */
export function doExemplo(id: string): Despesa {
  const encontrada = entradaDoExemplo().despesas.find((d) => d.id === id);
  if (!encontrada) throw new Error(`despesa ${id} não existe no exemplo`);
  return encontrada;
}
