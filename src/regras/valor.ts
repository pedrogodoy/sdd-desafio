// RN-005 — Valores não positivos (AMB-009).
import type { Despesa } from '../modelo.js';
import { MOTIVOS } from '../politica.js';

/** Devolve o motivo de recusa ou null. */
export function verificarValor(despesa: Despesa): string | null {
  return despesa.valor.lte(0) ? MOTIVOS.valorNaoPositivo : null;
}
