// RN-008 — Precisão e arredondamento (AMB-012).
import { Decimal } from 'decimal.js';
import { CASAS_DECIMAIS_REEMBOLSO } from '../politica.js';

/** Única operação de arredondamento do sistema: meio para o par, no reembolso de cada despesa. */
export function arredondarReembolso(valorExato: Decimal): Decimal {
  return valorExato.toDecimalPlaces(CASAS_DECIMAIS_REEMBOLSO, Decimal.ROUND_HALF_EVEN);
}
