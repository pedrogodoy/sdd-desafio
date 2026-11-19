// Montagem do documento de saída (spec §4). Função pura: Entrada + Avaliacao[] → Saida.
// Único ponto onde o reembolso é arredondado (RN-008, DT-001) e Decimal vira número (DT-003).
import { Decimal } from 'decimal.js';
import type { Avaliacao, Colaborador, Entrada, Periodo, Status } from './modelo.js';
import { motivosDe, statusDe } from './motor.js';
import { arredondarReembolso } from './regras/arredondamento.js';

export interface DespesaSaida {
  id: string;
  data: string;
  categoria: string;
  valor_original: number;
  valor_reembolsado: number;
  status: Status;
  motivos: string[];
  limite_aplicado: number | null;
  em_viagem: boolean;
  diarias: number | null;
}

export interface Saida {
  colaborador: Colaborador;
  periodo: Periodo;
  despesas: DespesaSaida[];
  totais: {
    valor_reembolsado: number;
    quantidade: Record<Status, number>;
  };
}

export function montarSaida(entrada: Entrada, avaliacoes: Avaliacao[]): Saida {
  const ordenadas = [...avaliacoes].sort((a, b) => a.despesa.indice - b.despesa.indice);

  let total = new Decimal(0);
  const quantidade: Record<Status, number> = { integral: 0, parcial: 0, recusada: 0 };

  const despesas = ordenadas.map((a): DespesaSaida => {
    const status = statusDe(a);
    const reembolsado = status === 'recusada' ? new Decimal(0) : arredondarReembolso(a.reembolsoExato);
    total = total.plus(reembolsado); // RN-008: total é a soma dos valores já arredondados
    quantidade[status] += 1;
    return {
      id: a.despesa.id,
      data: a.despesa.data,
      categoria: a.categoria,
      valor_original: a.despesa.valor.toNumber(),
      valor_reembolsado: reembolsado.toNumber(),
      status,
      motivos: motivosDe(a),
      limite_aplicado: status === 'recusada' || a.limiteAplicado === null ? null : a.limiteAplicado.toNumber(),
      em_viagem: a.emViagem,
      diarias: status === 'recusada' ? null : a.diarias,
    };
  });

  return {
    colaborador: { ...entrada.colaborador },
    periodo: { ...entrada.periodo },
    despesas,
    totais: { valor_reembolsado: total.toNumber(), quantidade },
  };
}
