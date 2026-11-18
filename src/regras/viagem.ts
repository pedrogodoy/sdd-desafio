// RN-007 — Datas em viagem (AMB-011).
import type { Despesa } from '../modelo.js';
import { extrairDiarias } from './hospedagem.js';

const UM_DIA_MS = 24 * 60 * 60 * 1000;

function somarDias(data: string, dias: number): string {
  const instante = Date.parse(`${data}T00:00:00Z`) + dias * UM_DIA_MS;
  return new Date(instante).toISOString().slice(0, 10);
}

/**
 * Recebe apenas hospedagens elegíveis (não recusadas na fase 1).
 * Cada uma cobre de `data` a `data` + N, inclusive; sobreposições não acumulam.
 */
export function datasEmViagem(hospedagensElegiveis: Despesa[]): Set<string> {
  const datas = new Set<string>();
  for (const h of hospedagensElegiveis) {
    const n = extrairDiarias(h.descricao);
    for (let i = 0; i <= n; i += 1) datas.add(somarDias(h.data, i));
  }
  return datas;
}
