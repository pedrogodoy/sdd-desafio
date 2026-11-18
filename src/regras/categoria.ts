// RN-009 — Categorias reembolsáveis (AMB-013).
import { CATEGORIAS_REEMBOLSAVEIS, MOTIVOS, type Categoria } from '../politica.js';
import { semAcentoMinusculo } from '../texto.js';

/** Minúsculas e sem acentos; nenhuma outra transformação (espaços, hífens, sinônimos). */
export function normalizarCategoria(categoria: string): string {
  return semAcentoMinusculo(categoria);
}

export function ehCategoriaReembolsavel(categoria: string): categoria is Categoria {
  return (CATEGORIAS_REEMBOLSAVEIS as readonly string[]).includes(categoria);
}

/** Recebe a categoria já normalizada; devolve o motivo de recusa ou null. */
export function verificarCategoria(categoriaNormalizada: string): string | null {
  return ehCategoriaReembolsavel(categoriaNormalizada) ? null : MOTIVOS.categoriaForaDaPolitica;
}
