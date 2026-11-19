# Sessão 04 — Revisão da fase 3 e saída/CLI (T-015 a T-017)

> Export do `/export` sem edição de conteúdo; caminhos pessoais trocados por `~/`.
> Sessão nova (não é continuação da 03).

---

  ⎿  SessionStart:startup says: ✨ 30 Day Free Trial — memory runs off-plan. Get
     up to 100% more usage from your plan
     https://cmem.ai/pro?from=session-start

     Access Claude-Mem Rules + Tools: ~/.claude-mem/RULES-AND-TOOLS.md

     Nov 6, 2026

     tests/setup.test.ts
       #3080  12:07 PM  ●  Decimal.js Import Fixed with Named Export Syntax
     General
       #3081            ○  Audit Vulnerabilities Isolated to Dev Tooling with
     Newer Zod Patch Available
     package.json
       #3082            ○  NPM Audit Fix Unable to Apply Non-Breaking Updates
     for Dev Dependencies
       #3083  12:08 PM  ✓  Dev Dependencies Updated to Patched Versions Reducing
     Vulnerability Count
       #3084            ✓  Major Version Upgrades Resolve All Security
     Vulnerabilities
     specs/001-motor-reembolso/tasks.md
       #3085            ◆  T-001 Completed and Committed with Clean Audit Status

     #S791 User asked what the next step is after T-001 completion (Nov 6 at
     12:08 PM)


     Nov 18, 2026

     #S792 Agent pushed T-001 commit and explained session export requirement to
     user (Nov 18 at 10:15 AM)

     General
       #3219  10:16 AM  ✓  T-001 Project Initialization Pushed to GitHub
     #S793 Session 02 export processing with relocation and path sanitization
     (Nov 18 at 10:16 AM)

     02-plan-tasks-setup.md
       #3220  10:17 AM  ○  Session 02 Export Contains Personal File Paths
       #3221            ✓  Session 02 Export Relocated with Path Sanitization
     #S794 Foundation phase completion review and decision on competencia
     validation gap before proceeding to Rules phase (Nov 18 at 10:17 AM)

     General
       #3222  10:24 AM  ○  Zod 4 Date Validation Behavior Confirmed
     specs/001-motor-reembolso/plan.md
       #3223            ↻  Expense Model Simplified to Single Category Field
       #3224            ↻  Normalized Category Field Added to Avaliacao
     Interface
       #3225            ⚖  Input Validation Layer Isolated from Business Rules
     src/politica.ts
       #3226  10:25 AM  ◆  Policy Constants Module Implemented with All Business
     Rule Values
     src/modelo.ts
       #3227            ◆  Internal Data Model TypeScript Interfaces Defined
     tests/politica.test.ts
       #3228            ◆  Policy Constants Test Suite Verifies All
     Specification Values
     specs/001-motor-reembolso/tasks.md
       #3229            ◆  T-002 Data Model and Policy Module Completed
     src/entrada.ts
       #3230            ◆  Input Validation Layer Implemented with Zod Schema
     tests/entrada.test.ts
       #3231            ◆  Input Validation Test Suite Covers All Error
     Scenarios
     specs/001-motor-reembolso/tasks.md
       #3232  10:26 AM  ◆  T-003 Input Validation Module Completed and Pushed
     #S796 User approved continuation of Phase 2 implementation - rules T-010,
     T-011, and T-012 completed (Nov 18 at 10:26 AM)

     specs/001-motor-reembolso/spec.md
       #3237  11:44 AM  ⚖  D-001 Specification Gap for Period Field Coherence
     Documented
     General
       #3238            ✓  D-001 Period Coherence Decision Committed to
     Repository
       #3239            ◆  RN-009 Category Validation Rule Implemented with Test
     Factory Helpers
       #3240  11:45 AM  ✓  T-004 Category Rule Completed and Committed with Task
     Traceability
       #3241            ◆  RN-005 Non-Positive Value Validation Implemented
     specs/001-motor-reembolso/tasks.md
       #3242            ◆  T-006 Period Competence Rule Implemented
       #3244            ◆  T-007 Duplicate Detection Rule Implemented
       #3246  11:46 AM  ◆  T-008 Invoice Requirement Rule Implemented
       #3247            ◆  T-009 Rounding Rule Implemented with Banker's
     Rounding
     src/regras/categoria.ts
       #3248  11:47 AM  ◆  T-010 Lodging Daily Limit Rule Implemented with
     Pattern Extraction
     specs/001-motor-reembolso/plan.md
       #3249            ◆  T-010 Lodging Daily Limit Rule Completed and
     Committed
     specs/001-motor-reembolso/tasks.md
       #3250            ◆  T-011 Travel Dates Calculation Implemented
     tests/rn-007-viagem.test.ts
       #3253  11:48 AM  ◆  T-012 Daily Limit Rule Implemented with Travel Date
     Amplification
     specs/001-motor-reembolso/tasks.md
       #3255            ✓  T-012 Daily Limit Rule Committed and Pushed to GitHub

     #S812 User approved both specification decisions (D-002 natural ID
     ordering, D-003 null diarias for rejected lodging) and reviewed Phase 3
     implementation (Nov 18 at 11:48 AM)


     Nov 19, 2026

     specs/001-motor-reembolso/spec.md
       #3379  9:25 AM  ✓  Specification Updated with ID Ordering Convention for
     Tie-Breaking
       #3380  9:26 AM  ⚖  D-002 Decision Documented for Natural ID Ordering
     Convention
       #3381           ⚖  D-003 Decision Documented for Null Diarias Field in
     Rejected Lodging
     specs/001-motor-reembolso/tasks.md
       #3382           ✓  T-018 Task Created and Task Breakdown Updated for Both
     Decision Resolutions
     src/regras/duplicata.ts
       #3383  9:27 AM  ◆  T-018 Natural ID Ordering Implemented with Full Test
     Coverage
     General
       #3384           ◆  T-018 Natural ID Ordering Committed and Pushed
       #3385           ◆  Engine Orchestration Module Implements Two-Phase
     Evaluation
       #3386  9:28 AM  ◆  Engine Integration Test Suite Verifies Two-Phase Rule
     Application
       #3387           ◆  T-013 Engine Orchestration Module Committed
       #3388           ◆  End-to-End Test Suite Validates Complete Example
     Dataset
     tests/exemplo-ponta-a-ponta.test.ts
       #3389  9:29 AM  ◆  T-014 End-to-End Test Validates All 14 Example
     Expenses Against Specification Table
     #S813 User asked about session export timing and agent clarified export
     must be done in current session before starting new Phase 4 session (Nov 19
     at 9:29 AM)

     #S814 User confirmed session export strategy and agent explained
     deduplication approach for handling overlapping content from session 02
     (Nov 19 at 9:31 AM)

     #S815 Session 03 export processing with deduplication and gap recovery from
     JSONL (Nov 19 at 9:32 AM)

     2026-11-19-093734-this-session-is-being-continued-from-a-previous-c.txt
       #3390  9:37 AM  ✓  Session 03 Export Relocated and Sanitized
     ~/.claude/projects/-Users-USUARIO-Documents-dev-nosync-sdd-desaf
     io/af37d618-4d8e-4a07-81fc-c66712299622.jsonl
       #3391  9:38 AM  ◆  Session Gap Recovered from JSONL with Automated
     Extraction
     ~/.claude/projects/-Users-USUARIO-Documents-dev-nosync-sdd-desaf
     io/memory/session-exports.md
       #3392           ⚖  Session Export Procedure Documented for Challenge
     Traceability
     docs/sessions/01-especificacao.md
       #3393  9:55 AM  ○  Session Export Files Contain Duplicate Opening
     Conversation
     docs/RELATORIO.md
       #3394           ✓  Session Export Traceability Documentation Added to
     Report
     #S816 Document session export overlap and gap in report with traceability
     details (Nov 19 at 9:55 AM)


     Investigated: Session export file structure examined to identify content
     boundaries between four export files (01, 02, 02b, 03). Line-level analysis
     performed to locate where session 02 repeats session 01 content (lines
     1-2835) and where new content begins. Grep analysis identified user message
     boundaries to map overlap region.

     Learned: Claude Code /export command captures entire conversation history,
     not incremental changes since last export, causing content overlap when
     multiple exports are taken from same continuous conversation. Context
     compaction events create gaps where intermediate conversation segments fall
     outside any /export output but remain recoverable from raw JSONL files.
     Challenge grading rubric explicitly values honest documentation of export
     issues over silent correction through history rewriting.

     Completed: docs/RELATORIO.md enhanced with new "Registro das sessões"
     section documenting all four session export files with complete
     traceability table showing coverage, generation method, and commit hashes.
     Session 01-02 overlap documented as lines 1-2835 repetition with new
     content starting at "parece que a spec ficou fora do docs". Session 02-03
     gap recovery methodology documented including JSONL extraction process and
     FAQ reference. Privacy sanitization approach documented.
     docs/sessions/README.md created as quick-reference index table mapping
     export files to project phases with observations. Changes committed as
     fa90d14 and pushed to origin/main.

     Next Steps: User instructed to open new session for Phase 4 implementation.
     Phase 3 review pending either in current session or new session per user
     preference.

     Notes: Documentation approach aligns with FAQ guidance that "histórico
     honesto imperfeito vale mais que histórico reescrito" (honest imperfect
     history worth more than rewritten history). Explicit traceability
     documentation addresses rubric requirement that session exports demonstrate
     work process for grading assessment. Session export handling pattern now
     fully documented for remaining project phases.

     View Observations Live @ http://localhost:37777 · 60 lines

❯ <ide_opened_file>The user opened the file
  ~/Documents/dev.nosync/sdd-desafio/2026-11-19-093734-
  this-session-is-being-continued-from-a-previous-c.txt in the IDE. This may or
  may not be related to the current task.</ide_opened_file>

❯ revise a fase 3 e comece a 4

⏺ Vou ler as tasks e o estado atual para revisar a fase 3.

⏺ Bash(cat specs/001-motor-reembolso/tasks.md && ls -R src tests && git log
      --oneline | head -30)
  ⎿  (No output)

⏺ Já vejo uma pendência: T-014 está marcada sem o hash do commit. Vou ler o
  motor, os testes da fase 3 e as partes relevantes da spec/plan.

  Searched for 2 patterns (ctrl+o to expand)

⏺ Bash(sed -n 1,112p specs/001-motor-reembolso/spec.md && sed -n 348,440p
      specs/001-motor-reembolso/spec.md && cat tests/fabrica.ts
      tests/rn-005-valor-nao-positivo.tes…)
  ⎿  (No output)

⏺ Testes (120 + 1 todo) e typecheck passam. Vou checar como o hash das tasks vem
  sendo registrado e olhar as regras que a saída vai usar.

⏺ Bash(git show --stat b5f1242 | tail -6 && git show b5f1242 --
      specs/001-motor-reembolso/tasks.md | grep "^[-+]" && cat
      src/regras/arredondamento.ts src/entrada.ts &&…)
  ⎿  (No output)

  Listed 1 directory (ctrl+o to expand)

⏺ Revisão da fase 3 concluída — está sólida, só pendências pequenas (resumo no
  fim). Começando T-015: montagem da saída.

⏺ Write(src/saida.ts)
  ⎿  Wrote 62 lines to src/saida.ts
       1 // Montagem do documento de saída (spec §4). Função pura: Entrad
         a + Avaliacao[] → Saida.
       2 // Único ponto onde o reembolso é arredondado (RN-008, DT-001) e
          Decimal vira número (DT-003).
       3 import { Decimal } from 'decimal.js';
       4 import type { Avaliacao, Colaborador, Entrada, Periodo, Status }
          from './modelo.js';
       5 import { motivosDe, statusDe } from './motor.js';
       6 import { arredondarReembolso } from './regras/arredondamento.js'
         ;
     … +56 lines (ctrl+o to expand)

⏺ Bash(sed -n 160,200p specs/001-motor-reembolso/spec.md && cat
      tests/rn-008-arredondamento.test.ts)
  ⎿  (No output)

⏺ Agora o teste da saída, incluindo o it.todo da RN-005 que estava reservado
  para T-015.

⏺ Write(tests/saida.test.ts)
  ⎿  Wrote 135 lines to tests/saida.test.ts
       1 import { describe, expect, it } from 'vitest';
       2 import { avaliar } from '../src/motor.js';
       3 import type { Despesa } from '../src/modelo.js';
       4 import { montarSaida } from '../src/saida.js';
       5 import { despesa, entradaDoExemplo } from './fabrica.js';
       6
       7 /** Monta a saída com o colaborador e o período do exemplo e as
         despesas dadas. */
       8 function saidaDe(despesas: Despesa[]) {
       9   const { colaborador, periodo } = entradaDoExemplo();
     … +126 lines (ctrl+o to expand)

⏺ Melhor manter o aceite da RN-005 no arquivo da própria regra (convenção "um
  arquivo por RN"). Movo para lá, substituindo o it.todo, e adiciono os totais
  ao ponta a ponta.

⏺ Bash(python3 - <<'EOF'
      p='tests/saida.test.ts'…)
  ⎿  Updated tests/exemplo-ponta-a-ponta.test.ts (+9 -0)
      1  import { describe, expect, it } from 'vitest';
      2  import { avaliar, motivosDe, statusDe } from '../src/motor.js';
      3  import { arredondarReembolso } from '../src/regras/arredondament
         o.js';
      4 +import { montarSaida } from '../src/saida.js';                  
      5  import { entradaDoExemplo } from './fabrica.js';
      6  
      7  // Spec §7 — exemplos/despesas-exemplo.json, linha a linha.
     ...
      47      const emViagem = avaliacoes.filter((a) => a.emViagem).map((
          a) => a.despesa.id);
      48      expect(emViagem).toEqual(['d-010', 'd-011']);
      49    });
      50 +                                                               
      51 +  it('totais: R$ 815,43; integral 5, parcial 3, recusada 6', ()
         + => {                                                          
      52 +    const entrada = entradaDoExemplo();                        
      53 +    expect(montarSaida(entrada, avaliar(entrada)).totais).toEqu
         +al({                                                           
      54 +      valor_reembolsado: 815.43,                               
      55 +      quantidade: { integral: 5, parcial: 3, recusada: 6 },    
      56 +    });                                                        
      57 +  });                                                          
      58  });
  ⎿  Updated tests/rn-005-valor-nao-positivo.test.ts (+13 -2)
       1  import { describe, expect, it } from 'vitest';
       2 +import { avaliar } from '../src/motor.js';                     
       3  import { verificarValor } from '../src/regras/valor.js';
       3 -import { avaliarDespesas, despesa, doExemplo } from './fabrica.
         -js';                                                           
       4 +import { montarSaida } from '../src/saida.js';                 
       5 +import { avaliarDespesas, despesa, doExemplo, entradaDoExemplo 
         +} from './fabrica.js';                                         
       6  
       7  describe('RN-005 — valores não positivos', () => {
       8    it('AC: d-009 transporte −R$ 45,00 em 11/07 → recusada, "valo
          r não positivo"', () => {
       9      expect(verificarValor(doExemplo('d-009'))).toBe('valor não 
          positivo');
      10    });
      11  
      10 -  it.todo('AC: d-009 → total do período não é reduzido — totais
         - da saída, T-015');                                            
      12 +  it('AC: d-009 → R$ 0,00 na saída e o total do período não é r
         +eduzido', () => {                                              
      13 +    const exemplo = entradaDoExemplo();                        
      14 +    const totalCom = (ids: string[]) => {                      
      15 +      const entrada = { ...exemplo, despesas: exemplo.despesas.
         +filter((d) => ids.includes(d.id)) };                           
      16 +      return montarSaida(entrada, avaliar(entrada));           
      17 +    };                                                         
      18 +    const com = totalCom(['d-003', 'd-009']);                  
      19 +    expect(com.despesas[1]).toMatchObject({ id: 'd-009', status
         +: 'recusada', valor_reembolsado: 0, valor_original: -45 });    
      20 +    expect(com.totais.valor_reembolsado).toBe(totalCom(['d-003'
         +]).totais.valor_reembolsado);                                  
      21 +  });                                                          
      22  
      23    it('AC: despesa de R$ 0,00 → recusada com o mesmo motivo', ()
           => {
      24      expect(verificarValor(despesa({ valor: 0 }))).toBe('valor n
          ão positivo');
  ⎿  Updated tests/saida.test.ts (+0 -9)
       94    });
       95  });
       96  
       97 -describe('RN-005 — valores não positivos (totais)', () => {   
       98 -  it('AC: d-009 −R$ 45,00 → recusada, R$ 0,00; total do períod
          -o não é reduzido', () => {                                    
       99 -    const sem = saidaDoExemploCom(['d-003']);                 
      100 -    const com = saidaDoExemploCom(['d-003', 'd-009']);        
      101 -    expect(com.despesas[1]).toMatchObject({ id: 'd-009', statu
          -s: 'recusada', valor_reembolsado: 0, valor_original: -45 });  
      102 -    expect(com.totais.valor_reembolsado).toBe(sem.totais.valor
          -_reembolsado);                                                
      103 -  });                                                         
      104 -});                                                           
      105 -                                                              
       97  describe('Spec §9 — invariantes da saída no exemplo completo',
            () => {
       98    const entrada = entradaDoExemplo();
       99    const s = montarSaida(entrada, avaliar(entrada));

⏺ 133 testes passando, sem it.todo restante. Atualizo tasks.md (T-015 marcada,
  hash de T-014 preenchido) e commito.

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/tasks.md'…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
       93  - [x] **T-014** — Teste de ponta a ponta do exemplo no nível d
           o motor.
       94    - **Atende:** spec §7
       95    - **Aceite:** `tests/exemplo-ponta-a-ponta.test.ts` passa — 
           cada uma das 14 despesas com status, valor reembolsado, motivo
           s, limite aplicado, em viagem e diárias da tabela da spec §7.
       96 -  - **Commit:**                                               
       96 +  - **Commit:** `b5f1242`                                     
       97  
       98  ## Fase 4 — Saída e CLI
       99  
      100 -- [ ] **T-015** — Montagem da saída (`src/saida.ts`): schema d
          -a spec §4, ordem da entrada, totais, conversão Decimal → númer
          -o (DT-003).                                                   
      100 +- [x] **T-015** — Montagem da saída (`src/saida.ts`): schema d
          +a spec §4, ordem da entrada, totais, conversão Decimal → númer
          +o (DT-003).                                                   
      101    - **Atende:** spec §4 (saída), RN-008 (totais = soma dos arr
           edondados)
      102    - **Aceite:** `tests/saida.test.ts` passa (exemplo pequeno d
           a spec §4 idêntico; motivos vazios em integral; `limite_aplica
           do` nulo em recusada) e `exemplo-ponta-a-ponta.test.ts` passa 
           a conferir totais: R$ 815,43; 5 integral, 3 parcial, 6 recusad
           a.
      103    - **Commit:**

⏺ T-015 commitada (9fcfec5). Agora T-016, a CLI.

⏺ Write(src/cli.ts)
  ⎿  Wrote 62 lines to src/cli.ts
      1 // Interface de linha de comando (plan §2): único módulo que faz
        I/O.
      2 // Uso: reembolso calcular --input <entrada.json> --output <saida
        .json>
      3 import { readFileSync, writeFileSync } from 'node:fs';
      4 import { parseArgs } from 'node:util';
      5 import { ErroEntrada, interpretarEntrada } from './entrada.js';
      6 import { avaliar } from './motor.js';
      7 import { montarSaida } from './saida.js';
      8
     … +54 lines (ctrl+o to expand)

⏺ Write(tests/cli.test.ts)
  ⎿  Wrote 93 lines to tests/cli.test.ts
      1 import { spawnSync } from 'node:child_process';
      2 import { existsSync, mkdtempSync, readFileSync, rmSync, writeFile
        Sync } from 'node:fs';
      3 import { tmpdir } from 'node:os';
      4 import { join } from 'node:path';
      5 import { fileURLToPath } from 'node:url';
      6 import { afterAll, describe, expect, it } from 'vitest';
      7 import { avaliar } from '../src/motor.js';
      8 import { montarSaida } from '../src/saida.js';
      9 import { entradaDoExemplo, textoDoExemplo } from './fabrica.js';
     … +84 lines (ctrl+o to expand)

⏺ Bash(npm test 2>&1 | tail -15 && npm run typecheck 2>&1 | tail -3 && npm run
      reembolso -- calcular --input exemplos/despesas-exemplo.json --output
      /private/tmp/claud…)
  ⎿  (No output)

⏺ Tudo verde (141 testes) e a CLI real gera o arquivo com os totais da spec.
  Commitando T-016.

⏺ Bash(sed -i '' 's/- \[ \] \*\*T-016\*\*/- [x] **T-016**/'
      specs/001-motor-reembolso/tasks.md && python3 - <<'EOF'
      p='specs/001-motor-reembolso/tasks.md'…)  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      100  - [x] **T-015** — Montagem da saída (`src/saida.ts`): schema d
           a spec §4, ordem da entrada, totais, conversão Decimal → númer
           o (DT-003).
      101    - **Atende:** spec §4 (saída), RN-008 (totais = soma dos arr
           edondados)
      102    - **Aceite:** `tests/saida.test.ts` passa (exemplo pequeno d
           a spec §4 idêntico; motivos vazios em integral; `limite_aplica
           do` nulo em recusada) e `exemplo-ponta-a-ponta.test.ts` passa 
           a conferir totais: R$ 815,43; 5 integral, 3 parcial, 6 recusad
           a.
      103 -  - **Commit:**                                               
      103 +  - **Commit:** `9fcfec5`                                     
      104  
      105 -- [ ] **T-016** — CLI (`src/cli.ts`): `calcular --input --outp
          -ut`, erro de formato sem gerar saída, código de saída diferent
          -e de zero em erro.                                            
      105 +- [x] **T-016** — CLI (`src/cli.ts`): `calcular --input --outp
          +ut`, erro de formato sem gerar saída, código de saída diferent
          +e de zero em erro.                                            
      106    - **Atende:** interface fixa do desafio; spec §9
      107    - **Aceite:** `tests/cli.test.ts` passa (exemplo gera arquiv
           o igual ao esperado; entrada inválida não cria arquivo e sai c
           om erro; lista vazia gera totais zerados; duas execuções produ
           zem saídas idênticas).
      108    - **Commit:**

  Searched for 1 pattern (ctrl+o to expand)

⏺ Antes de T-017: o README.md atual é o enunciado do desafio. Vou ver o que
  DESAFIO/RUBRICA esperam dele antes de sobrescrever.

⏺ Bash(grep -n -i "readme" DESAFIO.md RUBRICA.md FAQ.md template -r | head -20;
      git log --oneline -- README.md | head)
  ⎿  (No output)

⏺ Bash(sed -n 40,110p DESAFIO.md; cat .gitignore 2>/dev/null; node --version)
  ⎿  (No output)

⏺ O README.md é o entregável "como rodar e como testar" segundo o DESAFIO.md,
  então substituo o enunciado (que continua em DESAFIO.md/RUBRICA.md/FAQ.md)
  pelo README do projeto.

⏺ Write(README.md)
  ⎿  Added 52 lines, removed 79 lines
        1 -# Desafio Prático — Spec Driven Development                   
        1 +# Motor de Cálculo de Reembolso                               
        2  
        3 -Aula bônus de SDD, fechando a trilha:                         
        3 +CLI que lê um JSON com as despesas de um colaborador num perío
          +do de competência e                                           
        4 +gera um JSON com, para cada despesa, o valor reembolsável, o s
          +tatus                                                         
        5 +(`integral`, `parcial` ou `recusada`) e os motivos — segundo a
          + política de                                                  
        6 +reembolso desambiguada em [`spec.md`](specs/001-motor-reembols
          +o/spec.md).                                                   
        7  
        5 -`AI Fluency` → `Claude 101` → `Claude Code 101` → `Building wi
          -th the Claude API` → `Claude Code in Action` → `Módulo SDD` → 
          -**Desafio**                                                   
        8 +Projeto construído com Spec Driven Development para o desafio 
          +descrito em                                                   
        9 +[`DESAFIO.md`](DESAFIO.md).                                   
       10  
        7 -**Individual · 2 dias · Claude Code**                         
       11 +## Requisitos                                                 
       12  
        9 ----                                                           
       13 +- Node.js 20 ou superior (`node --version`)                   
       14 +- npm                                                         
       15  
       11 -## Comece por aqui                                            
       16 +## Instalar                                                   
       17  
       13 -1. **[`DESAFIO.md`](DESAFIO.md)** — o enunciado. Leia inteiro 
          -antes de escrever qualquer coisa.                             
       14 -2. **[`RUBRICA.md`](RUBRICA.md)** — como você é avaliado. É pú
          -blica de propósito; leia antes de começar.                    
       15 -3. **[`exemplos/despesas-exemplo.json`](exemplos/despesas-exem
          -plo.json)** — a entrada de referência. Não é decoração: percor
          -ra item por item antes de escrever a spec.                    
       16 -4. **[`FAQ.md`](FAQ.md)** — travou? Comece por aqui. **O instr
          -utor está fora durante o desafio**, então o FAQ é o canal de s
          -uporte.                                                       
       17 -                                                              
       18 ----                                                           
       19 -                                                              
       20 -## Como participar                                            
       21 -                                                              
       22 -**1. Faça um fork deste repositório.** Ele precisa ser público
          -, ou você não conseguirá compartilhar depois.                 
       23 -                                                              
       24 -**2. Clone o seu fork e prepare a estrutura de trabalho:**    
       25 -                                                              
       18  ```bash
       27 -git clone https://github.com/<seu-usuario>/sdd-desafio.git    
       28 -cd sdd-desafio                                                
       29 -cp template/CLAUDE.md .                                       
       30 -cp -r template/specs .                                        
       31 -cp -r template/docs .                                         
       32 -git add -A && git commit -m "chore: estrutura inicial a partir
          - do template"                                                 
       19 +npm install                                                   
       20  ```
       21  
       35 -<details>                                                     
       36 -<summary>PowerShell</summary>                                 
       22 +## Rodar                                                      
       23  
       38 -```powershell                                                 
       39 -git clone https://github.com/<seu-usuario>/sdd-desafio.git    
       40 -cd sdd-desafio                                                
       41 -Copy-Item template\CLAUDE.md .                                
       42 -Copy-Item template\specs . -Recurse                           
       43 -Copy-Item template\docs . -Recurse                            
       44 -git add -A; git commit -m "chore: estrutura inicial a partir d
          -o template"                                                   
       24 +```bash                                                       
       25 +npm run reembolso -- calcular --input exemplos/despesas-exempl
          +o.json --output saida.json                                    
       26  ```
       46 -</details>                                                    
       27  
       48 -Os arquivos em `template/` são esqueletos com as perguntas que
          - cada documento precisa responder. Deixe a pasta `template/` o
          -nde está — ela serve de referência.                           
       28 +- `--input`: arquivo de entrada, no formato da [spec §4](specs
          +/001-motor-reembolso/spec.md#4-entrada-e-saída).              
       29 +- `--output`: arquivo de saída a gerar (sobrescrito se existir
          +).                                                            
       30  
       50 -**3. Trabalhe no seu fork**, seguindo as três regras do jogo d
          -escritas no [`DESAFIO.md`](DESAFIO.md):                       
       31 +Com o exemplo, `saida.json` traz as 14 despesas e os totais   
       32 +`valor_reembolsado: 815.43` e `quantidade: { integral: 5, parc
          +ial: 3, recusada: 6 }`                                        
       33 +(spec §7).                                                    
       34  
       52 -- Nenhum commit sem task                                      
       53 -- Explicação no chat que não está na spec é bug de spec       
       54 -- Interações exportadas (`/export`) e commitadas em `docs/sess
          -ions/`                                                        
       35 +**Erros.** Entrada fora do formato (JSON malformado, campo aus
          +ente, tipo errado,                                            
       36 +data inválida, `id` repetido) é rejeitada por inteiro: nenhum 
          +arquivo de saída é                                            
       37 +criado, o problema é listado no terminal (com o caminho do cam
          +po, ex.:                                                      
       38 +`despesas[0].valor: campo obrigatório ausente`) e o processo t
          +ermina com código 1.                                          
       39 +Argumentos inválidos terminam com código 2 e a mensagem de uso
          +.                                                             
       40  
       56 -**4. No Dia 2, às 10h**, você recebe uma mudança de requisito 
          -pelo canal da turma. Ela é obrigatória e vale 20 pontos. Chegu
          -e nesse momento com o sistema base funcionando e testado.     
       41 +## Testar                                                     
       42  
       58 -> Durante os dois dias o instrutor está de férias e não respon
          -de mensagens. Dúvida de processo: [`FAQ.md`](FAQ.md). Dúvida s
          -obre o que a política do RH significa não tem resposta — decid
          -ir isso é o exercício.                                        
       59 -                                                              
       60 -**5. Entregue** enviando o link do seu fork no formulário. Pra
          -zo: **Dia 2, 18h**.                                           
       61 -                                                              
       62 ----                                                           
       63 -                                                              
       64 -## O que o seu fork precisa conter ao final                   
       65 -                                                              
       43 +```bash                                                       
       44 +npm test            # todos os testes (vitest)                
       45 +npm run typecheck   # checagem de tipos (tsc --noEmit)        
       46  ```
       67 -seu-fork/                                                     
       68 -├── CLAUDE.md                     # convenções do projeto para
          - o agente                                                     
       69 -├── README.md                     # como rodar e como testar o
          - SEU projeto                                                  
       70 -├── specs/                                                    
       71 -│   └── 001-motor-reembolso/                                  
       72 -│       ├── spec.md               # o QUÊ e o PORQUÊ          
       73 -│       ├── plan.md               # o COMO                    
       74 -│       ├── tasks.md              # T-001..T-0NN, com critério
          - de aceite                                                    
       75 -│       └── DECISIONS.md          # log de mudanças de spec   
       76 -├── src/                                                      
       77 -├── tests/                                                    
       78 -└── docs/                                                     
       79 -    ├── sessions/                 # exports das suas conversas
          - com o Claude                                                 
       80 -    └── RELATORIO.md              # o relatório final         
       81 -```                                                           
       47  
       83 -Sobre o `README.md`: substitua este arquivo pelo README do **s
          -eu** projeto — como rodar, como testar, o que você construiu. 
          -Um README que não permite rodar o projeto custa pontos.       
       48 +Os testes são nomeados pelo ID da regra da spec, então o relat
          +ório do vitest liga                                           
       49 +cada caso ao critério de aceite correspondente:               
       50  
       85 ----                                                           
       51 +| Arquivo | O que confere |                                   
       52 +|---|---|                                                     
       53 +| `tests/rn-00N-*.test.ts` | uma regra de negócio (RN-001 a RN
          +-009) cada, com os casos de **Aceite** da spec |              
       54 +| `tests/ordem-aplicacao.test.ts` | ordem das fases e dos moti
          +vos (spec §8) |                                               
       55 +| `tests/exemplo-ponta-a-ponta.test.ts` | as 14 despesas do ex
          +emplo e os totais (spec §7) |                                 
       56 +| `tests/saida.test.ts` | schema e totais da saída (spec §4) |
       57 +| `tests/cli.test.ts` | a CLI de verdade: arquivo gerado, erro
          +s, lista vazia, determinismo (spec §9) |                      
       58 +| `tests/entrada.test.ts` | validação da entrada (spec §4) |  
       59  
       87 -## Antes de começar, confirme que o `/export` funciona        
       60 +## Onde está cada coisa                                       
       61  
       89 -Abra o Claude Code, troque duas mensagens, rode `/export` e co
          -nfirme que o arquivo foi gerado.                              
       62 +| Documento | Conteúdo |                                      
       63 +|---|---|                                                     
       64 +| [`specs/001-motor-reembolso/spec.md`](specs/001-motor-reembo
          +lso/spec.md) | **o quê**: regras de negócio, ambiguidades e de
          +cisões, casos de borda, critérios de aceite |                 
       65 +| [`specs/001-motor-reembolso/plan.md`](specs/001-motor-reembo
          +lso/plan.md) | **como**: stack, arquitetura, modelo de dados, 
          +decisões técnicas |                                           
       66 +| [`specs/001-motor-reembolso/tasks.md`](specs/001-motor-reemb
          +olso/tasks.md) | **em que ordem**: tasks T-001… com aceite e c
          +ommit de cada uma |                                           
       67 +| [`specs/001-motor-reembolso/DECISIONS.md`](specs/001-motor-r
          +eembolso/DECISIONS.md) | log de mudanças da spec |            
       68 +| [`docs/RELATORIO.md`](docs/RELATORIO.md) | relatório do desa
          +fio |                                                         
       69 +| [`docs/sessions/`](docs/sessions/) | exports das sessões com
          + o Claude Code |                                              
       70 +| [`CLAUDE.md`](CLAUDE.md) | convenções do projeto para o agen
          +te |                                                          
       71  
       91 -Faça isso **agora**, não no Dia 2. Sem `docs/sessions/`, o cri
          -tério de relatório vale zero — e já aconteceu de gente que fez
          - tudo certo descobrir no último dia que não tinha registro nen
          -hum do trabalho.                                              
       92 -                                                              
       93 -Exporte ao final de **cada** sessão, nomeando `docs/sessions/0
          -1-descricao-curta.md`, `02-...`, e assim por diante.          
       94 -                                                              
       95 ----                                                           
       96 -                                                              
       97 -## O resumo em um parágrafo                                   
       98 -                                                              
       99 -Você vai receber uma política de reembolso escrita por um RH, 
          -com a redação ruim que uma política de RH real tem. Ela é ambí
          -gua em vários pontos, e você não tem acesso a ninguém para tir
          -ar dúvida. O trabalho não é implementar — é **especificar**: e
          -ncontrar cada ambiguidade, decidir explicitamente, justificar 
          -e registrar. O produto funcionando vale **10 dos 100 pontos**.
          - Os outros 90 estão na spec, na rastreabilidade `spec → tasks 
          -→ commits → testes`, na resposta à mudança de requisito do Dia
          - 2 e no relatório.                                            
      100 -                                                              
      101 -Isso é deliberado. Um projeto que roda perfeitamente com spec 
          -fraca tira nota baixa; um projeto com bug conhecido, spec impe
          -cável e trilha limpa tira nota alta.                          
       72 +Código em `src/`: `cli.ts` (único módulo com I/O), `entrada.ts
          +` (validação),                                                
       73 +`motor.ts` (fases da spec §8), `regras/` (um arquivo por RN), 
          +`saida.ts`                                                    
       74 +(documento de saída), `politica.ts` (todos os números e textos
          + da política).                                                

⏺ Verificando o aceite de T-017 num clone limpo (com o README novo copiado por
  cima, já que ainda não está commitado).

⏺ Bash(S=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/669fa4d0-7f98-48dc-a724-04b9cbb0aa3a/scratchpad/clone && rm
      -rf $S && git c…)
  ⎿  Error: Exit code 1
      Test Files  17 passed (17)
           Tests  141 passed (141)
     exit=0
     {"valor_reembolsado":815.43,"quantidade":{"integral":5,"parcial":3,"recusad
     a":6}}
     Entrada inválida:
     - colaborador: campo obrigatório ausente
     - periodo: campo obrigatório ausente
     - despesas: campo obrigatório ausente
     exit=1
     … +1 line (ctrl+o to expand)

⏺ Clone limpo: install, 141 testes, comando de exemplo (815,43; 5/3/6) e o
  caminho de erro (código 1, sem arquivo) funcionam. Commitando T-017.

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/tasks.md'…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      105  - [x] **T-016** — CLI (`src/cli.ts`): `calcular --input --outp
           ut`, erro de formato sem gerar saída, código de saída diferent
           e de zero em erro.
      106    - **Atende:** interface fixa do desafio; spec §9
      107    - **Aceite:** `tests/cli.test.ts` passa (exemplo gera arquiv
           o igual ao esperado; entrada inválida não cria arquivo e sai c
           om erro; lista vazia gera totais zerados; duas execuções produ
           zem saídas idênticas).
      108 -  - **Commit:**                                               
      108 +  - **Commit:** `92776cc`                                     
      109  
      110 -- [ ] **T-017** — README do projeto: o que é, como instalar, r
          -odar e testar, onde estão spec/plan/tasks.                    
      110 +- [x] **T-017** — README do projeto: o que é, como instalar, r
          +odar e testar, onde estão spec/plan/tasks.                    
      111    - **Atende:** entrega do desafio
      112    - **Aceite:** seguindo só o README num clone limpo, `npm ins
           tall`, `npm test` e o comando de exemplo funcionam.
      113    - **Commit:**

⏺ Revisei a fase 3 e terminei a fase 4 (T-015, T-016 e T-017). Os 141 testes e o
  typecheck passam. Fiz três commits locais e não fiz push.

  Revisão da fase 3 (T-013, T-014)

  A fase está correta. O motor segue a spec §8: a fase 1 junta todos os motivos
  de recusa, na ordem da tabela, e a fase 2 só considera as despesas elegíveis.
  Hospedagem recusada não gera dias em viagem e sai com diarias nulo. O teste de
  ponta a ponta confere as 14 linhas da tabela da spec §7. Só havia duas
  pendências, as duas já resolvidas:
  - Faltava o hash de T-014 em tasks.md (b5f1242). Preenchi seguindo o costume
    do projeto: o hash de uma task entra no commit seguinte.
  - Sobrava um it.todo da RN-005 ("o total do período não é reduzido"), e o
    aceite de T-013 pedia que nenhum ficasse. Ele dependia da saída, então virou
    teste junto com T-015.

  Fase 4

  Task: T-015
  Commit: 9fcfec5
  O que entrou: saida.ts (src/saida.ts): monta o documento da spec §4. O exemplo

    pequeno da §4 sai idêntico. O total soma os valores já arredondados: duas
    despesas de 10,125 dão 20,24, não 20,25. O ponta a ponta agora também
  confere
     os totais (R$ 815,43; 5 integrais, 3 parciais, 6 recusadas).
  ────────────────────────────────────────
  Task: T-016
  Commit: 92776cc
  O que entrou: cli.ts (src/cli.ts): calcular --input --output. Entrada inválida

    não cria arquivo de saída e termina com código 1; argumentos inválidos
    terminam com código 2. cli.test.ts (tests/cli.test.ts) roda o processo de
    verdade e cobre lista vazia, duas execuções com saída idêntica e entrada
    reordenada.
  ────────────────────────────────────────
  Task: T-017
  Commit: 3b901b8
  O que entrou: Escrevi o README do projeto por cima do README.md, que antes era

    o enunciado do desafio (ele continua em DESAFIO.md, RUBRICA.md e FAQ.md). O
    DESAFIO.md define que o README.md é o "como rodar e como testar". Segui o
    README num clone limpo e npm install, npm test, o comando de exemplo e o
  caso
     de erro funcionaram.

  Decisões:
  - O teste da CLI não usa um arquivo de saída esperado, porque o repositório
    não tem um. Ele compara o arquivo gerado com a saída montada pelo motor e
    confere os totais da §7. Os valores de cada despesa já são conferidos contra
    a tabela da spec no teste de ponta a ponta. Se quiser um arquivo esperado
    escrito à mão, isso seria uma task nova.
  - Os códigos 1 e 2 são escolha minha. A spec só pede código de saída diferente
    de zero em caso de erro.

  Pendências:
  - O hash de T-017 (3b901b8) ainda não está em tasks.md; entra no próximo
    commit, como de costume.
  - Exportar a sessão para docs/sessions/.
  - Fazer o push, se quiser que eu faça.

  Com isso, todas as tasks das fases 1 a 4 estão concluídas. Só resta a fase 5,
  que é a mudança de requisito do Dia 2.