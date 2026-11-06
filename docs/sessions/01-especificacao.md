⎿  SessionStart:startup says: claude-mem: memory hooks are not active: plugin
dependencies are missing (zod, tree-sitter-cli, tree-sitter-c,
tree-sitter-cpp, tree-sitter-go, +21 more). Fix: run `npx claude-mem
     install`, then restart Claude Code.
⎿  SessionStart:startup says: # claude-mem status

     This project has no memory yet. The current session will seed it;
     subsequent sessions will receive auto-injected context for relevant past
     work.

     Memory injection starts on your second session in a project.

     `/learn-codebase` is available if the user wants to front-load the entire
     repo into memory in a single pass (~5 minutes on a typical repo, optional).
     Otherwise memory builds passively as work happens.

     Live activity: http://localhost:37777
     ✨ 30 Day Free Trial — memory runs off-plan. Get up to 100% more usage from
     your plan https://cmem.ai/pro?from=welcome-hint
     How it works: `/how-it-works`

     This message disappears once the first observation lands.

     View Observations Live @ http://localhost:37777
     ✨ 30 Day Free Trial — memory runs off-plan. Get up to 100% more usage from
     your plan https://cmem.ai/pro?from=session-start

❯ me explique sobre esse desafio e o que eu preciso fazer para comecar

⏺ Bash(git ls-files && cat README.md 2>/dev/null | head -200)
⎿  (No output)

⏺ Bash(cat DESAFIO.md RUBRICA.md && head -c 3000 exemplos/despesas-exemplo.json
&& git remote -v)
⎿  (No output)

Read 1 file (ctrl+o to expand)

⏺ O desafio

Você vai construir um motor de cálculo de reembolso de despesas: uma CLI que
lê um JSON com as despesas de um colaborador e gera um JSON dizendo quanto é
reembolsável em cada item e por quê.

<seu-comando> calcular --input despesas.json --output resultado.json

O código é a parte menor. O produto funcionando vale 10 de 100 pontos. O que
pesa é o processo de Spec Driven Development:

┌─────────────────────────────────────────────────────────────────┬────────┐
│ Critério │ Pontos │
├─────────────────────────────────────────────────────────────────┼────────┤
│ Qualidade da spec (ambiguidades resolvidas, testável, sem │ 25 │
│ detalhe técnico vazado) │ │
├─────────────────────────────────────────────────────────────────┼────────┤
│ Rastreabilidade: spec → tasks → commits → testes │ 25 │
├─────────────────────────────────────────────────────────────────┼────────┤
│ Resposta à mudança de requisito do Dia 2 │ 20 │
├─────────────────────────────────────────────────────────────────┼────────┤
│ Relatório com evidências (os 4 Ds) │ 20 │
├─────────────────────────────────────────────────────────────────┼────────┤
│ Produto funciona │ 10 │
└─────────────────────────────────────────────────────────────────┴────────┘

A política do RH tem 9 regras mal escritas e pelo menos 8 ambiguidades. O
exercício é encontrar cada uma, decidir uma interpretação, justificar em uma
linha e registrar tudo na spec.md. Não existe interpretação certa. Perde ponto
quem decide silenciosamente dentro do código.

As três regras do jogo

1. Nenhum commit sem task: toda mensagem de commit cita a task, por exemplo
   feat(T-003): ... ou docs(spec): ....
2. Regra explicada no chat que não está na spec é bug de spec: pare, corrija a
   spec, registre no DECISIONS.md e só depois continue. Cada regra que fica
   só no chat custa −5 pontos.
3. Exporte cada sessão com /export para docs/sessions/NN-descricao.md. Sem as
   sessões exportadas, o critério de relatório vale zero.

Cronograma

- Dia 1, manhã: spec.md → plan.md → tasks.md, sem escrever código.
- Dia 1, tarde: implementação seguindo as tasks.
- Dia 2, 10h: chega uma mudança de requisito surpresa. Ela entra pela ordem
  spec → DECISIONS.md → tasks → código.
- Dia 2, 18h: entrega do link do fork público, com o RELATORIO.md pronto.

Para começar

⚠️ Primeiro ajuste: este clone aponta para
https://github.com/Sassine/sdd-desafio.git, que é o repositório original, não
um fork seu. Faça o fork público no GitHub e troque o remote:
git remote set-url origin https://github.com/<seu-usuario>/sdd-desafio.git

Depois:

1. Monte a estrutura a partir do template:
   cp template/CLAUDE.md . && cp -r template/specs . && cp -r template/docs .
   git add -A && git commit -m "chore: estrutura inicial a partir do template"
2. Teste o /export agora. Esta conversa pode ser a sua
   docs/sessions/01-entendendo-desafio.md.
3. Escolha uma stack que você já domina, como Node/TypeScript ou Python. Não é
   hora de aprender ferramenta nova.
4. Percorra exemplos/despesas-exemplo.json item por item comparando com a
   política. Cada item está ali para provocar uma ambiguidade. Valores
   redondos perto dos limites, itens com data ou valor estranhos e categorias
   que a política não cobre são pistas. A rubrica avisa que as ambiguidades
   são de três tipos:
   - unidade de aplicação: a que conjunto a regra se aplica;
   - fronteira: comparações, arredondamento, limite inclusivo ou exclusivo;
   - dado ausente: a política pressupõe uma informação que a entrada não traz.
5. Escreva a spec.md só com o quê e o porquê: nada de linguagem, biblioteca ou
   pasta. Inclua as decisões, o schema de saída, os casos de borda e o que
   fica fora de escopo.

Uma dica para o relatório: anote desde já os momentos em que o Claude errar e
você perceber. A seção de Discernimento exige pelo menos um caso concreto, com
link para a sessão exportada, ou vale zero.

Não listei as ambiguidades de propósito, porque encontrá-las é o trabalho
avaliado. Se quiser, posso fazer o passo 1 agora ou percorrer o JSON com você
item por item. Nesse caso você conduz e decide, e eu questiono suas
interpretações.

❯ crie o fork para mmim antes de comecarmos

⏺ Bash(gh auth status 2>&1 | head -5)
⎿  (No output)

⏺ Bash(which brew; git config --get credential.helper)
⎿  (No output)

⏺ Ainda não consegui criar o fork. Criar um fork exige estar autenticado na API
do GitHub, e o gh (GitHub CLI) não está instalado nesta máquina. As
credenciais do git que estão no keychain só servem para push e pull, não para
criar fork.

Você pode seguir por um destes caminhos:

Opção A, pelo navegador (mais rápida, cerca de 30 segundos)

1. Abra https://github.com/Sassine/sdd-desafio e clique em Fork.
2. Confira que o fork ficou público.
3. Me passe o seu usuário do GitHub. Eu aponto o clone local para o seu fork e
   mantenho o original como upstream.

Opção B, pela CLI

1. Eu instalo o gh com brew install gh.
2. Você faz o login digitando ! gh auth login aqui no prompt. O login abre o
   navegador, por isso precisa ser você.
3. Eu rodo gh repo fork --remote e o fork fica configurado sem mais passos.

Qual você prefere?

❯ criei o fork

https://github.com/pedrogodoy/sdd-desafio

⏺ Bash(git remote rename origin upstream && git remote add origin
https://github.com/pedrogodoy/sdd-desafio.git && git fetch origin 2>&1 |
tail -3 && git remote -v &&…)
⎿  (No output)

⏺ Pronto, o clone local agora aponta para o seu fork:

- origin → https://github.com/pedrogodoy/sdd-desafio, que recebe seus pushes.
- upstream → https://github.com/Sassine/sdd-desafio, o original. Assim você
  pode puxar alguma correção que o instrutor publicar no FAQ.
- A branch main está vinculada a origin/main e sincronizada com ela.

O fetch funcionou sem pedir login, então o fork está público, como a entrega
exige.

O próximo passo é copiar o template (CLAUDE.md, specs/, docs/) e fazer o
commit chore: estrutura inicial a partir do template. Quer que eu faça agora?
Depois disso, passamos pelo JSON de exemplo item por item para levantar as
ambiguidades.

❯ mas devo ficar nesse repo mesmo agora? ou abrir outro?

⏺ Pode ficar neste mesmo repositório. Não precisa abrir outro nem clonar de
novo.

O fork no GitHub é uma cópia exata do original, com os mesmos commits. A única
diferença entre o seu clone local e um clone novo do fork era para onde ele
apontava, e isso eu já corrigi trocando o origin. A partir de agora, todo git
push vai para pedrogodoy/sdd-desafio.

É nesta pasta que vão ficar o CLAUDE.md, as specs/, o src/, os tests/ e os
docs/, como o README pede.

Uma dica: esta conversa já pode ser a sua primeira sessão exportada. Quando
terminarmos a configuração, rode /export e salve como
docs/sessions/01-setup-e-entendimento.md.

Quer que eu copie o template e faça o commit inicial agora?

❯ sim

⏺ Bash(cp template/CLAUDE.md . && cp -r template/specs . && cp -r template/docs
. && git add -A && git commit -q -m "chore: estrutura inicial a partir do
template…)
⎿  Created CLAUDE.md (+49 -0)
1 +# CLAUDE.md  
 2 +  
 3 +> Este arquivo é lido pelo Claude Code no início de toda sessão
+. É onde moram as  
 4 +> convenções que você não quer repetir em todo prompt.  
 5 +> Substitua os `<...>` e apague o que não usar. Mantenha curto
+— CLAUDE.md longo  
 6 +> é CLAUDE.md ignorado.  
 7 +  
 8 +## O projeto  
 9 +  
 10 +Motor de cálculo de reembolso de despesas corporativas. CLI que + lê um JSON de  
 11 +despesas e emite um JSON com o valor reembolsável e a justifica
+tiva de cada item.  
 12 +  
 13 +## Fonte da verdade  
 14 +  
 15 +`specs/001-motor-reembolso/spec.md` define **o que** o sistema
+faz.  
 16 +`specs/001-motor-reembolso/plan.md` define **como**.  
 17 +`specs/001-motor-reembolso/tasks.md` define **em que ordem**.  
 18 +  
 19 +Quando o código e a spec discordarem, a spec está certa e o cód
+igo é o bug —  
 20 +a menos que a spec esteja errada, e nesse caso corrigimos a spe
+c primeiro e  
 21 +registramos em `DECISIONS.md`.  
 22 +  
 23 +**Antes de implementar qualquer coisa, leia a task corresponden
+te em `tasks.md`.**  
 24 +Se o que eu pedi não está coberto por nenhuma task, me avise em + vez de implementar.  
 25 +  
 26 +## Regras de trabalho  
 27 +  
 28 +- Toda regra de negócio vive na spec, não no chat e não em come
+ntário de código.  
 29 +- Se eu te explicar uma regra que não está na spec, **pare e me + diga isso** antes  
 30 + de escrever código. Isso é um bug de spec.  
 31 +- Todo commit referencia uma task: `feat(T-003): <descrição>`.
32 + Mudanças de documentação: `docs(spec):`, `docs(plan):`, `docs
         +(tasks):`.  
 33 +- Nenhuma regra de negócio entra sem teste.  
 34 +  
 35 +## Stack e comandos  
 36 +  
 37 +- Linguagem: `<...>`  
 38 +- Rodar: `<comando>`  
 39 +- Testes: `<comando>`  
 40 +- Lint/format: `<comando>`  
 … 9 more lines (ctrl+o to expand)
⎿  Created docs/RELATORIO.md (+137 -0)
1 +# Relatório — Desafio SDD  
 2 +  
 3 +**Aluno:** `<nome>` · **Repositório:** `<link>` · **Data:** `<
          +data>`  
 4 +  
 5 +> Isto não é redação. São **evidências**. Toda afirmação deve
+vir acompanhada de  
 6 +> arquivo, hash de commit ou trecho de sessão exportada. Um pa
+rágrafo bonito sem  
 7 +> evidência vale menos que uma frase curta com um hash.  
 8 +>  
 9 +> Vale 20 dos 100 pontos, e é a seção que mais separa notas.  
 10 +  
 11 +---  
 12 +  
 13 +## Delegação  
 14 +  
 15 +_O que você fez, o que o Claude fez, e por que dividiu assim._
16 +  
 17 +**A divisão:**  
 18 +  
 19 +| Atividade | Quem | Por quê |  
 20 +|---|---|---|  
 21 +| Identificar ambiguidades | | |  
 22 +| Decidir as ambiguidades | | |  
 23 +| Escrever a spec | | |  
 24 +| Desenhar a arquitetura | | |  
 25 +| Implementar | | |  
 26 +| Escrever testes | | |  
 27 +| Absorver o envelope | | |  
 28 +  
 29 +**Onde deleguei e me arrependi:**  
 30 +  
 31 +**Onde não deleguei e deveria ter delegado:**  
 32 +  
 33 +**Usei subagentes / skills / MCP / hooks?** <se sim: o quê, co
+mo configurou,  
 34 +valeu a pena. Se não: por que não.>  
 35 +  
 36 +---  
 37 +  
 38 +## Descrição  
 39 +  
 40 +_Como você transformou requisito ambíguo em requisito verificá
+vel._  
 … 97 more lines (ctrl+o to expand)
⎿  Created specs/001-motor-reembolso/DECISIONS.md (+42 -0)
1 +# Log de Decisões e Mudanças de Spec  
 2 +  
 3 +> Uma entrada **toda vez** que a spec mudar. Este arquivo é a p
+rova de que a spec  
 4 +> foi tratada como artefato vivo e não como cerimônia de abertu
+ra.  
 5 +>  
 6 +> Spec que não muda em dois dias é spec que ninguém consultou.
+Mudança não é  
 7 +> demérito — mudança não registrada é.  
 8 +  
 9 +Ordem cronológica inversa: a mais recente primeiro.  
 10 +  
 11 +---  
 12 +  
 13 +## D-002 — <título curto> · `<data>`  
 14 +  
 15 +**Gatilho:** <o que provocou: envelope lacrado / erro descobert
+o na implementação /  
 16 +ambiguidade que só apareceu ao testar / o Claude apontou uma co
+ntradição>  
 17 +  
 18 +**O que mudou na spec:** <de → para, citando o ID da regra>  
 19 +  
 20 +**Por quê:**  
 21 +  
 22 +**O que isso invalidou:** <requisitos, decisões técnicas, teste
+s que caíram>  
 23 +  
 24 +**Tasks afetadas:** <as que precisaram ser refeitas + as novas
+criadas>  
 25 +  
 26 +**Custo:** <quantos arquivos tocados, quanto tempo>  
 27 +  
 28 +---  
 29 +  
 30 +## D-001 — <título curto> · `<data>`  
 31 +  
 32 +**Gatilho:**  
 33 +  
 34 +**O que mudou na spec:**  
 35 +  
 36 +**Por quê:**  
 37 +  
 38 +**O que isso invalidou:**  
 39 +  
 40 +**Tasks afetadas:**  
 … 2 more lines (ctrl+o to expand)
⎿  Created specs/001-motor-reembolso/plan.md (+69 -0)
1 +# Plano Técnico — Motor de Cálculo de Reembolso  
 2 +  
 3 +**Versão:** 1.0 · **Baseado na spec:** 1.0  
 4 +  
 5 +> Aqui mora o COMO. Este arquivo pode e deve falar de linguagem
+, biblioteca e  
 6 +> arquitetura. O que ele **não** pode é introduzir regra de neg
+ócio nova — se  
 7 +> apareceu uma, ela pertence à `spec.md`.  
 8 +  
 9 +---  
 10 +  
 11 +## 1. Stack  
 12 +  
 13 +| Escolha | O quê | Por quê | O que descartei e por quê |  
 14 +|---|---|---|---|  
 15 +| Linguagem | | | |  
 16 +| Testes | | | |  
 17 +| Parsing/validação | | | |  
 18 +| Aritmética monetária | | | |  
 19 +  
 20 +<A linha de aritmética monetária não é decoração. Ponto flutuan
+te em dinheiro é  
 21 +a fonte de bug mais previsível deste projeto.>  
 22 +  
 23 +## 2. Arquitetura  
 24 +  
 25 +<Diagrama em blocos ou lista. Quais são as peças, o que cada um
+a faz, como  
 26 +conversam. Uma tela, não uma tese.>  
 27 +  
 28 +`                                                            
      29 +entrada JSON → <...> → <...> → saída JSON                      
      30 +`  
 31 +  
 32 +**Fronteiras:** <o que é núcleo de regra de negócio puro e o qu
+e é I/O. Onde  
 33 +essa linha está desenhada determina o quanto o sistema vai resi
+stir a mudança  
 34 +de requisito.>  
 35 +  
 36 +## 3. Modelo de dados  
 37 +  
 38 +<Estruturas internas. Como uma despesa é representada, como um
+resultado de  
 39 +avaliação é representado, o que carrega a justificativa.>  
 40 +  
 … 29 more lines (ctrl+o to expand)
⎿  Created specs/001-motor-reembolso/spec.md (+102 -0)
1 +# Spec — Motor de Cálculo de Reembolso  
 2 +  
 3 +**Versão:** 1.0 · **Status:** rascunho · **Última alteração:** + `<data>`  
 4 +  
 5 +> **Regra de ouro deste arquivo:** ele descreve o QUÊ e o PORQ
+UÊ. Nenhuma linha  
 6 +> aqui pode citar linguagem, biblioteca, classe, função ou est
+rutura de pasta.  
 7 +> Se apareceu solução, o lugar dela é o `plan.md`.  
 8 +>  
 9 +> **Teste de aceitação da própria spec:** uma pessoa que nunca + viu o projeto  
 10 +> consegue, lendo só este arquivo, verificar se o sistema está + correto?  
 11 +  
 12 +---  
 13 +  
 14 +## 1. Problema  
 15 +  
 16 +<Duas ou três frases. Quem sofre hoje, com o quê, e por quê is
+so custa caro.>  
 17 +  
 18 +## 2. Objetivo  
 19 +  
 20 +<Uma frase. O que passa a ser verdade quando isto existir.>  
 21 +  
 22 +## 3. Fora de escopo  
 23 +  
 24 +<Lista explícita. Este bloco vale ponto: ele impede o agente d
+e inventar feature  
 25 +e impede você de mover a trave depois.>  
 26 +  
 27 +- Não faz `<...>`  
 28 +- Não faz `<...>`  
 29 +  
 30 +## 4. Entrada e saída  
 31 +  
 32 +**Entrada:** conforme `exemplos/despesas-exemplo.json`. Campos + e significado:  
 33 +  
 34 +| Campo | Tipo | Significado | Obrigatório |  
 35 +|---|---|---|---|  
 36 +| | | | |  
 37 +  
 38 +**Saída:** definida por mim. Estrutura e significado de cada c
+ampo:  
 39 +  
 40 +| Campo | Tipo | Significado |  
 … 62 more lines (ctrl+o to expand)
⎿  … 1 more file changed

⏺ Fiz o commit 0edb069 chore: estrutura inicial a partir do template. Ele cria 6
arquivos a partir do template: CLAUDE.md, specs/001-motor-reembolso/
(spec.md, plan.md, tasks.md, DECISIONS.md) e docs/RELATORIO.md.

Duas observações:

- Ainda não dei push. Se quiser subir já para o fork, é só rodar git push. Eu
  também posso fazer isso.
- A pasta docs/sessions/ ainda não existe, porque o git não guarda pasta
  vazia. Ela passa a existir quando você salvar o primeiro /export nela.

O próximo passo é percorrer o exemplos/despesas-exemplo.json contra a política
e levantar as ambiguidades antes de escrever a spec.md. Quer fazer isso
agora? Você decide cada interpretação e eu questiono e registro.

❯ sim

⏺ Bash(python3 -c "
import json;d=json.load(open('exemplos/despesas-exemplo.json'))…)
⎿  (No output)

⏺ Fiz a varredura. São 14 despesas, competência 2026-07, período de 01/07 a
31/07. A tabela mostra o que cada item provoca e, abaixo, as perguntas que só
você pode decidir.

O que cada item provoca

┌──────────┬──────────────────────┬──────────────────────────────────────┐
│ Item │ Dados │ Pergunta que ele levanta │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ d-001 + │ Alimentação no mesmo │ O limite de R$ 60 é por despesa ou │
│ d-002 │ dia: 72,50 + 38,00 │ pela soma do dia? Se for pela soma, │
│ │ │ qual item é cortado? │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ d-001, │ 72,50 e 61,00 em │ "Reembolso parcial" significa pagar │
│ d-014 │ alimentação │ até o limite ou recusar o item? │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ Transporte: 100,00 e │ R$ 100,00 exato exige nota? A regra │
│ d-003 / │ 100,01, sem nota │ olha o valor do item ou a soma do │
│ d-004 │ fiscal, no mesmo dia │ dia? O que acontece sem nota: recusa │
│ │ │ tudo ou paga até 100? │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ │ Categoria fora da política, recusa │
│ d-005 │ coworking │ clara. Falta definir como isso │
│ │ │ aparece na saída. │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ Almoço idêntico: │ O que define uma duplicata? O que o │
│ d-006 / │ mesma data, │ sistema faz com ela: recusa a │
│ d-007 │ fornecedor, valor e │ segunda, recusa as duas ou só │
│ │ descrição │ sinaliza? │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ Data em abril, │ "Lançada dentro do período": a │
│ d-008 │ competência julho │ entrada não tem data de lançamento, │
│ │ │ só a data da despesa. │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ d-009 │ Valor −45,00 │ O sistema ignora, recusa, abate do │
│ │ (estorno) │ dia ou abate do período? │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ Hospedagem: 480 por │ O número de diárias só aparece na │
│ d-010 │ "2 diárias", só a │ descrição em texto livre. │
│ │ data de entrada │ │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ Hospedagem: 690 por │ A regra de nota vale para o total │
│ d-013 │ "3 noites", sem nota │ (690) ou para cada diária (230)? │
│ │ fiscal │ │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ │ Arredonda quando (por item ou no │
│ d-011 │ 33,333 │ total) e como (meio para cima ou │
│ │ │ meio para o par)? │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ d-010, │ Hospedagem no Rio + │ O que significa "em viagem"? Não │
│ d-011, │ café no hotel │ existe campo para isso na entrada. │
│ d-013 │ │ │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ d-012 │ Sábado, plantão │ Fim de semana conta? A política não │
│ │ │ diz nada. │
├──────────┼──────────────────────┼──────────────────────────────────────┤
│ │ ALIMENTACAO em │ A categoria é normalizada ou tratada │
│ d-014 │ maiúsculas, dia │ como desconhecida? O último dia do │
│ │ 31/07 │ período entra (fronteira inclusiva)? │
└──────────┴──────────────────────┴──────────────────────────────────────┘

Decisões que preciso de você

Responda em qualquer formato, por exemplo "1B, 2A, ...":

1. Unidade do limite diário: (A) por despesa ou (B) soma por dia e categoria.
   Se for B, como o corte é distribuído: proporcionalmente entre os itens ou
   na ordem de lançamento?
2. Reembolso parcial: (A) paga até o limite e corta o excedente ou (B) recusa
   o item.
3. Nota fiscal:
   - (a) A exigência vale para valor > 100 ou ≥ 100?
   - (b) Compara com o valor do item ou com o total do dia?
   - (c) Sem nota: recusa o item inteiro ou paga até R$ 100?
   - (d) Na hospedagem, compara com o total ou com o valor de cada diária?
4. Ordem de aplicação: a regra de nota fiscal vem antes ou depois do corte por
   limite? Por exemplo, d-004 tem 100,01 sem nota e limite de 80.
5. Duplicata:
   - Quais campos idênticos caracterizam duplicata (data, categoria,
     fornecedor, valor, descrição)?
   - Qual a ação: recusa a segunda, recusa as duas ou só sinaliza e paga?
6. Competência: sem data de lançamento, a regra vira "a data da despesa deve
   estar entre início e fim, inclusive"? E o que acontece fora do período:
   recusa ou ignora?
7. Valores negativos: ignora, recusa como inválido, abate do limite do dia ou
   abate do total do período?
8. Número de diárias:
   - (A) extrai da descrição
   - (B) trata sempre como 1 diária
   - (C) recusa o item ou marca para revisão manual
9. "Em viagem":
   - (A) nunca aplica a ampliação, porque o dado não existe
   - (B) considera em viagem nos dias cobertos por uma hospedagem
   - (C) outra regra
10. Arredondamento: em que momento e qual método.
11. Categoria: normaliza maiúsculas e minúsculas? E fim de semana tem alguma
    restrição?

Assim que você decidir, registro cada resposta como AMB-00X na seção 6 da
spec.md, com o texto do RH, as leituras possíveis, a decisão e uma linha de
justificativa. Se você responder só a letra, eu proponho a justificativa e
você revisa.

❯ Não entendi. aqui estou definindo as regras de negócio?

⏺ Sim, é exatamente isso. Neste desafio, você faz o papel de quem transforma a
política vaga do RH em regras precisas.

Por que você precisa decidir

O RH escreveu, por exemplo, "Alimentação tem limite de R$ 60 por dia". Parece
claro, mas veja a despesa d-001 + d-002 do arquivo de exemplo:

- Dia 03/07: almoço de R$ 72,50 e jantar de R$ 38,00.

Quanto o colaborador recebe? Depende de como se lê a frase:

┌────────────────────────┬────────────────────────────────────┬───────────┐
│ Leitura │ Cálculo │ Reembolso │
├────────────────────────┼────────────────────────────────────┼───────────┤
│ Limite por despesa │ almoço cortado para 60 + jantar 38 │ R$ 98,00 │
├────────────────────────┼────────────────────────────────────┼───────────┤
│ Limite pela soma do │ 72,50 + 38 = 110,50, cortado para │ R$ 60,00 │
│ dia │ 60 │ │
└────────────────────────┴────────────────────────────────────┴───────────┘

As duas leituras são razoáveis e dão resultados diferentes. O programador não
tem como saber qual é a certa, e o RH não está disponível para responder.
Então você decide, escreve na spec e justifica. Por exemplo: "Limite pela soma
do dia, porque a política diz 'por dia', não 'por refeição'."

Como isso entra na spec

Cada decisão vira dois registros:

- Uma ambiguidade registrada (AMB-001): o que estava confuso, as leituras
  possíveis, o que você escolheu e por quê.
- Uma regra de negócio precisa (RN-001): o enunciado final, sem margem para
  interpretação, com um exemplo numérico que serve de teste.

Depois, o código só implementa o que a spec diz. Ninguém precisa "achar" nada.

O que a correção avalia

Não existe resposta certa. Se você escolher "por despesa" e justificar, ganha
a mesma nota de quem escolheu "por dia". O que perde ponto é deixar a decisão
implícita dentro do código.

---

A lista que mandei antes eram justamente essas perguntas, umas 11. Como foram
muitas de uma vez, proponho irmos uma por uma: eu mostro o caso com números,
como fiz acima, você escolhe, e eu registro na spec.

Começamos por esta: o limite de R$ 60 vale por despesa ou pela soma do dia?
❯ Pela soma do dia

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 6 lines, removed 6 lines
63 > Uma ambiguidade que você resolveu no código sem registrar aqu
i conta como
64 > não resolvida.
65  
 66 -### AMB-001 — <o que a política deixou em aberto>  
 66 +### AMB-001 — Unidade de aplicação do limite diário  
 67  
 68 -**Texto original do RH:** "<citação literal>"  
 69 -**O que não está claro:** <as duas ou mais leituras possíveis>
70 -**Decisão:** <o que o sistema faz>  
 71 -**Justificativa:** <por quê — uma linha; critério de negócio, n
-ão de conveniência técnica>  
 72 -**Regra afetada:** RN-00X  
 68 +**Texto original do RH:** "Alimentação tem limite de R$ 60 por
+dia." / "Transporte urbano tem limite de R$ 80 por dia."  
 69 +**O que não está claro:** o limite pode valer (a) para cada des
+pesa isoladamente ou (b) para a soma das despesas do mesmo dia. + Exemplo: d-001 (R$ 72,50) + d-002 (R$ 38,00) em 03/07 resultam + em R$ 98,00 na leitura (a) e R$ 60,00 na leitura (b).  
 70 +**Decisão:** o limite se aplica à **soma das despesas de uma me
+sma categoria numa mesma data**. Categorias diferentes no mesmo + dia têm limites independentes.  
 71 +**Justificativa:** a política diz "por dia", não "por despesa"
+ou "por refeição"; ler como por despesa permitiria multiplicar
+o teto fracionando gastos.  
 72 +**Regra afetada:** RN-001 (a definir)  
 73  
 74 ### AMB-002 — ...
75

⏺ Registrei a decisão como AMB-001 na seção 6 de spec.md
(specs/001-motor-reembolso/spec.md). Revise duas coisas que acrescentei:

- Justificativa: "a política diz 'por dia', não 'por despesa'; ler como por
  despesa permitiria multiplicar o teto fracionando gastos." Se quiser outra
  justificativa, me diga.
- "Por categoria": deixei explícito que alimentação e transporte no mesmo dia
  têm limites separados. A política não diz isso com todas as letras, mas me
  pareceu implícito. Confirma?

Ainda não fiz commit. Vou acumular algumas decisões e commitar juntas como
docs(spec): ....

---

Próxima pergunta: como dividir o corte entre os itens do dia

Sua decisão gera uma consequência. No dia 03/07 o dia inteiro recebe R$ 60,
mas a saída precisa dizer quanto de cada despesa foi reembolsado:

┌────────────┬────────┬────────────────┬─────────────────┬────────────────┐
│ Despesa │ Valor │ (A) │ (B) Ordem do │ (C) Menor │
│ │ │ Proporcional │ arquivo │ primeiro │
├────────────┼────────┼────────────────┼─────────────────┼────────────────┤
│ d-001 │ 72,50 │ 39,37 │ 60,00 │ 22,00 │
│ almoço │ │ │ │ │
├────────────┼────────┼────────────────┼─────────────────┼────────────────┤
│ d-002 │ 38,00 │ 20,63 │ 0,00 │ 38,00 │
│ jantar │ │ │ │ │
├────────────┼────────┼────────────────┼─────────────────┼────────────────┤
│ Total │ 110,50 │ 60,00 │ 60,00 │ 60,00 │
└────────────┴────────┴────────────────┴─────────────────┴────────────────┘

- (A) Proporcional: cada item recebe a mesma fração (60 ÷ 110,50 ≈ 54,3%). É o
  mais "justo", mas cria centavos quebrados e exige uma regra de
  arredondamento.
- (B) Ordem do arquivo: os itens vão sendo pagos na ordem em que aparecem até
  o limite acabar. É simples de explicar, mas o resultado muda se alguém
  reordenar o arquivo.
- (C) Menor primeiro: paga integralmente os itens menores e corta o maior.
  Fica estável e maximiza o número de itens pagos por inteiro.

O total do dia é igual nos três casos. Muda apenas a justificativa por item na
saída.

Qual você escolhe?

❯ <ide_opened_file>The user opened the file ~/Documents
/dev.nosync/sdd-desafio/specs/001-motor-reembolso/spec.md in the IDE. This
may or may not be related to the current task.</ide_opened_file>

❯ c

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
71 **Justificativa:** a política diz "por dia", não "por despesa"
ou "por refeição"; ler como por despesa permitiria multiplicar
o teto fracionando gastos.
72 **Regra afetada:** RN-001 (a definir)
73  
 74 +### AMB-002 — Distribuição do limite diário entre as despesas d
+o dia  
 75 +  
 76 +**Texto original do RH:** (silêncio) — consequência de AMB-001.
77 +**O que não está claro:** quando a soma do dia excede o limite, + o valor reembolsado precisa ser atribuído a cada despesa. Leit
+uras possíveis: (a) proporcional ao valor de cada item, (b) na
+ordem em que aparecem na entrada, (c) dos menores para os maior
+es. Exemplo em 03/07 (limite R$ 60): (a) d-001 R$ 39,37 / d-002 + R$ 20,63; (b) d-001 R$ 60,00 / d-002 R$ 0,00; (c) d-001 R$ 22,
+00 / d-002 R$ 38,00.  
 78 +**Decisão:** o limite é consumido **do menor valor para o maior +**. Em caso de valores iguais, desempata pelo `id` em ordem cre
+scente. O último item a caber recebe apenas o saldo restante do + limite.  
 79 +**Justificativa:** maximiza a quantidade de despesas pagas inte
+gralmente e o resultado não depende da ordem em que as despesas + foram lançadas.  
 80 +**Regra afetada:** RN-001 (a definir)  
 81 +  
 82 ### AMB-002 — ...
83  
 84 <A política tem no mínimo oito. Se você achou menos, releia

⏺ Registrei como AMB-002. Acrescentei uma regra de desempate que você precisa
confirmar: se dois itens tiverem o mesmo valor, o de menor id é pago primeiro.
Sem ela, a regra fica indefinida para valores iguais. Isso acontece
justamente em d-006 e d-007, ambos de R$ 54,90.

---

Próxima pergunta: o que significa "reembolsadas parcialmente"

A política diz: "Despesas acima do limite são reembolsadas parcialmente." A
tabela da pergunta anterior já supunha que o excedente é cortado, mas há outra
leitura possível:

┌───────────────────────┬─────────────────────────┬───────────────────────┐
│ Caso │ (A) Paga até o limite, │ (B) Recusa o item que │
│ │ corta o excedente │ estoura o limite │
├───────────────────────┼─────────────────────────┼───────────────────────┤
│ d-014: jantar de R$ │ recebe R$ 60,00 │ recebe R$ 0,00 │
│ 61,00 sozinho no dia │ │ │
├───────────────────────┼─────────────────────────┼───────────────────────┤
│ 03/07: d-002 (38) + │ 38 + 22 = R$ 60,00 │ 38 + 0 = R$ 38,00 │
│ d-001 (72,50) │ │ │
└───────────────────────┴─────────────────────────┴───────────────────────┘

- (A) segue a palavra "parcialmente" ao pé da letra: o colaborador recebe até
  o teto.
- (B) é mais rígida. "Parcialmente" passaria a se referir ao conjunto de
  despesas, não ao item. É uma leitura forçada, mas existe.

Qual você escolhe?

❯ <ide_opened_file>The user opened the file ~/Documents
/dev.nosync/sdd-desafio/specs/001-motor-reembolso/spec.md in the IDE. This
may or may not be related to the current task.</ide_opened_file>

❯ o exercicio pede para que cada decisao seja commitada separadamente? ou
fazemos um pacote com as regras?

⏺ O exercício não exige um commit por decisão. A rubrica só pede uma
granularidade razoável: "não 3 commits gigantes, não 200 micro-commits".

Minha recomendação é um commit por grupo de decisões relacionadas. Por
exemplo:

- docs(spec): resolve ambiguidades de limite diário (unidade, distribuição,
  reembolso parcial) → AMB-001 a 003
- docs(spec): resolve ambiguidades de nota fiscal
- docs(spec): resolve ambiguidades de período, duplicatas e estornos
- docs(spec): define schema de saída e ordem de aplicação

Assim a spec v1 sai em uns 4 a 6 commits, e isso tem duas vantagens:

1. Relatório, seção "Descrição": ela pede a primeira versão de um requisito e
   a versão final, "provada com o histórico do arquivo". Commits por tema
   facilitam mostrar essa evolução.
2. Datas dos commits: a correção confere se a ordem foi spec → plan → tasks →
   código. Commits de spec espalhados ao longo da manhã mostram que você
   especificou de verdade.

Uma distinção importante: enquanto a spec v1 está sendo escrita, não é preciso
registrar cada decisão no DECISIONS.md. Ele serve para registrar mudanças
depois que a spec estiver "fechada": quando você revisar uma decisão durante a
implementação, e principalmente no envelope do Dia 2. A partir daí, cada
mudança ganha uma entrada no DECISIONS.md e o seu próprio commit.

Plano imediato: você responde a pergunta do reembolso parcial (A ou B), eu
registro como AMB-003 e faço o commit do grupo "limite diário" com as três
decisões. Qual você escolhe?

❯ A

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines, removed 4 lines
47  
 48 Cada regra recebe um ID (`RN-001`, ...). As tasks vão referenci
ar esses IDs.
49  
 50 -### RN-001 — <nome da regra>  
 50 +### RN-001 — Limite diário por categoria (alimentação e transpo
+rte urbano)  
 51  
 52 -**Regra:** <enunciado sem ambiguidade>  
 53 -**Origem:** política do RH, item `<n>`  
 54 -**Aceite:** <como verificar que está implementada — normalmente - um caso concreto com números>  
 52 +**Regra:** para cada combinação de data e categoria, soma-se o
+valor das despesas elegíveis (ver seção 8). Limites: alimentaçã
+o R$ 60,00; transporte urbano R$ 80,00. Se a soma for menor ou
+igual ao limite, todas as despesas do grupo são reembolsadas in
+tegralmente. Se exceder, o limite é distribuído do menor valor
+para o maior (desempate por `id` crescente): cada despesa receb
+e o seu valor integral enquanto houver saldo, a que não couber
+inteira recebe apenas o saldo restante e as seguintes recebem R
+$ 0,00. Despesas com reembolso menor que o valor original são m
+arcadas como reembolsadas parcialmente, com o motivo "limite di
+ário excedido".  
 53 +**Origem:** política do RH, itens 1, 2 e 4. Decisões AMB-001, A
+MB-002, AMB-003.  
 54 +**Aceite:**  
 55 +- Alimentação em 03/07: d-001 (R$ 72,50) e d-002 (R$ 38,00) → d
+-002 recebe R$ 38,00, d-001 recebe R$ 22,00 (parcial); total do + dia R$ 60,00.  
 56 +- Uma única despesa de alimentação de R$ 61,00 no dia → recebe
+R$ 60,00 (parcial).  
 57 +- Uma única despesa de alimentação de R$ 60,00 no dia → recebe
+R$ 60,00 (integral).  
 58 +- Alimentação R$ 50,00 e transporte R$ 70,00 na mesma data → am
+bas integrais (limites independentes).  
 59  
 60 ### RN-002 — ...
61

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 9 lines, removed 1 line
81 **O que não está claro:** quando a soma do dia excede o limite,
o valor reembolsado precisa ser atribuído a cada despesa. Leit
uras possíveis: (a) proporcional ao valor de cada item, (b) na
ordem em que aparecem na entrada, (c) dos menores para os maior
es. Exemplo em 03/07 (limite R$ 60): (a) d-001 R$ 39,37 / d-002
R$ 20,63; (b) d-001 R$ 60,00 / d-002 R$ 0,00; (c) d-001 R$ 22,
00 / d-002 R$ 38,00.
82 **Decisão:** o limite é consumido **do menor valor para o maior
**. Em caso de valores iguais, desempata pelo `id` em ordem cre
scente. O último item a caber recebe apenas o saldo restante do
limite.
83 **Justificativa:** maximiza a quantidade de despesas pagas inte
gralmente e o resultado não depende da ordem em que as despesas
foram lançadas.
84 -**Regra afetada:** RN-001 (a definir)  
 84 +**Regra afetada:** RN-001  
 85  
 86 +### AMB-003 — Significado de "reembolsadas parcialmente"  
 87 +  
 88 +**Texto original do RH:** "Despesas acima do limite são reembol
+sadas parcialmente."  
 89 +**O que não está claro:** (a) paga-se até o limite e corta-se a
+penas o excedente, ou (b) a despesa que ultrapassa o limite é r
+ecusada inteira. Exemplo: um jantar de R$ 61,00 sozinho no dia
+recebe R$ 60,00 em (a) e R$ 0,00 em (b).  
 90 +**Decisão:** paga-se **até o limite**; apenas o excedente é cor
+tado.  
 91 +**Justificativa:** é a leitura literal de "parcialmente"; recus
+ar o item inteiro seria "não reembolsadas".  
 92 +**Regra afetada:** RN-001  
 93 +  
 94 ### AMB-002 — ...
95  
 96 <A política tem no mínimo oito. Se você achou menos, releia

⏺ Bash(sed -i '' 's/^\*\*Regra afetada:\*\* RN-001 (a definir)$/**Regra
      afetada:** RN-001/' specs/001-motor-reembolso/spec.md && grep -n "a
      definir" specs/001-motor-re…)
  ⎿  Updated specs/001-motor-reembolso/spec.md (+1 -1)
      73  **O que não está claro:** o limite pode valer (a) para cada des
          pesa isoladamente ou (b) para a soma das despesas do mesmo dia.
           Exemplo: d-001 (R$ 72,50) + d-002 (R$ 38,00) em 03/07 resultam
em R$ 98,00 na leitura (a) e R$ 60,00 na leitura (b).
74 **Decisão:** o limite se aplica à **soma das despesas de uma me
sma categoria numa mesma data**. Categorias diferentes no mesmo
dia têm limites independentes.
75 **Justificativa:** a política diz "por dia", não "por despesa"
ou "por refeição"; ler como por despesa permitiria multiplicar
o teto fracionando gastos.
76 -**Regra afetada:** RN-001 (a definir)  
 76 +**Regra afetada:** RN-001  
 77  
 78 ### AMB-002 — Distribuição do limite diário entre as despesas d
o dia
79

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): resolve ambiguidades de limite diário (unidade, distribuição,
reembolso parcial)…)
⎿  (No output)

⏺ Registrei a decisão como AMB-003 e fiz o commit 4d526c1 docs(spec): resolve
ambiguidades de limite diário (...).

Esse commit também inclui a RN-001, a regra de negócio "limpa" que junta as
três decisões, com 4 casos de aceite numéricos que depois viram testes. Vale
você ler em spec.md (specs/001-motor-reembolso/spec.md). Ela menciona
"despesas elegíveis (ver seção 8)" porque duplicatas, estornos e despesas fora
do período ainda vão ser decididos e podem excluir itens da soma.

---

Próximo grupo: nota fiscal

A política diz: "Nota fiscal é obrigatória acima de R$ 100." No exemplo há
duas corridas no dia 06/07, ambas sem nota:

┌─────────┬────────┬─────────────┐
│ Despesa │ Valor │ Exige nota? │
├─────────┼────────┼─────────────┤
│ d-003 │ 100,00 │ ? │
├─────────┼────────┼─────────────┤
│ d-004 │ 100,01 │ ? │
└─────────┴────────┴─────────────┘

Pergunta 1 (fronteira): R$ 100,00 exatos exige nota?

- (A) Não. "Acima de 100" significa estritamente maior que 100. d-003 não
  exige nota e d-004 exige.
- (B) Sim. O limite é inclusivo (≥ 100). As duas exigem nota.

Responda essa primeiro. Depois vêm mais duas perguntas do mesmo grupo: se a
regra olha o item ou a soma do dia, e o que acontece quando falta a nota.

❯ A

Searched for 1 pattern, read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 7 lines, removed 1 line
91 **Justificativa:** é a leitura literal de "parcialmente"; recu
sar o item inteiro seria "não reembolsadas".
92 **Regra afetada:** RN-001
93  
 94 -### AMB-002 — ...  
 94 +### AMB-004 — Fronteira de "acima de R$ 100" para nota fiscal
95  
 96 +**Texto original do RH:** "Nota fiscal é obrigatória acima de
+R$ 100."  
 97 +**O que não está claro:** se uma despesa de exatamente R$ 100,
+00 exige nota. Exemplo: d-003 (R$ 100,00) e d-004 (R$ 100,01), + ambas sem nota.  
 98 +**Decisão:** a nota é exigida apenas quando o valor é **estrit
+amente maior que R$ 100,00**. R$ 100,00 não exige; R$ 100,01 e
+xige.  
 99 +**Justificativa:** "acima de" em português indica comparação e
+strita; se o RH quisesse incluir 100 teria escrito "a partir d
+e".  
 100 +**Regra afetada:** RN-002 (a definir)  
 101 +  
 102 <A política tem no mínimo oito. Se você achou menos, releia
103 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
104

⏺ Registrei como AMB-004: a nota só é exigida acima de R$ 100,00, então d-003
não precisa de nota e d-004 precisa.

---

Pergunta 2 do grupo: a regra de nota olha o item ou a soma do dia?

Já que o limite é pela soma do dia (AMB-001), surge a dúvida se a nota também
é exigida pela soma. Veja um caso hipotético:

┌───────┬─────────────────────────────────────┬────────┐
│ Dia │ Despesas de transporte, sem nota │ Soma │
├───────┼─────────────────────────────────────┼────────┤
│ 10/07 │ corrida de R$ 60 + corrida de R$ 55 │ R$ 115 │
└───────┴─────────────────────────────────────┴────────┘

- (A) Por item: nenhuma das duas passa de 100, então nenhuma exige nota. A
  regra de nota é sobre o comprovante de uma compra.
- (B) Pela soma do dia na categoria: o dia passou de 100, então todas as
  despesas daquele dia e categoria exigem nota. Isso impede fracionar uma
  despesa grande em várias pequenas para escapar da exigência.

No exemplo real, d-003 e d-004 (dia 06/07) somam 200,01. Em (A), só d-004
exige nota. Em (B), as duas exigem.

Qual você escolhe?

❯ a

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
99 **Justificativa:** "acima de" em português indica comparação e
strita; se o RH quisesse incluir 100 teria escrito "a partir d
e".
100 **Regra afetada:** RN-002 (a definir)
101  
 102 +### AMB-005 — Unidade de aplicação da exigência de nota fiscal
103 +  
 104 +**Texto original do RH:** "Nota fiscal é obrigatória acima de
+R$ 100."  
 105 +**O que não está claro:** se o valor comparado é (a) o de cada + despesa individualmente ou (b) a soma das despesas da mesma c
+ategoria no dia, como ocorre com o limite (AMB-001). Exemplo:
+d-003 (R$ 100,00) + d-004 (R$ 100,01) em 06/07 somam R$ 200,01 + — em (a) só d-004 exige nota; em (b) ambas.  
 106 +**Decisão:** a exigência é avaliada **por despesa**, comparand
+o o valor original de cada uma, independentemente das demais d
+o dia.  
 107 +**Justificativa:** nota fiscal é o comprovante de uma compra e
+specífica; a soma do dia não corresponde a nenhum documento qu
+e o colaborador possa apresentar.  
 108 +**Regra afetada:** RN-002 (a definir)  
 109 +  
 110 <A política tem no mínimo oito. Se você achou menos, releia
111 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
112

⏺ Registrei como AMB-005. Um detalhe que escrevi e que você precisa confirmar: a
comparação usa o valor original da despesa, não o valor que sobra depois do
corte pelo limite diário. Por exemplo, d-004 custou 100,01. Mesmo que o limite
de transporte reduza o pagamento para no máximo 80, ela continua exigindo
nota, porque a compra foi de 100,01.

---

Pergunta 3 do grupo: o que acontece quando falta a nota exigida?

Caso real: d-004, corrida de R$ 100,01 sem nota, no dia 06/07, junto com d-003
(R$ 100,00, sem nota, que não precisa de nota).

┌─────────────────┬─────────────────────────────────┬────────────────────┐
│ Opção │ O que acontece com d-004 │ Dia 06/07 (limite │
│ │ │ de transporte 80) │
├─────────────────┼─────────────────────────────────┼────────────────────┤
│ (A) Recusa a │ R$ 0,00, motivo "nota fiscal │ só d-003 conta → │
│ despesa inteira │ ausente" │ paga 80 │
├─────────────────┼─────────────────────────────────┼────────────────────┤
│ (B) Paga até R$ │ a parte acima de 100 é glosada; │ d-003 + d-004 │
│ 100 │ a despesa entra no limite │ (100) → paga 80 │
│ │ valendo 100 │ │
├─────────────────┼─────────────────────────────────┼────────────────────┤
│ (C) Fica │ não é paga nem recusada; sai │ só d-003 conta → │
│ pendente │ marcada "aguardando nota" │ paga 80 │
└─────────────────┴─────────────────────────────────┴────────────────────┘

Neste exemplo o total do dia dá 80 nas três opções, porque o limite já corta
tudo, mas em outros casos o resultado muda.

- (A) é a leitura direta de "obrigatória": sem nota, não paga. É simples e
  auditável.
- (B) é uma leitura generosa e mais difícil de defender.
- (C) é a mais realista para o financeiro, mas cria um terceiro estado na
  saída (além de aprovado e recusado), e isso complica o sistema.

Qual você escolhe?

❯ existe alguma regra nas regras que fala em ate quanto tempo a NF deve ser
enviada?

⏺ Não existe. A política tem só 9 itens e nenhum fala de prazo para entregar a
nota. A entrada também não ajuda: cada despesa traz apenas tem_nota_fiscal:
true/false, sem data de envio da nota nem status de "nota pendente".

Isso pesa na escolha entre as opções:

- A (C) "pendente" pressupõe que a nota pode chegar depois. Sem prazo
  definido, a despesa ficaria pendente para sempre, e você teria de inventar
  um prazo que o RH nunca deu. Isso tiraria o sistema do papel de calcular e o
  colocaria no de gerenciar um fluxo.
- A (A) "recusa" encaixa bem na ausência de prazo. O motor avalia a situação
  no momento do cálculo: sem nota agora, recusa. Se a nota chegar depois, o
  colaborador relança a despesa e o cálculo é refeito.

A sua pergunta vale ser registrada na spec independentemente da escolha. Ela
pode entrar em "Fora de escopo" ("o sistema não controla prazo de entrega de
nota fiscal nem reprocessa despesas automaticamente") ou na seção "O que fica
em aberto". Notar uma lacuna dessas é justamente o tipo de coisa que a rubrica
valoriza.

Então: (A) recusa, (B) paga até R$ 100 ou (C) pendente?
❯ a

Read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 12 lines, removed 1 line
57 - Uma única despesa de alimentação de R$ 60,00 no dia → recebe
R$ 60,00 (integral).
58 - Alimentação R$ 50,00 e transporte R$ 70,00 na mesma data → am
bas integrais (limites independentes).
59  
 60 -### RN-002 — ...  
 60 +### RN-002 — Nota fiscal obrigatória acima de R$ 100,00  
 61  
 62 +**Regra:** toda despesa cujo valor original seja estritamente m
+aior que R$ 100,00 e que não tenha nota fiscal é **recusada int
+egralmente** (reembolso R$ 0,00), com o motivo "nota fiscal aus
+ente". Despesas com valor menor ou igual a R$ 100,00 não exigem + nota. A avaliação é feita por despesa, sem considerar as demai
+s do dia. Uma despesa recusada por esta regra não consome o lim
+ite diário (RN-001).  
 63 +**Origem:** política do RH, item 5. Decisões AMB-004, AMB-005,
+AMB-006.  
 64 +**Aceite:**  
 65 +- d-003: transporte R$ 100,00 sem nota → não exige nota; segue
+para o limite diário.  
 66 +- d-004: transporte R$ 100,01 sem nota → recusada, R$ 0,00, mot
+ivo "nota fiscal ausente".  
 67 +- Dia 06/07 (d-003 + d-004): apenas d-003 entra no limite de tr
+ansporte → d-003 recebe R$ 80,00 (parcial); total do dia R$ 80,
+00.  
 68 +- Transporte R$ 60,00 + R$ 55,00 no mesmo dia, ambas sem nota → + nenhuma exige nota; soma R$ 115,00 → limite de R$ 80,00 distri
+buído conforme RN-001.  
 69 +- Despesa de R$ 150,00 com nota → não é recusada por esta regra
+.  
 70 +  
 71 +### RN-003 — ...  
 72 +  
 73 ---
74  
 75 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 9 lines, removed 1 line
116 **O que não está claro:** se o valor comparado é (a) o de cada
despesa individualmente ou (b) a soma das despesas da mesma c
ategoria no dia, como ocorre com o limite (AMB-001). Exemplo:
d-003 (R$ 100,00) + d-004 (R$ 100,01) em 06/07 somam R$ 200,01
— em (a) só d-004 exige nota; em (b) ambas.
117 **Decisão:** a exigência é avaliada **por despesa**, comparand
o o valor original de cada uma, independentemente das demais d
o dia.
118 **Justificativa:** nota fiscal é o comprovante de uma compra e
specífica; a soma do dia não corresponde a nenhum documento qu
e o colaborador possa apresentar.
119 -**Regra afetada:** RN-002 (a definir)  
 119 +**Regra afetada:** RN-002  
 120  
 121 +### AMB-006 — Consequência da ausência de nota fiscal exigida
122 +  
 123 +**Texto original do RH:** "Nota fiscal é obrigatória acima de
+R$ 100."  
 124 +**O que não está claro:** o que acontece com a despesa sem not
+a: (a) é recusada inteira, (b) é paga até R$ 100,00 e o excede
+nte glosado, ou (c) fica pendente aguardando a nota. A polític
+a também não define prazo para entrega da nota, e a entrada só + informa se a nota existe (sim/não).  
 125 +**Decisão:** a despesa é **recusada integralmente** e não cons
+ome o limite diário da categoria.  
 126 +**Justificativa:** "obrigatória" significa condição para o ree
+mbolso; sem prazo definido pelo RH, um estado "pendente" não t
+eria fim — o motor avalia a situação no momento do cálculo.  
 127 +**Regra afetada:** RN-002  
 128 +  
 129 <A política tem no mínimo oito. Se você achou menos, releia
130 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
131

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 1 line, removed 1 line
24 <Lista explícita. Este bloco vale ponto: ele impede o agente de
inventar feature
25 e impede você de mover a trave depois.>
26  
 27 +- Não controla prazo de entrega de nota fiscal nem mantém despe
+sas em estado "pendente"; uma despesa recusada por falta de not
+a só é reavaliada se for lançada novamente em um novo cálculo (
+AMB-006).  
 28 - Não faz `<...>`
28 -- Não faz `<...>`  
 29  
 30 ## 4. Entrada e saída
31

⏺ Bash(sed -i '' 's/^\*\*Regra afetada:\*\* RN-002 (a definir)$/**Regra
      afetada:** RN-002/' specs/001-motor-reembolso/spec.md && grep -c "a
      definir" specs/001-motor-re…)
  ⎿  Updated specs/001-motor-reembolso/spec.md (+1 -1)
      108  **O que não está claro:** se uma despesa de exatamente R$ 100,
00 exige nota. Exemplo: d-003 (R$ 100,00) e d-004 (R$ 100,01),
ambas sem nota.
109 **Decisão:** a nota é exigida apenas quando o valor é **estrit
amente maior que R$ 100,00**. R$ 100,00 não exige; R$ 100,01 e
xige.
110 **Justificativa:** "acima de" em português indica comparação e
strita; se o RH quisesse incluir 100 teria escrito "a partir d
e".
111 -**Regra afetada:** RN-002 (a definir)  
 111 +**Regra afetada:** RN-002  
 112  
 113 ### AMB-005 — Unidade de aplicação da exigência de nota fiscal
114

⏺ Registrei como AMB-006, escrevi a RN-002 com 5 casos de aceite e acrescentei o
item de fora de escopo sobre o prazo da nota. Fiz o commit 28a7c13
docs(spec): resolve ambiguidades de nota fiscal (...).

Ficou definido na RN-002 que uma despesa recusada não consome o limite do dia.
Foi o que a tabela da pergunta anterior assumia: no dia 06/07 só d-003 conta
e recebe 80.

Até agora são 6 ambiguidades resolvidas.

---

Próximo grupo: período, duplicatas e estornos

Pergunta: período de competência

A política diz: "Despesas devem ser lançadas dentro do período de
competência." O período do exemplo é competência 2026-07, de 01/07 a 31/07.

┌─────────┬───────┬──────────────────────────────────────┐
│ Despesa │ Data │ Situação │
├─────────┼───────┼──────────────────────────────────────┤
│ d-008 │ 15/04 │ "Almoço de abril lançado com atraso" │
├─────────┼───────┼──────────────────────────────────────┤
│ d-014 │ 31/07 │ último dia do período │
└─────────┴───────┴──────────────────────────────────────┘

O problema é que "lançadas" se refere à data em que alguém registrou a despesa
no sistema, e a entrada não tem esse campo. Só existe data, que é a data em
que a despesa aconteceu. A própria descrição de d-008 diz que ela foi lançada
com atraso, o que sugere que o lançamento ocorreu em julho e a despesa em
abril.

- (A) Usar a data da despesa: ela precisa estar entre inicio e fim, inclusive.
  d-008 é recusada e d-014 é aceita.
- (B) Considerar que tudo o que veio neste arquivo foi lançado dentro do
  período e aceitar d-008. Nesse caso a regra 7 nunca recusaria nada, porque
  não há como verificá-la.

Se for (A), há uma subpergunta: a despesa fora do período é (A1) recusada e
aparece na saída com o motivo ou (A2) simplesmente ignorada (não aparece na
saída)?

❯ a e a1

Searched for 1 pattern, read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 11 lines, removed 1 line
68 - Transporte R$ 60,00 + R$ 55,00 no mesmo dia, ambas sem nota →
nenhuma exige nota; soma R$ 115,00 → limite de R$ 80,00 distri
buído conforme RN-001.
69 - Despesa de R$ 150,00 com nota → não é recusada por esta regra
.
70  
 71 -### RN-003 — ...  
 71 +### RN-003 — Período de competência  
 72  
 73 +**Regra:** uma despesa só é elegível se a sua `data` estiver en
+tre `periodo.inicio` e `periodo.fim`, **ambos inclusive**. Desp
+esas fora desse intervalo são **recusadas integralmente** (reem
+bolso R$ 0,00), aparecem na saída com o motivo "fora do período + de competência" e não consomem limite diário.  
 74 +**Origem:** política do RH, item 7. Decisão AMB-007.  
 75 +**Aceite:**  
 76 +- d-008: data 15/04, período 01/07–31/07 → recusada, R$ 0,00, m
+otivo "fora do período de competência".  
 77 +- Despesa com data igual a `periodo.inicio` (01/07) → elegível.
78 +- Despesa com data igual a `periodo.fim` (31/07) → elegível.  
 79 +- Despesa com data 01/08 → recusada.  
 80 +  
 81 +### RN-004 — ...  
 82 +  
 83 ---
84  
 85 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
136 **Justificativa:** "obrigatória" significa condição para o ree
mbolso; sem prazo definido pelo RH, um estado "pendente" não t
eria fim — o motor avalia a situação no momento do cálculo.
137 **Regra afetada:** RN-002
138  
 139 +### AMB-007 — "Lançadas dentro do período de competência" sem
+data de lançamento  
 140 +  
 141 +**Texto original do RH:** "Despesas devem ser lançadas dentro
+do período de competência."  
 142 +**O que não está claro:** "lançada" remete à data de registro
+da despesa, mas a entrada só traz a data em que a despesa ocor
+reu (`data`). Leituras: (a) usar a data da despesa e exigir qu
+e esteja no período; (b) presumir que tudo o que está na entra
+da foi lançado no período, o que torna a regra inverificável.
+Também não está claro se os extremos do período são inclusivos
+, nem se a despesa fora do período deve ser recusada ou omitid
+a. Exemplo: d-008 (15/04, "lançado com atraso") numa competênc
+ia de julho; d-014 em 31/07, último dia.  
 143 +**Decisão:** a regra é avaliada sobre a **data da despesa**, q
+ue deve estar entre `inicio` e `fim`, **inclusive**. Despesa f
+ora do período é **recusada e listada na saída** com o motivo.
144 +**Justificativa:** é o único dado disponível que torna a regra + verificável; listar a recusa em vez de omitir mantém a saída
+auditável — o colaborador vê por que não recebeu.  
 145 +**Regra afetada:** RN-003  
 146 +  
 147 <A política tem no mínimo oito. Se você achou menos, releia
148 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
149

⏺ Registrei como AMB-007 e escrevi a RN-003, com d-008 e as duas fronteiras
(01/07 e 31/07) como casos de aceite. O commit fica para o fim deste grupo.

---

Pergunta: duplicatas

A política diz apenas: "Duplicatas devem ser tratadas." No exemplo, d-006 e
d-007 são idênticas em tudo, menos no id:

┌───────┬───────┬─────────────┬────────────────┬───────────┬───────┬──────┐
│ │ data │ categoria │ fornecedor │ descrição │ valor │ nota │
├───────┼───────┼─────────────┼────────────────┼───────────┼───────┼──────┤
│ d-006 │ 09/07 │ alimentação │ Bistro Central │ Almoço │ 54,90 │ sim │
├───────┼───────┼─────────────┼────────────────┼───────────┼───────┼──────┤
│ d-007 │ 09/07 │ alimentação │ Bistro Central │ Almoço │ 54,90 │ sim │
└───────┴───────┴─────────────┴────────────────┴───────────┴───────┴──────┘

Há duas decisões a tomar.

1. O que caracteriza uma duplicata?

- (1a) Todos os campos iguais, exceto id: data, categoria, fornecedor,
  descrição, valor e nota. É restritivo, mas basta uma descrição diferente
  ("Almoço" e "almoço equipe") para não ser considerada duplicata.
- (1b) Data, categoria, fornecedor e valor iguais, ignorando a descrição. Pega
  mais casos, mas pode recusar duas compras legítimas, como dois cafés de R$
  8 na mesma padaria.

2. O que fazer com ela?

┌─────────────────────────────┬────────────┬────────────────────┬────────┐
│ Opção │ d-006 │ d-007 │ Dia │
│ │ │ │ 09/07 │
├─────────────────────────────┼────────────┼────────────────────┼────────┤
│ (A) Mantém a primeira │ │ 0 (motivo: │ │
│ (menor id) e recusa as │ 54,90 │ duplicata de │ 54,90 │
│ demais │ │ d-006) │ │
├─────────────────────────────┼────────────┼────────────────────┼────────┤
│ (B) Recusa todas do grupo │ 0 │ 0 │ 0 │
├─────────────────────────────┼────────────┼────────────────────┼────────┤
│ (C) Só sinaliza: paga as │ entram no │ entram no limite │ 60,00 │
│ duas e marca alerta │ limite │ │ │
└─────────────────────────────┴────────────┴────────────────────┴────────┘

Qual combinação você escolhe? Por exemplo, "1a + A".

❯ 1.

1a

2.  A

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 10 lines, removed 1 line
78 - Despesa com data igual a `periodo.fim` (31/07) → elegível.
79 - Despesa com data 01/08 → recusada.
80  
 81 -### RN-004 — ...  
 81 +### RN-004 — Duplicatas  
 82  
 83 +**Regra:** duas ou mais despesas são duplicatas quando todos os + campos, exceto `id`, são iguais: `data`, `categoria`, `descric
         +ao`, `fornecedor`, `valor` e `tem_nota_fiscal`. Em cada grupo d
+e duplicatas, a despesa de menor `id` segue normalmente para as + demais regras; as outras são **recusadas integralmente** (reem
+bolso R$ 0,00), com o motivo "duplicata de `<id mantido>`", e n
+ão consomem limite diário.  
 84 +**Origem:** política do RH, item 8. Decisão AMB-008.  
 85 +**Aceite:**  
 86 +- d-006 e d-007 (idênticas) → d-006 segue para o limite e receb
+e R$ 54,90; d-007 recusada, R$ 0,00, motivo "duplicata de d-006
+".  
 87 +- Duas despesas iguais exceto pela descrição ("Almoço" e "Almoç
+o equipe") → não são duplicatas; ambas seguem para o limite.  
 88 +- Três despesas idênticas d-020, d-021, d-022 → d-020 mantida;
+d-021 e d-022 recusadas como "duplicata de d-020".  
 89 +  
 90 +### RN-005 — ...  
 91 +  
 92 ---
93  
 94 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
153 **Justificativa:** é o único dado disponível que torna a regra
verificável; listar a recusa em vez de omitir mantém a saída
auditável — o colaborador vê por que não recebeu.
154 **Regra afetada:** RN-003
155  
 156 +### AMB-008 — Critério e tratamento de duplicatas  
 157 +  
 158 +**Texto original do RH:** "Duplicatas devem ser tratadas."  
 159 +**O que não está claro:** (1) o que caracteriza uma duplicata
+— todos os campos iguais, ou apenas alguns (data, categoria, f
+ornecedor, valor); (2) o que "tratar" significa — manter uma e + recusar as demais, recusar todas, ou apenas sinalizar e pagar
+. Exemplo: d-006 e d-007 são idênticas exceto pelo `id`.  
 160 +**Decisão:** duplicata exige **todos os campos iguais exceto `
          +id`**. Mantém-se a de **menor `id`**; as demais são recusadas
+com referência à mantida.  
 161 +**Justificativa:** critério estrito evita recusar compras legí
+timas repetidas (ex.: dois cafés na mesma padaria com descriçõ
+es diferentes); manter uma garante que o gasto real seja pago
+uma única vez.  
 162 +**Regra afetada:** RN-004  
 163 +  
 164 <A política tem no mínimo oito. Se você achou menos, releia
165 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
166

⏺ Registrei como AMB-008 e escrevi a RN-004.

Há uma limitação da escolha 1a que você deve conhecer: dois cafés legítimos de
R$ 8,00, com a mesma descrição "Café", no mesmo dia e na mesma padaria, serão
tratados como duplicata. A entrada não tem horário nem número da nota que
permita distinguir os dois. Vale registrar isso na seção "O que fica em
aberto" da spec. Quer que eu registre?

---

Pergunta: valores negativos (estorno)

┌─────────┬───────┬────────────┬────────────────────────────────┬────────┐
│ Despesa │ Data │ Categoria │ Descrição │ Valor │
├─────────┼───────┼────────────┼────────────────────────────────┼────────┤
│ d-009 │ 11/07 │ transporte │ "Estorno de corrida cancelada" │ −45,00 │
└─────────┴───────┴────────────┴────────────────────────────────┴────────┘

A política não fala de valores negativos. Só existe essa despesa de transporte
no dia 11/07, e não há no arquivo a corrida original que foi estornada.

┌────────────────┬─────────────────────────────┬─────────────────────────┐
│ Opção │ O que acontece │ Efeito no exemplo │
├────────────────┼─────────────────────────────┼─────────────────────────┤
│ (A) Recusa │ aparece na saída com │ │
│ como inválida │ reembolso 0 e motivo "valor │ total não muda │
│ │ não positivo" │ │
├────────────────┼─────────────────────────────┼─────────────────────────┤
│ (B) Abate da │ entra na soma de transporte │ dia 11/07 = −45, e o │
│ soma do dia │ do 11/07 antes do limite │ reembolso não pode │
│ │ │ ficar negativo… │
├────────────────┼─────────────────────────────┼─────────────────────────┤
│ (C) Abate do │ o colaborador "devolve" 45 │ total do período cai R$ │
│ total do │ no total final │ 45 │
│ período │ │ │
└────────────────┴─────────────────────────────┴─────────────────────────┘

Na opção (A), o estorno é tratado como erro de lançamento. Como a corrida
original não está no arquivo, não há o que estornar dentro deste cálculo.

Nas opções (B) e (C), o estorno é tratado como crédito a favor da empresa.
Isso só faz sentido se a corrida original tiver sido reembolsada antes, em
outro período, e o motor não tem como saber disso.

Qual você escolhe? E quer que eu registre a limitação dos cafés?

❯ A entrada não tem horário nem número da nota que permita distinguir os dois.
Vale registrar isso na seção "O que fica em aberto" da spec. Quer que eu
registre?
sim

Searched for 1 pattern, read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 2 lines
188  
 189 <Perguntas que você não conseguiu responder e a decisão provis
ória que tomou.
190 Honestidade aqui vale ponto — spec que finge não ter buraco é
spec que esconde buraco.>
191 +  
 192 +- **Compras legítimas idênticas são tratadas como duplicata.** + Duas despesas reais com todos os campos iguais (ex.: dois caf
+és de R$ 8,00, mesma descrição, mesma padaria, mesmo dia) não
+podem ser distinguidas, porque a entrada não traz horário nem
+número da nota. **Decisão provisória:** aplica-se AMB-008 — a
+segunda é recusada como duplicata. O colaborador pode relançá-
+la com descrição que a diferencie. Resolver de verdade exige u
+m identificador da nota na entrada.

⏺ Registrei na seção 10, "O que fica em aberto", que compras legítimas idênticas
são tratadas como duplicata. A decisão provisória é aplicar AMB-008 e o
colaborador relança a despesa com uma descrição diferente. Também anotei que a
solução definitiva exigiria um identificador da nota na entrada.

---

Falta a pergunta do estorno (d-009, −45,00):

- (A) recusa como inválida, reembolso 0, motivo "valor não positivo"
- (B) abate da soma do dia na categoria
- (C) abate do total do período

Qual você escolhe?

❯ A

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 10 lines, removed 1 line
87 - Duas despesas iguais exceto pela descrição ("Almoço" e "Almo
ço equipe") → não são duplicatas; ambas seguem para o limite.
88 - Três despesas idênticas d-020, d-021, d-022 → d-020 mantida;
d-021 e d-022 recusadas como "duplicata de d-020".
89  
 90 -### RN-005 — ...  
 90 +### RN-005 — Valores não positivos  
 91  
 92 +**Regra:** despesa com `valor` menor ou igual a R$ 0,00 é **re
+cusada** (reembolso R$ 0,00), com o motivo "valor não positivo
+". Ela não entra na soma do limite diário nem abate o total do + período.  
 93 +**Origem:** silêncio da política. Decisão AMB-009.  
 94 +**Aceite:**  
 95 +- d-009: transporte −R$ 45,00 em 11/07 → recusada, R$ 0,00, mo
+tivo "valor não positivo"; total do período não é reduzido.  
 96 +- Despesa de R$ 0,00 → recusada com o mesmo motivo.  
 97 +- Transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R$ 70,00 + recebe R$ 70,00 (o negativo não altera a soma do dia).  
 98 +  
 99 +### RN-006 — ...  
 100 +  
 101 ---
102  
 103 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
170 **Justificativa:** critério estrito evita recusar compras legí
timas repetidas (ex.: dois cafés na mesma padaria com descriçõ
es diferentes); manter uma garante que o gasto real seja pago
uma única vez.
171 **Regra afetada:** RN-004
172  
 173 +### AMB-009 — Despesas com valor negativo (estorno)  
 174 +  
 175 +**Texto original do RH:** (silêncio) — a política não menciona + valores negativos.  
 176 +**O que não está claro:** um lançamento negativo pode ser (a)
+erro de lançamento a recusar, (b) crédito que abate a soma do
+dia na categoria, ou (c) crédito que abate o total do período. + Exemplo: d-009, "Estorno de corrida cancelada", −R$ 45,00 em
+11/07; a corrida original não está na entrada.  
 177 +**Decisão:** valores menores ou iguais a zero são **recusados* +* e listados na saída com motivo; não afetam limites nem totai
+s.  
 178 +**Justificativa:** o motor calcula o que pagar ao colaborador, + não um saldo; sem a despesa original no período, não há o que + estornar, e abater créditos cobraria do colaborador algo que
+pode nunca ter sido reembolsado.  
 179 +**Regra afetada:\*\* RN-005  
 180 +  
 181 <A política tem no mínimo oito. Se você achou menos, releia
182 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
183

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): resolve ambiguidades de competência, duplicatas e estornos…) ⎿  (No output)

⏺ Registrei como AMB-009 e escrevi a RN-005. Também incluí valor zero na mesma
regra ("valor não positivo"). Fiz o commit f3949ca docs(spec): resolve
ambiguidades de competência, duplicatas e estornos.

Já são 9 ambiguidades resolvidas, uma a mais que o mínimo de 8. Faltam
hospedagem, "em viagem", arredondamento, categorias e a saída.

---

Próximo grupo: hospedagem

A política diz: "Hospedagem tem limite de R$ 250 por diária." A entrada só
traz uma data (provavelmente o check-in) e o valor total. O número de diárias
só aparece na descrição, em texto livre.

┌─────────┬───────┬─────────────────────────┬────────┬──────┐
│ Despesa │ Data │ Descrição │ Valor │ Nota │
├─────────┼───────┼─────────────────────────┼────────┼──────┤
│ d-010 │ 14/07 │ "Hotel Rio - 2 diarias" │ 480,00 │ sim │
├─────────┼───────┼─────────────────────────┼────────┼──────┤
│ d-013 │ 22/07 │ "Airbnb 3 noites" │ 690,00 │ não │
└─────────┴───────┴─────────────────────────┴────────┴──────┘

Pergunta: como o sistema sabe quantas diárias tem a despesa?

┌──────────────────────────────────────────────┬──────────────────────────┐
│ Opção │ d-010 │
├──────────────────────────────────────────────┼──────────────────────────┤
│ (A) Extrai da descrição (um número seguido │ limite 2 × 250 = 500, │
│ de "diária(s)" ou "noite(s)"); se não │ então recebe 480 │
│ encontrar, considera 1 │ integral │
├──────────────────────────────────────────────┼──────────────────────────┤
│ (B) Considera sempre 1 diária por lançamento │ limite 250, então recebe │
│ │ 250 parcial │
├──────────────────────────────────────────────┼──────────────────────────┤
│ (C) Recusa ou marca para revisão quando não │ depende da regra de │
│ há como saber │ identificação │
└──────────────────────────────────────────────┴──────────────────────────┘

- (A) dá o resultado mais justo, mas a regra de negócio passa a depender de
  texto livre digitado pelo colaborador, que pode escrever "duas diárias",
  "2d" ou "2 pernoites".
- (B) é rígida e fácil de verificar. A política seria lida como "cada
  lançamento de hospedagem é uma diária", e quem tem várias diárias lança uma
  por noite.

Sobre d-013: ela é recusada em qualquer opção, porque o valor é 690 > 100 e
não há nota (RN-002). Então ela não ajuda a decidir esta pergunta.

Qual você escolhe?

❯ A

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 12 lines, removed 1 line
96 - Despesa de R$ 0,00 → recusada com o mesmo motivo.
97 - Transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R$ 70,00
recebe R$ 70,00 (o negativo não altera a soma do dia).
98  
 99 -### RN-006 — ...  
 99 +### RN-006 — Limite de hospedagem por diária  
 100  
 101 +**Regra:** cada despesa de hospedagem é avaliada isoladamente
+(não há soma por dia). O número de diárias **N** é obtido da `
          +descricao`: o primeiro número inteiro escrito em algarismos, m
+aior que zero, seguido (com ou sem espaço) de uma das palavras + "diária", "diárias", "noite" ou "noites" — sem diferenciar ma
+iúsculas/minúsculas nem acentos. Se não houver esse padrão, N
+= 1. O limite da despesa é N × R$ 250,00; acima dele, paga-se
+o limite e o excedente é cortado (AMB-003). A saída informa o
+N considerado.  
 102 +**Origem:** política do RH, itens 3 e 4. Decisões AMB-003, AMB
+-010.  
 103 +**Aceite:**  
 104 +- d-010: "Hotel Rio - 2 diarias", R$ 480,00, com nota → N = 2, + limite R$ 500,00 → recebe R$ 480,00 (integral).  
 105 +- "Hotel - 2 diarias", R$ 600,00, com nota → limite R$ 500,00
+→ recebe R$ 500,00 (parcial).  
 106 +- "Pousada", R$ 300,00, com nota → sem padrão, N = 1 → recebe
+R$ 250,00 (parcial).  
 107 +- "Hotel duas diarias", R$ 400,00, com nota → número por exten
+so não é reconhecido, N = 1 → recebe R$ 250,00 (parcial).  
 108 +- d-013: "Airbnb 3 noites", R$ 690,00, sem nota → recusada por + RN-002 antes do limite (N = 3 não chega a ser aplicado).  
 109 +  
 110 +### RN-007 — ...  
 111 +  
 112 ---
113  
 114 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
189 **Justificativa:** o motor calcula o que pagar ao colaborador,
não um saldo; sem a despesa original no período, não há o que
estornar, e abater créditos cobraria do colaborador algo que
pode nunca ter sido reembolsado.
190 **Regra afetada:** RN-005
191  
 192 +### AMB-010 — Número de diárias de uma hospedagem  
 193 +  
 194 +**Texto original do RH:** "Hospedagem tem limite de R$ 250 por + diária."  
 195 +**O que não está claro:** a entrada não tem campo de número de + diárias nem data de saída; cada lançamento traz só uma data e + o valor total. Leituras: (a) extrair o número de diárias da d
+escrição; (b) tratar cada lançamento como uma diária; (c) recu
+sar ou mandar para revisão. Exemplo: d-010, "Hotel Rio - 2 dia
+rias", R$ 480,00 → R$ 480,00 em (a), R$ 250,00 em (b).  
 196 +**Decisão:** o número de diárias é **extraído da descrição** s
+egundo o padrão definido em RN-006; sem padrão reconhecível, c
+onsidera-se **1 diária**.  
 197 +**Justificativa:** a descrição é a única fonte da informação n
+a entrada e tratar toda estadia como uma diária penalizaria vi
+agens legítimas; o padrão é estrito e o fallback é conservador
+, para que o resultado seja sempre previsível.  
 198 +**Regra afetada:** RN-006  
 199 +  
 200 <A política tem no mínimo oito. Se você achou menos, releia
201 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
202

⏺ Registrei como AMB-010 e escrevi a RN-006. Confira duas escolhas que fiz para
a regra ficar verificável:

- Só números em algarismos são reconhecidos. "duas diárias" vale como 1. É
  conservador e fácil de testar.
- Hospedagem não é somada por dia, ao contrário de alimentação e transporte.
  Cada lançamento tem o próprio limite de N × 250.

---

Pergunta: o que caracteriza "em viagem"?

A política diz: "Colaborador em viagem tem limites ampliados em 50%." A
entrada não tem nenhum campo que indique viagem. Com a ampliação, os limites
passariam a ser: alimentação 90/dia, transporte 120/dia e hospedagem
375/diária.

- (A) Nunca aplica a ampliação. A regra fica registrada como não aplicável por
  falta de dado. É simples, mas a regra 6 vira letra morta.
- (B) Infere a viagem pela hospedagem. O colaborador está em viagem nos dias
  cobertos por uma hospedagem aceita. Por exemplo, d-010 (check-in em 14/07, 2
  diárias) cobriria 14/07, 15/07 e 16/07 (dia do check-out). Nesses dias
  valem os limites ampliados.

Efeito no exemplo com (B):

┌──────────────────────────┬───────────────┬──────────────────────────────┐
│ Despesa │ Sem ampliação │ Com ampliação │
├──────────────────────────┼───────────────┼──────────────────────────────┤
│ d-011 café em 15/07 │ 33,33 │ igual, porque já cabia no │
│ (33,33) │ integral │ limite │
└──────────────────────────┴───────────────┴──────────────────────────────┘

No exemplo a diferença é pequena, mas os casos ocultos do instrutor podem
explorar isso.

Se você escolher (B), proponho as seguintes regras complementares. Revise:

1. O dia do check-out conta como viagem. É comum almoçar ou pegar táxi para o
   aeroporto nesse dia.
2. Hospedagem recusada não caracteriza viagem. d-013, por exemplo, não teve
   nota, então os dias 22 a 25/07 não ficam ampliados. Sem comprovante, não há
   prova de viagem.
3. A ampliação também vale para a própria hospedagem. O limite passa a 375 por
   diária, porque quem se hospeda está, por definição, em viagem.

Qual você escolhe, (A) ou (B)? Se for (B), concorda com os itens 1 a 3?

❯ B, sim

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 18 lines, removed 7 lines
98  
 99 ### RN-006 — Limite de hospedagem por diária
100  
 101 -**Regra:** cada despesa de hospedagem é avaliada isoladamente
-(não há soma por dia). O número de diárias **N** é obtido da `
          -descricao`: o primeiro número inteiro escrito em algarismos, m
-aior que zero, seguido (com ou sem espaço) de uma das palavras - "diária", "diárias", "noite" ou "noites" — sem diferenciar ma
-iúsculas/minúsculas nem acentos. Se não houver esse padrão, N
-= 1. O limite da despesa é N × R$ 250,00; acima dele, paga-se
-o limite e o excedente é cortado (AMB-003). A saída informa o
-N considerado.  
 102 -**Origem:** política do RH, itens 3 e 4. Decisões AMB-003, AMB
--010.  
 101 +**Regra:** cada despesa de hospedagem é avaliada isoladamente
+(não há soma por dia). O número de diárias **N** é obtido da `
          +descricao`: o primeiro número inteiro escrito em algarismos, m
+aior que zero, seguido (com ou sem espaço) de uma das palavras + "diária", "diárias", "noite" ou "noites" — sem diferenciar ma
+iúsculas/minúsculas nem acentos. Se não houver esse padrão, N
+= 1. O limite base é N × R$ 250,00; como toda hospedagem carac
+teriza viagem (RN-007), o limite aplicado é sempre o ampliado, + **N × R$ 375,00**. Acima dele, paga-se o limite e o excedente + é cortado (AMB-003). A saída informa o N considerado.  
 102 +**Origem:** política do RH, itens 3, 4 e 6. Decisões AMB-003,
+AMB-010, AMB-011.  
 103 **Aceite:**
104 -- d-010: "Hotel Rio - 2 diarias", R$ 480,00, com nota → N = 2, - limite R$ 500,00 → recebe R$ 480,00 (integral).  
 105 -- "Hotel - 2 diarias", R$ 600,00, com nota → limite R$ 500,00
-→ recebe R$ 500,00 (parcial).  
 106 -- "Pousada", R$ 300,00, com nota → sem padrão, N = 1 → recebe
-R$ 250,00 (parcial).  
 107 -- "Hotel duas diarias", R$ 400,00, com nota → número por exten
-so não é reconhecido, N = 1 → recebe R$ 250,00 (parcial).  
 104 +- d-010: "Hotel Rio - 2 diarias", R$ 480,00, com nota → N = 2, + limite R$ 750,00 → recebe R$ 480,00 (integral).  
 105 +- "Hotel - 2 diarias", R$ 800,00, com nota → limite R$ 750,00
+→ recebe R$ 750,00 (parcial).  
 106 +- "Pousada", R$ 400,00, com nota → sem padrão, N = 1 → recebe
+R$ 375,00 (parcial).  
 107 +- "Hotel duas diarias", R$ 400,00, com nota → número por exten
+so não é reconhecido, N = 1 → recebe R$ 375,00 (parcial).  
 108 - d-013: "Airbnb 3 noites", R$ 690,00, sem nota → recusada por
RN-002 antes do limite (N = 3 não chega a ser aplicado).
109  
 110 -### RN-007 — ...  
 110 +### RN-007 — Ampliação de limites em viagem  
 111  
 112 +**Regra:** o colaborador é considerado **em viagem** em cada d
+ata coberta por uma hospedagem **não recusada** (integral ou p
+arcialmente reembolsada): da `data` da hospedagem até `data` + + N dias, inclusive (o dia de check-out conta). Nessas datas, o
+s limites diários de alimentação e transporte urbano são ampli
+ados em 50%: alimentação R$ 90,00 e transporte urbano R$ 120,0
+0. Hospedagem recusada por qualquer regra não caracteriza viag
+em. Hospedagens que se sobrepõem simplesmente somam suas datas + cobertas (a ampliação não acumula). A saída indica, por despe
+sa, se o limite ampliado foi aplicado.  
 113 +**Origem:** política do RH, item 6. Decisão AMB-011.  
 114 +**Aceite:**  
 115 +- d-010 (14/07, N = 2, aceita) → em viagem em 14/07, 15/07 e 1
+6/07.  
 116 +- d-011: café de R$ 33,33 em 15/07 → limite de alimentação do
+dia R$ 90,00 → integral.  
 117 +- Alimentação de R$ 85,00 em 16/07 (check-out de d-010) → inte
+gral (limite R$ 90,00).  
 118 +- Alimentação de R$ 85,00 em 17/07 → R$ 60,00 (parcial; fora d
+a viagem).  
 119 +- d-013 (22/07, recusada por falta de nota) → 22/07 a 25/07 **
+não** são dias de viagem; alimentação de R$ 70,00 em 23/07 → R
+$ 60,00 (parcial).  
 120 +  
 121 +### RN-008 — ...  
 122 +  
 123 ---
124  
 125 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 9 lines
208 **Justificativa:** a descrição é a única fonte da informação n
a entrada e tratar toda estadia como uma diária penalizaria vi
agens legítimas; o padrão é estrito e o fallback é conservador
, para que o resultado seja sempre previsível.
209 **Regra afetada:** RN-006
210  
 211 +### AMB-011 — O que caracteriza "em viagem"  
 212 +  
 213 +**Texto original do RH:** "Colaborador em viagem tem limites a
+mpliados em 50%."  
 214 +**O que não está claro:** a entrada não tem campo que indique
+viagem. Leituras: (a) a ampliação nunca se aplica por falta de + dado; (b) a viagem é inferida a partir de outras despesas. Se + inferida, ficam em aberto: quais dias contam (inclusive o de
+check-out?), se uma hospedagem recusada ainda caracteriza viag
+em e se a ampliação vale para a própria hospedagem.  
 215 +**Decisão:** viagem é **inferida das hospedagens não recusadas +**: datas de `data` a `data` + N (inclusive o check-out). Hosp
+edagem recusada não caracteriza viagem. A ampliação vale para
+alimentação, transporte urbano e para a própria hospedagem (qu
+e, por definição, ocorre em viagem).  
 216 +**Justificativa:** hospedagem é a única evidência de deslocame
+nto na entrada; o dia de check-out tem gastos típicos de viage
+m (refeição, táxi ao aeroporto); sem comprovante válido da hos
+pedagem, não há prova de viagem.  
 217 +**Consequência assumida:** como toda hospedagem implica viagem
+, o limite de R$ 250,00 por diária nunca é aplicado isoladamen
+te — o limite efetivo de hospedagem é sempre R$ 375,00 por diá
+ria.  
 218 +**Regra afetada:** RN-006, RN-007  
 219 +  
 220 <A política tem no mínimo oito. Se você achou menos, releia
221 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
222

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): resolve ambiguidades de hospedagem e viagem (diárias,
inferência de viagem)…)
⎿  (No output)

⏺ Registrei como AMB-011 e escrevi a RN-007, com 5 casos de aceite. Também
atualizei a RN-006 para usar o limite ampliado. Fiz o commit 1e944be
docs(spec): resolve ambiguidades de hospedagem e viagem (...).

⚠️ Uma consequência da regra 3 que propus e que eu deveria ter apontado antes:
se toda hospedagem já significa viagem, o limite de R$ 250 por diária nunca é
usado. Na prática, o limite de hospedagem passa a ser sempre R$ 375. Deixei
isso explícito na spec como "Consequência assumida". Ainda assim, um avaliador
pode ler como "a regra 3 da política foi anulada". Você pode:

- Manter como está. A decisão é defensável e está escrita.
- Reverter só o item 3. A hospedagem fica com limite de 250 por diária, e a
  ampliação vale apenas para alimentação e transporte nos dias de viagem.

Me diga se quer reverter. Isso também é um bom caso para a seção Discernimento
do relatório: eu propus algo, e a implicação apareceu só depois de escrito.

---

Próxima pergunta: arredondamento

d-011 vale R$ 33,333, com 3 casas decimais. Dinheiro tem 2.

1. Quando arredondar?

- (1a) Na entrada: cada valor é arredondado para centavos antes de qualquer
  regra. 33,333 vira 33,33 e todas as somas e comparações usam esse valor.
- (1b) Só na saída: os cálculos usam o valor exato e só o resultado final é
  arredondado.

2. Como arredondar?

- (2a) Meio para cima: 0,005 vira 0,01. É o arredondamento "de escola", que
  todo mundo espera.
- (2b) Meio para o par (bancário): 0,125 vira 0,12 e 0,135 vira 0,14. Evita
  viés em grandes volumes, mas é menos intuitivo.

Qual combinação você escolhe?

❯ 1. Quando arredondar?
1b

2b
⎿  1 skill available

⏺ Failed to authenticate: OAuth session expired and could not be
refreshed

❯ tente novamente

⏺ Bash(git status -s && git log --oneline -3 && grep -n "### RN-008 — \.\.\.\|<A
política tem no mínimo\|33,33" specs/001-motor-reembolso/spec.md)
⎿  (No output)

Read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 1 line, removed 1 line
113 **Origem:** política do RH, item 6. Decisão AMB-011.
114 **Aceite:**
115 - d-010 (14/07, N = 2, aceita) → em viagem em 14/07, 15/07 e 1
6/07.
116 -- d-011: café de R$ 33,33 em 15/07 → limite de alimentação do
-dia R$ 90,00 → integral.  
 116 +- d-011: café de R$ 33,333 em 15/07 → limite de alimentação do + dia R$ 90,00 → integral (R$ 33,33 após RN-008).  
 117 - Alimentação de R$ 85,00 em 16/07 (check-out de d-010) → inte
gral (limite R$ 90,00).
118 - Alimentação de R$ 85,00 em 17/07 → R$ 60,00 (parcial; fora d
a viagem).
119 - d-013 (22/07, recusada por falta de nota) → 22/07 a 25/07 **
não** são dias de viagem; alimentação de R$ 70,00 em 23/07 → R
$ 60,00 (parcial).

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 11 lines, removed 1 line
118 - Alimentação de R$ 85,00 em 17/07 → R$ 60,00 (parcial; fora d
a viagem).
119 - d-013 (22/07, recusada por falta de nota) → 22/07 a 25/07 **
não** são dias de viagem; alimentação de R$ 70,00 em 23/07 → R
$ 60,00 (parcial).
120  
 121 -### RN-008 — ...  
 121 +### RN-008 — Precisão e arredondamento  
 122  
 123 +**Regra:** todas as comparações e cálculos (limites, nota fisc
+al, soma do dia, distribuição do saldo) usam o `valor` **exata
+mente como informado na entrada**, sem arredondamento. Só o **
+valor reembolsado de cada despesa** é arredondado para 2 casas + decimais, uma única vez, ao final, pelo critério **meio para
+o par** (quando a parte descartada é exatamente meio centavo,
+arredonda-se para o centavo par). Os totais da saída são a som
+a dos valores reembolsados já arredondados de cada despesa, pa
+ra que a saída sempre feche item a item. O valor original é ex
+ibido na saída como veio na entrada.  
 124 +**Origem:** silêncio da política. Decisão AMB-012.  
 125 +**Aceite:**  
 126 +- d-011: R$ 33,333 → reembolso R$ 33,33.  
 127 +- Reembolso calculado de R$ 10,125 → R$ 10,12; de R$ 10,135 →
+R$ 10,14.  
 128 +- Alimentação R$ 33,333 + R$ 40,00 no mesmo dia (limite R$ 60,
+00) → a de R$ 33,333 recebe R$ 33,33; a de R$ 40,00 recebe o s
+aldo exato de R$ 26,667 → R$ 26,67; total do dia R$ 60,00.  
 129 +- Despesa de R$ 100,004 sem nota → exige nota (100,004 > 100,0
+0) e é recusada, embora R$ 100,004 arredondado fosse R$ 100,00
+.  
 130 +  
 131 +### RN-009 — ...  
 132 +  
 133 ---
134  
 135 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 8 lines
227 **Consequência assumida:** como toda hospedagem implica viagem
, o limite de R$ 250,00 por diária nunca é aplicado isoladamen
te — o limite efetivo de hospedagem é sempre R$ 375,00 por diá
ria.
228 **Regra afetada:** RN-006, RN-007
229  
 230 +### AMB-012 — Precisão de valores e arredondamento  
 231 +  
 232 +**Texto original do RH:** (silêncio) — a política não fala de
+casas decimais.  
 233 +**O que não está claro:** valores com mais de 2 casas (d-011,
+R$ 33,333) podem ser arredondados (a) na entrada, antes das re
+gras, ou (b) apenas no valor reembolsado final; e o critério p
+ode ser (c) meio para cima ou (d) meio para o par. A escolha m
+uda resultados em fronteiras (ex.: R$ 100,004 frente à regra d
+e nota fiscal).  
 234 +**Decisão:** cálculos com o **valor exato**; arredondamento **
+só no reembolso de cada despesa**, para 2 casas, **meio para o + par**. Totais = soma dos reembolsos já arredondados.  
 235 +**Justificativa:** não altera o valor que o colaborador declar
+ou antes de aplicar as regras; meio para o par evita viés sist
+emático a favor de uma das partes quando há muitos lançamentos
+; somar itens arredondados garante que a saída feche sem difer
+enças de centavo.  
 236 +**Regra afetada:** RN-008  
 237 +  
 238 <A política tem no mínimo oito. Se você achou menos, releia
239 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
240

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): resolve ambiguidade de precisão e arredondamento…)
⎿  (No output)

⏺ Registrei como AMB-012 e escrevi a RN-008. Fiz o commit 48b79b8 docs(spec):
resolve ambiguidade de precisão e arredondamento.

O que ficou definido:

- Os cálculos e comparações usam o valor exato, por exemplo 33,333.
- Só o reembolso de cada despesa é arredondado, para 2 casas, meio para o par.
- Os totais são a soma dos itens já arredondados, então a saída sempre fecha.

Um caso de aceite mostra por que o momento do arredondamento importa: R$
100,004 sem nota é recusado, porque é maior que 100, embora arredondado
ficasse 100,00.

Também corrigi o caso do d-011 na RN-007, que eu tinha escrito como "33,33",
com o valor já arredondado. Agora diz 33,333.

Sobre a pergunta anterior: como você não pediu para reverter, mantive o limite
de hospedagem sempre ampliado (375), com a consequência registrada na spec.

---

Próximo grupo: categorias e datas

São três itens menores, e você pode responder tudo de uma vez:

1. Categoria fora da política (d-005, coworking, R$ 89). A política é clara:
   "não são reembolsáveis". Falta só confirmar a forma: a despesa é recusada e
   aparece na saída com o motivo "categoria fora da política", como fizemos com
   as outras recusas?

2. Maiúsculas e minúsculas (d-014, ALIMENTACAO, jantar de R$ 61 em 31/07).

- (A) Normaliza: ALIMENTACAO, Alimentacao e alimentacao são a mesma categoria.
  d-014 recebe R$ 60 (parcial).
- (B) Exige a grafia exata: ALIMENTACAO é tratada como categoria desconhecida
  e d-014 é recusada.

Se escolher (A), há uma subpergunta: acentos também são normalizados, ou seja,
alimentação vale como alimentacao?

3. Fim de semana (d-012, "Almoço de sábado - plantão", R$ 47,20). A política
   não diz nada sobre dias da semana.

- (A) Sem restrição: é tratada como qualquer outro dia e recebe R$ 47,20.
- (B) Restringe: fim de semana não é reembolsável, ou exige justificativa.
  Isso inventaria uma regra que o RH não escreveu.

❯ 1 . a despesa é recusada e aparece na saída com o motivo "categoria fora da
política"

2. A, sim
3. A

⏺ Bash(git status -s && grep -n "### RN-009 — \.\.\.\|<A política tem no
mínimo\|^- Não faz" specs/001-motor-reembolso/spec.md)
⎿  (No output)

Read 1 file (ctrl+o to expand)
⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 11 lines, removed 1 line
128 - Alimentação R$ 33,333 + R$ 40,00 no mesmo dia (limite R$ 60, 00) → a de R$ 33,333 recebe R$ 33,33; a de R$ 40,00 recebe o s
aldo exato de R$ 26,667 → R$ 26,67; total do dia R$ 60,00.
129 - Despesa de R$ 100,004 sem nota → exige nota (100,004 > 100,0 0) e é recusada, embora R$ 100,004 arredondado fosse R$ 100,00
.
130  
 131 -### RN-009 — ...  
 131 +### RN-009 — Categorias reembolsáveis  
 132  
 133 +**Regra:** as únicas categorias reembolsáveis são `alimentacao
          +`, `transporte_urbano` e `hospedagem`. Antes da comparação, a +`categoria` informada é normalizada: maiúsculas e minúsculas n
+ão se diferenciam e acentos são desconsiderados (`ALIMENTACAO`
+, `Alimentação` e `alimentacao` são a mesma categoria). Nenhum
+a outra transformação é feita (espaços, hífens ou sinônimos nã
+o são reconhecidos). Despesa cuja categoria normalizada não se
+ja uma das três é **recusada integralmente** (reembolso R$ 0,0
+0), com o motivo "categoria fora da política", e não consome l
+imite diário. A saída exibe a categoria normalizada.  
 134 +**Origem:** política do RH, item 9. Decisão AMB-013.  
 135 +**Aceite:**  
 136 +- d-005: `coworking`, R$ 89,00 → recusada, R$ 0,00, motivo "ca
+tegoria fora da política".  
 137 +- d-014: `ALIMENTACAO`, R$ 61,00 em 31/07 → tratada como `alim
          +entacao`; recebe R$ 60,00 (parcial).  
 138 +- `Alimentação` (com acento e inicial maiúscula) → tratada com
+o `alimentacao`.  
 139 +- `transporte urbano` (espaço no lugar do sublinhado) → recusa
+da como "categoria fora da política".  
 140 +  
 141 +### RN-010 — ...  
 142 +  
 143 ---
144  
 145 ## 6. Ambiguidades identificadas e decisões

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 16 lines
245 **Justificativa:** não altera o valor que o colaborador declar
ou antes de aplicar as regras; meio para o par evita viés sist
emático a favor de uma das partes quando há muitos lançamentos
; somar itens arredondados garante que a saída feche sem difer
enças de centavo.
246 **Regra afetada:** RN-008
247  
 248 +### AMB-013 — Grafia da categoria  
 249 +  
 250 +**Texto original do RH:** "Categorias fora da política não são + reembolsáveis."  
 251 +**O que não está claro:** se uma categoria escrita com grafia
+diferente (d-014, `ALIMENTACAO`) é a mesma categoria da políti
+ca ou uma categoria desconhecida, a ser recusada.  
 252 +**Decisão:** maiúsculas/minúsculas e acentos são **normalizado
+s**; qualquer outra diferença de grafia torna a categoria desc
+onhecida.  
 253 +**Justificativa:** diferença de caixa ou acento não muda o sig
+nificado da categoria e não deve custar o reembolso ao colabor
+ador; ir além disso (sinônimos, espaços) exigiria adivinhar a
+intenção.  
 254 +**Regra afetada:** RN-009  
 255 +  
 256 +### AMB-014 — Despesas em fim de semana  
 257 +  
 258 +**Texto original do RH:** (silêncio) — a política não menciona + dias da semana.  
 259 +**O que não está claro:** se despesas em sábado, domingo ou fe
+riado têm alguma restrição. Exemplo: d-012, "Almoço de sábado
+- plantão", R$ 47,20.  
 260 +**Decisão:** **sem restrição**; despesas de fim de semana segu
+em exatamente as mesmas regras dos demais dias.  
 261 +**Justificativa:** criar uma restrição seria inventar uma regr
+a que o RH não escreveu; plantão e viagem em fim de semana são + situações legítimas.  
 262 +**Regra afetada:** nenhuma (RN-001 aplica-se a qualquer data). + Aceite: d-012 recebe R$ 47,20 (integral).  
 263 +  
 264 <A política tem no mínimo oito. Se você achou menos, releia
265 `exemplos/despesas-exemplo.json` — cada item daquele arquivo e
xiste por um motivo.>
266

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 1 line
25 e impede você de mover a trave depois.>
26  
 27 - Não controla prazo de entrega de nota fiscal nem mantém despe
sas em estado "pendente"; uma despesa recusada por falta de not
a só é reavaliada se for lançada novamente em um novo cálculo (
AMB-006).
28 +- Não aplica restrição por dia da semana nem por feriado (AMB-0
+14).  
 29 - Não faz `<...>`
30  
 31 ## 4. Entrada e saída

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): resolve ambiguidades de categoria e fim de semana…)
⎿  (file diff unavailable for this command)

⏺ Registrei AMB-013 (grafia da categoria) e AMB-014 (fim de semana), escrevi a
RN-009 e acrescentei um item de fora de escopo para dia da semana e feriado.
Fiz o commit 0cebc89.

Um detalhe que defini e que você deve conferir: a normalização vale só para
maiúsculas, minúsculas e acentos. transporte urbano (com espaço) continua
recusada. Está nos casos de aceite.

Total: 14 ambiguidades resolvidas, em 9 regras de negócio. As decisões de
regra estão completas. Faltam as seções estruturais: ordem de aplicação,
schema de saída, fora de escopo, casos de borda e critérios de aceite.

---

Próxima pergunta: ordem de aplicação (seção 8)

A ordem muda o resultado, e o template da spec diz que é isso que "separa spec
boa de spec média". Com base no que você decidiu, proponho esta sequência:

┌─────┬────────────────────────────┬──────────┬──────────────────────────┐
│ # │ Etapa │ Regra │ Por que nesta posição │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ │ Normaliza categoria e │ │ as etapas seguintes │
│ 1 │ recusa se for fora da │ RN-009 │ dependem da categoria │
│ │ política │ │ correta │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ │ │ │ um valor inválido não │
│ 2 │ Recusa valor ≤ 0 │ RN-005 │ deve participar de │
│ │ │ │ nenhuma comparação │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ 3 │ Recusa fora do período │ RN-003 │ │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ 4 │ Detecta duplicatas entre │ RN-004 │ a comparação usa a │
│ │ as que restaram │ │ categoria já normalizada │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ 5 │ Recusa sem nota acima de │ RN-002 │ │
│ │ R$ 100 │ │ │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ │ Determina os dias de │ │ precisa saber quais │
│ 6 │ viagem pelas hospedagens │ RN-007 │ hospedagens foram │
│ │ que sobraram │ │ recusadas │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ │ Aplica limites: hospedagem │ RN-006, │ só as despesas elegíveis │
│ 7 │ por diária e limite │ RN-001 │ consomem o limite │
│ │ diário por categoria │ │ │
├─────┼────────────────────────────┼──────────┼──────────────────────────┤
│ 8 │ Arredonda o reembolso de │ RN-008 │ sempre por último │
│ │ cada despesa │ │ │
└─────┴────────────────────────────┴──────────┴──────────────────────────┘

Duas perguntas:

1. A ordem está boa? Na etapa 4 há uma consequência a confirmar: alimentacao e
   ALIMENTACAO, com todo o resto igual, são duplicatas.

2. Se uma despesa falha em várias regras, por exemplo uma de abril, com R$ 150
   e sem nota:

- (A) a saída mostra só o primeiro motivo, conforme a ordem acima ("fora do
  período");
- (B) a saída mostra todos os motivos ("fora do período", "nota fiscal
  ausente").

❯ 1 - sim; 2. B
⎿  5 skills available

⏺ Bash(git status -s && git log --oneline -1 && grep -n "## 8\." -A5
specs/001-motor-reembolso/spec.md)
⎿  (No output)

Read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 27 lines, removed 2 lines
275  
 276 ## 8. Ordem de aplicação das regras
277  
 278 -<Quando duas regras incidem sobre a mesma despesa, qual vale p
-rimeiro? A ordem  
 279 -muda o resultado. Declarar isso separa spec boa de spec média.
->  
 278 +O cálculo ocorre em duas fases. Uma despesa é **elegível** qua
+ndo não é recusada por nenhuma regra da fase 1; só despesas el
+egíveis participam da fase 2.  
 279  
 280 +**Fase 1 — elegibilidade.** Toda despesa é avaliada por **toda
+s** as regras abaixo, mesmo que já tenha falhado em uma anteri
+or. Se falhar em qualquer uma, é recusada (reembolso R$ 0,00)
+e a saída lista **todos** os motivos, na ordem da tabela.  
 281 +  
 282 +| # | Etapa | Regra | Motivo de recusa |  
 283 +|---|---|---|---|  
 284 +| 1 | Normaliza a categoria e verifica se é reembolsável | RN-
+009 | "categoria fora da política" |  
 285 +| 2 | Verifica se o valor é positivo | RN-005 | "valor não pos
+itivo" |  
 286 +| 3 | Verifica se a data está no período | RN-003 | "fora do p
+eríodo de competência" |  
 287 +| 4 | Detecta duplicatas, comparando a categoria **já normaliz
+ada** | RN-004 | "duplicata de `<id>`" |  
 288 +| 5 | Verifica nota fiscal acima de R$ 100,00 | RN-002 | "nota + fiscal ausente" |  
 289 +  
 290 +Como duplicatas têm todos os campos iguais, elas sempre têm o
+mesmo resultado nas etapas 1, 2, 3 e 5; por isso a etapa 4 pod
+e considerar todas as despesas da entrada.  
 291 +  
 292 +**Fase 2 — valor reembolsado** (apenas despesas elegíveis):  
 293 +  
 294 +| # | Etapa | Regra |  
 295 +|---|---|---|  
 296 +| 6 | Determina as datas em viagem a partir das hospedagens el
+egíveis | RN-007 |  
 297 +| 7 | Aplica o limite de hospedagem por diária | RN-006 |  
 298 +| 8 | Aplica o limite diário de alimentação e transporte urban
+o, ampliado nas datas em viagem | RN-001, RN-007 |  
 299 +| 9 | Arredonda o reembolso de cada despesa | RN-008 |  
 300 +  
 301 +**Aceite:**  
 302 +- Despesa de alimentação em 15/04 (fora do período), R$ 150,00
+, sem nota → recusada com os motivos "fora do período de compe
+tência" e "nota fiscal ausente", nessa ordem.  
 303 +- `ALIMENTACAO` e `alimentacao` com todos os demais campos igu
+ais → duplicatas (a de maior `id` é recusada).  
 304 +- Hospedagem sem nota acima de R$ 100,00 → recusada na fase 1
+e, portanto, não gera datas em viagem na etapa 6.  
 305 +  
 306 ## 9. Critérios de aceite
307  
 308 O sistema está pronto quando:

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): define ordem de aplicação das regras e múltiplos motivos de
recusa…)
⎿  (No output)

⏺ A seção 8 está registrada e commitada (db84756). O cálculo ficou dividido em
duas fases:

- Fase 1, elegibilidade: cada despesa passa por todas as 5 verificações
  (categoria, valor, período, duplicata e nota) e a saída lista todos os
  motivos de recusa.
- Fase 2, valor: só as despesas elegíveis entram. Primeiro determino os dias
  de viagem, depois aplico o limite de hospedagem, depois o limite diário e,
  por fim, arredondo.

A sua escolha (B, mostrar todos os motivos) me fez rever um ponto. Com todos
os motivos listados, a detecção de duplicata não pode depender das etapas
anteriores. Não houve conflito, porque duplicatas têm todos os campos iguais
e, portanto, sempre passam ou falham juntas nas outras verificações. Registrei
esse argumento na spec.

---

Próxima pergunta: schema de saída (seção 4)

A saída é você quem define. Proponho este formato, mostrado para uma entrada
pequena (d-001, d-002, d-005):

{
"colaborador": { "id": "c-0417", "nome": "Marina Volpi", "centro_custo":
"CC-ENG-PLATAFORMA" },
"periodo": { "competencia": "2026-07", "inicio": "2026-07-01", "fim":
"2026-07-31" },
"despesas": [
{
"id": "d-001",
"data": "2026-07-03",
"categoria": "alimentacao",
"valor_original": 72.50,
"valor_reembolsado": 22.00,
"status": "parcial",
"motivos": ["limite diário excedido"],
"limite_aplicado": 60.00,
"em_viagem": false,
"diarias": null
},
{
"id": "d-002", "data": "2026-07-03", "categoria": "alimentacao",
"valor_original": 38.00, "valor_reembolsado": 38.00,
"status": "integral", "motivos": [],
"limite_aplicado": 60.00, "em_viagem": false, "diarias": null
},
{
"id": "d-005", "data": "2026-07-07", "categoria": "coworking",
"valor_original": 89.00, "valor_reembolsado": 0.00,
"status": "recusada", "motivos": ["categoria fora da política"],
"limite_aplicado": null, "em_viagem": false, "diarias": null
}
],
"totais": {
"valor_reembolsado": 60.00,
"quantidade": { "integral": 1, "parcial": 1, "recusada": 1 }
}
}

Decisões embutidas nesse formato:

- status tem só 3 valores: integral, parcial e recusada. Não existe "pendente"
  (AMB-006).
- limite_aplicado traz o limite do dia ou da hospedagem que valeu para aquela
  despesa (60, 90, 80, 120 ou N × 375). Fica null quando a despesa é recusada.
  Isso permite conferir o cálculo sem ler código.
- diarias só é preenchido em hospedagem, com o N da RN-006.
- Ordem das despesas: a mesma da entrada.
- motivos para parcial: "limite diário excedido" em alimentação e transporte,
  e "limite de hospedagem excedido" em hospedagem.

Aprova assim ou quer mudar algo? Algumas mudanças possíveis seriam um total
por categoria, um total solicitado ou valores em centavos inteiros.

❯ aprovo

Read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 66 lines, removed 4 lines
34  
 35 | Campo | Tipo | Significado | Obrigatório |
36 |---|---|---|---|
37 -| | | | |  
 37 +| `colaborador.id` | texto | identificador do colaborador | si
+m |  
 38 +| `colaborador.nome` | texto | nome do colaborador | sim |  
 39 +| `colaborador.centro_custo` | texto | centro de custo | sim |
40 +| `periodo.competencia` | texto `AAAA-MM` | mês de competência + | sim |  
 41 +| `periodo.inicio` | data `AAAA-MM-DD` | primeiro dia do perío
+do (inclusive) | sim |  
 42 +| `periodo.fim` | data `AAAA-MM-DD` | último dia do período (i
+nclusive) | sim |  
 43 +| `despesas[]` | lista | despesas a avaliar (pode ser vazia) | + sim |  
 44 +| `despesas[].id` | texto | identificador único da despesa | s
+im |  
 45 +| `despesas[].data` | data `AAAA-MM-DD` | data em que a despes
+a ocorreu; para hospedagem, a data de entrada | sim |  
 46 +| `despesas[].categoria` | texto | categoria informada pelo co
+laborador (normalizada por RN-009) | sim |  
 47 +| `despesas[].descricao` | texto | descrição livre; para hospe
+dagem, fonte do número de diárias (RN-006) | sim |  
 48 +| `despesas[].fornecedor` | texto | estabelecimento | sim |  
 49 +| `despesas[].valor` | número | valor em reais, como informado + (pode ter mais de 2 casas ou ser negativo) | sim |  
 50 +| `despesas[].tem_nota_fiscal` | booleano | se há nota fiscal
+| sim |  
 51  
 39 -**Saída:** definida por mim. Estrutura e significado de cada c
-ampo:  
 52 +Entrada que não segue este formato (campo obrigatório ausente, + tipo errado, data inválida ou `id` repetido) é **rejeitada po
+r inteiro**: nenhuma saída é gerada e o erro informa o problem
+a encontrado.  
 53  
 54 +**Saída:** um único documento com a mesma estrutura de `colabo
          +rador` e `periodo` da entrada, a avaliação de cada despesa e o
+s totais.  
 55 +  
 56 | Campo | Tipo | Significado |
57 |---|---|---|
43 -| | | |  
 58 +| `colaborador` | objeto | cópia do `colaborador` da entrada |
59 +| `periodo` | objeto | cópia do `periodo` da entrada |  
 60 +| `despesas[]` | lista | uma entrada por despesa da entrada, * +*na mesma ordem** |  
 61 +| `despesas[].id` | texto | `id` da despesa |  
 62 +| `despesas[].data` | data | `data` da despesa |  
 63 +| `despesas[].categoria` | texto | categoria **normalizada** (
+RN-009) |  
 64 +| `despesas[].valor_original` | número | `valor` exatamente co
+mo veio na entrada |  
 65 +| `despesas[].valor_reembolsado` | número | valor a reembolsar
+, com 2 casas (RN-008); R$ 0,00 se recusada |  
 66 +| `despesas[].status` | texto | `integral` (reembolsado = orig
+inal), `parcial` (0 < reembolsado < original) ou `recusada` |
67 +| `despesas[].motivos` | lista de textos | vazia se `integral`
+; se `parcial`, "limite diário excedido" ou "limite de hospeda
+gem excedido"; se `recusada`, todos os motivos da fase 1 (seçã
+o 8) |  
 68 +| `despesas[].limite_aplicado` | número ou nulo | limite que v
+aleu para a despesa: diário da categoria (60, 90, 80 ou 120) o
+u de hospedagem (N × 375); nulo se recusada |  
 69 +| `despesas[].em_viagem` | booleano | se a data da despesa é u
+ma data em viagem (RN-007) |  
 70 +| `despesas[].diarias` | inteiro ou nulo | N considerado (RN-0
+06); nulo se não for hospedagem |  
 71 +| `totais.valor_reembolsado` | número | soma dos `valor_reembo
          +lsado` de todas as despesas |  
 72 +| `totais.quantidade.integral` | inteiro | número de despesas
+com status `integral` |  
 73 +| `totais.quantidade.parcial` | inteiro | número de despesas c
+om status `parcial` |  
 74 +| `totais.quantidade.recusada` | inteiro | número de despesas
+com status `recusada` |  
 75  
 45 -<Cole um exemplo de saída para uma entrada pequena. Vale mais
-que três parágrafos.>  
 76 +**Exemplo\*\* (entrada com apenas d-001, d-002 e d-005):  
 77  
 78 +`json                                                       
       79 +{                                                             
       80 +  "colaborador": { "id": "c-0417", "nome": "Marina Volpi", "ce
          +ntro_custo": "CC-ENG-PLATAFORMA" },                           
       81 +  "periodo": { "competencia": "2026-07", "inicio": "2026-07-01
          +", "fim": "2026-07-31" },                                     
       82 +  "despesas": [                                               
       83 +    {                                                         
       84 +      "id": "d-001", "data": "2026-07-03", "categoria": "alime
          +ntacao",                                                      
       85 +      "valor_original": 72.50, "valor_reembolsado": 22.00,    
       86 +      "status": "parcial", "motivos": ["limite diário excedido
          +"],                                                           
       87 +      "limite_aplicado": 60.00, "em_viagem": false, "diarias":
          + null                                                         
       88 +    },                                                        
       89 +    {                                                         
       90 +      "id": "d-002", "data": "2026-07-03", "categoria": "alime
          +ntacao",                                                      
       91 +      "valor_original": 38.00, "valor_reembolsado": 38.00,    
       92 +      "status": "integral", "motivos": [],                    
       93 +      "limite_aplicado": 60.00, "em_viagem": false, "diarias":
          + null                                                         
       94 +    },                                                        
       95 +    {                                                         
       96 +      "id": "d-005", "data": "2026-07-07", "categoria": "cowor
          +king",                                                        
       97 +      "valor_original": 89.00, "valor_reembolsado": 0.00,     
       98 +      "status": "recusada", "motivos": ["categoria fora da pol
          +ítica"],                                                      
       99 +      "limite_aplicado": null, "em_viagem": false, "diarias": 
          +null                                                          
      100 +    }                                                         
      101 +  ],                                                          
      102 +  "totais": {                                                 
      103 +    "valor_reembolsado": 60.00,                               
      104 +    "quantidade": { "integral": 1, "parcial": 1, "recusada": 1
          + }                                                            
      105 +  }                                                           
      106 +}                                                             
      107 +`  
 108 +  
 109 ## 5. Regras de negócio
110  
 111 Cada regra recebe um ID (`RN-001`, ...). As tasks vão referenc
iar esses IDs.

⏺ Bash(git add specs/001-motor-reembolso/spec.md && git commit -q -m
"docs(spec): define schema de entrada e saída…)
⎿  (No output)

⏺ Registrei o schema na seção 4 e fiz o commit 75b781d docs(spec): define schema
de entrada e saída. A seção agora tem uma tabela com os 14 campos da entrada,
outra com os 17 campos da saída e o exemplo que você aprovou.

⚠️ Acrescentei uma decisão que você não tomou, então revise: entrada fora do
formato, como campo ausente, tipo errado, data inválida ou id repetido, é
rejeitada por inteiro. Nesse caso nenhuma saída é gerada e o erro descreve o
problema. A alternativa seria processar as despesas válidas e marcar as
inválidas como recusadas. Escolhi rejeitar tudo porque um arquivo malformado
sugere um erro na origem dos dados, e um cálculo parcial poderia passar
despercebido. Se preferir a outra opção, eu troco.

---

O que falta na spec

Todas as decisões de negócio já foram tomadas. As seções que faltam são, em
boa parte, consolidação do que você já decidiu:

Seção: 1. Problema e 2. Objetivo
Conteúdo: 2 ou 3 frases, tiradas do enunciado
────────────────────────────────────────
Seção: 3. Fora de escopo
Conteúdo: completar a lista. Hoje há 2 itens. Proponho incluir: não persiste
histórico entre cálculos; não consulta a despesa original de um estorno; não

    valida a autenticidade da nota; não aprova nem paga, só calcula; não trata
    moeda estrangeira

────────────────────────────────────────
Seção: 7. Casos de borda
Conteúdo: tabela com os 14 itens do exemplo e o resultado esperado de cada um.

    Ela vira o teste de ponta a ponta com o despesas-exemplo.json

────────────────────────────────────────
Seção: 9. Critérios de aceite
Conteúdo: checklist do tipo: processa o arquivo de exemplo com o resultado da
seção 7, todos os casos de aceite das RNs passam, etc.
────────────────────────────────────────
Seção: Limpeza
Conteúdo: remover os textos-guia do template (<...>) que sobraram

Posso escrever tudo isso agora e mostrar para você revisar. A seção 7 é onde
vale mais a sua conferência, porque é o cálculo completo do exemplo e os erros
de conta aparecem ali. Quer que eu escreva?

❯ sim

Searched for 1 pattern, read 1 file (ctrl+o to expand)

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 1 line, removed 1 line
1 # Spec — Motor de Cálculo de Reembolso
2  
 3 -**Versão:** 1.0 · **Status:** rascunho · **Última alteração:** `
        -<data>`  
 3 +**Versão:** 1.0 · **Status:** aprovada · **Última alteração:** 2
+026-11-06  
 4  
 5 > **Regra de ouro deste arquivo:** ele descreve o QUÊ e o PORQUÊ
. Nenhuma linha
6 > aqui pode citar linguagem, biblioteca, classe, função ou estru
tura de pasta.

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 9 lines, removed 6 lines
13  
 14 ## 1. Problema
15  
 16 -<Duas ou três frases. Quem sofre hoje, com o quê, e por quê iss
-o custa caro.>  
 16 +Hoje o financeiro confere manualmente, item por item, as despes
+as de cada colaborador contra a política de reembolso do RH. O
+processo é lento e inconsistente: a política tem redação ambígu
+a, e duas pessoas conferindo a mesma planilha chegam a valores
+diferentes sem conseguir explicar por quê.  
 17  
 18 ## 2. Objetivo
19  
 20 -<Uma frase. O que passa a ser verdade quando isto existir.>  
 20 +Dado o conjunto de despesas de um colaborador num período de co
+mpetência, calcular de forma determinística quanto é reembolsáv
+el em cada despesa e justificar cada decisão com base em regras + escritas nesta spec.  
 21  
 22 ## 3. Fora de escopo
23  
 24 -<Lista explícita. Este bloco vale ponto: ele impede o agente de - inventar feature  
 25 -e impede você de mover a trave depois.>  
 26 -  
 24 - Não controla prazo de entrega de nota fiscal nem mantém despe
sas em estado "pendente"; uma despesa recusada por falta de not
a só é reavaliada se for lançada novamente em um novo cálculo (
AMB-006).
25 - Não aplica restrição por dia da semana nem por feriado (AMB-0
14).
29 -- Não faz `<...>`  
 26 +- Não aprova, paga nem registra o reembolso: apenas calcula e j
+ustifica.  
 27 +- Não guarda histórico entre cálculos: cada execução considera
+somente a entrada recebida (não detecta duplicatas nem limites
+entre períodos ou execuções diferentes).  
 28 +- Não busca a despesa original de um estorno nem abate créditos + (AMB-009).  
 29 +- Não valida a autenticidade ou o conteúdo da nota fiscal; conf
+ia no campo `tem_nota_fiscal`.  
 30 +- Não trata moeda estrangeira: todos os valores são em reais.  
 31 +- Não processa mais de um colaborador ou mais de um período por + execução.  
 32 +- Não interpreta a descrição da despesa, exceto para extrair o
+número de diárias de hospedagem (RN-006).  
 33  
 34 ## 4. Entrada e saída
35

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 1 line, removed 1 line
66 | `despesas[].categoria` | texto | categoria **normalizada** (R
N-009) |
67 | `despesas[].valor_original` | número | `valor` exatamente com
o veio na entrada |
68 | `despesas[].valor_reembolsado` | número | valor a reembolsar,
com 2 casas (RN-008); R$ 0,00 se recusada |
69 -| `despesas[].status` | texto | `integral` (reembolsado = origi
-nal), `parcial` (0 < reembolsado < original) ou `recusada` |  
 69 +| `despesas[].status` | texto | `recusada` se falhou na fase 1
+(seção 8); `parcial` se o valor foi cortado por limite; `integr
         +al` caso contrário. A diferença causada apenas pelo arredondame
+nto (RN-008) não torna a despesa parcial (ex.: R$ 33,333 → R$ 3
+3,33 é `integral`). |  
 70 | `despesas[].motivos` | lista de textos | vazia se `integral`;
se `parcial`, "limite diário excedido" ou "limite de hospedage
m excedido"; se `recusada`, todos os motivos da fase 1 (seção 8
) |
71 | `despesas[].limite_aplicado` | número ou nulo | limite que va
leu para a despesa: diário da categoria (60, 90, 80 ou 120) ou
de hospedagem (N × 375); nulo se recusada |
72 | `despesas[].em_viagem` | booleano | se a data da despesa é um
a data em viagem (RN-007) |

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Removed 2 lines
204 - `Alimentação` (com acento e inicial maiúscula) → tratada com
o `alimentacao`.
205 - `transporte urbano` (espaço no lugar do sublinhado) → recusa
da como "categoria fora da política".
206  
 207 -### RN-010 — ...  
 208 -  
 207 ---
208  
 209 ## 6. Ambiguidades identificadas e decisões
⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 1 line, removed 3 lines
208  
 209 ## 6. Ambiguidades identificadas e decisões
210  
 211 -> **Esta seção é o coração da spec e vale a maior parte dos 25 - pontos do critério 1.**  
 212 -> Uma ambiguidade que você resolveu no código sem registrar aq
-ui conta como  
 213 -> não resolvida.  
 211 +Cada item registra um ponto em que a política do RH admite mai
+s de uma leitura, a leitura adotada e o motivo.  
 212  
 213 ### AMB-001 — Unidade de aplicação do limite diário
214

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 18 lines, removed 4 lines
323 **Justificativa:** criar uma restrição seria inventar uma regr
a que o RH não escreveu; plantão e viagem em fim de semana são
situações legítimas.
324 **Regra afetada:** nenhuma (RN-001 aplica-se a qualquer data).
Aceite: d-012 recebe R$ 47,20 (integral).
325  
 326 -<A política tem no mínimo oito. Se você achou menos, releia  
 327 -`exemplos/despesas-exemplo.json` — cada item daquele arquivo e
-xiste por um motivo.>  
 328 -  
 326 ---
327  
 328 ## 7. Casos de borda
329  
 330 +Resultado esperado para `exemplos/despesas-exemplo.json` (comp
+etência 2026-07, período 01/07 a 31/07). Datas em viagem: 14/0
+7, 15/07 e 16/07 (geradas por d-010).  
 331 +  
 332 | Caso | Entrada | Comportamento esperado | Regra |
333 |---|---|---|---|
335 -| | | | |  
 334 +| d-001 — dois itens no dia, soma acima do limite | alimentaçã
+o, 03/07, R$ 72,50, com nota | **parcial**, R$ 22,00 (recebe o + saldo depois de d-002); limite 60 | RN-001 |  
 335 +| d-002 — item menor do dia é pago primeiro | alimentação, 03/
+07, R$ 38,00, com nota | **integral**, R$ 38,00; limite 60 | R
+N-001 |  
 336 +| d-003 — exatamente R$ 100,00 sem nota | transporte, 06/07, R
+$ 100,00, sem nota | não exige nota; **parcial**, R$ 80,00; li
+mite 80 | RN-002, RN-001 |  
 337 +| d-004 — R$ 0,01 acima da fronteira, sem nota | transporte, 0
+6/07, R$ 100,01, sem nota | **recusada**, "nota fiscal ausente
+"; não consome o limite de 06/07 | RN-002 |  
 338 +| d-005 — categoria não prevista | coworking, 07/07, R$ 89,00
+| **recusada**, "categoria fora da política" | RN-009 |  
 339 +| d-006 — original de um par duplicado | alimentação, 09/07, R
+$ 54,90 | **integral**, R$ 54,90; limite 60 | RN-004, RN-001 |
340 +| d-007 — cópia exata de d-006 | alimentação, 09/07, R$ 54,90
+| **recusada**, "duplicata de d-006" | RN-004 |  
 341 +| d-008 — data fora do período | alimentação, 15/04, R$ 41,00
+| **recusada**, "fora do período de competência" | RN-003 |  
 342 +| d-009 — estorno (valor negativo) | transporte, 11/07, −R$ 45
+,00 | **recusada**, "valor não positivo"; não abate nenhum tot
+al | RN-005 |  
 343 +| d-010 — hospedagem com 2 diárias na descrição | hospedagem,
+14/07, R$ 480,00, com nota, "2 diarias" | N = 2; **integral**, + R$ 480,00; limite 750; em viagem | RN-006, RN-007 |  
 344 +| d-011 — mais de 2 casas decimais, em viagem | alimentação, 1
+5/07, R$ 33,333 | **integral**, R$ 33,33; limite 90; em viagem + | RN-008, RN-007 |  
 345 +| d-012 — sábado | alimentação, 18/07, R$ 47,20 | **integral**
+, R$ 47,20; limite 60 | AMB-014, RN-001 |  
 346 +| d-013 — hospedagem sem nota | hospedagem, 22/07, R$ 690,00,
+sem nota, "3 noites" | **recusada**, "nota fiscal ausente"; nã
+o gera datas em viagem | RN-002, RN-007 |  
 347 +| d-014 — categoria em maiúsculas, último dia do período | `AL
          +IMENTACAO`, 31/07, R$ 61,00 | categoria `alimentacao`; **parci
+al**, R$ 60,00; limite 60 | RN-009, RN-003, RN-001 |  
 348  
 349 +**Totais esperados:** `valor_reembolsado` = **R$ 815,43**; int
+egral 5, parcial 3, recusada 6.  
 350 +  
 351 ## 8. Ordem de aplicação das regras
352  
 353 O cálculo ocorre em duas fases. Uma despesa é **elegível** qua
ndo não é recusada por nenhuma regra da fase 1; só despesas el
egíveis participam da fase 2.

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 7 lines, removed 5 lines
382  
 383 O sistema está pronto quando:
384  
 385 -- [ ] <critério verificável, sem ler código>  
 386 -- [ ] <...>  
 385 +- [ ] Executado com `exemplos/despesas-exemplo.json`, produz e
+xatamente os resultados por despesa e os totais da seção 7.  
 386 +- [ ] Todos os casos listados em **Aceite** de RN-001 a RN-009 + e da seção 8 produzem o resultado descrito.  
 387 +- [ ] A saída segue o schema da seção 4: todos os campos prese
+ntes, despesas na ordem da entrada, `totais.valor_reembolsado` + igual à soma dos `valor_reembolsado`.  
 388 +- [ ] Toda despesa `recusada` tem `valor_reembolsado` R$ 0,00
+e pelo menos um motivo; toda despesa `parcial` tem exatamente
+um motivo; toda despesa `integral` tem a lista de motivos vazi
+a.  
 389 +- [ ] Executar duas vezes a mesma entrada produz saídas idênti
+cas, e reordenar as despesas na entrada não altera nenhum `val
          +or_reembolsado`.  
 390 +- [ ] Entrada fora do formato da seção 4 não gera saída e info
+rma o erro.  
 391 +- [ ] Entrada com lista de despesas vazia gera saída com `desp
          +esas` vazio e totais zerados.  
 392  
 393 ## 10. O que fica em aberto
394  
 390 -<Perguntas que você não conseguiu responder e a decisão provis
-ória que tomou.  
 391 -Honestidade aqui vale ponto — spec que finge não ter buraco é
-spec que esconde buraco.>  
 392 -  
 395 - **Compras legítimas idênticas são tratadas como duplicata.**
Duas despesas reais com todos os campos iguais (ex.: dois caf
és de R$ 8,00, mesma descrição, mesma padaria, mesmo dia) não
podem ser distinguidas, porque a entrada não traz horário nem
número da nota. **Decisão provisória:** aplica-se AMB-008 — a
segunda é recusada como duplicata. O colaborador pode relançá-
la com descrição que a diferencie. Resolver de verdade exige u
m identificador da nota na entrada.

⏺ Update(specs/001-motor-reembolso/spec.md)
⎿  Added 2 lines
393 ## 10. O que fica em aberto
394  
 395 - **Compras legítimas idênticas são tratadas como duplicata.**
Duas despesas reais com todos os campos iguais (ex.: dois caf
és de R$ 8,00, mesma descrição, mesma padaria, mesmo dia) não
podem ser distinguidas, porque a entrada não traz horário nem
número da nota. **Decisão provisória:** aplica-se AMB-008 — a
segunda é recusada como duplicata. O colaborador pode relançá-
la com descrição que a diferencie. Resolver de verdade exige u
m identificador da nota na entrada.
396 +- **Viagem sem hospedagem não é detectada.** Uma viagem de ida + e volta no mesmo dia, sem pernoite, não gera datas em viagem
+(RN-007), e os limites não são ampliados. **Decisão provisória
+:** aceita-se a limitação; resolver exige um campo de viagem n
+a entrada.  
 397 +- **O limite de R$ 250,00 por diária nunca é aplicado isoladam
+ente.** Consequência de AMB-011: toda hospedagem caracteriza v
+iagem, então o limite efetivo é sempre R$ 375,00. **Decisão pr
+ovisória:** mantido; se o RH esclarecer que a ampliação não va
+le para a própria hospedagem, basta alterar RN-006.

⏺ Bash(grep -n "<\.\.\.>\|<Duas\|<Uma\|<Lista\|<critério\|<A
política\|<Perguntas" specs/001-motor-reembolso/spec.md; python3 -c
"print(round(38+22+80+54.90+480+33.33+…)
⎿  (No output)

⏺ A spec está completa, sem nenhum texto-guia do template sobrando, e foi
commitada como ef86dbc docs(spec): completa problema, objetivo, escopo, casos
de borda e critérios de aceite (v1.0).

O que escrevi

- Seções 1 e 2: problema e objetivo, em 2 ou 3 frases cada.
- Seção 3, fora de escopo: agora com 9 itens. Os novos dizem que o sistema não
  aprova nem paga, não guarda histórico entre execuções, não busca o estorno
  original, não valida a nota, não trata moeda estrangeira e processa um
  colaborador por execução.
- Seção 7, casos de borda: os 14 itens do exemplo com o resultado esperado de
  cada um. Os totais esperados são R$ 815,43, com 5 despesas integrais, 3
  parciais e 6 recusadas.
- Seção 9, critérios de aceite: 7 critérios verificáveis, incluindo
  determinismo (reordenar a entrada não muda os valores) e o caso de lista
  vazia.
- Seção 10, em aberto: acrescentei a viagem sem pernoite, que não é detectada,
  e o limite de 250 que nunca é aplicado.

⚠️ Um erro que encontrei no schema que você aprovou

Ao calcular a seção 7, vi que a definição de status que eu tinha escrito
estava errada. integral era definido como "reembolsado = original". O d-011
tem valor original 33,333 e reembolso 33,33, então sairia como parcial só por
causa do arredondamento, sem ter sofrido nenhum corte. Corrigi a definição:
agora parcial significa "cortado por limite", e a diferença de arredondamento
não conta.

Esse erro é um bom candidato para a seção Discernimento do relatório. Eu
propus o schema, você aprovou, e o erro só apareceu quando calculamos um caso
real.

Precisa da sua revisão

1. Confira a seção 7 em spec.md (specs/001-motor-reembolso/spec.md),
   principalmente os valores de d-001, d-003 e d-014. Ela vai virar o teste de
   ponta a ponta, e é onde erros meus fazem mais estrago.
2. Marquei a spec como "Status: aprovada" já no commit. Se ainda quiser
   revisar antes, me diga e eu volto para "rascunho".
3. A rejeição de entrada malformada (comentei na mensagem anterior) continua
   valendo, a menos que você prefira outra regra.

Depois disso, o próximo passo é o plan.md, com a stack e a arquitetura. Antes
de começar, rode /export desta sessão para docs/sessions/01-especificacao.md,
porque ela já tem bastante material para o relatório. Qual linguagem você quer
usar?
