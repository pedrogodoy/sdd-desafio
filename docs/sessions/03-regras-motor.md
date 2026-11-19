# Sessão 03 — Regras de negócio e motor (T-004 a T-014, T-018)

> Export do `/export` sem edição de conteúdo; caminhos pessoais trocados por `~/`.
> Continuação direta de `02b-fundacao.md` (a conversa é a mesma; houve uma
> compactação de contexto logo antes da primeira mensagem abaixo).

---


✻ Conversation compacted (ctrl+o for history)


⏺ A fase de Fundação está concluída e no GitHub. Faltam só os hashes da T-003 no
  tasks.md, que entram no commit da T-004. São 18 testes passando e o typecheck
  termina sem erros.

  Commits para você revisar

  Commit: 815377e docs(plan)
  O quê: Ajuste no plano: a categoria normalizada saiu de Despesa e foi para
    Avaliacao, para que a validação da entrada não dependa da regra RN-009
    (T-004). Foi para o plan antes do código.
  ────────────────────────────────────────
  Commit: 696085e feat(T-002)
  O quê: src/politica.ts com todos os números e textos da política, cada um
    citando a sua RN, e src/modelo.ts com os tipos. O teste
    tests/politica.test.ts confere cada constante e também que 60×1,5=90,
    80×1,5=120 e 250×1,5=375.
  ────────────────────────────────────────
  Commit: ca4b491 feat(T-003)
  O quê: src/entrada.ts valida a entrada e converte os valores para Decimal. O
    teste tests/entrada.test.ts tem 10 casos.

  Pontos para olhar com atenção na T-003

  1. As mensagens de erro citam o campo exato, por exemplo despesas[2].valor:
     campo obrigatório ausente. A validação lista todos os problemas de uma vez,
     não só o primeiro. A spec diz "o erro informa o problema encontrado";
     listar todos é um detalhe de usabilidade, não uma regra nova.
  2. Datas impossíveis são rejeitadas, como 2026-02-30 (conferi antes como o zod
     4 se comporta).
  3. Lacuna da spec que deixei em aberto, sem inventar regra: a validação não
     confere se inicio ≤ fim nem se competencia bate com as datas do período.
     Por exemplo, a competência 2026-07 com o período de 01/08 a 31/08 é aceita
     hoje. A spec não fala disso. Você pode:
     - (A) Ignorar: fica como está e registro em "O que fica em aberto".
     - (B) Rejeitar: entra uma regra nova na spec §4, com uma entrada no
       DECISIONS.md (a spec já está aprovada) e um teste.

  Próxima fase: Regras (T-004 a T-012)

  São 9 tasks, uma por RN, cada uma com o seu commit. Respondida a pergunta da
  lacuna, sigo com elas no mesmo modo (B) e você revisa no fim da fase.

❯ Pode prosseguir
  ⎿  Read tests/entrada.test.ts (99 lines)
  ⎿  Read src/entrada.ts (104 lines)
  ⎿  Read specs/001-motor-reembolso/tasks.md (147 lines)
  ⎿  Read tests/politica.test.ts (55 lines)
  ⎿  Read src/modelo.ts (46 lines)
  ⎿  SessionStart:compact says: ✨ 30 Day Free Trial — memory runs off-plan. Get
     up to 100% more usage from your plan
     https://cmem.ai/pro?from=session-start

     Access Claude-Mem Rules + Tools: ~/.claude-mem/RULES-AND-TOOLS.md

     Oct 26, 2026

     specs/001-motor-reembolso/spec.md
       #2962  9:11 AM  ◆  RN-008 Rounding and Precision Rule Added to
     Reimbursement Spec
       #2963           ⚖  AMB-012 Resolves Rounding Precision Ambiguity with
     Banker's Rounding Strategy
     General
       #2964           ✓  Fourth Thematic Spec Commit Groups Rounding Precision
     Ambiguity Resolution

     Oct 28, 2026

     specs/001-motor-reembolso/spec.md
       #3000  4:57 PM  ◆  RN-009 Reimbursable Categories Rule Implemented with
     Normalization
       #3002           ⚖  AMB-014 Weekend Expenses Allowed Without Restriction
       #3001           ⚖  AMB-013 Category Name Normalization Strategy
     Documented
       #3003           ✓  Out-of-Scope Section Updated with Weekend Restriction
     Clarification
     General
       #3004           ✓  Fifth Thematic Spec Commit Groups Category and Weekend
     Ambiguities

     Nov 6, 2026

     specs/001-motor-reembolso/spec.md
       #3058  11:37 AM  ◆  Two-Phase Rule Application Order Documented in
     Reimbursement Spec
     General
       #3059            ✓  Sixth Thematic Spec Commit Groups Rule Application
     Order
     specs/001-motor-reembolso/spec.md
       #3060  11:40 AM  ◆  Input and Output Schema Documented with Field-Level
     Specification
     General
       #3061            ✓  Seventh Thematic Spec Commit Adds Input/Output Schema

     #S773 Complete remaining specification sections and finalize version 1.0
     (Nov 6 at 11:41 AM)

     specs/001-motor-reembolso/spec.md
       #3062  11:49 AM  ✓  Reimbursement Specification Status Changed to
     Approved
       #3063            ✓  Problem Statement and Objective Sections Completed in
     Reimbursement Spec
       #3064            ✓  Output Status Field Definition Clarified with
     Rounding Edge Case
       #3065            ◆  Complete End-to-End Test Cases Documented for All 14
     Sample Expenses
       #3066            ◆  Acceptance Criteria Checklist Defined with Seven
     Verification Points
       #3067            ✓  Two Additional Known Limitations Documented in Open
     Questions Section
     General
       #3068            ✓  Specification Version 1.0 Completed and Committed
     #S774 Relocate specification file from repository root to proper docs
     directory structure (Nov 6 at 11:49 AM)

     01-especificacao.md
       #3069  11:56 AM  ○  Specification File Created Outside Intended docs
     Directory
       #3070  11:57 AM  ⊘  Specification File Contains Personal File Paths in
     Session Logs
       #3071            ✓  Session 01 Export Relocated to docs/sessions with
     Path Sanitization
     #S775 Technology stack selection discussion for reimbursement engine
     implementation (Nov 6 at 11:57 AM)

     #S776 Complete technical planning document and update CLAUDE.md with
     implementation conventions (Nov 6 at 12:00 PM)

     specs/001-motor-reembolso/plan.md
       #3073  12:01 PM  ◆  Complete Technical Plan Documented with Five
     Technical Decisions
       #3072            ⚖  TypeScript Stack Selected with Decimal.js for
     Monetary Arithmetic
     CLAUDE.md
       #3074  12:02 PM  ✓  CLAUDE.md Agent Context File Updated with Stack and
     Coding Conventions
     #S777 Create task breakdown document decomposing implementation into
     commit-sized units with traceability matrix (Nov 6 at 12:02 PM)

     specs/001-motor-reembolso/tasks.md
       #3075  12:04 PM  ◆  Implementation Tasks Breakdown Created with 17
     Commit-Sized Tasks
     General
       #3076            ✓  Task Breakdown Committed with Complete Traceability
     Matrix
     #S778 Complete T-001 project initialization with dependency installation
     and security vulnerability resolution (Nov 6 at 12:04 PM)

     General
       #3077  12:06 PM  ✓  Planning Phase Commits Pushed to GitHub Fork
       #3078  12:07 PM  ◆  T-001 Project Initialization with TypeScript and Test
     Infrastructure
     tests/setup.test.ts
       #3079            ●  TypeScript Error on Decimal.js Constructor Import
     Fixed
       #3080            ●  Decimal.js Import Fixed with Named Export Syntax
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
     #S794 Foundation phase completion review and decision on competencia
     validation gap before proceeding to Rules phase (Nov 18 at 10:26 AM)


     Investigated: Three foundation commits reviewed: 815377e (plan adjustment
     moving normalized category from Despesa to Avaliacao), 696085e (T-002
     policy constants and data model), and ca4b491 (T-003 input validation with
     Decimal conversion). Input validation error reporting examined for field
     path formatting and batch error collection. Zod 4 date validation behavior
     confirmed for impossible dates like 2026-02-30. Specification gap
     identified where competencia field not validated against periodo dates
     (e.g., competencia 2026-07 accepted with periodo 2026-08-01 to 2026-08-31).

     Learned: Input validation layer collects and reports all validation
     problems simultaneously with exact field paths (despesas[2].valor format)
     rather than failing on first error, improving usability. Specification
     section 4 does not mandate cross-field validation between competencia and
     periodo date range, leaving this as an open decision point. Normalized
     category field placement in Avaliacao rather than Despesa isolates input
     validation from business rule RN-009, maintaining clean separation of
     concerns.

     Completed: Foundation phase delivered three commits pushed to GitHub:
     policy constants module with all specification values and test coverage,
     internal data model TypeScript interfaces, and input validation layer with
     Zod schemas converting JSON to Decimal-based internal model. Test suite
     expanded to 18 passing tests across 3 test files with clean typecheck.
     T-001, T-002, and T-003 tasks marked complete in tasks.md with commit hash
     traceability.

     Next Steps: Awaiting decision on specification gap: (A) accept competencia
     validation gap and document in open questions, or (B) add cross-field
     validation rule to spec section 4 with DECISIONS.md entry and test
     coverage. After decision, proceed to Rules phase implementing T-004 through
     T-012 (9 tasks, one commit per business rule) in batch mode with
     end-of-phase review.

     Notes: Foundation phase establishes clean architectural boundaries: input
     validation isolated from business rules, monetary values in Decimal.js for
     precision arithmetic per DT-002, and policy constants as single source of
     truth with specification traceability. The competencia validation gap
     represents typical real-world scenario where specification assumptions
     surface during implementation, requiring explicit decision on whether
     implicit constraints become explicit rules.

     View Observations Live @ http://localhost:37777 · 60 lines

⏺ Compacted using a summary written while you were away · turn off with
  "idleCompaction": false in settings.json

⏺ Sigo a Fase 2. A lacuna inicio ≤ fim / competência ficou sem resposta, então
  vou pela opção sem regra nova (A). Registro em "O que fica em aberto", e se
  você preferir a B, mudamos depois. Antes de começar, releio a spec e o plan.

⏺ Bash(cat specs/001-motor-reembolso/spec.md && sed -n '1,400p'
      specs/001-motor-reembolso/plan.md && cat exemplos/despesas-exemplo.json &&
      ls src tests)
  ⎿  (No output)

  Read 1 file (ctrl+o to expand)

⏺ Bash(cat DECISIONS.md && git log --oneline | head -20 && cat vitest.config.*
      2>/dev/null; cat package.json)
  ⎿  (No output)

⏺ Bash(git log --oneline | head -5; find . -iname 'decisions*' -not -path
      './node_modules/*'; ls; ls docs specs/001-motor-reembolso)
  ⎿  (No output)

  Read 1 file (ctrl+o to expand)

⏺ Primeiro registro a lacuna (opção A) na spec, com entrada no DECISIONS.md,
  porque a spec v1.0 já está aprovada.

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/spec.md'…)
  ⎿  Updated specs/001-motor-reembolso/DECISIONS.md (+7 -24)
      10  
      11  ---
      12  
      13 -## D-002 — <título curto> · `<data>`                           
      13 +## D-001 — Coerência do período fica em aberto · `2026-11-18`  
      14  
      15 -**Gatilho:** <o que provocou: envelope lacrado / erro descobert
         -o na implementação /                                           
      16 -ambiguidade que só apareceu ao testar / o Claude apontou uma co
         -ntradição>                                                     
      15 +**Gatilho:** lacuna que só apareceu ao implementar a validação 
         +da entrada (T-003): a spec §4 diz quais campos o período tem, m
         +as não se eles precisam ser coerentes entre si.                
      16  
      18 -**O que mudou na spec:** <de → para, citando o ID da regra>    
      17 +**O que mudou na spec:** versão 1.0 → 1.1. Nova entrada em §10 
         +("O que fica em aberto"): a entrada não é rejeitada por `inicio
         +` > `fim` nem por `competencia` incoerente com as datas; só `in
         +icio` e `fim` valem para RN-003. Nenhuma RN mudou.             
      18  
      20 -**Por quê:**                                                   
      19 +**Por quê:** a política do RH não diz qual campo prevalece quan
         +do discordam. Rejeitar seria criar regra nova sem base; ignorar
         + em silêncio deixaria a lacuna invisível. A opção registrada nã
         +o altera nenhum resultado da §7 e, no caso extremo (`inicio` > 
         +`fim`), recusa tudo com motivo explícito.                      
      20  
      22 -**O que isso invalidou:** <requisitos, decisões técnicas, teste
         -s que caíram>                                                  
      21 +**O que isso invalidou:** nada. `tests/entrada.test.ts` continu
         +a valendo.                                                     
      22  
      24 -**Tasks afetadas:** <as que precisaram ser refeitas + as novas 
         -criadas>                                                       
      23 +**Tasks afetadas:** nenhuma refeita; nenhuma criada.           
      24  
      26 -**Custo:** <quantos arquivos tocados, quanto tempo>            
      27 -                                                               
      28 ----                                                            
      29 -                                                               
      30 -## D-001 — <título curto> · `<data>`                           
      31 -                                                               
      32 -**Gatilho:**                                                   
      33 -                                                               
      34 -**O que mudou na spec:**                                       
      35 -                                                               
      36 -**Por quê:**                                                   
      37 -                                                               
      38 -**O que isso invalidou:**                                      
      39 -                                                               
      40 -**Tasks afetadas:**                                            
      41 -                                                               
      42 -**Custo:**                                                     
      25 +**Custo:** 2 arquivos (spec.md, DECISIONS.md), poucos minutos. 
  ⎿  Updated specs/001-motor-reembolso/spec.md (+2 -1)
      1  # Spec — Motor de Cálculo de Reembolso
      2  
      3 -**Versão:** 1.0 · **Status:** aprovada · **Última alteração:** 2
        -026-11-06                                                       
      3 +**Versão:** 1.1 · **Status:** aprovada · **Última alteração:** 2
        +026-11-18                                                       
      4  
      5  > **Regra de ouro deste arquivo:** ele descreve o QUÊ e o PORQUÊ
         . Nenhuma linha
      6  > aqui pode citar linguagem, biblioteca, classe, função ou estru
         tura de pasta.
     ...
      395  - **Compras legítimas idênticas são tratadas como duplicata.**
            Duas despesas reais com todos os campos iguais (ex.: dois caf
           és de R$ 8,00, mesma descrição, mesma padaria, mesmo dia) não 
           podem ser distinguidas, porque a entrada não traz horário nem 
           número da nota. **Decisão provisória:** aplica-se AMB-008 — a 
           segunda é recusada como duplicata. O colaborador pode relançá-
           la com descrição que a diferencie. Resolver de verdade exige u
           m identificador da nota na entrada.
      396  - **Viagem sem hospedagem não é detectada.** Uma viagem de ida
            e volta no mesmo dia, sem pernoite, não gera datas em viagem 
           (RN-007), e os limites não são ampliados. **Decisão provisória
           :** aceita-se a limitação; resolver exige um campo de viagem n
           a entrada.
      397  - **O limite de R$ 250,00 por diária nunca é aplicado isoladam
           ente.** Consequência de AMB-011: toda hospedagem caracteriza v
           iagem, então o limite efetivo é sempre R$ 375,00. **Decisão pr
           ovisória:** mantido; se o RH esclarecer que a ampliação não va
           le para a própria hospedagem, basta alterar RN-006.
      398 +- **Coerência entre `competencia`, `inicio` e `fim` não é veri
          +ficada.** A entrada é aceita mesmo com `inicio` depois de `fim
          +` ou com uma competência que não corresponde às datas do perío
          +do (ex.: competência `2026-07` com período de 01/08 a 31/08). 
          +A política não diz qual campo prevalece. **Decisão provisória:
          +** só `inicio` e `fim` são usados (RN-003); `competencia` é ap
          +enas copiada para a saída. Com `inicio` depois de `fim`, nenhu
          +ma data cabe no período e todas as despesas são recusadas por 
          +RN-003 — o resultado é visível e auditável, não silencioso.   
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+1 -1)
       8  
       9  **Formato do commit:** `feat(T-003): <descrição>` · `test(T-003
          ): <descrição>`
      10  
      11 -**Baseado em:** spec 1.0 · plan 1.0                            
      11 +**Baseado em:** spec 1.1 · plan 1.0                            
      12  
      13  ---
      14  

⏺ Bash(git add specs/001-motor-reembolso/{spec,DECISIONS,tasks}.md && git commit
      -q -F - <<'EOF'
      docs(spec): registra em §10 a coerência do período como item em aberto…)
  ⎿  (No output)

⏺ Agora sigo para a T-004, com um helper de testes para montar despesas; os
  casos de aceite que dependem do motor ficam como it.todo até a T-013.
  · summary

⏺ Bash(mkdir -p src/regras && cat > tests/fabrica.ts <<'EOF'
      // Fábricas de dados para os testes de regra (não é teste: não termina em
      .test.ts).…)
  ⎿  Created src/regras/categoria.ts (+16 -0)
       1 +// RN-009 — Categorias reembolsáveis (AMB-013).                
       2 +import { CATEGORIAS_REEMBOLSAVEIS, MOTIVOS, type Categoria } fr
         +om '../politica.js';                                           
       3 +                                                               
       4 +/** Minúsculas e sem acentos; nenhuma outra transformação (espa
         +ços, hífens, sinônimos). */                                    
       5 +export function normalizarCategoria(categoria: string): string 
         +{                                                              
       6 +  return categoria.normalize('NFD').replace(/\p{M}/gu, '').toLo
         +werCase();                                                     
       7 +}                                                              
       8 +                                                               
       9 +export function ehCategoriaReembolsavel(categoria: string): cat
         +egoria is Categoria {                                          
      10 +  return (CATEGORIAS_REEMBOLSAVEIS as readonly string[]).includ
         +es(categoria);                                                 
      11 +}                                                              
      12 +                                                               
      13 +/** Recebe a categoria já normalizada; devolve o motivo de recu
         +sa ou null. */                                                 
      14 +export function verificarCategoria(categoriaNormalizada: string
         +): string | null {                                             
      15 +  return ehCategoriaReembolsavel(categoriaNormalizada) ? null :
         + MOTIVOS.categoriaForaDaPolitica;                              
      16 +}                                                              
  ⎿  Created tests/fabrica.ts (+41 -0)
       1 +// Fábricas de dados para os testes de regra (não é teste: não 
         +termina em .test.ts).                                          
       2 +import { readFileSync } from 'node:fs';                        
       3 +import { Decimal } from 'decimal.js';                          
       4 +import { interpretarEntrada } from '../src/entrada.js';        
       5 +import type { Despesa, Entrada } from '../src/modelo.js';      
       6 +                                                               
       7 +let sequencia = 0;                                             
       8 +                                                               
       9 +type DadosDespesa = Partial<Omit<Despesa, 'valor'>> & { valor?:
         + string | number };                                            
      10 +                                                               
      11 +/** Despesa válida com valores neutros; sobrescreva só o que im
         +porta para o caso. */                                          
      12 +export function despesa(dados: DadosDespesa = {}): Despesa {   
      13 +  sequencia += 1;                                              
      14 +  const { valor = '10', ...resto } = dados;                    
      15 +  return {                                                     
      16 +    id: `t-${String(sequencia).padStart(3, '0')}`,             
      17 +    data: '2026-07-10',                                        
      18 +    categoria: 'alimentacao',                                  
      19 +    descricao: 'Despesa de teste',                             
      20 +    fornecedor: 'Fornecedor de teste',                         
      21 +    temNotaFiscal: true,                                       
      22 +    indice: 0,                                                 
      23 +    ...resto,                                                  
      24 +    valor: new Decimal(String(valor)),                         
      25 +  };                                                           
      26 +}                                                              
      27 +                                                               
      28 +export function textoDoExemplo(): string {                     
      29 +  return readFileSync(new URL('../exemplos/despesas-exemplo.jso
         +n', import.meta.url), 'utf8');                                 
      30 +}                                                              
      31 +                                                               
      32 +export function entradaDoExemplo(): Entrada {                  
      33 +  return interpretarEntrada(textoDoExemplo());                 
      34 +}                                                              
      35 +                                                               
      36 +/** Despesa do arquivo de exemplo pelo id (ex.: 'd-005'). */   
      37 +export function doExemplo(id: string): Despesa {               
      38 +  const encontrada = entradaDoExemplo().despesas.find((d) => d.
         +id === id);                                                    
      39 +  if (!encontrada) throw new Error(`despesa ${id} não existe no
         + exemplo`);                                                    
      40 +  return encontrada;                                           
     … 1 more lines (ctrl+o to expand)
  ⎿  Created tests/rn-009-categoria.test.ts (+34 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { normalizarCategoria, verificarCategoria } from '../src
         +/regras/categoria.js';                                         
       3 +import { doExemplo } from './fabrica.js';                      
       4 +                                                               
       5 +const avaliar = (categoria: string) => verificarCategoria(norma
         +lizarCategoria(categoria));                                    
       6 +                                                               
       7 +describe('RN-009 — categorias reembolsáveis', () => {          
       8 +  it('AC: d-005 coworking, R$ 89,00 → recusada, "categoria fora
         + da política"', () => {                                        
       9 +    expect(avaliar(doExemplo('d-005').categoria)).toBe('categor
         +ia fora da política');                                         
      10 +  });                                                          
      11 +                                                               
      12 +  it('AC: d-014 ALIMENTACAO → tratada como alimentacao', () => 
         +{                                                              
      13 +    expect(normalizarCategoria(doExemplo('d-014').categoria)).t
         +oBe('alimentacao');                                            
      14 +    expect(avaliar('ALIMENTACAO')).toBeNull();                 
      15 +  });                                                          
      16 +                                                               
      17 +  it.todo('AC: d-014 ALIMENTACAO, R$ 61,00 em 31/07 → recebe R$
         + 60,00 (parcial) — via motor, T-013');                         
      18 +                                                               
      19 +  it('AC: Alimentação (acento e inicial maiúscula) → tratada co
         +mo alimentacao', () => {                                       
      20 +    expect(normalizarCategoria('Alimentação')).toBe('alimentaca
         +o');                                                           
      21 +    expect(avaliar('Alimentação')).toBeNull();                 
      22 +  });                                                          
      23 +                                                               
      24 +  it('AC: transporte urbano (espaço no lugar do sublinhado) → "
         +categoria fora da política"', () => {                          
      25 +    expect(normalizarCategoria('transporte urbano')).toBe('tran
         +sporte urbano');                                               
      26 +    expect(avaliar('transporte urbano')).toBe('categoria fora d
         +a política');                                                  
      27 +  });                                                          
      28 +                                                               
      29 +  it('as três categorias da política são aceitas', () => {     
      30 +    for (const c of ['alimentacao', 'transporte_urbano', 'hospe
         +dagem']) expect(avaliar(c)).toBeNull();                        
      31 +    expect(avaliar('HOSPEDAGEM')).toBeNull();                  
      32 +    expect(avaliar('Transporte_Urbano')).toBeNull();           
      33 +  });                                                          
      34 +});                                                            

⏺ Bash(cat > /private/tmp/claude-501/-Users-USUARIO-Documents-dev-nos
      ync-sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      <<'EOF'
      # uso:…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      27  - [x] **T-003** — Valida a entrada e converte para o modelo int
          erno (`src/entrada.ts`), com valores em `Decimal` (DT-001, DT-0
          02).
      28    - **Atende:** spec §4 (entrada e rejeição de entrada malforma
          da)
      29    - **Aceite:** `tests/entrada.test.ts` — aceita `exemplos/desp
          esas-exemplo.json`; aceita lista de despesas vazia; rejeita, co
          m mensagem que cita o campo: campo obrigatório ausente, tipo er
          rado, data inválida, `id` repetido; `33.333` vira `Decimal('33.
          333')`.
      30 -  - **Commit:**                                                
      30 +  - **Commit:** `ca4b491`                                      
      31  
      32  ## Fase 2 — Regras de negócio
      33  
      34  Cada task cria um arquivo em `src/regras/` e o seu teste. Os `i
          t(...)` reproduzem literalmente os casos de **Aceite** da RN na
           spec.
      35  
      36 -- [ ] **T-004** — Normalização e verificação de categoria (`reg
         -ras/categoria.ts`).                                            
      36 +- [x] **T-004** — Normalização e verificação de categoria (`reg
         +ras/categoria.ts`).                                            
      37    - **Atende:** RN-009, AMB-013
      38    - **Aceite:** `tests/rn-009-categoria.test.ts` passa (d-005 r
          ecusada; `ALIMENTACAO` e `Alimentação` → `alimentacao`; `transp
          orte urbano` recusada).
      39    - **Commit:**

⏺ Bash(git show --stat HEAD | tail -6)
  ⎿  (No output)

⏺ Agora T-005 (valor), T-006 (período) e T-008 (nota fiscal). São verificações
  simples, por despesa, e cada uma vai no seu commit.

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/regras/v…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      36  - [x] **T-004** — Normalização e verificação de categoria (`reg
          ras/categoria.ts`).
      37    - **Atende:** RN-009, AMB-013
      38    - **Aceite:** `tests/rn-009-categoria.test.ts` passa (d-005 r
          ecusada; `ALIMENTACAO` e `Alimentação` → `alimentacao`; `transp
          orte urbano` recusada).
      39 -  - **Commit:**                                                
      39 +  - **Commit:** `f071ec6`                                      
      40  
      41 -- [ ] **T-005** — Verificação de valor não positivo (`regras/va
         -lor.ts`).                                                      
      41 +- [x] **T-005** — Verificação de valor não positivo (`regras/va
         +lor.ts`).                                                      
      42    - **Atende:** RN-005, AMB-009
      43    - **Aceite:** `tests/rn-005-valor-nao-positivo.test.ts` passa
           (d-009 −45 recusada; 0 recusada; positivo aceito).
      44    - **Commit:**
  ⎿  Created src/regras/valor.ts (+8 -0)
      1 +// RN-005 — Valores não positivos (AMB-009).                    
      2 +import type { Despesa } from '../modelo.js';                    
      3 +import { MOTIVOS } from '../politica.js';                       
      4 +                                                                
      5 +/** Devolve o motivo de recusa ou null. */                      
      6 +export function verificarValor(despesa: Despesa): string | null 
        +{                                                               
      7 +  return despesa.valor.lte(0) ? MOTIVOS.valorNaoPositivo : null;
      8 +}                                                               
  ⎿  Created tests/rn-005-valor-nao-positivo.test.ts (+22 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { verificarValor } from '../src/regras/valor.js';       
       3 +import { despesa, doExemplo } from './fabrica.js';             
       4 +                                                               
       5 +describe('RN-005 — valores não positivos', () => {             
       6 +  it('AC: d-009 transporte −R$ 45,00 em 11/07 → recusada, "valo
         +r não positivo"', () => {                                      
       7 +    expect(verificarValor(doExemplo('d-009'))).toBe('valor não 
         +positivo');                                                    
       8 +  });                                                          
       9 +                                                               
      10 +  it.todo('AC: d-009 → total do período não é reduzido — via mo
         +tor/saída, T-013/T-015');                                      
      11 +                                                               
      12 +  it('AC: despesa de R$ 0,00 → recusada com o mesmo motivo', ()
         + => {                                                          
      13 +    expect(verificarValor(despesa({ valor: 0 }))).toBe('valor n
         +ão positivo');                                                 
      14 +  });                                                          
      15 +                                                               
      16 +  it.todo('AC: transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a
         + de R$ 70,00 recebe R$ 70,00 — via motor, T-013');             
      17 +                                                               
      18 +  it('valor positivo, mesmo mínimo, é aceito', () => {         
      19 +    expect(verificarValor(despesa({ valor: 70 }))).toBeNull(); 
      20 +    expect(verificarValor(despesa({ valor: '0.001' }))).toBeNul
         +l();                                                           
      21 +  });                                                          
      22 +});                                                            

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/regras/p…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      41  - [x] **T-005** — Verificação de valor não positivo (`regras/va
          lor.ts`).
      42    - **Atende:** RN-005, AMB-009
      43    - **Aceite:** `tests/rn-005-valor-nao-positivo.test.ts` passa
           (d-009 −45 recusada; 0 recusada; positivo aceito).
      44 -  - **Commit:**                                                
      44 +  - **Commit:** `57df3cd`                                      
      45  
      46 -- [ ] **T-006** — Verificação de período de competência (`regra
         -s/periodo.ts`).                                                
      46 +- [x] **T-006** — Verificação de período de competência (`regra
         +s/periodo.ts`).                                                
      47    - **Atende:** RN-003, AMB-007
      48    - **Aceite:** `tests/rn-003-periodo.test.ts` passa (d-008 rec
          usada; 01/07 e 31/07 elegíveis; 01/08 recusada).
      49    - **Commit:**
  ⎿  Created src/regras/periodo.ts (+9 -0)
      1 +// RN-003 — Período de competência (AMB-007).                   
      2 +import type { Despesa, Periodo } from '../modelo.js';           
      3 +import { MOTIVOS } from '../politica.js';                       
      4 +                                                                
      5 +/** Datas AAAA-MM-DD comparam corretamente como texto; extremos 
        +inclusivos. */                                                  
      6 +export function verificarPeriodo(despesa: Despesa, periodo: Peri
        +odo): string | null {                                           
      7 +  const dentro = despesa.data >= periodo.inicio && despesa.data 
        +<= periodo.fim;                                                 
      8 +  return dentro ? null : MOTIVOS.foraDoPeriodo;                 
      9 +}                                                               
  ⎿  Created tests/rn-003-periodo.test.ts (+32 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { verificarPeriodo } from '../src/regras/periodo.js';   
       3 +import { despesa, doExemplo, entradaDoExemplo } from './fabrica
         +.js';                                                          
       4 +                                                               
       5 +const { periodo } = entradaDoExemplo(); // 2026-07-01 a 2026-07
         +-31                                                            
       6 +                                                               
       7 +describe('RN-003 — período de competência', () => {            
       8 +  it('AC: d-008 em 15/04, período 01/07–31/07 → recusada, "fora
         + do período de competência"', () => {                          
       9 +    expect(verificarPeriodo(doExemplo('d-008'), periodo)).toBe(
         +'fora do período de competência');                             
      10 +  });                                                          
      11 +                                                               
      12 +  it('AC: data igual a periodo.inicio (01/07) → elegível', () =
         +> {                                                            
      13 +    expect(verificarPeriodo(despesa({ data: '2026-07-01' }), pe
         +riodo)).toBeNull();                                            
      14 +  });                                                          
      15 +                                                               
      16 +  it('AC: data igual a periodo.fim (31/07) → elegível', () => {
      17 +    expect(verificarPeriodo(despesa({ data: '2026-07-31' }), pe
         +riodo)).toBeNull();                                            
      18 +  });                                                          
      19 +                                                               
      20 +  it('AC: data 01/08 → recusada', () => {                      
      21 +    expect(verificarPeriodo(despesa({ data: '2026-08-01' }), pe
         +riodo)).toBe('fora do período de competência');                
      22 +  });                                                          
      23 +                                                               
      24 +  it('véspera do início (30/06) → recusada', () => {           
      25 +    expect(verificarPeriodo(despesa({ data: '2026-06-30' }), pe
         +riodo)).toBe('fora do período de competência');                
      26 +  });                                                          
      27 +                                                               
      28 +  it('spec §10 (D-001): com inicio depois de fim, nenhuma data 
         +cabe no período', () => {                                      
      29 +    const invertido = { ...periodo, inicio: '2026-07-31', fim: 
         +'2026-07-01' };                                                
      30 +    expect(verificarPeriodo(despesa({ data: '2026-07-15' }), in
         +vertido)).toBe('fora do período de competência');              
      31 +  });                                                          
      32 +});                                                            
⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/regras/d…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      46  - [x] **T-006** — Verificação de período de competência (`regra
          s/periodo.ts`).
      47    - **Atende:** RN-003, AMB-007
      48    - **Aceite:** `tests/rn-003-periodo.test.ts` passa (d-008 rec
          usada; 01/07 e 31/07 elegíveis; 01/08 recusada).
      49 -  - **Commit:**                                                
      49 +  - **Commit:** `7bb917b`                                      
      50  
      51 -- [ ] **T-007** — Detecção de duplicatas (`regras/duplicata.ts`
         -), comparando categoria normalizada.                           
      51 +- [x] **T-007** — Detecção de duplicatas (`regras/duplicata.ts`
         +), comparando categoria normalizada.                           
      52    - **Atende:** RN-004, AMB-008
      53    - **Aceite:** `tests/rn-004-duplicata.test.ts` passa (d-007 "
          duplicata de d-006"; descrição diferente não é duplicata; trio 
          mantém o menor `id`; `ALIMENTACAO` × `alimentacao` são duplicat
          as).
      54    - **Commit:**
  ⎿  Created src/regras/duplicata.ts (+33 -0)
       1 +// RN-004 — Duplicatas (AMB-008).                              
       2 +import type { Despesa } from '../modelo.js';                   
       3 +import { MOTIVOS } from '../politica.js';                      
       4 +                                                               
       5 +export interface ItemDuplicata {                               
       6 +  despesa: Despesa;                                            
       7 +  categoria: string; // já normalizada (spec §8, etapa 4)      
       8 +}                                                              
       9 +                                                               
      10 +/** Todos os campos exceto `id`; Decimal.toString() ignora zero
         +s à direita (54.90 = 54.9). */                                 
      11 +function chave({ despesa: d, categoria }: ItemDuplicata): strin
         +g {                                                            
      12 +  return JSON.stringify([d.data, categoria, d.descricao, d.forn
         +ecedor, d.valor.toString(), d.temNotaFiscal]);                 
      13 +}                                                              
      14 +                                                               
      15 +/**                                                            
      16 + * Considera todas as despesas da entrada. Devolve, para cada d
         +espesa recusada                                                
      17 + * como duplicata, o motivo "duplicata de <id mantido>"; a de m
         +enor `id` do grupo                                             
      18 + * não aparece no mapa.                                        
      19 + */                                                            
      20 +export function detectarDuplicatas(itens: ItemDuplicata[]): Map
         +<string, string> {                                             
      21 +  const grupos = new Map<string, string[]>();                  
      22 +  for (const item of itens) {                                  
      23 +    const k = chave(item);                                     
      24 +    grupos.set(k, [...(grupos.get(k) ?? []), item.despesa.id]);
      25 +  }                                                            
      26 +                                                               
      27 +  const motivos = new Map<string, string>();                   
      28 +  for (const ids of grupos.values()) {                         
      29 +    const [mantido, ...demais] = [...ids].sort((a, b) => (a < b
         + ? -1 : a > b ? 1 : 0));                                       
      30 +    for (const id of demais) motivos.set(id, MOTIVOS.duplicataD
         +e(mantido!));                                                  
      31 +  }                                                            
      32 +  return motivos;                                              
      33 +}                                                              
  ⎿  Created tests/rn-004-duplicata.test.ts (+78 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { normalizarCategoria } from '../src/regras/categoria.js
         +';                                                             
       3 +import { detectarDuplicatas } from '../src/regras/duplicata.js'
         +;                                                              
       4 +import type { Despesa } from '../src/modelo.js';               
       5 +import { despesa, doExemplo, entradaDoExemplo } from './fabrica
         +.js';                                                          
       6 +                                                               
       7 +const itens = (despesas: Despesa[]) =>                         
       8 +  despesas.map((d) => ({ despesa: d, categoria: normalizarCateg
         +oria(d.categoria) }));                                         
       9 +                                                               
      10 +const base = {                                                 
      11 +  data: '2026-07-09',                                          
      12 +  categoria: 'alimentacao',                                    
      13 +  descricao: 'Almoço',                                         
      14 +  fornecedor: 'Bistro Central',                                
      15 +  valor: '54.90',                                              
      16 +  temNotaFiscal: true,                                         
      17 +};                                                             
      18 +                                                               
      19 +describe('RN-004 — duplicatas', () => {                        
      20 +  it('AC: d-006 e d-007 idênticas → d-007 recusada "duplicata d
         +e d-006"; d-006 segue', () => {                                
      21 +    const motivos = detectarDuplicatas(itens([doExemplo('d-006'
         +), doExemplo('d-007')]));                                      
      22 +    expect(motivos.get('d-007')).toBe('duplicata de d-006');   
      23 +    expect(motivos.has('d-006')).toBe(false);                  
      24 +  });                                                          
      25 +                                                               
      26 +  it.todo('AC: d-006 segue para o limite e recebe R$ 54,90 — vi
         +a motor, T-013');                                              
      27 +                                                               
      28 +  it('AC: iguais exceto pela descrição ("Almoço" × "Almoço equi
         +pe") → não são duplicatas', () => {                            
      29 +    const motivos = detectarDuplicatas(                        
      30 +      itens([despesa({ ...base, id: 'd-030' }), despesa({ ...ba
         +se, id: 'd-031', descricao: 'Almoço equipe' })]),              
      31 +    );                                                         
      32 +    expect(motivos.size).toBe(0);                              
      33 +  });                                                          
      34 +                                                               
      35 +  it('AC: três idênticas d-020, d-021, d-022 → d-020 mantida; d
         +-021 e d-022 "duplicata de d-020"', () => {                    
      36 +    // fora de ordem na entrada: o mantido é o menor id, não o 
         +primeiro da lista                                              
      37 +    const motivos = detectarDuplicatas(                        
      38 +      itens([despesa({ ...base, id: 'd-022' }), despesa({ ...ba
         +se, id: 'd-020' }), despesa({ ...base, id: 'd-021' })]),       
      39 +    );                                                         
      40 +    expect(Object.fromEntries(motivos)).toEqual({              
     … 38 more lines (ctrl+o to expand)

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/regras/n…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      51  - [x] **T-007** — Detecção de duplicatas (`regras/duplicata.ts`
          ), comparando categoria normalizada.
      52    - **Atende:** RN-004, AMB-008
      53    - **Aceite:** `tests/rn-004-duplicata.test.ts` passa (d-007 "
          duplicata de d-006"; descrição diferente não é duplicata; trio 
          mantém o menor `id`; `ALIMENTACAO` × `alimentacao` são duplicat
          as).
      54 -  - **Commit:**                                                
      54 +  - **Commit:** `62ea337`                                      
      55  
      56 -- [ ] **T-008** — Verificação de nota fiscal (`regras/nota-fisc
         -al.ts`).                                                       
      56 +- [x] **T-008** — Verificação de nota fiscal (`regras/nota-fisc
         +al.ts`).                                                       
      57    - **Atende:** RN-002, AMB-004, AMB-005, AMB-006
      58    - **Aceite:** `tests/rn-002-nota-fiscal.test.ts` passa (100,0
          0 sem nota aceita; 100,01 sem nota recusada; 150,00 com nota ac
          eita; 100,004 sem nota recusada).
      59    - **Commit:**
  ⎿  Created src/regras/nota-fiscal.ts (+9 -0)
      1 +// RN-002 — Nota fiscal obrigatória acima do limiar (AMB-004, AM
        +B-005, AMB-006).                                                
      2 +import type { Despesa } from '../modelo.js';                    
      3 +import { LIMIAR_NOTA_FISCAL, MOTIVOS } from '../politica.js';   
      4 +                                                                
      5 +/** Por despesa, sobre o valor original exato; comparação estrit
        +a. */                                                           
      6 +export function verificarNotaFiscal(despesa: Despesa): string | 
        +null {                                                          
      7 +  const exigeNota = despesa.valor.gt(LIMIAR_NOTA_FISCAL);       
      8 +  return exigeNota && !despesa.temNotaFiscal ? MOTIVOS.notaFisca
        +lAusente : null;                                                
      9 +}                                                               
  ⎿  Created tests/rn-002-nota-fiscal.test.ts (+33 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { verificarNotaFiscal } from '../src/regras/nota-fiscal.
         +js';                                                           
       3 +import { despesa, doExemplo } from './fabrica.js';             
       4 +                                                               
       5 +describe('RN-002 — nota fiscal obrigatória acima de R$ 100,00',
         + () => {                                                       
       6 +  it('AC: d-003 transporte R$ 100,00 sem nota → não exige nota'
         +, () => {                                                      
       7 +    expect(verificarNotaFiscal(doExemplo('d-003'))).toBeNull();
       8 +  });                                                          
       9 +                                                               
      10 +  it('AC: d-004 transporte R$ 100,01 sem nota → recusada, "nota
         + fiscal ausente"', () => {                                     
      11 +    expect(verificarNotaFiscal(doExemplo('d-004'))).toBe('nota 
         +fiscal ausente');                                              
      12 +  });                                                          
      13 +                                                               
      14 +  it.todo('AC: dia 06/07 (d-003 + d-004) → só d-003 entra no li
         +mite, recebe R$ 80,00 (parcial) — via motor, T-013');          
      15 +                                                               
      16 +  it('AC: transporte R$ 60,00 + R$ 55,00 no mesmo dia, sem nota
         + → nenhuma exige nota (avaliação por despesa)', () => {        
      17 +    const dia = { data: '2026-07-20', categoria: 'transporte_ur
         +bano', temNotaFiscal: false };                                 
      18 +    expect(verificarNotaFiscal(despesa({ ...dia, valor: 60 })))
         +.toBeNull();                                                   
      19 +    expect(verificarNotaFiscal(despesa({ ...dia, valor: 55 })))
         +.toBeNull();                                                   
      20 +  });                                                          
      21 +                                                               
      22 +  it('AC: R$ 150,00 com nota → não é recusada', () => {        
      23 +    expect(verificarNotaFiscal(despesa({ valor: 150, temNotaFis
         +cal: true }))).toBeNull();                                     
      24 +  });                                                          
      25 +                                                               
      26 +  it('AC (RN-008): R$ 100,004 sem nota → exige nota e é recusad
         +a', () => {                                                    
      27 +    expect(verificarNotaFiscal(despesa({ valor: '100.004', temN
         +otaFiscal: false }))).toBe('nota fiscal ausente');             
      28 +  });                                                          
      29 +                                                               
      30 +  it('AC (RN-006): d-013 hospedagem R$ 690,00 sem nota → recusa
         +da', () => {                                                   
      31 +    expect(verificarNotaFiscal(doExemplo('d-013'))).toBe('nota 
         +fiscal ausente');                                              
      32 +  });                                                          
      33 +});                                                            

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/regras/a…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      56  - [x] **T-008** — Verificação de nota fiscal (`regras/nota-fisc
          al.ts`).
      57    - **Atende:** RN-002, AMB-004, AMB-005, AMB-006
      58    - **Aceite:** `tests/rn-002-nota-fiscal.test.ts` passa (100,0
          0 sem nota aceita; 100,01 sem nota recusada; 150,00 com nota ac
          eita; 100,004 sem nota recusada).
      59 -  - **Commit:**                                                
      59 +  - **Commit:** `421fa4e`                                      
      60  
      61 -- [ ] **T-009** — Arredondamento meio para o par (`regras/arred
         -ondamento.ts`).                                                
      61 +- [x] **T-009** — Arredondamento meio para o par (`regras/arred
         +ondamento.ts`).                                                
      62    - **Atende:** RN-008, AMB-012
      63    - **Aceite:** `tests/rn-008-arredondamento.test.ts` passa (33
          ,333 → 33,33; 10,125 → 10,12; 10,135 → 10,14).
      64    - **Commit:**
  ⎿  Created src/regras/arredondamento.ts (+8 -0)
      1 +// RN-008 — Precisão e arredondamento (AMB-012).                
      2 +import { Decimal } from 'decimal.js';                           
      3 +import { CASAS_DECIMAIS_REEMBOLSO } from '../politica.js';      
      4 +                                                                
      5 +/** Única operação de arredondamento do sistema: meio para o par
        +, no reembolso de cada despesa. */                              
      6 +export function arredondarReembolso(valorExato: Decimal): Decima
        +l {                                                             
      7 +  return valorExato.toDecimalPlaces(CASAS_DECIMAIS_REEMBOLSO, De
        +cimal.ROUND_HALF_EVEN);                                         
      8 +}                                                               
  ⎿  Created tests/rn-008-arredondamento.test.ts (+31 -0)
       1 +import { Decimal } from 'decimal.js';                          
       2 +import { describe, expect, it } from 'vitest';                 
       3 +import { arredondarReembolso } from '../src/regras/arredondamen
         +to.js';                                                        
       4 +                                                               
       5 +const arredondar = (v: string) => arredondarReembolso(new Decim
         +al(v)).toFixed(2);                                             
       6 +                                                               
       7 +describe('RN-008 — precisão e arredondamento', () => {         
       8 +  it('AC: d-011 R$ 33,333 → reembolso R$ 33,33', () => {       
       9 +    expect(arredondar('33.333')).toBe('33.33');                
      10 +  });                                                          
      11 +                                                               
      12 +  it('AC: R$ 10,125 → R$ 10,12; R$ 10,135 → R$ 10,14 (meio para
         + o par)', () => {                                              
      13 +    expect(arredondar('10.125')).toBe('10.12');                
      14 +    expect(arredondar('10.135')).toBe('10.14');                
      15 +  });                                                          
      16 +                                                               
      17 +  it.todo('AC: alimentação R$ 33,333 + R$ 40,00 no dia → 33,33 
         +e 26,67 (saldo exato 26,667); total 60,00 — com o limite diário
         +, T-012');                                                     
      18 +                                                               
      19 +  // O aceite "R$ 100,004 sem nota é recusada" está em tests/rn
         +-002-nota-fiscal.test.ts:                                      
      20 +  // é a RN-002 que compara o valor exato; aqui só se garante q
         +ue nada arredonda antes.                                       
      21 +                                                               
      22 +  it('parte descartada acima de meio centavo arredonda para cim
         +a, abaixo para baixo', () => {                                 
      23 +    expect(arredondar('26.667')).toBe('26.67');                
      24 +    expect(arredondar('26.664')).toBe('26.66');                
      25 +  });                                                          
      26 +                                                               
      27 +  it('não altera valores que já têm 2 casas ou menos', () => { 
      28 +    expect(arredondar('54.9')).toBe('54.90');                  
      29 +    expect(arredondar('480')).toBe('480.00');                  
      30 +  });                                                          
      31 +});                                                            

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/texto.ts…)
  ⎿  Updated src/regras/categoria.ts (+2 -1)
       1  // RN-009 — Categorias reembolsáveis (AMB-013).
       2  import { CATEGORIAS_REEMBOLSAVEIS, MOTIVOS, type Categoria } fr
          om '../politica.js';
       3 +import { semAcentoMinusculo } from '../texto.js';              
       4  
       5  /** Minúsculas e sem acentos; nenhuma outra transformação (espa
          ços, hífens, sinônimos). */
       6  export function normalizarCategoria(categoria: string): string 
          {
       6 -  return categoria.normalize('NFD').replace(/\p{M}/gu, '').toLo
         -werCase();                                                     
       7 +  return semAcentoMinusculo(categoria);                        
       8  }
       9  
      10  export function ehCategoriaReembolsavel(categoria: string): cat
          egoria is Categoria {
  ⎿  Created src/regras/hospedagem.ts (+46 -0)
       1 +// RN-006 — Limite de hospedagem por diária (AMB-003, AMB-010, 
         +AMB-011; DT-005).                                              
       2 +import type { Decimal } from 'decimal.js';                     
       3 +import type { Despesa } from '../modelo.js';                   
       4 +import {                                                       
       5 +  DIARIAS_PADRAO,                                              
       6 +  FATOR_VIAGEM,                                                
       7 +  LIMITE_POR_DIARIA_HOSPEDAGEM,                                
       8 +  MOTIVOS,                                                     
       9 +  PALAVRAS_DIARIA,                                             
      10 +} from '../politica.js';                                       
      11 +import { semAcentoMinusculo } from '../texto.js';              
      12 +                                                               
      13 +// Palavras mais longas primeiro, para "diarias" não parar em "
         +diaria".                                                       
      14 +const palavras = [...PALAVRAS_DIARIA].sort((a, b) => b.length -
         + a.length).join('|');                                          
      15 +const PADRAO_DIARIAS = new RegExp(String.raw`(\d+)\s*(?:${palav
         +ras})\b`, 'g');                                                
      16 +                                                               
      17 +/** Primeiro inteiro > 0 seguido de diária(s)/noite(s); sem pad
         +rão, N padrão. */                                              
      18 +export function extrairDiarias(descricao: string): number {    
      19 +  for (const [, numero] of semAcentoMinusculo(descricao).matchA
         +ll(PADRAO_DIARIAS)) {                                          
      20 +    const n = Number(numero);                                  
      21 +    if (n > 0) return n;                                       
      22 +  }                                                            
      23 +  return DIARIAS_PADRAO;                                       
      24 +}                                                              
      25 +                                                               
      26 +export interface ResultadoHospedagem {                         
      27 +  diarias: number;                                             
      28 +  limiteAplicado: Decimal;                                     
      29 +  reembolsoExato: Decimal;                                     
      30 +  cortadaPorLimite: boolean;                                   
      31 +  motivoParcial: string | null;                                
      32 +}                                                              
      33 +                                                               
      34 +/** Avalia uma hospedagem elegível isoladamente; o limite é sem
         +pre o ampliado (AMB-011). */                                   
      35 +export function aplicarLimiteHospedagem(despesa: Despesa): Resu
         +ltadoHospedagem {                                              
      36 +  const diarias = extrairDiarias(despesa.descricao);           
      37 +  const limiteAplicado = LIMITE_POR_DIARIA_HOSPEDAGEM.times(FAT
         +OR_VIAGEM).times(diarias);                                     
      38 +  const cortadaPorLimite = despesa.valor.gt(limiteAplicado);   
      39 +  return {                                                     
      40 +    diarias,                                                   
     … 6 more lines (ctrl+o to expand)
  ⎿  Created src/texto.ts (+5 -0)
      1 +// Normalização de texto usada por RN-009 (categoria) e RN-006 (
        +descrição):                                                     
      2 +// minúsculas e sem acentos, nada além disso.                   
      3 +export function semAcentoMinusculo(texto: string): string {     
      4 +  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCa
        +se();                                                           
      5 +}                                                               
  ⎿  Created tests/rn-006-hospedagem.test.ts (+63 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { aplicarLimiteHospedagem, extrairDiarias } from '../src
         +/regras/hospedagem.js';                                        
       3 +import { despesa, doExemplo } from './fabrica.js';             
       4 +                                                               
       5 +const hospedagem = (descricao: string, valor: number) =>       
       6 +  despesa({ categoria: 'hospedagem', descricao, valor, temNotaF
         +iscal: true });                                                
       7 +                                                               
       8 +const resumo = (r: ReturnType<typeof aplicarLimiteHospedagem>) 
         +=> ({                                                          
       9 +  diarias: r.diarias,                                          
      10 +  limite: r.limiteAplicado.toString(),                         
      11 +  reembolso: r.reembolsoExato.toString(),                      
      12 +  parcial: r.cortadaPorLimite,                                 
      13 +  motivo: r.motivoParcial,                                     
      14 +});                                                            
      15 +                                                               
      16 +describe('RN-006 — limite de hospedagem por diária', () => {   
      17 +  it('AC: d-010 "Hotel Rio - 2 diarias", R$ 480,00 → N = 2, lim
         +ite 750, recebe 480 (integral)', () => {                       
      18 +    expect(resumo(aplicarLimiteHospedagem(doExemplo('d-010'))))
         +.toEqual({                                                     
      19 +      diarias: 2, limite: '750', reembolso: '480', parcial: fal
         +se, motivo: null,                                              
      20 +    });                                                        
      21 +  });                                                          
      22 +                                                               
      23 +  it('AC: "Hotel - 2 diarias", R$ 800,00 → limite 750, recebe 7
         +50 (parcial)', () => {                                         
      24 +    expect(resumo(aplicarLimiteHospedagem(hospedagem('Hotel - 2
         + diarias', 800)))).toEqual({                                   
      25 +      diarias: 2, limite: '750', reembolso: '750', parcial: tru
         +e, motivo: 'limite de hospedagem excedido',                    
      26 +    });                                                        
      27 +  });                                                          
      28 +                                                               
      29 +  it('AC: "Pousada", R$ 400,00 → sem padrão, N = 1, recebe 375 
         +(parcial)', () => {                                            
      30 +    expect(resumo(aplicarLimiteHospedagem(hospedagem('Pousada',
         + 400)))).toEqual({                                             
      31 +      diarias: 1, limite: '375', reembolso: '375', parcial: tru
         +e, motivo: 'limite de hospedagem excedido',                    
      32 +    });                                                        
      33 +  });                                                          
      34 +                                                               
      35 +  it('AC: "Hotel duas diarias", R$ 400,00 → número por extenso 
         +não reconhecido, N = 1, recebe 375 (parcial)', () => {         
      36 +    expect(resumo(aplicarLimiteHospedagem(hospedagem('Hotel dua
         +s diarias', 400)))).toMatchObject({                            
      37 +      diarias: 1, reembolso: '375', parcial: true,             
      38 +    });                                                        
      39 +  });                                                          
      40 +                                                               
     … 23 more lines (ctrl+o to expand)

⏺ T-004 a T-009 já estão commitados e estou no meio da T-010 (hospedagem). Movi
  a normalização de texto para src/texto.ts, porque a RN-006 também precisa
  dela, e vou registrar isso no plan. · summary

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      python3 - <<'EOF'…)
  ⎿  Updated specs/001-motor-reembolso/plan.md (+1 -0)
      51    entrada.ts          # schema zod + conversão para o modelo in
          terno
      52    politica.ts         # todos os números e textos da política (
          seção 4)
      53    modelo.ts           # tipos da seção 3
      54 +  texto.ts            # normalização minúsculas/sem acento (usa
         +da por RN-009 e RN-006)                                        
      55    motor.ts            # orquestração das fases
      56    regras/
      57      categoria.ts      # RN-009
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      61  - [x] **T-009** — Arredondamento meio para o par (`regras/arred
          ondamento.ts`).
      62    - **Atende:** RN-008, AMB-012
      63    - **Aceite:** `tests/rn-008-arredondamento.test.ts` passa (33
          ,333 → 33,33; 10,125 → 10,12; 10,135 → 10,14).
      64 -  - **Commit:**                                                
      64 +  - **Commit:** `1586636`                                      
      65  
      66 -- [ ] **T-010** — Número de diárias e limite de hospedagem (`re
         -gras/hospedagem.ts`).                                          
      66 +- [x] **T-010** — Número de diárias e limite de hospedagem (`re
         +gras/hospedagem.ts`).                                          
      67    - **Atende:** RN-006, AMB-010, AMB-011 (limite sempre ampliad
          o), DT-005
      68    - **Aceite:** `tests/rn-006-hospedagem.test.ts` passa (d-010 
          N=2 integral 480; 800 com 2 diárias → 750; "Pousada" 400 → 375;
           "duas diarias" → N=1).
      69    - **Commit:**

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > src/regras/v…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      66  - [x] **T-010** — Número de diárias e limite de hospedagem (`re
          gras/hospedagem.ts`).
      67    - **Atende:** RN-006, AMB-010, AMB-011 (limite sempre ampliad
          o), DT-005
      68    - **Aceite:** `tests/rn-006-hospedagem.test.ts` passa (d-010 
          N=2 integral 480; 800 com 2 diárias → 750; "Pousada" 400 → 375;
           "duas diarias" → N=1).
      69 -  - **Commit:**                                                
      69 +  - **Commit:** `c498171`                                      
      70  
      71 -- [ ] **T-011** — Datas em viagem a partir das hospedagens eleg
         -íveis (`regras/viagem.ts`).                                    
      71 +- [x] **T-011** — Datas em viagem a partir das hospedagens eleg
         +íveis (`regras/viagem.ts`).                                    
      72    - **Atende:** RN-007, AMB-011
      73    - **Aceite:** `tests/rn-007-viagem.test.ts` passa (d-010 → 14
          , 15 e 16/07; hospedagem recusada não gera datas; sobreposição 
          não acumula).
      74    - **Commit:**
  ⎿  Created src/regras/viagem.ts (+23 -0)
       1 +// RN-007 — Datas em viagem (AMB-011).                         
       2 +import type { Despesa } from '../modelo.js';                   
       3 +import { extrairDiarias } from './hospedagem.js';              
       4 +                                                               
       5 +const UM_DIA_MS = 24 * 60 * 60 * 1000;                         
       6 +                                                               
       7 +function somarDias(data: string, dias: number): string {       
       8 +  const instante = Date.parse(`${data}T00:00:00Z`) + dias * UM_
         +DIA_MS;                                                        
       9 +  return new Date(instante).toISOString().slice(0, 10);        
      10 +}                                                              
      11 +                                                               
      12 +/**                                                            
      13 + * Recebe apenas hospedagens elegíveis (não recusadas na fase 1
         +).                                                             
      14 + * Cada uma cobre de `data` a `data` + N, inclusive; sobreposiç
         +ões não acumulam.                                              
      15 + */                                                            
      16 +export function datasEmViagem(hospedagensElegiveis: Despesa[]):
         + Set<string> {                                                 
      17 +  const datas = new Set<string>();                             
      18 +  for (const h of hospedagensElegiveis) {                      
      19 +    const n = extrairDiarias(h.descricao);                     
      20 +    for (let i = 0; i <= n; i += 1) datas.add(somarDias(h.data,
         + i));                                                          
      21 +  }                                                            
      22 +  return datas;                                                
      23 +}                                                              
  ⎿  Created tests/rn-007-viagem.test.ts (+38 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { datasEmViagem } from '../src/regras/viagem.js';       
       3 +import { despesa, doExemplo } from './fabrica.js';             
       4 +                                                               
       5 +const hospedagem = (data: string, descricao: string) =>        
       6 +  despesa({ categoria: 'hospedagem', data, descricao, valor: 30
         +0 });                                                          
       7 +                                                               
       8 +const ordenadas = (s: Set<string>) => [...s].sort();           
       9 +                                                               
      10 +describe('RN-007 — datas em viagem', () => {                   
      11 +  it('AC: d-010 (14/07, N = 2, aceita) → em viagem em 14/07, 15
         +/07 e 16/07', () => {                                          
      12 +    expect(ordenadas(datasEmViagem([doExemplo('d-010')]))).toEq
         +ual(['2026-07-14', '2026-07-15', '2026-07-16']);               
      13 +  });                                                          
      14 +                                                               
      15 +  it.todo('AC: d-011 R$ 33,333 em 15/07 → limite 90 → integral 
         +(R$ 33,33) — com o limite diário, T-012');                     
      16 +  it.todo('AC: alimentação R$ 85,00 em 16/07 (check-out) → inte
         +gral, limite 90 — com o limite diário, T-012');                
      17 +  it.todo('AC: alimentação R$ 85,00 em 17/07 → R$ 60,00 (parcia
         +l; fora da viagem) — com o limite diário, T-012');             
      18 +  it.todo('AC: d-013 recusada → 22/07–25/07 não são viagem; ali
         +mentação R$ 70,00 em 23/07 → R$ 60,00 — via motor, T-013');    
      19 +                                                               
      20 +  it('sem hospedagem elegível, não há datas em viagem', () => {
      21 +    expect(datasEmViagem([]).size).toBe(0);                    
      22 +  });                                                          
      23 +                                                               
      24 +  it('hospedagens sobrepostas somam as datas cobertas, sem repe
         +tir', () => {                                                  
      25 +    const datas = datasEmViagem([hospedagem('2026-07-14', '2 di
         +arias'), hospedagem('2026-07-15', '2 noites')]);               
      26 +    expect(ordenadas(datas)).toEqual(['2026-07-14', '2026-07-15
         +', '2026-07-16', '2026-07-17']);                               
      27 +  });                                                          
      28 +                                                               
      29 +  it('sem padrão de diárias, N = 1 → data de entrada e de check
         +-out', () => {                                                 
      30 +    expect(ordenadas(datasEmViagem([hospedagem('2026-07-20', 'P
         +ousada')]))).toEqual(['2026-07-20', '2026-07-21']);            
      31 +  });                                                          
      32 +                                                               
      33 +  it('atravessa a virada do mês', () => {                      
      34 +    expect(ordenadas(datasEmViagem([hospedagem('2026-07-30', '3
         + noites')]))).toEqual([                                        
      35 +      '2026-07-30', '2026-07-31', '2026-08-01', '2026-08-02',  
      36 +    ]);                                                        
      37 +  });                                                          
      38 +});                                                            

⏺ Agora a T-012, o limite diário. Ela também resolve os it.todo que dependiam
  dela, nas RN-007, RN-008 e RN-002.

⏺ Bash(cat > src/regras/limite-diario.ts <<'EOF'
      // RN-001 — Limite diário por categoria (AMB-001, AMB-002, AMB-003),…)
  ⎿  Created src/regras/limite-diario.ts (+63 -0)
       1 +// RN-001 — Limite diário por categoria (AMB-001, AMB-002, AMB-
         +003),                                                          
       2 +// ampliado nas datas em viagem (RN-007).                      
       3 +import { Decimal } from 'decimal.js';                          
       4 +import type { Despesa } from '../modelo.js';                   
       5 +import { FATOR_VIAGEM, LIMITE_DIARIO, MOTIVOS, type CategoriaCo
         +mLimiteDiario } from '../politica.js';                         
       6 +                                                               
       7 +export interface ItemLimiteDiario {                            
       8 +  despesa: Despesa; // elegível (fase 1)                       
       9 +  categoria: CategoriaComLimiteDiario; // normalizada          
      10 +}                                                              
      11 +                                                               
      12 +export interface ResultadoLimiteDiario {                       
      13 +  reembolsoExato: Decimal;                                     
      14 +  limiteAplicado: Decimal;                                     
      15 +  cortadaPorLimite: boolean;                                   
      16 +  motivoParcial: string | null;                                
      17 +  emViagem: boolean;                                           
      18 +}                                                              
      19 +                                                               
      20 +/** Menor valor primeiro; empate por id crescente (comparação d
         +e texto). */                                                   
      21 +function ordemDeConsumo(a: Despesa, b: Despesa): number {      
      22 +  const porValor = a.valor.comparedTo(b.valor);                
      23 +  if (porValor !== 0) return porValor;                         
      24 +  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;               
      25 +}                                                              
      26 +                                                               
      27 +/**                                                            
      28 + * Agrupa por data + categoria e distribui o limite do grupo do
         + menor valor                                                   
      29 + * para o maior: cada despesa recebe o integral enquanto houver
         + saldo, a que não                                              
      30 + * couber recebe o saldo e as seguintes, zero. Devolve o result
         +ado por id.                                                    
      31 + */                                                            
      32 +export function aplicarLimiteDiario(                           
      33 +  itens: ItemLimiteDiario[],                                   
      34 +  datasEmViagem: ReadonlySet<string>,                          
      35 +): Map<string, ResultadoLimiteDiario> {                        
      36 +  const grupos = new Map<string, ItemLimiteDiario[]>();        
      37 +  for (const item of itens) {                                  
      38 +    const chave = `${item.despesa.data}|${item.categoria}`;    
      39 +    grupos.set(chave, [...(grupos.get(chave) ?? []), item]);   
      40 +  }                                                            
     … 23 more lines (ctrl+o to expand)
  ⎿  Updated tests/fabrica.ts (+8 -0)
       3  import { Decimal } from 'decimal.js';
       4  import { interpretarEntrada } from '../src/entrada.js';
       5  import type { Despesa, Entrada } from '../src/modelo.js';
       6 +import type { CategoriaComLimiteDiario } from '../src/politica.
         +js';                                                           
       7 +import { normalizarCategoria } from '../src/regras/categoria.js
         +';                                                             
       8 +import type { ItemLimiteDiario } from '../src/regras/limite-dia
         +rio.js';                                                       
       9  
      10  let sequencia = 0;
      11  
     ...
      42    if (!encontrada) throw new Error(`despesa ${id} não existe no
           exemplo`);
      43    return encontrada;
      44  }
      45 +                                                               
      46 +/** Itens para aplicarLimiteDiario a partir de despesas já eleg
         +íveis. */                                                      
      47 +export function itensLimite(despesas: Despesa[]): ItemLimiteDia
         +rio[] {                                                        
      48 +  return despesas.map((d) => ({ despesa: d, categoria: normaliz
         +arCategoria(d.categoria) as CategoriaComLimiteDiario }));      
      49 +}                                                              
  ⎿  Created tests/rn-001-limite-diario.test.ts (+78 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { aplicarLimiteDiario } from '../src/regras/limite-diari
         +o.js';                                                         
       3 +import type { Despesa } from '../src/modelo.js';               
       4 +import { despesa, doExemplo, itensLimite } from './fabrica.js';
       5 +                                                               
       6 +function limitar(despesas: Despesa[], datasEmViagem: string[] =
         + []) {                                                         
       7 +  const r = aplicarLimiteDiario(itensLimite(despesas), new Set(
         +datasEmViagem));                                               
       8 +  return Object.fromEntries(                                   
       9 +    [...r].map(([id, x]) => [                                  
      10 +      id,                                                      
      11 +      { reembolso: x.reembolsoExato.toString(), limite: x.limit
         +eAplicado.toString(), parcial: x.cortadaPorLimite, motivo: x.mo
         +tivoParcial },                                                 
      12 +    ]),                                                        
      13 +  );                                                           
      14 +}                                                              
      15 +                                                               
      16 +const alimentacao = (id: string, valor: number | string, data =
         + '2026-07-20') =>                                              
      17 +  despesa({ id, data, categoria: 'alimentacao', valor });      
      18 +                                                               
      19 +describe('RN-001 — limite diário por categoria', () => {       
      20 +  it('AC: alimentação 03/07, d-001 R$ 72,50 + d-002 R$ 38,00 → 
         +d-002 38,00 integral, d-001 22,00 parcial; dia 60,00', () => { 
      21 +    expect(limitar([doExemplo('d-001'), doExemplo('d-002')])).t
         +oEqual({                                                       
      22 +      'd-002': { reembolso: '38', limite: '60', parcial: false,
         + motivo: null },                                               
      23 +      'd-001': { reembolso: '22', limite: '60', parcial: true, 
         +motivo: 'limite diário excedido' },                            
      24 +    });                                                        
      25 +  });                                                          
      26 +                                                               
      27 +  it('AC: uma alimentação de R$ 61,00 no dia → R$ 60,00 (parcia
         +l)', () => {                                                   
      28 +    expect(limitar([alimentacao('a', 61)]).a).toEqual({ reembol
         +so: '60', limite: '60', parcial: true, motivo: 'limite diário e
         +xcedido' });                                                   
      29 +  });                                                          
      30 +                                                               
      31 +  it('AC: uma alimentação de R$ 60,00 no dia → R$ 60,00 (integr
         +al)', () => {                                                  
      32 +    expect(limitar([alimentacao('a', 60)]).a).toEqual({ reembol
         +so: '60', limite: '60', parcial: false, motivo: null });       
      33 +  });                                                          
      34 +                                                               
      35 +  it('AC: alimentação R$ 50,00 e transporte R$ 70,00 na mesma d
         +ata → ambas integrais (limites independentes)', () => {        
      36 +    const r = limitar([                                        
      37 +      alimentacao('a', 50),                                    
      38 +      despesa({ id: 't', data: '2026-07-20', categoria: 'transp
         +orte_urbano', valor: 70 }),                                    
      39 +    ]);                                                        
      40 +    expect(r.a).toMatchObject({ reembolso: '50', limite: '60', 
         +parcial: false });                                             
     … 38 more lines (ctrl+o to expand)
  ⎿  Updated tests/rn-002-nota-fiscal.test.ts (+10 -4)
      1  import { describe, expect, it } from 'vitest';
      2 +import { aplicarLimiteDiario } from '../src/regras/limite-diario
        +.js';                                                           
      3  import { verificarNotaFiscal } from '../src/regras/nota-fiscal.j
         s';
      3 -import { despesa, doExemplo } from './fabrica.js';              
      4 +import { despesa, doExemplo, itensLimite } from './fabrica.js'; 
      5  
      6  describe('RN-002 — nota fiscal obrigatória acima de R$ 100,00', 
         () => {
      7    it('AC: d-003 transporte R$ 100,00 sem nota → não exige nota',
          () => {
     ...
      14  
      15    it.todo('AC: dia 06/07 (d-003 + d-004) → só d-003 entra no li
          mite, recebe R$ 80,00 (parcial) — via motor, T-013');
      16  
      16 -  it('AC: transporte R$ 60,00 + R$ 55,00 no mesmo dia, sem nota
         - → nenhuma exige nota (avaliação por despesa)', () => {        
      17 +  it('AC: transporte R$ 60,00 + R$ 55,00 no mesmo dia, sem nota
         + → nenhuma exige nota; soma 115 → limite 80 por RN-001', () => 
         +{                                                              
      18      const dia = { data: '2026-07-20', categoria: 'transporte_ur
          bano', temNotaFiscal: false };
      18 -    expect(verificarNotaFiscal(despesa({ ...dia, valor: 60 })))
         -.toBeNull();                                                   
      19 -    expect(verificarNotaFiscal(despesa({ ...dia, valor: 55 })))
         -.toBeNull();                                                   
      19 +    const a = despesa({ ...dia, id: 'a', valor: 60 });         
      20 +    const b = despesa({ ...dia, id: 'b', valor: 55 });         
      21 +    expect(verificarNotaFiscal(a)).toBeNull();                 
      22 +    expect(verificarNotaFiscal(b)).toBeNull();                 
      23 +    const r = aplicarLimiteDiario(itensLimite([a, b]), new Set(
         +));                                                            
      24 +    expect(r.get('b')!.reembolsoExato.toString()).toBe('55');  
      25 +    expect(r.get('a')!.reembolsoExato.toString()).toBe('25');  
      26    });
      27  
      28    it('AC: R$ 150,00 com nota → não é recusada', () => {
  ⎿  Updated tests/rn-007-viagem.test.ts (+14 -4)
      1  import { describe, expect, it } from 'vitest';
      2 +import { arredondarReembolso } from '../src/regras/arredondament
        +o.js';                                                          
      3 +import { aplicarLimiteDiario } from '../src/regras/limite-diario
        +.js';                                                           
      4  import { datasEmViagem } from '../src/regras/viagem.js';
      3 -import { despesa, doExemplo } from './fabrica.js';              
      5 +import { despesa, doExemplo, itensLimite } from './fabrica.js'; 
      6  
      7  const hospedagem = (data: string, descricao: string) =>
      8    despesa({ categoria: 'hospedagem', data, descricao, valor: 300
          });
     ...
      14      expect(ordenadas(datasEmViagem([doExemplo('d-010')]))).toEq
          ual(['2026-07-14', '2026-07-15', '2026-07-16']);
      15    });
      16  
      15 -  it.todo('AC: d-011 R$ 33,333 em 15/07 → limite 90 → integral 
         -(R$ 33,33) — com o limite diário, T-012');                     
      16 -  it.todo('AC: alimentação R$ 85,00 em 16/07 (check-out) → inte
         -gral, limite 90 — com o limite diário, T-012');                
      17 -  it.todo('AC: alimentação R$ 85,00 em 17/07 → R$ 60,00 (parcia
         -l; fora da viagem) — com o limite diário, T-012');             
      17 +  it('AC: d-011 R$ 33,333 em 15/07 → limite de alimentação 90 →
         + integral (R$ 33,33 após RN-008)', () => {                     
      18 +    const viagem = datasEmViagem([doExemplo('d-010')]);        
      19 +    const r = aplicarLimiteDiario(itensLimite([doExemplo('d-011
         +')]), viagem).get('d-011')!;                                   
      20 +    expect(r.emViagem).toBe(true);                             
      21 +    expect(r.limiteAplicado.toString()).toBe('90');            
      22 +    expect(r.cortadaPorLimite).toBe(false);                    
      23 +    expect(arredondarReembolso(r.reembolsoExato).toFixed(2)).to
         +Be('33.33');                                                   
      24 +  });                                                          
      25 +                                                               
      26 +  // Os aceites de R$ 85,00 em 16/07 (integral) e 17/07 (parcia
         +l) estão em                                                    
      27 +  // tests/rn-001-limite-diario.test.ts, bloco "RN-007 — limite
         + ampliado".                                                    
      28    it.todo('AC: d-013 recusada → 22/07–25/07 não são viagem; ali
          mentação R$ 70,00 em 23/07 → R$ 60,00 — via motor, T-013');
      29  
      30    it('sem hospedagem elegível, não há datas em viagem', () => {
  ⎿  … 1 more file changed

⏺ A grep não encontra nenhum literal da política em src/regras/ (os dois
  resultados são uma constante de calendário e um comentário). Faço o commit da
  T-012.

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      python3 $M T-012 T…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      71  - [x] **T-011** — Datas em viagem a partir das hospedagens eleg
          íveis (`regras/viagem.ts`).
      72    - **Atende:** RN-007, AMB-011
      73    - **Aceite:** `tests/rn-007-viagem.test.ts` passa (d-010 → 14
          , 15 e 16/07; hospedagem recusada não gera datas; sobreposição 
          não acumula).
      74 -  - **Commit:**                                                
      74 +  - **Commit:** `f6c5afb`                                      
      75  
      76 -- [ ] **T-012** — Limite diário por categoria com distribuição 
         -do menor para o maior e limite ampliado em viagem (`regras/limi
         -te-diario.ts`).                                                
      76 +- [x] **T-012** — Limite diário por categoria com distribuição 
         +do menor para o maior e limite ampliado em viagem (`regras/limi
         +te-diario.ts`).                                                
      77    - **Atende:** RN-001, RN-007, AMB-001, AMB-002, AMB-003
      78    - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa (03/
          07 → d-002 38, d-001 22; 61 → 60; 60 → 60 integral; categorias 
          independentes; empate por `id`) e os casos de limite ampliado d
          a RN-007 (85 em 16/07 integral; 85 em 17/07 → 60).
      79    - **Commit:**

⏺ A Fase 2 (Regras, T-004 a T-012) está pronta e no GitHub, com um commit por
  task: 81 testes passando, 7 it.todo e o typecheck sem erros.

  O que entrou

  ┌─────────┬────────────┬───────────────────────────────────────────────────┐
  │ Commit  │    Task    │                       Regra                       │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ f1e8a38 │ docs(spec) │ D-001: a lacuna do período foi registrada em §10  │
  │         │            │ (spec 1.0 → 1.1)                                  │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ f071ec6 │ T-004      │ RN-009 categoria, mais o tests/fabrica.ts para    │
  │         │            │ montar despesas nos testes                        │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ 57df3cd │ T-005      │ RN-005 valor não positivo                         │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ 7bb917b │ T-006      │ RN-003 período (inclui o caso do período          │
  │         │            │ invertido da D-001)                               │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ 62ea337 │ T-007      │ RN-004 duplicatas                                 │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ 421fa4e │ T-008      │ RN-002 nota fiscal                                │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ 1586636 │ T-009      │ RN-008 arredondamento meio para o par             │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ c498171 │ T-010      │ RN-006 diárias e limite N × 375                   │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ f6c5afb │ T-011      │ RN-007 datas em viagem                            │
  ├─────────┼────────────┼───────────────────────────────────────────────────┤
  │ 3cf186e │ T-012      │ RN-001 limite diário (60/80, ou 90/120 em viagem) │
  └─────────┴────────────┴───────────────────────────────────────────────────┘

  Pontos para revisar

  1. Período (D-001): você disse "pode prosseguir" sem escolher A ou B na
     pergunta sobre inicio ≤ fim e a competência. Fui pela opção A, que não cria
     regra nova. Se preferir B, a mudança é pequena.
  2. Aceites que só podem ser testados com o motor: são 7 e estão como it.todo,
     com o nome apontando para a T-013 (por exemplo, "d-003 recebe 80 porque
     d-004 não consome o limite"). Assim cada aceite da spec já aparece no
     arquivo da sua RN e nenhum fica fingindo que passa.
  3. Arquivo novo src/texto.ts: a RN-009 e a RN-006 usam a mesma normalização
     (minúsculas, sem acento). Coloquei o arquivo na lista de pastas do plan §2,
     no commit da T-010.
  4. Nenhum número da política em src/regras/: conferido por grep. O padrão de
     diárias é montado a partir de PALAVRAS_DIARIA.

  Duas lacunas da spec que preciso que você decida antes da T-013/T-014

  1. O que é "menor id"? Isso vale para o desempate do limite (RN-001) e para a
  duplicata mantida (RN-004).
  - Hoje comparo como texto. Com ids sem zero à esquerda, isso dá d-10 < d-9.
  - No exemplo todos têm 3 dígitos, então o resultado não muda.
  - (A) Comparação de texto: registro como está.
  - (B) Comparação que respeita números (d-9 < d-10).

  2. diarias de uma hospedagem recusada (d-013, "Airbnb 3 noites").
  - A spec diz "N considerado; nulo se não for hospedagem". d-013 é hospedagem,
    mas o N "não chega a ser aplicado".
  - (A) diarias: 3, porque a saída mostra o que foi lido da descrição.
  - (B) diarias: null, como o limite_aplicado, que é nulo em recusada.

  Qualquer uma das duas entra na spec com uma entrada D-00N antes do código.
  Depois das suas respostas sigo para a Fase 3 (motor e ponta a ponta), onde os
  7 todo viram testes reais.

❯ 1 . B
  2. B

⏺ Registro as duas decisões na spec antes de mexer no código. A primeira vira
  uma task nova, a T-018, porque muda o comportamento da T-007 e da T-012. A
  segunda só afeta o motor e a saída, que ainda não existem.

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/spec.md'…)
  ⎿  Updated specs/001-motor-reembolso/spec.md (+7 -3)
      1  # Spec — Motor de Cálculo de Reembolso
      2  
      3 -**Versão:** 1.1 · **Status:** aprovada · **Última alteração:** 2
        -026-11-18                                                       
      3 +**Versão:** 1.2 · **Status:** aprovada · **Última alteração:** 2
        +026-11-19                                                       
      4  
      5  > **Regra de ouro deste arquivo:** ele descreve o QUÊ e o PORQUÊ
         . Nenhuma linha
      6  > aqui pode citar linguagem, biblioteca, classe, função ou estru
         tura de pasta.
     ...
      113  
      114  Cada regra recebe um ID (`RN-001`, ...). As tasks vão referenc
           iar esses IDs.
      115  
      116 +**Ordem de `id`** (usada em "menor `id`" e "`id` crescente", A
          +MB-015): dois `id`s são comparados da esquerda para a direita,
          + por trechos. Sequências de algarismos são comparadas pelo val
          +or numérico (`d-9` vem antes de `d-10`); os demais trechos, ca
          +ractere a caractere, pela posição do caractere na tabela Unico
          +de. Se dois `id`s empatarem nessa comparação (ex.: `d-01` e `d
          +-1`), vale a comparação caractere a caractere do `id` inteiro.
      117 +                                                              
      118  ### RN-001 — Limite diário por categoria (alimentação e transp
           orte urbano)
      119  
      120  **Regra:** para cada combinação de data e categoria, soma-se o
            valor das despesas elegíveis (ver seção 8). Limites: alimenta
           ção R$ 60,00; transporte urbano R$ 80,00. Se a soma for menor 
           ou igual ao limite, todas as despesas do grupo são reembolsada
           s integralmente. Se exceder, o limite é distribuído do menor v
           alor para o maior (desempate por `id` crescente): cada despesa
            recebe o seu valor integral enquanto houver saldo, a que não 
           couber inteira recebe apenas o saldo restante e as seguintes r
           ecebem R$ 0,00. Despesas com reembolso menor que o valor origi
           nal são marcadas como reembolsadas parcialmente, com o motivo 
           "limite diário excedido".
      119 -**Origem:** política do RH, itens 1, 2 e 4. Decisões AMB-001, 
          -AMB-002, AMB-003.                                             
      121 +**Origem:** política do RH, itens 1, 2 e 4. Decisões AMB-001, 
          +AMB-002, AMB-003, AMB-015.                                    
      122  **Aceite:**
      123  - Alimentação em 03/07: d-001 (R$ 72,50) e d-002 (R$ 38,00) → 
           d-002 recebe R$ 38,00, d-001 recebe R$ 22,00 (parcial); total 
           do dia R$ 60,00.
      124  - Uma única despesa de alimentação de R$ 61,00 no dia → recebe
            R$ 60,00 (parcial).
      125  - Uma única despesa de alimentação de R$ 60,00 no dia → recebe
            R$ 60,00 (integral).
      126  - Alimentação R$ 50,00 e transporte R$ 70,00 na mesma data → a
           mbas integrais (limites independentes).
      127 +- Alimentação d-9 (R$ 40,00) e d-10 (R$ 40,00) na mesma data →
          + empate de valor; d-9 vem antes (ordem de `id`) e recebe R$ 40
          +,00; d-10 recebe R$ 20,00 (parcial).                          
      128  
      129  ### RN-002 — Nota fiscal obrigatória acima de R$ 100,00
      130  
     ...
      150  ### RN-004 — Duplicatas
      151  
      152  **Regra:** duas ou mais despesas são duplicatas quando todos o
           s campos, exceto `id`, são iguais: `data`, `categoria`, `descr
           icao`, `fornecedor`, `valor` e `tem_nota_fiscal`. Em cada grup
           o de duplicatas, a despesa de menor `id` segue normalmente par
           a as demais regras; as outras são **recusadas integralmente** 
           (reembolso R$ 0,00), com o motivo "duplicata de `<id mantido>`
           ", e não consomem limite diário.
      150 -**Origem:** política do RH, item 8. Decisão AMB-008.          
      153 +**Origem:** política do RH, item 8. Decisões AMB-008, AMB-015.
      154  **Aceite:**
      155  - d-006 e d-007 (idênticas) → d-006 segue para o limite e rece
           be R$ 54,90; d-007 recusada, R$ 0,00, motivo "duplicata de d-0
           06".
      156  - Duas despesas iguais exceto pela descrição ("Almoço" e "Almo
           ço equipe") → não são duplicatas; ambas seguem para o limite.
      157  - Três despesas idênticas d-020, d-021, d-022 → d-020 mantida;
            d-021 e d-022 recusadas como "duplicata de d-020".
      158 +- Duas despesas idênticas d-10 e d-9 → d-9 mantida (ordem de `
          +id`); d-10 recusada como "duplicata de d-9".                  
      159  
      160  ### RN-005 — Valores não positivos
      161  

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/spec.md'…)
  ⎿  Updated specs/001-motor-reembolso/DECISIONS.md (+16 -0)
      10  
      11  ---
      12  
      13 +## D-002 — "Menor `id`" passa a usar ordem natural · `2026-11-1
         +9`                                                             
      14 +                                                               
      15 +**Gatilho:** ambiguidade que só apareceu ao implementar T-007 e
         + T-012: a spec dizia "menor `id`" e "`id` crescente" sem defini
         +r como comparar textos; a implementação comparava caractere a c
         +aractere, o que põe `d-10` antes de `d-9`.                     
      16 +                                                               
      17 +**O que mudou na spec:** versão 1.1 → 1.2. Nova definição "Orde
         +m de `id`" no início da §5 e nova AMB-015; RN-001 e RN-004 pass
         +am a citá-la e ganham um caso de aceite cada (d-9 × d-10).     
      18 +                                                               
      19 +**Por quê:** decisão do autor (opção B entre texto puro e ordem
         + natural): a ordem natural é a que uma pessoa espera e consegue
         + conferir.                                                     
      20 +                                                               
      21 +**O que isso invalidou:** a comparação de texto em `src/regras/
         +duplicata.ts` (T-007) e `src/regras/limite-diario.ts` (T-012). 
         +Nenhum resultado da §7 muda (todos os `id`s do exemplo têm três
         + dígitos).                                                     
      22 +                                                               
      23 +**Tasks afetadas:** nova T-018 (ordem natural de `id` usada por
         + RN-001 e RN-004); T-007 e T-012 não são reabertas — a T-018 su
         +bstitui a comparação nas duas.                                 
      24 +                                                               
      25 +**Custo:** spec, DECISIONS, tasks, plan; 1 módulo novo + 2 regr
         +as + 2 arquivos de teste.                                      
      26 +                                                               
      27 +---                                                            
      28 +                                                               
      29  ## D-001 — Coerência do período fica em aberto · `2026-11-18`
      30  
      31  **Gatilho:** lacuna que só apareceu ao implementar a validação 
          da entrada (T-003): a spec §4 diz quais campos o período tem, m
          as não se eles precisam ser coerentes entre si.
  ⎿  Updated specs/001-motor-reembolso/spec.md (+8 -0)
      327  **Justificativa:** criar uma restrição seria inventar uma regr
           a que o RH não escreveu; plantão e viagem em fim de semana são
            situações legítimas.
      328  **Regra afetada:** nenhuma (RN-001 aplica-se a qualquer data).
            Aceite: d-012 recebe R$ 47,20 (integral).
      329  
      330 +### AMB-015 — Ordem de `id` para desempate e duplicatas       
      331 +                                                              
      332 +**Texto original do RH:** (silêncio) — consequência de AMB-002
          + e AMB-008, que usam "menor `id`".                            
      333 +**O que não está claro:** `id` é texto. Comparado caractere a 
          +caractere, `d-10` vem antes de `d-9` (porque "1" < "9"); compa
          +rado pelo número que contém, `d-9` vem antes. No exemplo todos
          + os `id`s têm três dígitos e as duas leituras coincidem.      
      334 +**Decisão:** ordem natural — trechos numéricos pelo valor, o r
          +esto caractere a caractere (definição completa no início da se
          +ção 5).                                                       
      335 +**Justificativa:** é a ordem que uma pessoa espera ao ler os `
          +id`s (d-9 foi lançada antes de d-10); a comparação caractere a
          + caractere daria um resultado que o financeiro não conseguiria
          + explicar.                                                    
      336 +**Regra afetada:** RN-001, RN-004                             
      337 +                                                              
      338  ---
      339  
      340  ## 7. Casos de borda

⏺ Agora a segunda decisão (D-003): diarias é nulo quando a hospedagem é
  recusada.

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/spec.md'…)
  ⎿  Updated specs/001-motor-reembolso/DECISIONS.md (+16 -0)
      10  
      11  ---
      12  
      13 +## D-003 — `diarias` nulo para hospedagem recusada · `2026-11-1
         +9`                                                             
      14 +                                                               
      15 +**Gatilho:** ambiguidade encontrada ao implementar T-010: a saí
         +da "informa o N considerado", mas d-013 é recusada antes de o N
         + ser aplicado.                                                 
      16 +                                                               
      17 +**O que mudou na spec:** versão 1.2 → 1.3. Nova AMB-016; §4 (ca
         +mpo `diarias`), RN-006 (texto e aceite de d-013) e §7 (linha de
         + d-013) passam a dizer que hospedagem recusada sai com `diarias
         +` nulo.                                                        
      18 +                                                               
      19 +**Por quê:** decisão do autor (opção B): sem limite aplicado nã
         +o há N considerado; coerente com `limite_aplicado` nulo em recu
         +sada.                                                          
      20 +                                                               
      21 +**O que isso invalidou:** nada implementado — motor e saída (T-
         +013, T-015) ainda não existiam. Muda o aceite esperado de d-013
         + em T-014.                                                     
      22 +                                                               
      23 +**Tasks afetadas:** aceite de T-013 e T-014 atualizado; nenhuma
         + task nova.                                                    
      24 +                                                               
      25 +**Custo:** spec, DECISIONS, tasks; nenhum código.              
      26 +                                                               
      27 +---                                                            
      28 +                                                               
      29  ## D-002 — "Menor `id`" passa a usar ordem natural · `2026-11-1
          9`
      30  
      31  **Gatilho:** ambiguidade que só apareceu ao implementar T-007 e
           T-012: a spec dizia "menor `id`" e "`id` crescente" sem defini
          r como comparar textos; a implementação comparava caractere a c
          aractere, o que põe `d-10` antes de `d-9`.
  ⎿  Updated specs/001-motor-reembolso/spec.md (+14 -6)
      1  # Spec — Motor de Cálculo de Reembolso
      2  
      3 -**Versão:** 1.2 · **Status:** aprovada · **Última alteração:** 2
        -026-11-19                                                       
      3 +**Versão:** 1.3 · **Status:** aprovada · **Última alteração:** 2
        +026-11-19                                                       
      4  
      5  > **Regra de ouro deste arquivo:** ele descreve o QUÊ e o PORQUÊ
         . Nenhuma linha
      6  > aqui pode citar linguagem, biblioteca, classe, função ou estru
         tura de pasta.
     ...
      70  | `despesas[].motivos` | lista de textos | vazia se `integral`;
           se `parcial`, "limite diário excedido" ou "limite de hospedage
          m excedido"; se `recusada`, todos os motivos da fase 1 (seção 8
          ) |
      71  | `despesas[].limite_aplicado` | número ou nulo | limite que va
          leu para a despesa: diário da categoria (60, 90, 80 ou 120) ou 
          de hospedagem (N × 375); nulo se recusada |
      72  | `despesas[].em_viagem` | booleano | se a data da despesa é um
          a data em viagem (RN-007) |
      73 -| `despesas[].diarias` | inteiro ou nulo | N considerado (RN-00
         -6); nulo se não for hospedagem |                               
      73 +| `despesas[].diarias` | inteiro ou nulo | N considerado (RN-00
         +6); nulo se não for hospedagem ou se for recusada (AMB-016) |  
      74  | `totais.valor_reembolsado` | número | soma dos `valor_reembol
          sado` de todas as despesas |
      75  | `totais.quantidade.integral` | inteiro | número de despesas c
          om status `integral` |
      76  | `totais.quantidade.parcial` | inteiro | número de despesas co
          m status `parcial` |
     ...
      168  
      169  ### RN-006 — Limite de hospedagem por diária
      170  
      171 -**Regra:** cada despesa de hospedagem é avaliada isoladamente 
          -(não há soma por dia). O número de diárias **N** é obtido da `
          -descricao`: o primeiro número inteiro escrito em algarismos, m
          -aior que zero, seguido (com ou sem espaço) de uma das palavras
          - "diária", "diárias", "noite" ou "noites" — sem diferenciar ma
          -iúsculas/minúsculas nem acentos. Se não houver esse padrão, N 
          -= 1. O limite base é N × R$ 250,00; como toda hospedagem carac
          -teriza viagem (RN-007), o limite aplicado é sempre o ampliado,
          - **N × R$ 375,00**. Acima dele, paga-se o limite e o excedente
          - é cortado (AMB-003). A saída informa o N considerado.        
      172 -**Origem:** política do RH, itens 3, 4 e 6. Decisões AMB-003, 
          -AMB-010, AMB-011.                                             
      171 +**Regra:** cada despesa de hospedagem é avaliada isoladamente 
          +(não há soma por dia). O número de diárias **N** é obtido da `
          +descricao`: o primeiro número inteiro escrito em algarismos, m
          +aior que zero, seguido (com ou sem espaço) de uma das palavras
          + "diária", "diárias", "noite" ou "noites" — sem diferenciar ma
          +iúsculas/minúsculas nem acentos. Se não houver esse padrão, N 
          += 1. O limite base é N × R$ 250,00; como toda hospedagem carac
          +teriza viagem (RN-007), o limite aplicado é sempre o ampliado,
          + **N × R$ 375,00**. Acima dele, paga-se o limite e o excedente
          + é cortado (AMB-003). A saída informa o N considerado; hospeda
          +gem recusada na fase 1 não tem N considerado e sai com `diaria
          +s` nulo (AMB-016).                                            
      172 +**Origem:** política do RH, itens 3, 4 e 6. Decisões AMB-003, 
          +AMB-010, AMB-011, AMB-016.                                    
      173  **Aceite:**
      174  - d-010: "Hotel Rio - 2 diarias", R$ 480,00, com nota → N = 2,
            limite R$ 750,00 → recebe R$ 480,00 (integral).
      175  - "Hotel - 2 diarias", R$ 800,00, com nota → limite R$ 750,00 
           → recebe R$ 750,00 (parcial).
      176  - "Pousada", R$ 400,00, com nota → sem padrão, N = 1 → recebe 
           R$ 375,00 (parcial).
      177  - "Hotel duas diarias", R$ 400,00, com nota → número por exten
           so não é reconhecido, N = 1 → recebe R$ 375,00 (parcial).
      178 -- d-013: "Airbnb 3 noites", R$ 690,00, sem nota → recusada por
          - RN-002 antes do limite (N = 3 não chega a ser aplicado).     
      178 +- d-013: "Airbnb 3 noites", R$ 690,00, sem nota → recusada por
          + RN-002 antes do limite (N = 3 não chega a ser aplicado); `dia
          +rias` nulo e `limite_aplicado` nulo na saída.                 
      179  
      180  ### RN-007 — Ampliação de limites em viagem
      181  
     ...
      335  **Justificativa:** é a ordem que uma pessoa espera ao ler os `
           id`s (d-9 foi lançada antes de d-10); a comparação caractere a
            caractere daria um resultado que o financeiro não conseguiria
            explicar.
      336  **Regra afetada:** RN-001, RN-004
      337  
      338 +### AMB-016 — Número de diárias de hospedagem recusada        
      339 +                                                              
      340 +**Texto original do RH:** (silêncio) — consequência de RN-006 
          +e do campo `diarias` da saída.                                
      341 +**O que não está claro:** a saída informa "o N considerado", m
          +as uma hospedagem recusada na fase 1 nunca chega ao limite. Le
          +ituras: (a) mostrar o N lido da descrição; (b) mostrar nulo, c
          +omo o `limite_aplicado`. Exemplo: d-013, "Airbnb 3 noites", re
          +cusada por falta de nota.                                     
      342 +**Decisão:** `diarias` é **nulo** para hospedagem recusada.   
     … 14 more lines (ctrl+o to expand)

⏺ Atualizo o tasks.md: entra a T-018, o aceite de T-013/T-014 passa a incluir
  diarias nulo e a matriz de cobertura ganha as novas AMBs.

⏺ Bash(python3 - <<'EOF'
      p='specs/001-motor-reembolso/tasks.md'…)
  ⎿  Updated specs/001-motor-reembolso/plan.md (+1 -1)
      51    entrada.ts          # schema zod + conversão para o modelo in
          terno
      52    politica.ts         # todos os números e textos da política (
          seção 4)
      53    modelo.ts           # tipos da seção 3
      54 -  texto.ts            # normalização minúsculas/sem acento (usa
         -da por RN-009 e RN-006)                                        
      54 +  texto.ts            # normalização minúsculas/sem acento (RN-
         +009, RN-006) e ordem natural de id (AMB-015)                   
      55    motor.ts            # orquestração das fases
      56    regras/
      57      categoria.ts      # RN-009
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+11 -4)
       8  
       9  **Formato do commit:** `feat(T-003): <descrição>` · `test(T-003
          ): <descrição>`
      10  
      11 -**Baseado em:** spec 1.1 · plan 1.0                            
      11 +**Baseado em:** spec 1.3 · plan 1.0                            
      12  
      13  ---
      14  
     ...
      78    - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa (03/
          07 → d-002 38, d-001 22; 61 → 60; 60 → 60 integral; categorias 
          independentes; empate por `id`) e os casos de limite ampliado d
          a RN-007 (85 em 16/07 integral; 85 em 17/07 → 60).
      79    - **Commit:**
      80  
      81 +- [ ] **T-018** — Ordem natural de `id` (`src/texto.ts`) usada 
         +no desempate do limite diário e na escolha da duplicata mantida
         +. *Criada em D-002.*                                           
      82 +  - **Atende:** spec §5 (Ordem de `id`), AMB-015; altera o comp
         +ortamento entregue em T-007 e T-012                            
      83 +  - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa o ca
         +so d-9 × d-10 (d-9 recebe 40,00, d-10 recebe 20,00); `tests/rn-
         +004-duplicata.test.ts` passa o caso d-10 × d-9 (d-9 mantida); `
         +tests/texto.test.ts` cobre a comparação (d-9 < d-10, d-01 × d-1
         +, trechos de texto).                                           
      84 +  - **Commit:**                                                
      85 +                                                               
      86  ## Fase 3 — Orquestração e casos de borda
      87  
      88  - [ ] **T-013** — Motor (`src/motor.ts`): fase 1 com acúmulo de
           todos os motivos na ordem da spec §8, fase 2 só com elegíveis.
      89    - **Atende:** spec §8, DT-004
      85 -  - **Aceite:** `tests/ordem-aplicacao.test.ts` passa (15/04 + 
         -R$ 150 sem nota → dois motivos na ordem; recusada não consome l
         -imite; hospedagem recusada não gera viagem; reordenar a entrada
         - não altera valores).                                          
      90 +  - **Aceite:** `tests/ordem-aplicacao.test.ts` passa (15/04 + 
         +R$ 150 sem nota → dois motivos na ordem; recusada não consome l
         +imite; hospedagem recusada não gera viagem e sai com `diarias` 
         +nulo (AMB-016); reordenar a entrada não altera valores) e os `i
         +t.todo` deixados na Fase 2 viram testes.                       
      91    - **Commit:**
      92  
      93  - [ ] **T-014** — Teste de ponta a ponta do exemplo no nível do
           motor.
     ...
      125  
      126  | Regra da spec | Task | Teste |
      127  |---|---|---|
      123 -| RN-001 | T-012 | `tests/rn-001-limite-diario.test.ts` |     
      128 +| RN-001 | T-012, T-018 | `tests/rn-001-limite-diario.test.ts`
          + |                                                            
      129  | RN-002 | T-008 | `tests/rn-002-nota-fiscal.test.ts` |
      130  | RN-003 | T-006 | `tests/rn-003-periodo.test.ts` |
      126 -| RN-004 | T-007 | `tests/rn-004-duplicata.test.ts` |         
      131 +| RN-004 | T-007, T-018 | `tests/rn-004-duplicata.test.ts` |  
      132  | RN-005 | T-005 | `tests/rn-005-valor-nao-positivo.test.ts` |
      133  | RN-006 | T-010 | `tests/rn-006-hospedagem.test.ts` |
      134  | RN-007 | T-011, T-012 | `tests/rn-007-viagem.test.ts`, `test
           s/rn-001-limite-diario.test.ts` |
     ...
      144  | AMB-012 | T-009 | `tests/rn-008-arredondamento.test.ts` |
      145  | AMB-013 | T-004 | `tests/rn-009-categoria.test.ts` |
      146  | AMB-014 | T-014 | `tests/exemplo-ponta-a-ponta.test.ts` (d-0
           12) |
     … 5 more lines (ctrl+o to expand)

⏺ Agora implemento a T-018: a comparação fica em src/texto.ts e as duas regras
  passam a usá-la.

⏺ Bash(cat >> src/texto.ts <<'EOF'…)
  ⎿  Updated src/regras/duplicata.ts (+3 -2)
      1  // RN-004 — Duplicatas (AMB-008).
      2  import type { Despesa } from '../modelo.js';
      3  import { MOTIVOS } from '../politica.js';
      4 +import { compararIds } from '../texto.js';                      
      5  
      6  export interface ItemDuplicata {
      7    despesa: Despesa;
     ...
      15  
      16  /**
      17   * Considera todas as despesas da entrada. Devolve, para cada d
          espesa recusada
      17 - * como duplicata, o motivo "duplicata de <id mantido>"; a de m
         -enor `id` do grupo                                             
      18 + * como duplicata, o motivo "duplicata de <id mantido>"; a de m
         +enor `id` (ordem natural, AMB-015) do grupo                    
      19   * não aparece no mapa.
      20   */
      21  export function detectarDuplicatas(itens: ItemDuplicata[]): Map
          <string, string> {
     ...
      27  
      28    const motivos = new Map<string, string>();
      29    for (const ids of grupos.values()) {
      29 -    const [mantido, ...demais] = [...ids].sort((a, b) => (a < b
         - ? -1 : a > b ? 1 : 0));                                       
      30 +    const [mantido, ...demais] = [...ids].sort(compararIds);   
      31      for (const id of demais) motivos.set(id, MOTIVOS.duplicataD
          e(mantido!));
      32    }
      33    return motivos;
  ⎿  Updated src/regras/limite-diario.ts (+3 -4)
      3  import { Decimal } from 'decimal.js';
      4  import type { Despesa } from '../modelo.js';
      5  import { FATOR_VIAGEM, LIMITE_DIARIO, MOTIVOS, type CategoriaCom
         LimiteDiario } from '../politica.js';
      6 +import { compararIds } from '../texto.js';                      
      7  
      8  export interface ItemLimiteDiario {
      9    despesa: Despesa; // elegível (fase 1)
     ...
      18    emViagem: boolean;
      19  }
      20  
      20 -/** Menor valor primeiro; empate por id crescente (comparação d
         -e texto). */                                                   
      21 +/** Menor valor primeiro; empate por id crescente (ordem natura
         +l, AMB-015). */                                                
      22  function ordemDeConsumo(a: Despesa, b: Despesa): number {
      22 -  const porValor = a.valor.comparedTo(b.valor);                
      23 -  if (porValor !== 0) return porValor;                         
      24 -  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;               
      23 +  return a.valor.comparedTo(b.valor) || compararIds(a.id, b.id)
         +;                                                              
      24  }
      25  
      26  /**
  ⎿  Updated src/texto.ts (+27 -0)
       3  export function semAcentoMinusculo(texto: string): string {
       4    return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerC
          ase();
       5  }
       6 +                                                               
       7 +function compararTexto(a: string, b: string): number {         
       8 +  return a < b ? -1 : a > b ? 1 : 0;                           
       9 +}                                                              
      10 +                                                               
      11 +/** Algarismos sem zeros à esquerda; mais dígitos = maior; mesm
         +o tamanho, texto. */                                           
      12 +function compararNumeros(a: string, b: string): number {       
      13 +  const x = a.replace(/^0+/, '');                              
      14 +  const y = b.replace(/^0+/, '');                              
      15 +  return x.length !== y.length ? x.length - y.length : comparar
         +Texto(x, y);                                                   
      16 +}                                                              
      17 +                                                               
      18 +/**                                                            
      19 + * Ordem de `id` (spec §5, AMB-015): por trechos, da esquerda p
         +ara a direita;                                                 
      20 + * algarismos pelo valor numérico, o resto caractere a caracter
         +e; empate                                                      
      21 + * (ex.: d-01 × d-1) resolvido pela comparação caractere a cara
         +ctere do id inteiro.                                           
      22 + */                                                            
      23 +export function compararIds(a: string, b: string): number {    
      24 +  // split com grupo de captura: trechos de algarismos ficam se
         +mpre nas posições ímpares                                      
      25 +  const ta = a.split(/(\d+)/);                                 
      26 +  const tb = b.split(/(\d+)/);                                 
      27 +  for (let i = 0; i < Math.min(ta.length, tb.length); i += 1) {
      28 +    const r = i % 2 === 1 ? compararNumeros(ta[i]!, tb[i]!) : c
         +ompararTexto(ta[i]!, tb[i]!);                                  
      29 +    if (r !== 0) return Math.sign(r);                          
      30 +  }                                                            
      31 +  return Math.sign(ta.length - tb.length) || compararTexto(a, b
         +);                                                             
      32 +}                                                              
  ⎿  Updated tests/rn-001-limite-diario.test.ts (+6 -0)
      41      expect(r.t).toMatchObject({ reembolso: '70', limite: '80', 
          parcial: false });
      42    });
      43  
      44 +  it('AC: d-9 e d-10 com R$ 40,00 na mesma data → d-9 vem antes
         + (ordem de id) e recebe 40,00; d-10 recebe 20,00 (parcial)', ()
         + => {                                                          
      45 +    const r = limitar([alimentacao('d-10', 40), alimentacao('d-
         +9', 40)]);                                                     
      46 +    expect(r['d-9']).toEqual({ reembolso: '40', limite: '60', p
         +arcial: false, motivo: null });                                
      47 +    expect(r['d-10']).toEqual({ reembolso: '20', limite: '60', 
         +parcial: true, motivo: 'limite diário excedido' });            
      48 +  });                                                          
      49 +                                                               
      50    it('AMB-002: valores iguais desempatam por id crescente; as s
          eguintes recebem R$ 0,00', () => {
      51      const r = limitar([alimentacao('d-102', 30), alimentacao('d
          -101', 30), alimentacao('d-100', 30)]);
      52      expect(r['d-100']).toMatchObject({ reembolso: '30', parcial
          : false });
  ⎿  Updated tests/rn-004-duplicata.test.ts (+5 -0)
      43      });
      44    });
      45  
      46 +  it('AC: duas idênticas d-10 e d-9 → d-9 mantida (ordem de id)
         +; d-10 "duplicata de d-9"', () => {                            
      47 +    const motivos = detectarDuplicatas(itens([despesa({ ...base
         +, id: 'd-10' }), despesa({ ...base, id: 'd-9' })]));           
      48 +    expect(Object.fromEntries(motivos)).toEqual({ 'd-10': 'dupl
         +icata de d-9' });                                              
      49 +  });                                                          
      50 +                                                               
      51    it('AC (spec §8): ALIMENTACAO e alimentacao com os demais cam
          pos iguais → duplicatas', () => {
      52      const motivos = detectarDuplicatas(
      53        itens([despesa({ ...base, id: 'd-041', categoria: 'ALIMEN
          TACAO' }), despesa({ ...base, id: 'd-040' })]),
  ⎿  … 1 more file changed

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      python3 $M T-018 T…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      76  - [x] **T-012** — Limite diário por categoria com distribuição 
          do menor para o maior e limite ampliado em viagem (`regras/limi
          te-diario.ts`).
      77    - **Atende:** RN-001, RN-007, AMB-001, AMB-002, AMB-003
      78    - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa (03/
          07 → d-002 38, d-001 22; 61 → 60; 60 → 60 integral; categorias 
          independentes; empate por `id`) e os casos de limite ampliado d
          a RN-007 (85 em 16/07 integral; 85 em 17/07 → 60).
      79 -  - **Commit:**                                                
      79 +  - **Commit:** `3cf186e`                                      
      80  
      81 -- [ ] **T-018** — Ordem natural de `id` (`src/texto.ts`) usada 
         -no desempate do limite diário e na escolha da duplicata mantida
         -. *Criada em D-002.*                                           
      81 +- [x] **T-018** — Ordem natural de `id` (`src/texto.ts`) usada 
         +no desempate do limite diário e na escolha da duplicata mantida
         +. *Criada em D-002.*                                           
      82    - **Atende:** spec §5 (Ordem de `id`), AMB-015; altera o comp
          ortamento entregue em T-007 e T-012
      83    - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa o ca
          so d-9 × d-10 (d-9 recebe 40,00, d-10 recebe 20,00); `tests/rn-
          004-duplicata.test.ts` passa o caso d-10 × d-9 (d-9 mantida); `
          tests/texto.test.ts` cobre a comparação (d-9 < d-10, d-01 × d-1
          , trechos de texto).
      84    - **Commit:**

⏺ A Fase 2 está fechada, com as duas decisões. Sigo para a Fase 3. Primeiro a
  T-013, o motor, que também transforma em testes reais os it.todo que dependiam
  dele.

⏺ Bash(cat > src/motor.ts <<'EOF'
      // Orquestração das fases da spec §8 (DT-004). Função pura: Entrada →
      Avaliacao[].…)  ⎿  Created src/motor.ts (+88 -0)
       1 +// Orquestração das fases da spec §8 (DT-004). Função pura: Ent
         +rada → Avaliacao[].                                            
       2 +import { Decimal } from 'decimal.js';                          
       3 +import type { Avaliacao, Entrada, Status } from './modelo.js'; 
       4 +import { normalizarCategoria, verificarCategoria } from './regr
         +as/categoria.js';                                              
       5 +import { detectarDuplicatas } from './regras/duplicata.js';    
       6 +import { aplicarLimiteHospedagem } from './regras/hospedagem.js
         +';                                                             
       7 +import { aplicarLimiteDiario, type ItemLimiteDiario } from './r
         +egras/limite-diario.js';                                       
       8 +import { verificarNotaFiscal } from './regras/nota-fiscal.js'; 
       9 +import { verificarPeriodo } from './regras/periodo.js';        
      10 +import { verificarValor } from './regras/valor.js';            
      11 +import { datasEmViagem } from './regras/viagem.js';            
      12 +                                                               
      13 +/** Avalia todas as despesas; o resultado sai na ordem da entra
         +da. */                                                         
      14 +export function avaliar(entrada: Entrada): Avaliacao[] {       
      15 +  const itens = entrada.despesas.map((despesa) => ({ despesa, c
         +ategoria: normalizarCategoria(despesa.categoria) }));          
      16 +                                                               
      17 +  // Fase 1 — elegibilidade: todas as verificações, na ordem da
         + spec §8; nenhuma interrompe as seguintes.                     
      18 +  const duplicatas = detectarDuplicatas(itens);                
      19 +  const avaliacoes: Avaliacao[] = itens.map(({ despesa, categor
         +ia }) => ({                                                    
      20 +    despesa,                                                   
      21 +    categoria,                                                 
      22 +    motivosRecusa: [                                           
      23 +      verificarCategoria(categoria), // 1 — RN-009             
      24 +      verificarValor(despesa), // 2 — RN-005                   
      25 +      verificarPeriodo(despesa, entrada.periodo), // 3 — RN-003
      26 +      duplicatas.get(despesa.id) ?? null, // 4 — RN-004        
      27 +      verificarNotaFiscal(despesa), // 5 — RN-002              
      28 +    ].filter((m): m is string => m !== null),                  
      29 +    reembolsoExato: new Decimal(0),                            
      30 +    cortadaPorLimite: false,                                   
      31 +    motivoParcial: null,                                       
      32 +    limiteAplicado: null,                                      
      33 +    emViagem: false,                                           
      34 +    diarias: null,                                             
      35 +  }));                                                         
      36 +                                                               
      37 +  // Fase 2 — valor reembolsado, só para elegíveis.            
      38 +  const elegiveis = avaliacoes.filter((a) => a.motivosRecusa.le
         +ngth === 0);                                                   
      39 +                                                               
      40 +  // 6 — RN-007                                                
     … 48 more lines (ctrl+o to expand)

⏺ Agora os testes da T-013: ordem-aplicacao.test.ts e a conversão dos it.todo.

⏺ Bash(cat >> tests/fabrica.ts <<'EOF'…)
  ⎿  Updated tests/fabrica.ts (+8 -1)
      2  import { readFileSync } from 'node:fs';
      3  import { Decimal } from 'decimal.js';
      4  import { interpretarEntrada } from '../src/entrada.js';
      5 -import type { Despesa, Entrada } from '../src/modelo.js';       
      5 +import { avaliar } from '../src/motor.js';                      
      6 +import type { Avaliacao, Despesa, Entrada } from '../src/modelo.
        +js';                                                            
      7  import type { CategoriaComLimiteDiario } from '../src/politica.j
         s';
      8  import { normalizarCategoria } from '../src/regras/categoria.js'
         ;
      9  import type { ItemLimiteDiario } from '../src/regras/limite-diar
         io.js';
     ...
      48  export function itensLimite(despesas: Despesa[]): ItemLimiteDia
          rio[] {
      49    return despesas.map((d) => ({ despesa: d, categoria: normaliz
          arCategoria(d.categoria) as CategoriaComLimiteDiario }));
      50  }
      51 +                                                               
      52 +/** Roda o motor com o colaborador e o período do exemplo; devo
         +lve as avaliações por id. */                                   
      53 +export function avaliarDespesas(despesas: Despesa[]): Map<strin
         +g, Avaliacao> {                                                
      54 +  const { colaborador, periodo } = entradaDoExemplo();         
      55 +  return new Map(avaliar({ colaborador, periodo, despesas }).ma
         +p((a) => [a.despesa.id, a]));                                  
      56 +}                                                              
  ⎿  Created tests/ordem-aplicacao.test.ts (+81 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { avaliar } from '../src/motor.js';                     
       3 +import { avaliarDespesas, despesa, entradaDoExemplo } from './f
         +abrica.js';                                                    
       4 +                                                               
       5 +describe('Spec §8 — ordem de aplicação das regras', () => {    
       6 +  it('AC: alimentação em 15/04 (fora do período), R$ 150,00, se
         +m nota → "fora do período de competência" e "nota fiscal ausent
         +e", nessa ordem', () => {                                      
       7 +    const a = avaliarDespesas([                                
       8 +      despesa({ id: 'x', data: '2026-04-15', categoria: 'alimen
         +tacao', valor: 150, temNotaFiscal: false }),                   
       9 +    ]).get('x')!;                                              
      10 +    expect(a.motivosRecusa).toEqual(['fora do período de compet
         +ência', 'nota fiscal ausente']);                               
      11 +  });                                                          
      12 +                                                               
      13 +  it('fase 1 acumula todos os motivos, na ordem da tabela (cate
         +goria → valor → período → duplicata → nota)', () => {          
      14 +    const base = { data: '2026-04-15', categoria: 'Coworking', 
         +descricao: 'x', fornecedor: 'y', valor: -150, temNotaFiscal: fa
         +lse };                                                         
      15 +    const r = avaliarDespesas([despesa({ ...base, id: 'd-1' }),
         + despesa({ ...base, id: 'd-2' })]);                            
      16 +    expect(r.get('d-1')!.motivosRecusa).toEqual([              
      17 +      'categoria fora da política',                            
      18 +      'valor não positivo',                                    
      19 +      'fora do período de competência',                        
      20 +    ]);                                                        
      21 +    expect(r.get('d-2')!.motivosRecusa).toEqual([              
      22 +      'categoria fora da política',                            
      23 +      'valor não positivo',                                    
      24 +      'fora do período de competência',                        
      25 +      'duplicata de d-1',                                      
      26 +    ]);                                                        
      27 +  });                                                          
      28 +                                                               
      29 +  it('AC: ALIMENTACAO e alimentacao com os demais campos iguais
         + → duplicatas (a de maior id é recusada)', () => {             
      30 +    const base = { data: '2026-07-09', descricao: 'Almoco', for
         +necedor: 'Bistro', valor: 30 };                                
      31 +    const r = avaliarDespesas([                                
      32 +      despesa({ ...base, id: 'd-201', categoria: 'ALIMENTACAO' 
         +}),                                                            
      33 +      despesa({ ...base, id: 'd-200', categoria: 'alimentacao' 
         +}),                                                            
      34 +    ]);                                                        
      35 +    expect(r.get('d-200')!.motivosRecusa).toEqual([]);         
      36 +    expect(r.get('d-201')!.motivosRecusa).toEqual(['duplicata d
         +e d-200']);                                                    
      37 +  });                                                          
      38 +                                                               
      39 +  it('AC: hospedagem sem nota acima de R$ 100,00 → recusada na 
         +fase 1 e não gera datas em viagem; diarias nulo', () => {      
      40 +    const hotel = despesa({ id: 'h', data: '2026-07-20', catego
         +ria: 'hospedagem', descricao: '2 diarias', valor: 400, temNotaF
         +iscal: false });                                               
     … 41 more lines (ctrl+o to expand)
  ⎿  Updated tests/rn-002-nota-fiscal.test.ts (+8 -2)
      1  import { describe, expect, it } from 'vitest';
      2  import { aplicarLimiteDiario } from '../src/regras/limite-diario
         .js';
      3  import { verificarNotaFiscal } from '../src/regras/nota-fiscal.j
         s';
      4 -import { despesa, doExemplo, itensLimite } from './fabrica.js'; 
      4 +import { avaliarDespesas, despesa, doExemplo, itensLimite } from
        + './fabrica.js';                                                
      5  
      6  describe('RN-002 — nota fiscal obrigatória acima de R$ 100,00', 
         () => {
      7    it('AC: d-003 transporte R$ 100,00 sem nota → não exige nota',
          () => {
     ...
      12      expect(verificarNotaFiscal(doExemplo('d-004'))).toBe('nota 
          fiscal ausente');
      13    });
      14  
      15 -  it.todo('AC: dia 06/07 (d-003 + d-004) → só d-003 entra no li
         -mite, recebe R$ 80,00 (parcial) — via motor, T-013');          
      15 +  it('AC: dia 06/07 (d-003 + d-004) → só d-003 entra no limite 
         +de transporte, recebe R$ 80,00 (parcial)', () => {             
      16 +    const r = avaliarDespesas([doExemplo('d-003'), doExemplo('d
         +-004')]);                                                      
      17 +    expect(r.get('d-003')).toMatchObject({ cortadaPorLimite: tr
         +ue, motivoParcial: 'limite diário excedido' });                
      18 +    expect(r.get('d-003')!.reembolsoExato.toString()).toBe('80'
         +);                                                             
      19 +    expect(r.get('d-004')!.motivosRecusa).toEqual(['nota fiscal
         + ausente']);                                                   
      20 +    expect(r.get('d-004')!.reembolsoExato.toString()).toBe('0')
         +;                                                              
      21 +  });                                                          
      22  
      23    it('AC: transporte R$ 60,00 + R$ 55,00 no mesmo dia, sem nota
           → nenhuma exige nota; soma 115 → limite 80 por RN-001', () => 
          {
      24      const dia = { data: '2026-07-20', categoria: 'transporte_ur
          bano', temNotaFiscal: false };
  ⎿  Updated tests/rn-004-duplicata.test.ts (+8 -2)
      2  import { normalizarCategoria } from '../src/regras/categoria.js'
         ;
      3  import { detectarDuplicatas } from '../src/regras/duplicata.js';
      4  import type { Despesa } from '../src/modelo.js';
      5 -import { despesa, doExemplo, entradaDoExemplo } from './fabrica.
        -js';                                                            
      5 +import { avaliarDespesas, despesa, doExemplo, entradaDoExemplo }
        + from './fabrica.js';                                           
      6  
      7  const itens = (despesas: Despesa[]) =>
      8    despesas.map((d) => ({ despesa: d, categoria: normalizarCatego
         ria(d.categoria) }));
     ...
      23      expect(motivos.has('d-006')).toBe(false);
      24    });
      25  
      26 -  it.todo('AC: d-006 segue para o limite e recebe R$ 54,90 — vi
         -a motor, T-013');                                              
      26 +  it('AC: d-006 segue para o limite e recebe R$ 54,90; d-007 re
         +cusada não consome o limite', () => {                          
      27 +    const r = avaliarDespesas([doExemplo('d-006'), doExemplo('d
         +-007')]);                                                      
      28 +    expect(r.get('d-006')!.reembolsoExato.toString()).toBe('54.
         +9');                                                           
      29 +    expect(r.get('d-006')!.cortadaPorLimite).toBe(false);      
      30 +    expect(r.get('d-007')!.motivosRecusa).toEqual(['duplicata d
         +e d-006']);                                                    
      31 +    expect(r.get('d-007')!.reembolsoExato.toString()).toBe('0')
         +;                                                              
      32 +  });                                                          
      33  
      34    it('AC: iguais exceto pela descrição ("Almoço" × "Almoço equi
          pe") → não são duplicatas', () => {
      35      const motivos = detectarDuplicatas(
  ⎿  Updated tests/rn-005-valor-nao-positivo.test.ts (+10 -3)
       1  import { describe, expect, it } from 'vitest';
       2  import { verificarValor } from '../src/regras/valor.js';
       3 -import { despesa, doExemplo } from './fabrica.js';             
       3 +import { avaliarDespesas, despesa, doExemplo } from './fabrica.
         +js';                                                           
       4  
       5  describe('RN-005 — valores não positivos', () => {
       6    it('AC: d-009 transporte −R$ 45,00 em 11/07 → recusada, "valo
          r não positivo"', () => {
       7      expect(verificarValor(doExemplo('d-009'))).toBe('valor não 
          positivo');
       8    });
       9  
      10 -  it.todo('AC: d-009 → total do período não é reduzido — via mo
         -tor/saída, T-013/T-015');                                      
      10 +  it.todo('AC: d-009 → total do período não é reduzido — totais
         + da saída, T-015');                                            
      11  
      12    it('AC: despesa de R$ 0,00 → recusada com o mesmo motivo', ()
           => {
      13      expect(verificarValor(despesa({ valor: 0 }))).toBe('valor n
          ão positivo');
      14    });
      15  
      16 -  it.todo('AC: transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a
         - de R$ 70,00 recebe R$ 70,00 — via motor, T-013');             
      16 +  it('AC: transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R
         +$ 70,00 recebe R$ 70,00 (o negativo não altera a soma do dia)',
         + () => {                                                       
      17 +    const dia = { data: '2026-07-20', categoria: 'transporte_ur
         +bano', temNotaFiscal: false };                                 
      18 +    const r = avaliarDespesas([despesa({ ...dia, id: 'a', valor
         +: 70 }), despesa({ ...dia, id: 'b', valor: -20 })]);           
      19 +    expect(r.get('a')!.reembolsoExato.toString()).toBe('70');  
      20 +    expect(r.get('a')!.cortadaPorLimite).toBe(false);          
      21 +    expect(r.get('b')!.reembolsoExato.toString()).toBe('0');   
      22 +    expect(r.get('b')!.motivosRecusa).toEqual(['valor não posit
         +ivo']);                                                        
      23 +  });                                                          
      24  
      25    it('valor positivo, mesmo mínimo, é aceito', () => {
      26      expect(verificarValor(despesa({ valor: 70 }))).toBeNull();
  ⎿  … 3 more files changed

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      python3 $M T-013 T…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      81  - [x] **T-018** — Ordem natural de `id` (`src/texto.ts`) usada 
          no desempate do limite diário e na escolha da duplicata mantida
          . *Criada em D-002.*
      82    - **Atende:** spec §5 (Ordem de `id`), AMB-015; altera o comp
          ortamento entregue em T-007 e T-012
      83    - **Aceite:** `tests/rn-001-limite-diario.test.ts` passa o ca
          so d-9 × d-10 (d-9 recebe 40,00, d-10 recebe 20,00); `tests/rn-
          004-duplicata.test.ts` passa o caso d-10 × d-9 (d-9 mantida); `
          tests/texto.test.ts` cobre a comparação (d-9 < d-10, d-01 × d-1
          , trechos de texto).
      84 -  - **Commit:**                                                
      84 +  - **Commit:** `ad0ca21`                                      
      85  
      86  ## Fase 3 — Orquestração e casos de borda
      87  
      88 -- [ ] **T-013** — Motor (`src/motor.ts`): fase 1 com acúmulo de
         - todos os motivos na ordem da spec §8, fase 2 só com elegíveis.
      88 +- [x] **T-013** — Motor (`src/motor.ts`): fase 1 com acúmulo de
         + todos os motivos na ordem da spec §8, fase 2 só com elegíveis.
      89    - **Atende:** spec §8, DT-004
      90    - **Aceite:** `tests/ordem-aplicacao.test.ts` passa (15/04 + 
          R$ 150 sem nota → dois motivos na ordem; recusada não consome l
          imite; hospedagem recusada não gera viagem e sai com `diarias` 
          nulo (AMB-016); reordenar a entrada não altera valores) e os `i
          t.todo` deixados na Fase 2 viram testes.
      91    - **Commit:**

⏺ Agora a T-014: o exemplo de ponta a ponta no motor, conferindo as 14 linhas da
  spec §7.

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      cat > tests/exempl…)
  ⎿  Created tests/exemplo-ponta-a-ponta.test.ts (+49 -0)
       1 +import { describe, expect, it } from 'vitest';                 
       2 +import { avaliar, motivosDe, statusDe } from '../src/motor.js';
       3 +import { arredondarReembolso } from '../src/regras/arredondamen
         +to.js';                                                        
       4 +import { entradaDoExemplo } from './fabrica.js';               
       5 +                                                               
       6 +// Spec §7 — exemplos/despesas-exemplo.json, linha a linha.    
       7 +const LD = 'limite diário excedido';                           
       8 +const esperado = {                                             
       9 +  'd-001': { categoria: 'alimentacao', status: 'parcial', reemb
         +olso: '22.00', motivos: [LD], limite: '60', emViagem: false, di
         +arias: null },                                                 
      10 +  'd-002': { categoria: 'alimentacao', status: 'integral', reem
         +bolso: '38.00', motivos: [], limite: '60', emViagem: false, dia
         +rias: null },                                                  
      11 +  'd-003': { categoria: 'transporte_urbano', status: 'parcial',
         + reembolso: '80.00', motivos: [LD], limite: '80', emViagem: fal
         +se, diarias: null },                                           
      12 +  'd-004': { categoria: 'transporte_urbano', status: 'recusada'
         +, reembolso: '0.00', motivos: ['nota fiscal ausente'], limite: 
         +null, emViagem: false, diarias: null },                        
      13 +  'd-005': { categoria: 'coworking', status: 'recusada', reembo
         +lso: '0.00', motivos: ['categoria fora da política'], limite: n
         +ull, emViagem: false, diarias: null },                         
      14 +  'd-006': { categoria: 'alimentacao', status: 'integral', reem
         +bolso: '54.90', motivos: [], limite: '60', emViagem: false, dia
         +rias: null },                                                  
      15 +  'd-007': { categoria: 'alimentacao', status: 'recusada', reem
         +bolso: '0.00', motivos: ['duplicata de d-006'], limite: null, e
         +mViagem: false, diarias: null },                               
      16 +  'd-008': { categoria: 'alimentacao', status: 'recusada', reem
         +bolso: '0.00', motivos: ['fora do período de competência'], lim
         +ite: null, emViagem: false, diarias: null },                   
      17 +  'd-009': { categoria: 'transporte_urbano', status: 'recusada'
         +, reembolso: '0.00', motivos: ['valor não positivo'], limite: n
         +ull, emViagem: false, diarias: null },                         
      18 +  'd-010': { categoria: 'hospedagem', status: 'integral', reemb
         +olso: '480.00', motivos: [], limite: '750', emViagem: true, dia
         +rias: 2 },                                                     
      19 +  'd-011': { categoria: 'alimentacao', status: 'integral', reem
         +bolso: '33.33', motivos: [], limite: '90', emViagem: true, diar
         +ias: null },                                                   
      20 +  'd-012': { categoria: 'alimentacao', status: 'integral', reem
         +bolso: '47.20', motivos: [], limite: '60', emViagem: false, dia
         +rias: null },                                                  
      21 +  'd-013': { categoria: 'hospedagem', status: 'recusada', reemb
         +olso: '0.00', motivos: ['nota fiscal ausente'], limite: null, e
         +mViagem: false, diarias: null },                               
      22 +  'd-014': { categoria: 'alimentacao', status: 'parcial', reemb
         +olso: '60.00', motivos: [LD], limite: '60', emViagem: false, di
         +arias: null },                                                 
      23 +} as const;                                                    
      24 +                                                               
      25 +const avaliacoes = avaliar(entradaDoExemplo());                
      26 +                                                               
      27 +describe('Spec §7 — exemplo de ponta a ponta (motor)', () => { 
      28 +  it.each(Object.entries(esperado))('%s', (id, linha) => {     
      29 +    const a = avaliacoes.find((x) => x.despesa.id === id)!;    
      30 +    expect({                                                   
      31 +      categoria: a.categoria,                                  
      32 +      status: statusDe(a),                                     
      33 +      reembolso: arredondarReembolso(a.reembolsoExato).toFixed(
         +2),                                                            
      34 +      motivos: motivosDe(a),                                   
      35 +      limite: a.limiteAplicado?.toString() ?? null,            
      36 +      emViagem: a.emViagem,                                    
      37 +      diarias: a.diarias,                                      
      38 +    }).toEqual(linha);                                         
      39 +  });                                                          
      40 +                                                               
     … 9 more lines (ctrl+o to expand)

⏺ Todas as 14 linhas batem com a §7 na primeira execução. Antes do commit,
  ajusto o nome do último teste, que prometia mais do que conferia.

⏺ Bash(M=/private/tmp/claude-501/-Users-USUARIO-Documents-dev-nosync-
      sdd-desafio/af37d618-4d8e-4a07-81fc-c66712299622/scratchpad/marca.py
      python3 - <<'EOF'…)
  ⎿  Updated specs/001-motor-reembolso/tasks.md (+2 -2)
      88  - [x] **T-013** — Motor (`src/motor.ts`): fase 1 com acúmulo de
           todos os motivos na ordem da spec §8, fase 2 só com elegíveis.
      89    - **Atende:** spec §8, DT-004
      90    - **Aceite:** `tests/ordem-aplicacao.test.ts` passa (15/04 + 
          R$ 150 sem nota → dois motivos na ordem; recusada não consome l
          imite; hospedagem recusada não gera viagem e sai com `diarias` 
          nulo (AMB-016); reordenar a entrada não altera valores) e os `i
          t.todo` deixados na Fase 2 viram testes.
      91 -  - **Commit:**                                                
      91 +  - **Commit:** `868dca1`                                      
      92  
      93 -- [ ] **T-014** — Teste de ponta a ponta do exemplo no nível do
         - motor.                                                        
      93 +- [x] **T-014** — Teste de ponta a ponta do exemplo no nível do
         + motor.                                                        
      94    - **Atende:** spec §7
      95    - **Aceite:** `tests/exemplo-ponta-a-ponta.test.ts` passa — c
          ada uma das 14 despesas com status, valor reembolsado, motivos,
           limite aplicado, em viagem e diárias da tabela da spec §7.
      96    - **Commit:**
  ⎿  Updated tests/exemplo-ponta-a-ponta.test.ts (+3 -3)
      42      expect(avaliacoes.map((a) => a.despesa.id)).toEqual(Object.
          keys(esperado));
      43    });
      44  
      45 -  it('datas em viagem: só 14/07, 15/07 e 16/07 (geradas por d-0
         -10)', () => {                                                  
      46 -    const emViagem = new Set(avaliacoes.filter((a) => a.emViage
         -m).map((a) => a.despesa.data));                                
      47 -    expect([...emViagem].sort()).toEqual(['2026-07-14', '2026-0
         -7-15']); // datas com despesa no exemplo                       
      45 +  it('em viagem só as despesas de 14/07 e 15/07 (dentro de 14–1
         +6/07, gerado por d-010; 16/07 não tem despesa)', () => {       
      46 +    const emViagem = avaliacoes.filter((a) => a.emViagem).map((
         +a) => a.despesa.id);                                           
      47 +    expect(emViagem).toEqual(['d-010', 'd-011']);              
      48    });
      49  });

⏺ As duas decisões já estão na spec e no código, e a Fase 3 (motor e exemplo de
  ponta a ponta) está pronta para você revisar. São 120 testes passando e 1
  it.todo, o typecheck termina sem erros e tudo está no GitHub.

  Suas decisões

  ┌──────────────┬──────────────────────────────────────────────────────────┐
  │    Commit    │                          O quê                           │
  ├──────────────┼──────────────────────────────────────────────────────────┤
  │              │ D-002 / AMB-015: "menor id" passa a usar ordem natural,  │
  │ 9153330      │ então d-9 vem antes de d-10. A definição está no início  │
  │ docs(spec)   │ da §5, e as RN-001 e RN-004 ganharam um caso de aceite   │
  │              │ cada. Spec 1.2.                                          │
  ├──────────────┼──────────────────────────────────────────────────────────┤
  │ 69231ce      │ D-003 / AMB-016: hospedagem recusada sai com diarias     │
  │ docs(spec)   │ nulo. Muda a §4, a RN-006 e a linha de d-013 na §7. Spec │
  │              │  1.3.                                                    │
  ├──────────────┼──────────────────────────────────────────────────────────┤
  │ 195981d      │ Criei a T-018 em vez de reabrir T-007 e T-012, já que a  │
  │ docs(tasks)  │ numeração é o eixo da rastreabilidade. Os aceites de     │
  │              │ T-013/T-014 e a matriz de cobertura foram atualizados.   │
  ├──────────────┼──────────────────────────────────────────────────────────┤
  │ ad0ca21      │ A comparação compararIds está em src/texto.ts.           │
  │ T-018        │ Duplicatas e limite diário passaram a usá-la.            │
  └──────────────┴──────────────────────────────────────────────────────────┘

  Fase 3

  - 868dca1 T-013: src/motor.ts roda a fase 1 com todos os motivos, na ordem da
    §8, e a fase 2 só com as despesas elegíveis.
    - Os 6 it.todo da Fase 2 que dependiam do motor viraram testes reais. Por
      exemplo, d-003 recebe 80 porque d-004 não consome o limite.
    - Sobra 1 it.todo: "d-009 não reduz o total", que depende dos totais da
      saída (T-015).
  - b5f1242 T-014: tests/exemplo-ponta-a-ponta.test.ts confere as 14 linhas da
    §7 campo a campo, e todas bateram na primeira execução.

  Pontos para olhar com atenção

  1. em_viagem para despesa recusada: sigo a definição da §4, "se a data da
     despesa é uma data em viagem". Ou seja, olha só a data, inclusive em
     despesas recusadas. No exemplo isso não muda nada (nenhuma recusada cai
     entre 14 e 16/07).
  2. O arredondamento (etapa 9) fica na saída, não no motor: o motor entrega o
     valor exato e a T-015 arredonda ao montar o JSON, como o plan (DT-001) já
     previa. O teste da T-014 arredonda explicitamente.
  3. statusDe e motivosDe ficaram no motor para a T-014 poder conferir status e
     motivos agora. A T-015 vai reaproveitar as duas.

  Falta a Fase 4: a T-015 (saída e totais de R$ 815,43), a T-016 (CLI) e a T-017
  (README). Quando você aprovar, sigo no mesmo modo. Vale também fazer o
  /export desta sessão em algum momento, porque ela já cobre bastante coisa.

❯ eu devo abrir outra sessao para dar o export e pegar só o historia dela?

⏺ Não. Uma sessão nova começa vazia, e o export dela não teria nada do que
  fizemos. O /export só exporta a conversa em que ele é rodado, então tem que
  ser nesta sessão.

  Como fazer agora:
  1. Rode /export aqui.
  2. Me avise. Eu movo o arquivo para docs/sessions/03-regras-motor.md, troco o
     seu caminho pessoal por ~/ e faço o commit (docs(sessions): ...), como nas
     outras vezes.

  O que esperar do conteúdo: esta sessão é a continuação da 02 e passou por uma
  compactação de contexto. O export pode começar com um resumo do que veio
  antes, ou repetir trechos da 02. Eu deixaria o arquivo como saiu, sem editar:
  é o registro real da sessão. Basta citar no relatório que as sessões 02 e 03
  são uma conversa contínua, como já íamos fazer com a 01 e a 02.

  Daqui para frente, para cada export ter só a história da sua fase:
  1. Rode /export aqui.
  2. Abra uma sessão nova para a Fase 4 (T-015 a T-017).
  3. No fim dela, rode /export lá também.

  A sessão nova não perde contexto: CLAUDE.md, spec, plan e tasks.md têm tudo o
  que é preciso para continuar, e esse é justamente o ponto do SDD. Se quiser,
  comece a próxima sessão com "leia tasks.md e siga da T-015 em modo revisão por
  fase".

  Se o /export falhar, o FAQ do desafio sugere copiar o .jsonl da sessão em
  ~/.claude/projects/.

❯ mas o problema é que o export dessa sessao pega de todas anteriores, nao?

⏺ Sim, provavelmente. A 02 veio com a 01 inteira porque era a mesma conversa, e
  esta também é. O detalhe é que houve uma compactação no meio, então o export
  pode trazer tudo desde o início ou começar pelo resumo da compactação. Só dá
  para saber olhando o arquivo.

  O problema tem solução, porque a parte que já está na 02 tem um ponto de corte
  claro:

  1. Você roda /export aqui.
  2. Eu abro o arquivo e procuro onde a 02 terminou: a sua mensagem "pronto.
     criou o 02-plan-tasks-setup". Se o arquivo começar pelo resumo da
     compactação, corto logo depois dele.
  3. Mantenho só o que vem depois, no docs/sessions/03-regras-motor.md. No topo
     coloco uma nota dizendo que é a continuação da sessão 02 e que o trecho
     anterior está em 02-plan-tasks-setup.md.
  4. Confiro que nada foi perdido: a última linha da 02 e a primeira da 03
     precisam se encaixar. Depois troco o caminho pessoal por ~/ e faço o
     commit.

  O corte é só mecânico, sem reescrever nada, e a nota no topo deixa isso
  explícito para quem corrigir. Vale citar no relatório também.

  Para não repetir isso na Fase 4, depois deste export abrimos uma sessão nova.
  Aí o próximo export sai limpo, só com aquela fase.

  Pode rodar o /export.