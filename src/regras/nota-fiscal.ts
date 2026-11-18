// RN-002 — Nota fiscal obrigatória acima do limiar (AMB-004, AMB-005, AMB-006).
import type { Despesa } from '../modelo.js';
import { LIMIAR_NOTA_FISCAL, MOTIVOS } from '../politica.js';

/** Por despesa, sobre o valor original exato; comparação estrita. */
export function verificarNotaFiscal(despesa: Despesa): string | null {
  const exigeNota = despesa.valor.gt(LIMIAR_NOTA_FISCAL);
  return exigeNota && !despesa.temNotaFiscal ? MOTIVOS.notaFiscalAusente : null;
}
