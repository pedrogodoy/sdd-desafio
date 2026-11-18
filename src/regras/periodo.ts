// RN-003 — Período de competência (AMB-007).
import type { Despesa, Periodo } from '../modelo.js';
import { MOTIVOS } from '../politica.js';

/** Datas AAAA-MM-DD comparam corretamente como texto; extremos inclusivos. */
export function verificarPeriodo(despesa: Despesa, periodo: Periodo): string | null {
  const dentro = despesa.data >= periodo.inicio && despesa.data <= periodo.fim;
  return dentro ? null : MOTIVOS.foraDoPeriodo;
}
