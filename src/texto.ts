// Normalização de texto usada por RN-009 (categoria) e RN-006 (descrição):
// minúsculas e sem acentos, nada além disso.
export function semAcentoMinusculo(texto: string): string {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function compararTexto(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Algarismos sem zeros à esquerda; mais dígitos = maior; mesmo tamanho, texto. */
function compararNumeros(a: string, b: string): number {
  const x = a.replace(/^0+/, '');
  const y = b.replace(/^0+/, '');
  return x.length !== y.length ? x.length - y.length : compararTexto(x, y);
}

/**
 * Ordem de `id` (spec §5, AMB-015): por trechos, da esquerda para a direita;
 * algarismos pelo valor numérico, o resto caractere a caractere; empate
 * (ex.: d-01 × d-1) resolvido pela comparação caractere a caractere do id inteiro.
 */
export function compararIds(a: string, b: string): number {
  // split com grupo de captura: trechos de algarismos ficam sempre nas posições ímpares
  const ta = a.split(/(\d+)/);
  const tb = b.split(/(\d+)/);
  for (let i = 0; i < Math.min(ta.length, tb.length); i += 1) {
    const r = i % 2 === 1 ? compararNumeros(ta[i]!, tb[i]!) : compararTexto(ta[i]!, tb[i]!);
    if (r !== 0) return Math.sign(r);
  }
  return Math.sign(ta.length - tb.length) || compararTexto(a, b);
}
