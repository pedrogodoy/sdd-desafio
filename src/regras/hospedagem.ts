// RN-006 — Limite de hospedagem por diária (AMB-003, AMB-010, AMB-011; DT-005).
import type { Decimal } from 'decimal.js';
import type { Despesa } from '../modelo.js';
import {
  DIARIAS_PADRAO,
  FATOR_VIAGEM,
  LIMITE_POR_DIARIA_HOSPEDAGEM,
  MOTIVOS,
  PALAVRAS_DIARIA,
} from '../politica.js';
import { semAcentoMinusculo } from '../texto.js';

// Palavras mais longas primeiro, para "diarias" não parar em "diaria".
const palavras = [...PALAVRAS_DIARIA].sort((a, b) => b.length - a.length).join('|');
const PADRAO_DIARIAS = new RegExp(String.raw`(\d+)\s*(?:${palavras})\b`, 'g');

/** Primeiro inteiro > 0 seguido de diária(s)/noite(s); sem padrão, N padrão. */
export function extrairDiarias(descricao: string): number {
  for (const [, numero] of semAcentoMinusculo(descricao).matchAll(PADRAO_DIARIAS)) {
    const n = Number(numero);
    if (n > 0) return n;
  }
  return DIARIAS_PADRAO;
}

export interface ResultadoHospedagem {
  diarias: number;
  limiteAplicado: Decimal;
  reembolsoExato: Decimal;
  cortadaPorLimite: boolean;
  motivoParcial: string | null;
}

/** Avalia uma hospedagem elegível isoladamente; o limite é sempre o ampliado (AMB-011). */
export function aplicarLimiteHospedagem(despesa: Despesa): ResultadoHospedagem {
  const diarias = extrairDiarias(despesa.descricao);
  const limiteAplicado = LIMITE_POR_DIARIA_HOSPEDAGEM.times(FATOR_VIAGEM).times(diarias);
  const cortadaPorLimite = despesa.valor.gt(limiteAplicado);
  return {
    diarias,
    limiteAplicado,
    reembolsoExato: cortadaPorLimite ? limiteAplicado : despesa.valor,
    cortadaPorLimite,
    motivoParcial: cortadaPorLimite ? MOTIVOS.limiteHospedagemExcedido : null,
  };
}
