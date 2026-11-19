// RN-004 — Duplicatas (AMB-008).
import type { Despesa } from '../modelo.js';
import { MOTIVOS } from '../politica.js';
import { compararIds } from '../texto.js';

export interface ItemDuplicata {
  despesa: Despesa;
  categoria: string; // já normalizada (spec §8, etapa 4)
}

/** Todos os campos exceto `id`; Decimal.toString() ignora zeros à direita (54.90 = 54.9). */
function chave({ despesa: d, categoria }: ItemDuplicata): string {
  return JSON.stringify([d.data, categoria, d.descricao, d.fornecedor, d.valor.toString(), d.temNotaFiscal]);
}

/**
 * Considera todas as despesas da entrada. Devolve, para cada despesa recusada
 * como duplicata, o motivo "duplicata de <id mantido>"; a de menor `id` (ordem natural, AMB-015) do grupo
 * não aparece no mapa.
 */
export function detectarDuplicatas(itens: ItemDuplicata[]): Map<string, string> {
  const grupos = new Map<string, string[]>();
  for (const item of itens) {
    const k = chave(item);
    grupos.set(k, [...(grupos.get(k) ?? []), item.despesa.id]);
  }

  const motivos = new Map<string, string>();
  for (const ids of grupos.values()) {
    const [mantido, ...demais] = [...ids].sort(compararIds);
    for (const id of demais) motivos.set(id, MOTIVOS.duplicataDe(mantido!));
  }
  return motivos;
}
