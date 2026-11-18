// RN-001 — Limite diário por categoria (AMB-001, AMB-002, AMB-003),
// ampliado nas datas em viagem (RN-007).
import { Decimal } from 'decimal.js';
import type { Despesa } from '../modelo.js';
import { FATOR_VIAGEM, LIMITE_DIARIO, MOTIVOS, type CategoriaComLimiteDiario } from '../politica.js';

export interface ItemLimiteDiario {
  despesa: Despesa; // elegível (fase 1)
  categoria: CategoriaComLimiteDiario; // normalizada
}

export interface ResultadoLimiteDiario {
  reembolsoExato: Decimal;
  limiteAplicado: Decimal;
  cortadaPorLimite: boolean;
  motivoParcial: string | null;
  emViagem: boolean;
}

/** Menor valor primeiro; empate por id crescente (comparação de texto). */
function ordemDeConsumo(a: Despesa, b: Despesa): number {
  const porValor = a.valor.comparedTo(b.valor);
  if (porValor !== 0) return porValor;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/**
 * Agrupa por data + categoria e distribui o limite do grupo do menor valor
 * para o maior: cada despesa recebe o integral enquanto houver saldo, a que não
 * couber recebe o saldo e as seguintes, zero. Devolve o resultado por id.
 */
export function aplicarLimiteDiario(
  itens: ItemLimiteDiario[],
  datasEmViagem: ReadonlySet<string>,
): Map<string, ResultadoLimiteDiario> {
  const grupos = new Map<string, ItemLimiteDiario[]>();
  for (const item of itens) {
    const chave = `${item.despesa.data}|${item.categoria}`;
    grupos.set(chave, [...(grupos.get(chave) ?? []), item]);
  }

  const resultados = new Map<string, ResultadoLimiteDiario>();
  for (const grupo of grupos.values()) {
    const { despesa: primeira, categoria } = grupo[0]!;
    const emViagem = datasEmViagem.has(primeira.data);
    const limiteAplicado = emViagem ? LIMITE_DIARIO[categoria].times(FATOR_VIAGEM) : LIMITE_DIARIO[categoria];

    let saldo = limiteAplicado;
    for (const { despesa } of [...grupo].sort((a, b) => ordemDeConsumo(a.despesa, b.despesa))) {
      const reembolsoExato = Decimal.min(despesa.valor, saldo);
      saldo = saldo.minus(reembolsoExato);
      const cortadaPorLimite = reembolsoExato.lt(despesa.valor);
      resultados.set(despesa.id, {
        reembolsoExato,
        limiteAplicado,
        cortadaPorLimite,
        motivoParcial: cortadaPorLimite ? MOTIVOS.limiteDiarioExcedido : null,
        emViagem,
      });
    }
  }
  return resultados;
}
