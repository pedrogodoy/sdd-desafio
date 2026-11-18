// Validação da entrada (spec §4) e conversão para o modelo interno (plan §3).
// Função pura: recebe o texto do arquivo, devolve Entrada ou lança ErroEntrada.
import { Decimal } from 'decimal.js';
import { z } from 'zod';
import type { Entrada } from './modelo.js';

export class ErroEntrada extends Error {
  constructor(public readonly problemas: string[]) {
    super(`Entrada inválida:\n${problemas.map((p) => `- ${p}`).join('\n')}`);
    this.name = 'ErroEntrada';
  }
}

const ausenteOu = (mensagem: string) => (iss: { input?: unknown }) =>
  iss.input === undefined ? 'campo obrigatório ausente' : mensagem;

const texto = () => z.string({ error: ausenteOu('tipo inválido: esperado texto') });
const data = () =>
  z.iso.date({ error: ausenteOu('data inválida: esperado AAAA-MM-DD') });

const schemaDespesa = z.object(
  {
    id: texto(),
    data: data(),
    categoria: texto(),
    descricao: texto(),
    fornecedor: texto(),
    valor: z.number({ error: ausenteOu('tipo inválido: esperado número') }),
    tem_nota_fiscal: z.boolean({ error: ausenteOu('tipo inválido: esperado booleano') }),
  },
  { error: ausenteOu('tipo inválido: esperado objeto') },
);

const schemaEntrada = z.object(
  {
    colaborador: z.object(
      { id: texto(), nome: texto(), centro_custo: texto() },
      { error: ausenteOu('tipo inválido: esperado objeto') },
    ),
    periodo: z.object(
      {
        competencia: z
          .string({ error: ausenteOu('tipo inválido: esperado texto') })
          .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'competência inválida: esperado AAAA-MM'),
        inicio: data(),
        fim: data(),
      },
      { error: ausenteOu('tipo inválido: esperado objeto') },
    ),
    despesas: z
      .array(schemaDespesa, { error: ausenteOu('tipo inválido: esperado lista') })
      .superRefine((despesas, ctx) => {
        const vistos = new Set<string>();
        despesas.forEach((d, i) => {
          if (vistos.has(d.id)) {
            ctx.addIssue({ code: 'custom', path: [i, 'id'], message: `id repetido: ${d.id}` });
          }
          vistos.add(d.id);
        });
      }),
  },
  { error: 'tipo inválido: esperado objeto' },
);

function caminho(path: PropertyKey[]): string {
  return path
    .map((p, i) => (typeof p === 'number' ? `[${p}]` : `${i === 0 ? '' : '.'}${String(p)}`))
    .join('');
}

export function interpretarEntrada(textoArquivo: string): Entrada {
  let bruto: unknown;
  try {
    bruto = JSON.parse(textoArquivo);
  } catch (e) {
    throw new ErroEntrada([`JSON malformado: ${(e as Error).message}`]);
  }

  const resultado = schemaEntrada.safeParse(bruto);
  if (!resultado.success) {
    throw new ErroEntrada(
      resultado.error.issues.map((iss) =>
        iss.path.length > 0 ? `${caminho(iss.path)}: ${iss.message}` : iss.message,
      ),
    );
  }

  const { colaborador, periodo, despesas } = resultado.data;
  return {
    colaborador,
    periodo,
    despesas: despesas.map((d, indice) => ({
      id: d.id,
      data: d.data,
      categoria: d.categoria,
      descricao: d.descricao,
      fornecedor: d.fornecedor,
      valor: new Decimal(String(d.valor)), // DT-002
      temNotaFiscal: d.tem_nota_fiscal,
      indice,
    })),
  };
}
