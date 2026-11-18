// Modelo de dados interno (plan §3).
import type { Decimal } from 'decimal.js';

export interface Colaborador {
  id: string;
  nome: string;
  centro_custo: string;
}

export interface Periodo {
  competencia: string; // AAAA-MM
  inicio: string; // AAAA-MM-DD, inclusive
  fim: string; // AAAA-MM-DD, inclusive
}

export interface Despesa {
  id: string;
  data: string; // AAAA-MM-DD (comparável como texto)
  categoria: string; // como veio; a normalização (RN-009) é feita pelo motor
  descricao: string;
  fornecedor: string;
  valor: Decimal; // exato, nunca arredondado
  temNotaFiscal: boolean;
  indice: number; // posição na entrada (ordem da saída)
}

export interface Entrada {
  colaborador: Colaborador;
  periodo: Periodo;
  despesas: Despesa[];
}

export interface Avaliacao {
  despesa: Despesa;
  categoria: string; // normalizada (RN-009); pode não ser uma Categoria
  motivosRecusa: string[]; // fase 1; vazio = elegível
  reembolsoExato: Decimal; // fase 2, antes de RN-008
  cortadaPorLimite: boolean; // define 'parcial' (spec §4, status)
  motivoParcial: string | null;
  limiteAplicado: Decimal | null;
  emViagem: boolean;
  diarias: number | null;
}

export type Status = 'integral' | 'parcial' | 'recusada';
