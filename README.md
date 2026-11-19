# Motor de Cálculo de Reembolso

CLI que lê um JSON com as despesas de um colaborador num período de competência e
gera um JSON com, para cada despesa, o valor reembolsável, o status
(`integral`, `parcial` ou `recusada`) e os motivos — segundo a política de
reembolso desambiguada em [`spec.md`](specs/001-motor-reembolso/spec.md).

Projeto construído com Spec Driven Development para o desafio descrito em
[`DESAFIO.md`](DESAFIO.md).

## Requisitos

- Node.js 20 ou superior (`node --version`)
- npm

## Instalar

```bash
npm install
```

## Rodar

```bash
npm run reembolso -- calcular --input exemplos/despesas-exemplo.json --output saida.json
```

- `--input`: arquivo de entrada, no formato da [spec §4](specs/001-motor-reembolso/spec.md#4-entrada-e-saída).
- `--output`: arquivo de saída a gerar (sobrescrito se existir).

Com o exemplo, `saida.json` traz as 14 despesas e os totais
`valor_reembolsado: 815.43` e `quantidade: { integral: 5, parcial: 3, recusada: 6 }`
(spec §7).

**Erros.** Entrada fora do formato (JSON malformado, campo ausente, tipo errado,
data inválida, `id` repetido) é rejeitada por inteiro: nenhum arquivo de saída é
criado, o problema é listado no terminal (com o caminho do campo, ex.:
`despesas[0].valor: campo obrigatório ausente`) e o processo termina com código 1.
Argumentos inválidos terminam com código 2 e a mensagem de uso.

## Testar

```bash
npm test            # todos os testes (vitest)
npm run typecheck   # checagem de tipos (tsc --noEmit)
```

Os testes são nomeados pelo ID da regra da spec, então o relatório do vitest liga
cada caso ao critério de aceite correspondente:

| Arquivo | O que confere |
|---|---|
| `tests/rn-00N-*.test.ts` | uma regra de negócio (RN-001 a RN-009) cada, com os casos de **Aceite** da spec |
| `tests/ordem-aplicacao.test.ts` | ordem das fases e dos motivos (spec §8) |
| `tests/exemplo-ponta-a-ponta.test.ts` | as 14 despesas do exemplo e os totais (spec §7) |
| `tests/saida.test.ts` | schema e totais da saída (spec §4) |
| `tests/cli.test.ts` | a CLI de verdade: arquivo gerado, erros, lista vazia, determinismo (spec §9) |
| `tests/entrada.test.ts` | validação da entrada (spec §4) |

## Onde está cada coisa

| Documento | Conteúdo |
|---|---|
| [`specs/001-motor-reembolso/spec.md`](specs/001-motor-reembolso/spec.md) | **o quê**: regras de negócio, ambiguidades e decisões, casos de borda, critérios de aceite |
| [`specs/001-motor-reembolso/plan.md`](specs/001-motor-reembolso/plan.md) | **como**: stack, arquitetura, modelo de dados, decisões técnicas |
| [`specs/001-motor-reembolso/tasks.md`](specs/001-motor-reembolso/tasks.md) | **em que ordem**: tasks T-001… com aceite e commit de cada uma |
| [`specs/001-motor-reembolso/DECISIONS.md`](specs/001-motor-reembolso/DECISIONS.md) | log de mudanças da spec |
| [`docs/RELATORIO.md`](docs/RELATORIO.md) | relatório do desafio |
| [`docs/sessions/`](docs/sessions/) | exports das sessões com o Claude Code |
| [`CLAUDE.md`](CLAUDE.md) | convenções do projeto para o agente |

Código em `src/`: `cli.ts` (único módulo com I/O), `entrada.ts` (validação),
`motor.ts` (fases da spec §8), `regras/` (um arquivo por RN), `saida.ts`
(documento de saída), `politica.ts` (todos os números e textos da política).
