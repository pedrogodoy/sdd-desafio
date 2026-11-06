# CLAUDE.md

## O projeto

Motor de cálculo de reembolso de despesas corporativas. CLI que lê um JSON de
despesas e emite um JSON com o valor reembolsável e a justificativa de cada item.

## Fonte da verdade

`specs/001-motor-reembolso/spec.md` define **o que** o sistema faz.
`specs/001-motor-reembolso/plan.md` define **como**.
`specs/001-motor-reembolso/tasks.md` define **em que ordem**.

Quando o código e a spec discordarem, a spec está certa e o código é o bug —
a menos que a spec esteja errada, e nesse caso corrigimos a spec primeiro e
registramos em `DECISIONS.md`.

**Antes de implementar qualquer coisa, leia a task correspondente em `tasks.md`.**
Se o que eu pedi não está coberto por nenhuma task, me avise em vez de implementar.

## Regras de trabalho

- Toda regra de negócio vive na spec, não no chat e não em comentário de código.
- Se eu te explicar uma regra que não está na spec, **pare e me diga isso** antes
  de escrever código. Isso é um bug de spec.
- Todo commit referencia uma task: `feat(T-003): <descrição>`.
  Mudanças de documentação: `docs(spec):`, `docs(plan):`, `docs(tasks):`.
- Nenhuma regra de negócio entra sem teste.

## Stack e comandos

- Linguagem: TypeScript sobre Node.js 20 (detalhes e motivos em `plan.md` §1)
- Rodar: `npm run reembolso -- calcular --input <entrada.json> --output <saida.json>`
- Testes: `npm test`
- Checagem de tipos: `npm run typecheck`

## Convenções de código

- Estrutura de pastas e responsabilidade de cada módulo: `plan.md` §2. Uma regra (RN) por arquivo em `src/regras/`.
- Só `src/cli.ts` faz I/O; o resto é função pura.
- Números e textos da política só em `src/politica.ts` — nunca literais dentro de `src/regras/`.
- Valores monetários: sempre `Decimal` (decimal.js). Nunca `number` em cálculo ou comparação de dinheiro; arredondamento só na saída (RN-008).
- Testes: um arquivo por RN (`tests/rn-00N-*.test.ts`), `describe` com o ID da regra e `it` com o caso de aceite da spec.

## Fora de escopo

- Ver `spec.md` §3. Não adicionar comando, flag, campo de saída ou regra que não esteja na spec.
