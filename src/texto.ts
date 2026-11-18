// Normalização de texto usada por RN-009 (categoria) e RN-006 (descrição):
// minúsculas e sem acentos, nada além disso.
export function semAcentoMinusculo(texto: string): string {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}
