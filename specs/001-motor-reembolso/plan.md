# Plano Técnico — Motor de Cálculo de Reembolso

**Versão:** 1.0 · **Baseado na spec:** 1.0

> Aqui mora o COMO. Este arquivo pode e deve falar de linguagem, biblioteca e
> arquitetura. O que ele **não** pode é introduzir regra de negócio nova — se
> apareceu uma, ela pertence à `spec.md`.

---

## 1. Stack

| Escolha | O quê | Por quê | O que descartei e por quê |
|---|---|---|---|
| Linguagem | TypeScript 5 sobre Node.js 20 | stack que o autor domina; tipos ajudam a manter o modelo de dados da seção 3 coerente entre as regras | Python (tem `Decimal` nativo, mas não é a stack do dia a dia do autor); Go (sem decimal nativo, mais verboso) |
| Execução | `tsx` | roda TypeScript direto, sem etapa de build para usar a CLI | compilar com `tsc` para `dist/` — mais um passo no README sem ganho para uma CLI local |
| Testes | `vitest` | suporte nativo a TypeScript, sem configuração; `describe`/`it` permitem nomear testes pelo ID da regra | `node:test` (exigiria loader de TS e tem relatório mais pobre); `jest` (configuração extra para TS/ESM) |
| Parsing/validação | `zod` | valida a entrada contra o schema da seção 4 da spec e produz mensagens de erro legíveis | validação manual (mais código, mais chance de esquecer um campo) |
| CLI | `node:util` `parseArgs` | nativo do Node, suficiente para um subcomando e duas flags | `commander`/`yargs` — dependência a mais para uma interface fixa e mínima |
| Aritmética monetária | `decimal.js` | aritmética decimal exata e arredondamento `ROUND_HALF_EVEN` (RN-008) | `number` (ponto flutuante: `0.1 + 0.2 ≠ 0.3`); inteiros em centavos (não representam R$ 33,333 nem R$ 100,004 sem perder a exatidão exigida pela RN-008) |

## 2. Arquitetura

```
arquivo JSON
   │
   ▼
[cli]  lê argumentos e arquivos, escreve saída, define código de saída
   │
   ▼
[entrada]  valida schema (spec §4) → modelo interno (valores em Decimal)
   │
   ▼
[motor]  orquestra as fases da spec §8
   ├── fase 1: [elegibilidade]  categoria → valor → período → duplicata → nota
   │             cada verificação é uma função pura que devolve um motivo ou nada
   └── fase 2: [viagem] → [limites: hospedagem, diário] → [arredondamento]
   │
   ▼
[saida]  monta o documento de saída (spec §4), converte Decimal → número
   │
   ▼
arquivo JSON
```

Estrutura de pastas:

```
src/
  cli.ts              # I/O: argumentos, leitura, escrita, erros
  entrada.ts          # schema zod + conversão para o modelo interno
  politica.ts         # todos os números e textos da política (seção 4)
  modelo.ts           # tipos da seção 3
  motor.ts            # orquestração das fases
  regras/
    categoria.ts      # RN-009
    valor.ts          # RN-005
    periodo.ts        # RN-003
    duplicata.ts      # RN-004
    nota-fiscal.ts    # RN-002
    viagem.ts         # RN-007
    hospedagem.ts     # RN-006
    limite-diario.ts  # RN-001
    arredondamento.ts # RN-008
  saida.ts
tests/
  rn-001-limite-diario.test.ts ... rn-009-categoria.test.ts
  ordem-aplicacao.test.ts       # spec §8
  exemplo-ponta-a-ponta.test.ts # spec §7
  cli.test.ts                   # spec §9 (formato, erros, determinismo)
```

**Fronteiras:** só `cli.ts` toca disco, argumentos e código de saída. Todo o resto é função pura: recebe dados, devolve dados. `motor.ts` recebe a entrada já validada e devolve o resultado — é o que os testes de regra exercitam diretamente, sem arquivo. Cada RN tem um arquivo próprio em `regras/`, então uma mudança de regra fica confinada a um arquivo e ao seu teste.

## 3. Modelo de dados

```ts
type Categoria = 'alimentacao' | 'transporte_urbano' | 'hospedagem';

interface Despesa {              // após validação da entrada
  id: string;
  data: string;                  // AAAA-MM-DD (comparável como texto)
  categoriaInformada: string;    // como veio
  categoriaNormalizada: string;  // RN-009 (pode não ser uma Categoria)
  descricao: string;
  fornecedor: string;
  valor: Decimal;                // exato, nunca arredondado
  temNotaFiscal: boolean;
  indice: number;                // posição na entrada (ordem da saída)
}

interface Avaliacao {            // resultado por despesa, antes da saída
  despesa: Despesa;
  motivosRecusa: string[];       // fase 1; vazio = elegível
  reembolsoExato: Decimal;       // fase 2, antes de RN-008
  cortadaPorLimite: boolean;     // define 'parcial' (spec §4, status)
  motivoParcial: string | null;
  limiteAplicado: Decimal | null;
  emViagem: boolean;
  diarias: number | null;
}
```

O `status` é derivado: `recusada` se `motivosRecusa` não está vazio; `parcial` se `cortadaPorLimite`; senão `integral`. Ele é calculado a partir do valor exato, não do arredondado, como a spec exige.

## 4. Como a política é representada

Todos os números e textos da política vivem em **um único módulo**, `src/politica.ts`, como constantes nomeadas:

- limites diários por categoria (60, 80), limite por diária (250), fator de viagem (1,5), limiar da nota fiscal (100);
- lista de categorias reembolsáveis;
- textos dos motivos ("limite diário excedido", "nota fiscal ausente", ...);
- palavras reconhecidas para diárias ("diária", "noite", ...).

As regras importam essas constantes; nenhum número de política aparece dentro de `regras/`. Uma mudança de valor (ex.: limite de alimentação passa a R$ 70) é uma linha em `politica.ts` e a atualização dos testes afetados.

Não usei arquivo de configuração externo (JSON/YAML): a política muda junto com a spec, por decisão registrada, não em tempo de execução. Constantes tipadas dão erro de compilação se algo for removido.

## 5. Decisões técnicas

### DT-001 — Valores monetários em `Decimal` desde a leitura

**Contexto:** RN-008 exige cálculo com o valor exato (R$ 33,333; R$ 100,004) e arredondamento meio para o par só no fim.
**Decisão:** todo valor é convertido para `Decimal` na leitura da entrada e só volta a `number` na montagem da saída, já arredondado para 2 casas com `ROUND_HALF_EVEN`.
**Alternativa descartada:** centavos em inteiro — perderia a terceira casa decimal antes das comparações, violando RN-008 (R$ 100,004 viraria R$ 100,00 e não exigiria nota).
**Consequência:** nenhuma operação monetária usa `+`, `-` ou `<` de `number`; todas passam por métodos do `Decimal`. Revisões de código devem procurar esses operadores em `regras/`.

### DT-002 — Conversão do número da entrada para `Decimal`

**Contexto:** `JSON.parse` entrega `number`; o valor exato digitado no arquivo não fica disponível no Node 20.
**Decisão:** converter com `new Decimal(String(valor))`. `String()` devolve a menor representação que reproduz o mesmo número, o que coincide com o texto da entrada para valores com até 15 dígitos significativos (todo valor monetário realista).
**Alternativa descartada:** parser JSON próprio que preserve o texto do número — complexidade alta para um caso que não ocorre com valores em reais.
**Consequência:** valores com mais de 15 dígitos significativos podem perder exatidão. Registrado em Riscos.

### DT-003 — Números na saída

**Contexto:** a spec mostra `22.00` no exemplo; em JSON, `22` e `22.00` são o mesmo número.
**Decisão:** a saída usa números JSON comuns, arredondados para 2 casas (`22`, `54.9`, `33.33`). `valor_original` é emitido com o mesmo número lido.
**Alternativa descartada:** emitir valores como texto (`"22.00"`) — mudaria o tipo do campo definido na spec §4.
**Consequência:** a comparação nos testes é numérica, não textual.

### DT-004 — Fase 1 avalia todas as verificações

**Contexto:** spec §8 exige listar todos os motivos de recusa.
**Decisão:** o motor executa as cinco verificações para toda despesa, na ordem da spec, acumulando motivos; nenhuma interrompe as seguintes.
**Alternativa descartada:** encadear filtros que removem a despesa na primeira falha — mais simples, mas só produziria o primeiro motivo.
**Consequência:** a ordem das verificações em `motor.ts` define a ordem dos motivos na saída e é coberta por `ordem-aplicacao.test.ts`.

### DT-005 — Extração do número de diárias

**Contexto:** RN-006 define o padrão: inteiro em algarismos, > 0, seguido de "diária(s)" ou "noite(s)", sem diferenciar caixa nem acento.
**Decisão:** normalizar a descrição (minúsculas, sem acentos via `normalize('NFD')`) e aplicar a expressão regular `/(\d+)\s*(diarias?|noites?)\b/`; usar a primeira ocorrência com número > 0; senão, N = 1.
**Alternativa descartada:** heurística mais ampla (números por extenso, "pernoite") — contradiz a decisão de padrão estrito da AMB-010.
**Consequência:** os casos de aceite da RN-006 são os testes da expressão.

## 6. Estratégia de testes

- **Nível:** a maioria unitária no motor (entrada já validada → resultado), sem disco. Um teste de ponta a ponta com o arquivo de exemplo. Poucos testes da CLI executando o processo de verdade (argumentos, arquivo de saída, erro de formato).
- **Cada `RN-NNN` da spec tem teste?** Um arquivo de teste por regra (`tests/rn-00N-*.test.ts`). Cada item de **Aceite** da spec vira um `it(...)` com os mesmos números. Uma regra sem arquivo de teste fica visível na listagem da pasta.
- **Casos de borda da seção 7 da spec:** `exemplo-ponta-a-ponta.test.ts` lê `exemplos/despesas-exemplo.json` e confere, despesa por despesa, status, valor, motivos, limite, viagem e diárias, além dos totais (R$ 815,43; 5/3/6).
- **Nomenclatura:** `describe('RN-001 — limite diário por categoria')` e `it('AC: d-001 + d-002 em 03/07 → d-002 integral 38,00, d-001 parcial 22,00')`. O ID da regra no nome do teste liga o relatório do `vitest` diretamente à spec.
- **Critérios da spec §9:** determinismo (rodar duas vezes; embaralhar a entrada), lista vazia e entrada inválida ficam em `cli.test.ts`.

## 7. Riscos

| Risco | Probabilidade | O que faço se acontecer |
|---|---|---|
| Uso acidental de `number` em vez de `Decimal` numa regra | média | testes com R$ 33,333 e R$ 100,004 quebram; busca por operadores aritméticos em `regras/` na revisão |
| Valor de entrada com mais de 15 dígitos significativos perde exatidão (DT-002) | baixa | documentado; tratar só se aparecer em caso real |
| A mudança de requisito do Dia 2 atinge a ordem das fases | média | ordem centralizada em `motor.ts` e coberta por teste próprio; regras isoladas por arquivo |
| Divergência entre o que a spec diz e o que o teste confere | média | testes copiam literalmente os números dos critérios de aceite; qualquer ajuste começa pela spec |
| Expressão de diárias reconhecer algo inesperado na descrição | baixa | casos de aceite da RN-006 como testes; novos casos entram primeiro na spec |
