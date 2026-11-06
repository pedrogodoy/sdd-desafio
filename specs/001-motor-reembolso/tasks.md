# Tasks — Motor de Cálculo de Reembolso

> Cada task é pequena o bastante para virar **um commit**. Se você não consegue
> descrever o critério de aceite como "o teste X passa", a task está grande demais.
>
> Marque `[x]` conforme conclui — ao longo do caminho, não tudo no fim. O histórico
> de quando cada task foi marcada é lido na correção.

**Formato do commit:** `feat(T-003): <descrição>` · `test(T-003): <descrição>`

**Baseado em:** spec 1.0 · plan 1.0

---

## Fase 1 — Fundação

- [ ] **T-001** — Inicializa o projeto: `package.json` com dependências do plan §1, `tsconfig.json`, scripts `reembolso`, `test` e `typecheck`.
  - **Atende:** plan §1
  - **Aceite:** `npm test` executa e passa `tests/setup.test.ts` (teste trivial); `npm run typecheck` termina sem erros.
  - **Commit:**

- [ ] **T-002** — Cria `src/modelo.ts` (tipos do plan §3) e `src/politica.ts` (limites, fator de viagem, limiar de nota, categorias, textos de motivo, palavras de diária).
  - **Atende:** plan §3, plan §4; valores de RN-001, RN-002, RN-006, RN-007, RN-009
  - **Aceite:** `tests/politica.test.ts` — confere cada constante contra o número/texto escrito na spec (60, 80, 250, 1,5, 100; três categorias; motivos da spec §4).
  - **Commit:**

- [ ] **T-003** — Valida a entrada e converte para o modelo interno (`src/entrada.ts`), com valores em `Decimal` (DT-001, DT-002).
  - **Atende:** spec §4 (entrada e rejeição de entrada malformada)
  - **Aceite:** `tests/entrada.test.ts` — aceita `exemplos/despesas-exemplo.json`; aceita lista de despesas vazia; rejeita, com mensagem que cita o campo: campo obrigatório ausente, tipo errado, data inválida, `id` repetido; `33.333` vira `Decimal('33.333')`.
  - **Commit:**

## Fase 2 — Regras de negócio

Cada task cria um arquivo em `src/regras/` e o seu teste. Os `it(...)` reproduzem literalmente os casos de **Aceite** da RN na spec.

- [ ] **T-004** — Normalização e verificação de categoria (`regras/categoria.ts`).
  - **Atende:** RN-009, AMB-013
  - **Aceite:** `tests/rn-009-categoria.test.ts` passa (d-005 recusada; `ALIMENTACAO` e `Alimentação` → `alimentacao`; `transporte urbano` recusada).
  - **Commit:**

- [ ] **T-005** — Verificação de valor não positivo (`regras/valor.ts`).
  - **Atende:** RN-005, AMB-009
  - **Aceite:** `tests/rn-005-valor-nao-positivo.test.ts` passa (d-009 −45 recusada; 0 recusada; positivo aceito).
  - **Commit:**

- [ ] **T-006** — Verificação de período de competência (`regras/periodo.ts`).
  - **Atende:** RN-003, AMB-007
  - **Aceite:** `tests/rn-003-periodo.test.ts` passa (d-008 recusada; 01/07 e 31/07 elegíveis; 01/08 recusada).
  - **Commit:**

- [ ] **T-007** — Detecção de duplicatas (`regras/duplicata.ts`), comparando categoria normalizada.
  - **Atende:** RN-004, AMB-008
  - **Aceite:** `tests/rn-004-duplicata.test.ts` passa (d-007 "duplicata de d-006"; descrição diferente não é duplicata; trio mantém o menor `id`; `ALIMENTACAO` × `alimentacao` são duplicatas).
  - **Commit:**

- [ ] **T-008** — Verificação de nota fiscal (`regras/nota-fiscal.ts`).
  - **Atende:** RN-002, AMB-004, AMB-005, AMB-006
  - **Aceite:** `tests/rn-002-nota-fiscal.test.ts` passa (100,00 sem nota aceita; 100,01 sem nota recusada; 150,00 com nota aceita; 100,004 sem nota recusada).
  - **Commit:**

- [ ] **T-009** — Arredondamento meio para o par (`regras/arredondamento.ts`).
  - **Atende:** RN-008, AMB-012
  - **Aceite:** `tests/rn-008-arredondamento.test.ts` passa (33,333 → 33,33; 10,125 → 10,12; 10,135 → 10,14).
  - **Commit:**

- [ ] **T-010** — Número de diárias e limite de hospedagem (`regras/hospedagem.ts`).
  - **Atende:** RN-006, AMB-010, AMB-011 (limite sempre ampliado), DT-005
  - **Aceite:** `tests/rn-006-hospedagem.test.ts` passa (d-010 N=2 integral 480; 800 com 2 diárias → 750; "Pousada" 400 → 375; "duas diarias" → N=1).
  - **Commit:**

- [ ] **T-011** — Datas em viagem a partir das hospedagens elegíveis (`regras/viagem.ts`).
  - **Atende:** RN-007, AMB-011
  - **Aceite:** `tests/rn-007-viagem.test.ts` passa (d-010 → 14, 15 e 16/07; hospedagem recusada não gera datas; sobreposição não acumula).
  - **Commit:**

- [ ] **T-012** — Limite diário por categoria com distribuição do menor para o maior e limite ampliado em viagem (`regras/limite-diario.ts`).
  - **Atende:** RN-001, RN-007, AMB-001, AMB-002, AMB-003
  - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa (03/07 → d-002 38, d-001 22; 61 → 60; 60 → 60 integral; categorias independentes; empate por `id`) e os casos de limite ampliado da RN-007 (85 em 16/07 integral; 85 em 17/07 → 60).
  - **Commit:**

## Fase 3 — Orquestração e casos de borda

- [ ] **T-013** — Motor (`src/motor.ts`): fase 1 com acúmulo de todos os motivos na ordem da spec §8, fase 2 só com elegíveis.
  - **Atende:** spec §8, DT-004
  - **Aceite:** `tests/ordem-aplicacao.test.ts` passa (15/04 + R$ 150 sem nota → dois motivos na ordem; recusada não consome limite; hospedagem recusada não gera viagem; reordenar a entrada não altera valores).
  - **Commit:**

- [ ] **T-014** — Teste de ponta a ponta do exemplo no nível do motor.
  - **Atende:** spec §7
  - **Aceite:** `tests/exemplo-ponta-a-ponta.test.ts` passa — cada uma das 14 despesas com status, valor reembolsado, motivos, limite aplicado, em viagem e diárias da tabela da spec §7.
  - **Commit:**

## Fase 4 — Saída e CLI

- [ ] **T-015** — Montagem da saída (`src/saida.ts`): schema da spec §4, ordem da entrada, totais, conversão Decimal → número (DT-003).
  - **Atende:** spec §4 (saída), RN-008 (totais = soma dos arredondados)
  - **Aceite:** `tests/saida.test.ts` passa (exemplo pequeno da spec §4 idêntico; motivos vazios em integral; `limite_aplicado` nulo em recusada) e `exemplo-ponta-a-ponta.test.ts` passa a conferir totais: R$ 815,43; 5 integral, 3 parcial, 6 recusada.
  - **Commit:**

- [ ] **T-016** — CLI (`src/cli.ts`): `calcular --input --output`, erro de formato sem gerar saída, código de saída diferente de zero em erro.
  - **Atende:** interface fixa do desafio; spec §9
  - **Aceite:** `tests/cli.test.ts` passa (exemplo gera arquivo igual ao esperado; entrada inválida não cria arquivo e sai com erro; lista vazia gera totais zerados; duas execuções produzem saídas idênticas).
  - **Commit:**

- [ ] **T-017** — README do projeto: o que é, como instalar, rodar e testar, onde estão spec/plan/tasks.
  - **Atende:** entrega do desafio
  - **Aceite:** seguindo só o README num clone limpo, `npm install`, `npm test` e o comando de exemplo funcionam.
  - **Commit:**

---

## Fase 5 — Envelope (criar no Dia 2)

<Novas tasks a partir da mudança de requisito. Numeração continua de onde parou —
não reinicie e não renumere as antigas: a numeração é o eixo da rastreabilidade.>

---

## Cobertura

| Regra da spec | Task | Teste |
|---|---|---|
| RN-001 | T-012 | `tests/rn-001-limite-diario.test.ts` |
| RN-002 | T-008 | `tests/rn-002-nota-fiscal.test.ts` |
| RN-003 | T-006 | `tests/rn-003-periodo.test.ts` |
| RN-004 | T-007 | `tests/rn-004-duplicata.test.ts` |
| RN-005 | T-005 | `tests/rn-005-valor-nao-positivo.test.ts` |
| RN-006 | T-010 | `tests/rn-006-hospedagem.test.ts` |
| RN-007 | T-011, T-012 | `tests/rn-007-viagem.test.ts`, `tests/rn-001-limite-diario.test.ts` |
| RN-008 | T-009, T-015 | `tests/rn-008-arredondamento.test.ts`, `tests/saida.test.ts` |
| RN-009 | T-004 | `tests/rn-009-categoria.test.ts` |
| AMB-001, AMB-002, AMB-003 | T-012 | `tests/rn-001-limite-diario.test.ts` |
| AMB-004, AMB-005, AMB-006 | T-008 | `tests/rn-002-nota-fiscal.test.ts` |
| AMB-007 | T-006 | `tests/rn-003-periodo.test.ts` |
| AMB-008 | T-007 | `tests/rn-004-duplicata.test.ts` |
| AMB-009 | T-005 | `tests/rn-005-valor-nao-positivo.test.ts` |
| AMB-010 | T-010 | `tests/rn-006-hospedagem.test.ts` |
| AMB-011 | T-010, T-011 | `tests/rn-006-hospedagem.test.ts`, `tests/rn-007-viagem.test.ts` |
| AMB-012 | T-009 | `tests/rn-008-arredondamento.test.ts` |
| AMB-013 | T-004 | `tests/rn-009-categoria.test.ts` |
| AMB-014 | T-014 | `tests/exemplo-ponta-a-ponta.test.ts` (d-012) |
| Spec §4 (entrada) | T-003 | `tests/entrada.test.ts` |
| Spec §4 (saída) | T-015 | `tests/saida.test.ts` |
| Spec §7 | T-014, T-015 | `tests/exemplo-ponta-a-ponta.test.ts` |
| Spec §8 | T-013 | `tests/ordem-aplicacao.test.ts` |
| Spec §9 | T-014, T-015, T-016 | `tests/exemplo-ponta-a-ponta.test.ts`, `tests/cli.test.ts` |
