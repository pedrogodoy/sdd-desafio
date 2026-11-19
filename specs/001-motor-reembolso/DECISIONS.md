# Log de Decisões e Mudanças de Spec

> Uma entrada **toda vez** que a spec mudar. Este arquivo é a prova de que a spec
> foi tratada como artefato vivo e não como cerimônia de abertura.
>
> Spec que não muda em dois dias é spec que ninguém consultou. Mudança não é
> demérito — mudança não registrada é.

Ordem cronológica inversa: a mais recente primeiro.

---

## D-002 — "Menor `id`" passa a usar ordem natural · `2026-11-19`

**Gatilho:** ambiguidade que só apareceu ao implementar T-007 e T-012: a spec dizia "menor `id`" e "`id` crescente" sem definir como comparar textos; a implementação comparava caractere a caractere, o que põe `d-10` antes de `d-9`.

**O que mudou na spec:** versão 1.1 → 1.2. Nova definição "Ordem de `id`" no início da §5 e nova AMB-015; RN-001 e RN-004 passam a citá-la e ganham um caso de aceite cada (d-9 × d-10).

**Por quê:** decisão do autor (opção B entre texto puro e ordem natural): a ordem natural é a que uma pessoa espera e consegue conferir.

**O que isso invalidou:** a comparação de texto em `src/regras/duplicata.ts` (T-007) e `src/regras/limite-diario.ts` (T-012). Nenhum resultado da §7 muda (todos os `id`s do exemplo têm três dígitos).

**Tasks afetadas:** nova T-018 (ordem natural de `id` usada por RN-001 e RN-004); T-007 e T-012 não são reabertas — a T-018 substitui a comparação nas duas.

**Custo:** spec, DECISIONS, tasks, plan; 1 módulo novo + 2 regras + 2 arquivos de teste.

---

## D-001 — Coerência do período fica em aberto · `2026-11-18`

**Gatilho:** lacuna que só apareceu ao implementar a validação da entrada (T-003): a spec §4 diz quais campos o período tem, mas não se eles precisam ser coerentes entre si.

**O que mudou na spec:** versão 1.0 → 1.1. Nova entrada em §10 ("O que fica em aberto"): a entrada não é rejeitada por `inicio` > `fim` nem por `competencia` incoerente com as datas; só `inicio` e `fim` valem para RN-003. Nenhuma RN mudou.

**Por quê:** a política do RH não diz qual campo prevalece quando discordam. Rejeitar seria criar regra nova sem base; ignorar em silêncio deixaria a lacuna invisível. A opção registrada não altera nenhum resultado da §7 e, no caso extremo (`inicio` > `fim`), recusa tudo com motivo explícito.

**O que isso invalidou:** nada. `tests/entrada.test.ts` continua valendo.

**Tasks afetadas:** nenhuma refeita; nenhuma criada.

**Custo:** 2 arquivos (spec.md, DECISIONS.md), poucos minutos.
