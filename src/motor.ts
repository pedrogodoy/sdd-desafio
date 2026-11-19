// Orquestração das fases da spec §8 (DT-004). Função pura: Entrada → Avaliacao[].
import { Decimal } from 'decimal.js';
import type { Avaliacao, Entrada, Status } from './modelo.js';
import { normalizarCategoria, verificarCategoria } from './regras/categoria.js';
import { detectarDuplicatas } from './regras/duplicata.js';
import { aplicarLimiteHospedagem } from './regras/hospedagem.js';
import { aplicarLimiteDiario, type ItemLimiteDiario } from './regras/limite-diario.js';
import { verificarNotaFiscal } from './regras/nota-fiscal.js';
import { verificarPeriodo } from './regras/periodo.js';
import { verificarValor } from './regras/valor.js';
import { datasEmViagem } from './regras/viagem.js';

/** Avalia todas as despesas; o resultado sai na ordem da entrada. */
export function avaliar(entrada: Entrada): Avaliacao[] {
  const itens = entrada.despesas.map((despesa) => ({ despesa, categoria: normalizarCategoria(despesa.categoria) }));

  // Fase 1 — elegibilidade: todas as verificações, na ordem da spec §8; nenhuma interrompe as seguintes.
  const duplicatas = detectarDuplicatas(itens);
  const avaliacoes: Avaliacao[] = itens.map(({ despesa, categoria }) => ({
    despesa,
    categoria,
    motivosRecusa: [
      verificarCategoria(categoria), // 1 — RN-009
      verificarValor(despesa), // 2 — RN-005
      verificarPeriodo(despesa, entrada.periodo), // 3 — RN-003
      duplicatas.get(despesa.id) ?? null, // 4 — RN-004
      verificarNotaFiscal(despesa), // 5 — RN-002
    ].filter((m): m is string => m !== null),
    reembolsoExato: new Decimal(0),
    cortadaPorLimite: false,
    motivoParcial: null,
    limiteAplicado: null,
    emViagem: false,
    diarias: null,
  }));

  // Fase 2 — valor reembolsado, só para elegíveis.
  const elegiveis = avaliacoes.filter((a) => a.motivosRecusa.length === 0);

  // 6 — RN-007
  const viagem = datasEmViagem(elegiveis.filter((a) => a.categoria === 'hospedagem').map((a) => a.despesa));
  for (const a of avaliacoes) a.emViagem = viagem.has(a.despesa.data);

  // 7 — RN-006
  for (const a of elegiveis.filter((x) => x.categoria === 'hospedagem')) {
    const r = aplicarLimiteHospedagem(a.despesa);
    Object.assign(a, {
      reembolsoExato: r.reembolsoExato,
      limiteAplicado: r.limiteAplicado,
      cortadaPorLimite: r.cortadaPorLimite,
      motivoParcial: r.motivoParcial,
      diarias: r.diarias,
    });
  }

  // 8 — RN-001 com RN-007
  const comLimiteDiario = elegiveis.filter((x) => x.categoria !== 'hospedagem');
  const resultadosDiarios = aplicarLimiteDiario(
    comLimiteDiario.map((a) => ({ despesa: a.despesa, categoria: a.categoria }) as ItemLimiteDiario),
    viagem,
  );
  for (const a of comLimiteDiario) {
    const r = resultadosDiarios.get(a.despesa.id)!;
    Object.assign(a, {
      reembolsoExato: r.reembolsoExato,
      limiteAplicado: r.limiteAplicado,
      cortadaPorLimite: r.cortadaPorLimite,
      motivoParcial: r.motivoParcial,
    });
  }

  // 9 — RN-008: o arredondamento é aplicado na montagem da saída (DT-001, T-015).
  return avaliacoes;
}

/** Spec §4: recusada se falhou na fase 1; parcial se cortada por limite; senão integral. */
export function statusDe(a: Avaliacao): Status {
  if (a.motivosRecusa.length > 0) return 'recusada';
  return a.cortadaPorLimite ? 'parcial' : 'integral';
}

/** Spec §4: vazia se integral; o motivo do limite se parcial; todos os da fase 1 se recusada. */
export function motivosDe(a: Avaliacao): string[] {
  const status = statusDe(a);
  if (status === 'recusada') return [...a.motivosRecusa];
  if (status === 'parcial') return [a.motivoParcial!];
  return [];
}
