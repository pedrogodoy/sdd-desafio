// Todos os números e textos da política de reembolso (plan §4).
// Cada constante cita a regra da spec que a define.
import { Decimal } from 'decimal.js';

// RN-009
export const CATEGORIAS_REEMBOLSAVEIS = ['alimentacao', 'transporte_urbano', 'hospedagem'] as const;
export type Categoria = (typeof CATEGORIAS_REEMBOLSAVEIS)[number];

// RN-001
export const LIMITE_DIARIO = {
  alimentacao: new Decimal('60'),
  transporte_urbano: new Decimal('80'),
} as const;
export type CategoriaComLimiteDiario = keyof typeof LIMITE_DIARIO;

// RN-006
export const LIMITE_POR_DIARIA_HOSPEDAGEM = new Decimal('250');
export const PALAVRAS_DIARIA = ['diaria', 'diarias', 'noite', 'noites'] as const;
export const DIARIAS_PADRAO = 1;

// RN-007
export const FATOR_VIAGEM = new Decimal('1.5');

// RN-002
export const LIMIAR_NOTA_FISCAL = new Decimal('100');

// RN-008
export const CASAS_DECIMAIS_REEMBOLSO = 2;

// Spec §4 (motivos) e §8 (motivos de recusa)
export const MOTIVOS = {
  categoriaForaDaPolitica: 'categoria fora da política',
  valorNaoPositivo: 'valor não positivo',
  foraDoPeriodo: 'fora do período de competência',
  duplicataDe: (idMantido: string) => `duplicata de ${idMantido}`,
  notaFiscalAusente: 'nota fiscal ausente',
  limiteDiarioExcedido: 'limite diário excedido',
  limiteHospedagemExcedido: 'limite de hospedagem excedido',
} as const;
