# Sessão 02b — Fundação (T-002, T-003)

> **Como este arquivo foi gerado:** este trecho da conversa ficou entre dois
> exports — `02-plan-tasks-setup.md` termina na pergunta "revisar por task (A)
> ou por fase (B)?" e `03-regras-motor.md` começa depois de uma compactação de
> contexto, que deixou este trecho fora do `/export`. Ele foi **extraído do
> `.jsonl` da sessão** (alternativa prevista no FAQ) por um script, sem edição
> do conteúdo: mensagens completas; comandos limitados a 1.500 caracteres e
> resultados de ferramenta a 800, com a quantidade omitida indicada. Caminhos
> pessoais foram trocados por `~/`.
>
> **Continua em:** `03-regras-motor.md`, que começa pela mensagem de revisão da
> fase de Fundação.

---

## Usuário

b

## Claude

Combinado: faço a T-002 e a T-003, cada uma com o seu commit, e você revisa as duas no fim. Antes de escrever código, vou conferir a API do zod 4 instalado.

### Ferramenta: Bash — Probe zod 4 date validation and error shape

```
cat > /private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/z.mjs <<'EOF'
import { z } from 'zod';
const d = z.iso.date();
for (const v of ['2026-07-31','2026-02-30','2026-13-01','2026-7-1','2024-02-29','2026-02-29']) console.log(v, d.safeParse(v).success);
const r = z.object({a: z.array(z.object({b: z.number()}))}).safeParse({a:[{b:'x'}]});
console.log(JSON.stringify(r.error.issues));
console.log(typeof z.prettifyError);
EOF
cp /private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/z.mjs ./.z-check.mjs && node ./.z-check.mjs; rm ./.z-check.mjs
```

<details><summary>Resultado</summary>

```
2026-07-31 true
2026-02-30 false
2026-13-01 false
2026-7-1 false
2024-02-29 true
2026-02-29 false
[{"expected":"number","code":"invalid_type","path":["a",0,"b"],"message":"Invalid input: expected number, received string"}]
function
```
</details>

## Claude

O `z.iso.date()` do zod 4 rejeita datas impossíveis como 30/02 e trata anos bissextos corretamente. Antes de escrever o código, ajusto um detalhe do plan §3.

### Ferramenta: Edit — ~/Documents/dev.nosync/sdd-desafio/specs/001-motor-reembolso/plan.md

```
-   categoriaInformada: string;    // como veio
  categoriaNormalizada: string;  // RN-009 (pode não ser uma Categoria)
  descricao: string;
+   categoria: string;             // como veio; a normalização (RN-009) é feita pelo motor
  descricao: string;
```

### Ferramenta: Edit — ~/Documents/dev.nosync/sdd-desafio/specs/001-motor-reembolso/plan.md

```
-   despesa: Despesa;
  motivosRecusa: string[];       // fase 1; vazio = elegível
+   despesa: Despesa;
  categoria: string;             // normalizada (RN-009); pode não ser uma Categoria
  motivosRecusa: string[];       // fase 1; vazio = elegível
```

### Ferramenta: Edit — ~/Documents/dev.nosync/sdd-desafio/specs/001-motor-reembolso/plan.md

```
- O `status` é derivado:
+ A `Despesa` guarda só o que veio na entrada; tudo o que é resultado de regra — inclusive a categoria normalizada — fica na `Avaliacao`. Assim `entrada.ts` (T-003) não depende de nenhuma regra.

O `status` é derivado:
```

### Ferramenta: Bash — Commit plan model adjustment

```
git add specs/001-motor-reembolso/plan.md && git commit -q -m "docs(plan): move categoria normalizada de Despesa para Avaliacao

Mantém entrada.ts (T-003) independente da regra RN-009 (T-004).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && git log --oneline -1
```

<details><summary>Resultado</summary>

```
The file ~/Documents/dev.nosync/sdd-desafio/specs/001-motor-reembolso/plan.md has been updated successfully. (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
The file ~/Documents/dev.nosync/sdd-desafio/specs/001-motor-reembolso/plan.md has been updated successfully. (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
The file ~/Documents/dev.nosync/sdd-desafio/specs/001-motor-reembolso/plan.md has been updated successfully. (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
815377e docs(plan): move categoria normalizada de Despesa para Avaliacao
```
</details>

## Claude

Agora a T-002: `politica.ts`, `modelo.ts` e o teste.

### Ferramenta: Write — ~/Documents/dev.nosync/sdd-desafio/src/politica.ts

```
// Todos os números e textos da política de reembolso (plan §4).
// Cada constante cita a regra da spec que a define.
import { Decimal } from 'decimal.js';

// RN-009
export const CATEGORIAS_REEMBOLSAVEIS = ['alimentacao', 'transporte_urbano', 'hospedagem'] as const;
export type Categoria = (typeof CATEGORIAS_REEMBOLSAVEIS)[number];

// RN-001
export const LIMITE_DIARIO = {
  alimentacao: new Decimal('60'),
  transporte_urbano: new Decimal('80'),
} as const;
export type CategoriaComLimiteDiario = keyof typeof LIMITE_DIARIO;

// RN-006
export const LIMITE_POR_DIARIA_HOSPEDAGEM = new Decimal('250');
export const PALAVRAS_DIARIA = ['diaria', 'diarias', 'noite', 'noites'] as const;
export const DIARIAS_PADRAO = 1;

// RN-007
export const FATOR_VIAGEM = new Decimal('1.5');

// RN-002
export const LIMIAR_NOTA_FISCAL = new Decimal('100');

// RN-008
export const CASAS_DECIMAIS_REEMBOLSO = 2;

// Spec §4 (motivos) e §8 (motivos de recusa)
export const MOTIVOS = {
  categoriaForaDaPolitica: 'categoria fora da política',
  valorNaoPositivo: 'valor não positivo',
  foraDoPeriodo: 'fora do período de competência',
  duplicataDe: (idMantido: string) => `duplicata de ${idMantido}`,
  notaFiscalAusente: 'nota fiscal ausente',
  limiteDiarioExcedido: 'limite diário excedido',
  limiteHospedagemExcedido: 'limite de hospedagem excedido',
} as const;
```

### Ferramenta: Write — ~/Documents/dev.nosync/sdd-desafio/src/modelo.ts

```
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
```

### Ferramenta: Write — ~/Documents/dev.nosync/sdd-desafio/tests/politica.test.ts

```
import { describe, expect, it } from 'vitest';
import {
  CASAS_DECIMAIS_REEMBOLSO,
  CATEGORIAS_REEMBOLSAVEIS,
  DIARIAS_PADRAO,
  FATOR_VIAGEM,
  LIMIAR_NOTA_FISCAL,
  LIMITE_DIARIO,
  LIMITE_POR_DIARIA_HOSPEDAGEM,
  MOTIVOS,
  PALAVRAS_DIARIA,
} from '../src/politica.js';

describe('Política (plan §4) — constantes conferidas contra a spec', () => {
  it('RN-009: categorias reembolsáveis são alimentacao, transporte_urbano e hospedagem', () => {
    expect([...CATEGORIAS_REEMBOLSAVEIS]).toEqual(['alimentacao', 'transporte_urbano', 'hospedagem']);
  });

  it('RN-001: limite diário de alimentação R$ 60,00 e de transporte urbano R$ 80,00', () => {
    expect(LIMITE_DIARIO.alimentacao.toString()).toBe('60');
    expect(LIMITE_DIARIO.transporte_urbano.toString()).toBe('80');
  });

  it('RN-006: R$ 250,00 por diária; N padrão 1; palavras diária(s) e noite(s)', () => {
    expect(LIMITE_POR_DIARIA_HOSPEDAGEM.toString()).toBe('250');
    expect(DIARIAS_PADRAO).toBe(1);
    expect([...PALAVRAS_DIARIA]).toEqual(['diaria', 'diarias', 'noite', 'noites']);
  });

  it('RN-007: ampliação de 50% em viagem (fator 1,5) → 90, 120 e 375', () => {
    expect(FATOR_VIAGEM.toString()).toBe('1.5');
    expect(LIMITE_DIARIO.alimentacao.times(FATOR_VIAGEM).toString()).toBe('90');
    expect(LIMITE_DIARIO.transporte_urbano.times(FATOR_VIAGEM).toString()).toBe('120');
    expect(LIMITE_POR_DIARIA_HOSPEDAGEM.times(FATOR_VIAGEM).toString()).toBe('375');
  });

  it('RN-002: limiar de nota fiscal R$ 10
… [759 caracteres omitidos]
```

### Ferramenta: Bash — Run tests and typecheck for T-002

```
npm test 2>&1 | grep -E "✓|✗|×|FAIL|Tests |Test Files" ; npm run typecheck 2>&1 | grep -v "^>" | grep . ; echo "typecheck exit ${PIPESTATUS[0]}"
```

<details><summary>Resultado</summary>

```
File created successfully at: ~/Documents/dev.nosync/sdd-desafio/src/politica.ts (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
File created successfully at: ~/Documents/dev.nosync/sdd-desafio/src/modelo.ts (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
File created successfully at: ~/Documents/dev.nosync/sdd-desafio/tests/politica.test.ts (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
 Test Files  2 passed (2)
      Tests  8 passed (8)
typecheck exit
```
</details>

### Ferramenta: Bash — Run typecheck and show exit code

```
npx tsc --noEmit; echo "typecheck exit $?"
```

<details><summary>Resultado</summary>

```
typecheck exit 0
```
</details>

### Ferramenta: Bash — Fill T-001 hash, mark T-002, commit

```
python3 - <<'EOF'
p='specs/001-motor-reembolso/tasks.md'
s=open(p).read()
i=s.index('**T-001**'); j=s.index('- **Commit:**', i)
s=s[:j]+'- **Commit:** `7800958`'+s[j+len('- **Commit:**'):]
s=s.replace("- [ ] **T-002**","- [x] **T-002**",1)
open(p,'w').write(s)
EOF
grep -n "Commit:\*\* \`" specs/001-motor-reembolso/tasks.md; git add src/politica.ts src/modelo.ts tests/politica.test.ts specs/001-motor-reembolso/tasks.md && git commit -q -m "feat(T-002): cria modelo de dados e módulo único da política

politica.ts concentra limites, fator de viagem, limiar de nota, categorias e
motivos; politica.test.ts confere cada constante contra a spec.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && git log --oneline -1
```

<details><summary>Resultado</summary>

```
20:  - **Commit:** `7800958`
696085e feat(T-002): cria modelo de dados e módulo único da política
```
</details>

## Claude

A T-002 está commitada (`696085e`). Agora a T-003, que valida a entrada.

### Ferramenta: Write — ~/Documents/dev.nosync/sdd-desafio/src/entrada.ts

```
// Validação da entrada (spec §4) e conversão para o modelo interno (plan §3).
// Função pura: recebe o texto do arquivo, devolve Entrada ou lança ErroEntrada.
import { Decimal } from 'decimal.js';
import { z } from 'zod';
import type { Entrada } from './modelo.js';

export class ErroEntrada extends Error {
  constructor(public readonly problemas: string[]) {
    super(`Entrada inválida:\n${problemas.map((p) => `- ${p}`).join('\n')}`);
    this.name = 'ErroEntrada';
  }
}

const ausenteOu = (mensagem: string) => (iss: { input?: unknown }) =>
  iss.input === undefined ? 'campo obrigatório ausente' : mensagem;

const texto = () => z.string({ error: ausenteOu('tipo inválido: esperado texto') });
const data = () =>
  z.iso.date({ error: ausenteOu('data inválida: esperado AAAA-MM-DD') });

const schemaDespesa = z.object(
  {
    id: texto(),
    data: data(),
    categoria: texto(),
    descricao: texto(),
    fornecedor: texto(),
    valor: z.number({ error: ausenteOu('tipo inválido: esperado número') }),
    tem_nota_fiscal: z.boolean({ error: ausenteOu('tipo inválido: esperado booleano') }),
  },
  { error: ausenteOu('tipo inválido: esperado objeto') },
);

const schemaEntrada = z.object(
  {
    colaborador: z.object(
      { id: texto(), nome: texto(), centro_custo: texto() },
      { error: ausenteOu('tipo inválido: esperado objeto') },
    ),
    periodo: z.object(
      {
        competencia: z
          .string({ error: ausenteOu('tipo inválido: esperado texto') })
      
… [1724 caracteres omitidos]
```

### Ferramenta: Write — ~/Documents/dev.nosync/sdd-desafio/tests/entrada.test.ts

```
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ErroEntrada, interpretarEntrada } from '../src/entrada.js';

const exemplo = readFileSync(new URL('../exemplos/despesas-exemplo.json', import.meta.url), 'utf8');

function entradaCom(alterar: (e: any) => void): string {
  const e = JSON.parse(exemplo);
  alterar(e);
  return JSON.stringify(e);
}

function problemas(texto: string): string[] {
  try {
    interpretarEntrada(texto);
  } catch (e) {
    expect(e).toBeInstanceOf(ErroEntrada);
    return (e as ErroEntrada).problemas;
  }
  throw new Error('esperava ErroEntrada');
}

describe('Spec §4 — entrada', () => {
  it('aceita exemplos/despesas-exemplo.json com 14 despesas na ordem do arquivo', () => {
    const entrada = interpretarEntrada(exemplo);
    expect(entrada.colaborador.id).toBe('c-0417');
    expect(entrada.periodo).toEqual({ competencia: '2026-07', inicio: '2026-07-01', fim: '2026-07-31' });
    expect(entrada.despesas).toHaveLength(14);
    expect(entrada.despesas.map((d) => d.indice)).toEqual([...Array(14).keys()]);
    expect(entrada.despesas[13]).toMatchObject({ id: 'd-014', categoria: 'ALIMENTACAO', temNotaFiscal: true });
  });

  it('DT-002: 33.333 vira Decimal exato 33.333; −45 e 100.01 preservados', () => {
    const { despesas } = interpretarEntrada(exemplo);
    const valor = (id: string) => despesas.find((d) => d.id === id)!.valor.toString();
    expect(valor('d-011')).toBe('33.333');
    expect(valor('d-00
… [2217 caracteres omitidos]
```

### Ferramenta: Bash — Run tests and typecheck for T-003

```
npx vitest run 2>&1 | grep -E "✓|×|FAIL|Expected|Received|AssertionError|^\s+[-+] |Tests |Test Files" | head -40; npx tsc --noEmit; echo "typecheck exit $?"
```

<details><summary>Resultado</summary>

```
File created successfully at: ~/Documents/dev.nosync/sdd-desafio/src/entrada.ts (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
File created successfully at: ~/Documents/dev.nosync/sdd-desafio/tests/entrada.test.ts (file state is current in your context — no need to Read it back)
```
</details>

<details><summary>Resultado</summary>

```
 Test Files  3 passed (3)
      Tests  18 passed (18)
typecheck exit 0
```
</details>

### Ferramenta: Bash — Fill T-002 hash, mark T-003, commit and push

```
python3 - <<'EOF'
p='specs/001-motor-reembolso/tasks.md'
s=open(p).read()
i=s.index('**T-002**'); j=s.index('- **Commit:**', i)
s=s[:j]+'- **Commit:** `696085e`'+s[j+len('- **Commit:**'):]
s=s.replace("- [ ] **T-003**","- [x] **T-003**",1)
open(p,'w').write(s)
EOF
git add src/entrada.ts tests/entrada.test.ts specs/001-motor-reembolso/tasks.md && git commit -q -m "feat(T-003): valida entrada contra a spec §4 e converte valores para Decimal

Rejeita a entrada inteira listando todos os problemas com o caminho do campo
(ausente, tipo errado, data inválida, competência inválida, id repetido, JSON malformado).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && git push -q origin main && git log --oneline -4
```

<details><summary>Resultado</summary>

```
ca4b491 feat(T-003): valida entrada contra a spec §4 e converte valores para Decimal
696085e feat(T-002): cria modelo de dados e módulo único da política
815377e docs(plan): move categoria normalizada de Despesa para Avaliacao
b6b7741 docs(sessions): exporta sessão 02 — plan, tasks e setup (T-001)
```
</details>
