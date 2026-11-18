# Log de Decisões e Mudanças de Spec

> Uma entrada **toda vez** que a spec mudar. Este arquivo é a prova de que a spec
> foi tratada como artefato vivo e não como cerimônia de abertura.
>
> Spec que não muda em dois dias é spec que ninguém consultou. Mudança não é
> demérito — mudança não registrada é.

Ordem cronológica inversa: a mais recente primeiro.

---

## D-001 — Coerência do período fica em aberto · `2026-11-18`

**Gatilho:** lacuna que só apareceu ao implementar a validação da entrada (T-003): a spec §4 diz quais campos o período tem, mas não se eles precisam ser coerentes entre si.

**O que mudou na spec:** versão 1.0 → 1.1. Nova entrada em §10 ("O que fica em aberto"): a entrada não é rejeitada por `inicio` > `fim` nem por `competencia` incoerente com as datas; só `inicio` e `fim` valem para RN-003. Nenhuma RN mudou.

**Por quê:** a política do RH não diz qual campo prevalece quando discordam. Rejeitar seria criar regra nova sem base; ignorar em silêncio deixaria a lacuna invisível. A opção registrada não altera nenhum resultado da §7 e, no caso extremo (`inicio` > `fim`), recusa tudo com motivo explícito.

**O que isso invalidou:** nada. `tests/entrada.test.ts` continua valendo.

**Tasks afetadas:** nenhuma refeita; nenhuma criada.

**Custo:** 2 arquivos (spec.md, DECISIONS.md), poucos minutos.
