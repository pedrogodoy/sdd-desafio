# Relatório — Desafio SDD

**Aluno:** `<nome>` · **Repositório:** `<link>` · **Data:** `<data>`

> Isto não é redação. São **evidências**. Toda afirmação deve vir acompanhada de
> arquivo, hash de commit ou trecho de sessão exportada. Um parágrafo bonito sem
> evidência vale menos que uma frase curta com um hash.
>
> Vale 20 dos 100 pontos, e é a seção que mais separa notas.

---

## Registro das sessões (`docs/sessions/`)

*Como ler os exports e onde estão as lacunas e sobreposições — declaradas aqui
em vez de corrigidas por reescrita (FAQ: "histórico honesto imperfeito vale mais
que histórico reescrito").*

Todo o trabalho até agora aconteceu em **uma única conversa contínua** do Claude
Code, exportada em pontos de parada. Por isso os arquivos não são sessões
independentes:

| Arquivo | Cobre | Como foi gerado | Commit |
|---|---|---|---|
| `01-especificacao.md` | início → spec v1.0 aprovada | `/export` | `fcfb72a` |
| `02-plan-tasks-setup.md` | **repete a 01 inteira** (linhas 1–~2835) e segue até plan, tasks e T-001 (a partir da linha ~2836, "parece que a spec ficou fora do docs") | `/export` | `b6b7741` |
| `02b-fundacao.md` | escolha do modo de revisão → T-002 e T-003 | **reconstruído do `.jsonl`** da sessão | `ce6bf2f` |
| `03-regras-motor.md` | revisão da Fundação → T-004 a T-014, T-018, D-001 a D-003 | `/export` | `ce6bf2f` |
| `04-saida-cli.md` | revisão da fase 3 → T-015 a T-017 (sessão nova) | `/export` | `e3ffefe` |

**Sobreposição 01 → 02.** O `/export` grava a conversa inteira, não só o trecho
desde o export anterior. Mantive a 02 como saiu, sem cortar a parte repetida.

**Lacuna 02 → 03 e como foi recuperada.** Entre os dois exports houve uma
compactação de contexto; o `/export` seguinte (03) só trouxe o que veio depois
dela. O trecho intermediário — minha escolha do modo de revisão ("b"), a
implementação de T-002/T-003 e o ajuste do plan (`815377e`) — não estava em
nenhum export. Percebi ao conferir as emendas: a 02 terminava na pergunta "por
task (A) ou por fase (B)?" e a 03 começava na revisão da Fundação. Recuperei o
trecho do `.jsonl` da sessão (alternativa prevista no FAQ) com um script que
mantém as mensagens completas e trunca comandos/resultados de ferramenta com
indicação do que foi omitido; o cabeçalho de `02b-fundacao.md` descreve o método.
As emendas 02→02b→03 foram conferidas: nada repetido, nada faltando.

**Privacidade.** Em todos os arquivos, o caminho pessoal (`/Users/<usuário>/` e a
variante `-Users-<usuário>-` em caminhos temporários) foi trocado por `~/` /
`-Users-USUARIO-`; conferido por busca que retornou zero ocorrências.

**Daqui para frente:** uma sessão nova por fase, com `/export` ao fim de cada uma,
para que cada arquivo contenha só a sua fase.

---

## Delegação

*O que você fez, o que o Claude fez, e por que dividiu assim.*

**A divisão:**

| Atividade | Quem | Por quê |
|---|---|---|
| Identificar ambiguidades | | |
| Decidir as ambiguidades | | |
| Escrever a spec | | |
| Desenhar a arquitetura | | |
| Implementar | | |
| Escrever testes | | |
| Absorver o envelope | | |

**Onde deleguei e me arrependi:**

**Onde não deleguei e deveria ter delegado:**

**Usei subagentes / skills / MCP / hooks?** <se sim: o quê, como configurou,
valeu a pena. Se não: por que não.>

---

## Descrição

*Como você transformou requisito ambíguo em requisito verificável.*

Pegue **um** requisito ambíguo da política do RH e mostre a evolução:

**Versão 1 (minha primeira escrita):**
> ```
> <cole>
> ```

**Versão final:**
> ```
> <cole>
> ```

**O que estava ambíguo:**

**Como percebi:** <testando? o Claude perguntou? bateu o olho no JSON de exemplo
e não soube dizer qual era a resposta certa?>

**Commit da mudança:** `<hash>`

---

## Discernimento

*Onde o Claude errou e você pegou.*

> **Sem um caso concreto e verificável, esta seção vale zero.** Não existe projeto
> de dois dias em que o modelo acertou tudo. A ausência do caso não prova que o
> modelo foi perfeito — prova que ninguém estava conferindo.

### Caso 1

**O que ele propôs:**

**Por que estava errado:**

**Como eu detectei:** <li o diff? o teste quebrou? só percebi dias depois?
"como detectei" é a informação mais útil deste relatório inteiro>

**O que eu fiz:**

**Onde está a evidência:** `docs/sessions/<arquivo>`, trecho `<...>`

### Caso 2 *(opcional)*

**Padrão que eu notei:** <em que tipo de tarefa ele erra mais? teve um sinal
recorrente que passou a te deixar em alerta?>

---

## Diligência

*O que você verificou antes de aceitar.*

**Meu procedimento de verificação:** <o que você de fato fazia — não o que
deveria ter feito>

**Li o diff inteiro em que porcentagem das entregas?** <seja honesto; a
honestidade aqui vale ponto e a maquiagem custa>

**O que aceitei sem verificar direito, e o que me custou:**

**Testes: quem escreveu, e como você sabe que eles testam a coisa certa?**
<teste escrito pelo mesmo agente que escreveu o código passa com muita facilidade>

---

## O envelope

*A mudança de requisito do Dia 2.*

**Quantos arquivos toquei na mão:** `<n>`
**Quanto tempo levou:** `<...>`
**Diff de absorção:** `<n> arquivos, +<n>/-<n> linhas` (`git diff <hash-antes> HEAD --stat`)

**Absorveu de graça:** <o que a arquitetura já suportava e por quê>

**Resistiu:** <o que teve que ser quebrado e por quê>

**Ordem em que fiz:** <spec → tasks → código? ou código → spec? seja honesto:
a correção vê os timestamps dos commits de qualquer forma>

**Se eu tivesse escrito a spec original sabendo desta mudança:**

**O que a spec me poupou, em concreto:**

---

## Fechamento

**Para qual tamanho de projeto isto valeu a pena?**

**Para qual não valeria?**

**O que eu faria diferente:**

**A coisa mais desconfortável que aprendi sobre como eu trabalho com IA:**
