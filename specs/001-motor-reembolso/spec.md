# Spec — Motor de Cálculo de Reembolso

**Versão:** 1.0 · **Status:** rascunho · **Última alteração:** `<data>`

> **Regra de ouro deste arquivo:** ele descreve o QUÊ e o PORQUÊ. Nenhuma linha
> aqui pode citar linguagem, biblioteca, classe, função ou estrutura de pasta.
> Se apareceu solução, o lugar dela é o `plan.md`.
>
> **Teste de aceitação da própria spec:** uma pessoa que nunca viu o projeto
> consegue, lendo só este arquivo, verificar se o sistema está correto?

---

## 1. Problema

<Duas ou três frases. Quem sofre hoje, com o quê, e por quê isso custa caro.>

## 2. Objetivo

<Uma frase. O que passa a ser verdade quando isto existir.>

## 3. Fora de escopo

<Lista explícita. Este bloco vale ponto: ele impede o agente de inventar feature
e impede você de mover a trave depois.>

- Não controla prazo de entrega de nota fiscal nem mantém despesas em estado "pendente"; uma despesa recusada por falta de nota só é reavaliada se for lançada novamente em um novo cálculo (AMB-006).
- Não faz `<...>`

## 4. Entrada e saída

**Entrada:** conforme `exemplos/despesas-exemplo.json`. Campos e significado:

| Campo | Tipo | Significado | Obrigatório |
|---|---|---|---|
| | | | |

**Saída:** definida por mim. Estrutura e significado de cada campo:

| Campo | Tipo | Significado |
|---|---|---|
| | | |

<Cole um exemplo de saída para uma entrada pequena. Vale mais que três parágrafos.>

## 5. Regras de negócio

Cada regra recebe um ID (`RN-001`, ...). As tasks vão referenciar esses IDs.

### RN-001 — Limite diário por categoria (alimentação e transporte urbano)

**Regra:** para cada combinação de data e categoria, soma-se o valor das despesas elegíveis (ver seção 8). Limites: alimentação R$ 60,00; transporte urbano R$ 80,00. Se a soma for menor ou igual ao limite, todas as despesas do grupo são reembolsadas integralmente. Se exceder, o limite é distribuído do menor valor para o maior (desempate por `id` crescente): cada despesa recebe o seu valor integral enquanto houver saldo, a que não couber inteira recebe apenas o saldo restante e as seguintes recebem R$ 0,00. Despesas com reembolso menor que o valor original são marcadas como reembolsadas parcialmente, com o motivo "limite diário excedido".
**Origem:** política do RH, itens 1, 2 e 4. Decisões AMB-001, AMB-002, AMB-003.
**Aceite:**
- Alimentação em 03/07: d-001 (R$ 72,50) e d-002 (R$ 38,00) → d-002 recebe R$ 38,00, d-001 recebe R$ 22,00 (parcial); total do dia R$ 60,00.
- Uma única despesa de alimentação de R$ 61,00 no dia → recebe R$ 60,00 (parcial).
- Uma única despesa de alimentação de R$ 60,00 no dia → recebe R$ 60,00 (integral).
- Alimentação R$ 50,00 e transporte R$ 70,00 na mesma data → ambas integrais (limites independentes).

### RN-002 — Nota fiscal obrigatória acima de R$ 100,00

**Regra:** toda despesa cujo valor original seja estritamente maior que R$ 100,00 e que não tenha nota fiscal é **recusada integralmente** (reembolso R$ 0,00), com o motivo "nota fiscal ausente". Despesas com valor menor ou igual a R$ 100,00 não exigem nota. A avaliação é feita por despesa, sem considerar as demais do dia. Uma despesa recusada por esta regra não consome o limite diário (RN-001).
**Origem:** política do RH, item 5. Decisões AMB-004, AMB-005, AMB-006.
**Aceite:**
- d-003: transporte R$ 100,00 sem nota → não exige nota; segue para o limite diário.
- d-004: transporte R$ 100,01 sem nota → recusada, R$ 0,00, motivo "nota fiscal ausente".
- Dia 06/07 (d-003 + d-004): apenas d-003 entra no limite de transporte → d-003 recebe R$ 80,00 (parcial); total do dia R$ 80,00.
- Transporte R$ 60,00 + R$ 55,00 no mesmo dia, ambas sem nota → nenhuma exige nota; soma R$ 115,00 → limite de R$ 80,00 distribuído conforme RN-001.
- Despesa de R$ 150,00 com nota → não é recusada por esta regra.

### RN-003 — ...

---

## 6. Ambiguidades identificadas e decisões

> **Esta seção é o coração da spec e vale a maior parte dos 25 pontos do critério 1.**
> Uma ambiguidade que você resolveu no código sem registrar aqui conta como
> não resolvida.

### AMB-001 — Unidade de aplicação do limite diário

**Texto original do RH:** "Alimentação tem limite de R$ 60 por dia." / "Transporte urbano tem limite de R$ 80 por dia."
**O que não está claro:** o limite pode valer (a) para cada despesa isoladamente ou (b) para a soma das despesas do mesmo dia. Exemplo: d-001 (R$ 72,50) + d-002 (R$ 38,00) em 03/07 resultam em R$ 98,00 na leitura (a) e R$ 60,00 na leitura (b).
**Decisão:** o limite se aplica à **soma das despesas de uma mesma categoria numa mesma data**. Categorias diferentes no mesmo dia têm limites independentes.
**Justificativa:** a política diz "por dia", não "por despesa" ou "por refeição"; ler como por despesa permitiria multiplicar o teto fracionando gastos.
**Regra afetada:** RN-001

### AMB-002 — Distribuição do limite diário entre as despesas do dia

**Texto original do RH:** (silêncio) — consequência de AMB-001.
**O que não está claro:** quando a soma do dia excede o limite, o valor reembolsado precisa ser atribuído a cada despesa. Leituras possíveis: (a) proporcional ao valor de cada item, (b) na ordem em que aparecem na entrada, (c) dos menores para os maiores. Exemplo em 03/07 (limite R$ 60): (a) d-001 R$ 39,37 / d-002 R$ 20,63; (b) d-001 R$ 60,00 / d-002 R$ 0,00; (c) d-001 R$ 22,00 / d-002 R$ 38,00.
**Decisão:** o limite é consumido **do menor valor para o maior**. Em caso de valores iguais, desempata pelo `id` em ordem crescente. O último item a caber recebe apenas o saldo restante do limite.
**Justificativa:** maximiza a quantidade de despesas pagas integralmente e o resultado não depende da ordem em que as despesas foram lançadas.
**Regra afetada:** RN-001

### AMB-003 — Significado de "reembolsadas parcialmente"

**Texto original do RH:** "Despesas acima do limite são reembolsadas parcialmente."
**O que não está claro:** (a) paga-se até o limite e corta-se apenas o excedente, ou (b) a despesa que ultrapassa o limite é recusada inteira. Exemplo: um jantar de R$ 61,00 sozinho no dia recebe R$ 60,00 em (a) e R$ 0,00 em (b).
**Decisão:** paga-se **até o limite**; apenas o excedente é cortado.
**Justificativa:** é a leitura literal de "parcialmente"; recusar o item inteiro seria "não reembolsadas".
**Regra afetada:** RN-001

### AMB-004 — Fronteira de "acima de R$ 100" para nota fiscal

**Texto original do RH:** "Nota fiscal é obrigatória acima de R$ 100."
**O que não está claro:** se uma despesa de exatamente R$ 100,00 exige nota. Exemplo: d-003 (R$ 100,00) e d-004 (R$ 100,01), ambas sem nota.
**Decisão:** a nota é exigida apenas quando o valor é **estritamente maior que R$ 100,00**. R$ 100,00 não exige; R$ 100,01 exige.
**Justificativa:** "acima de" em português indica comparação estrita; se o RH quisesse incluir 100 teria escrito "a partir de".
**Regra afetada:** RN-002

### AMB-005 — Unidade de aplicação da exigência de nota fiscal

**Texto original do RH:** "Nota fiscal é obrigatória acima de R$ 100."
**O que não está claro:** se o valor comparado é (a) o de cada despesa individualmente ou (b) a soma das despesas da mesma categoria no dia, como ocorre com o limite (AMB-001). Exemplo: d-003 (R$ 100,00) + d-004 (R$ 100,01) em 06/07 somam R$ 200,01 — em (a) só d-004 exige nota; em (b) ambas.
**Decisão:** a exigência é avaliada **por despesa**, comparando o valor original de cada uma, independentemente das demais do dia.
**Justificativa:** nota fiscal é o comprovante de uma compra específica; a soma do dia não corresponde a nenhum documento que o colaborador possa apresentar.
**Regra afetada:** RN-002

### AMB-006 — Consequência da ausência de nota fiscal exigida

**Texto original do RH:** "Nota fiscal é obrigatória acima de R$ 100."
**O que não está claro:** o que acontece com a despesa sem nota: (a) é recusada inteira, (b) é paga até R$ 100,00 e o excedente glosado, ou (c) fica pendente aguardando a nota. A política também não define prazo para entrega da nota, e a entrada só informa se a nota existe (sim/não).
**Decisão:** a despesa é **recusada integralmente** e não consome o limite diário da categoria.
**Justificativa:** "obrigatória" significa condição para o reembolso; sem prazo definido pelo RH, um estado "pendente" não teria fim — o motor avalia a situação no momento do cálculo.
**Regra afetada:** RN-002

<A política tem no mínimo oito. Se você achou menos, releia
`exemplos/despesas-exemplo.json` — cada item daquele arquivo existe por um motivo.>

---

## 7. Casos de borda

| Caso | Entrada | Comportamento esperado | Regra |
|---|---|---|---|
| | | | |

## 8. Ordem de aplicação das regras

<Quando duas regras incidem sobre a mesma despesa, qual vale primeiro? A ordem
muda o resultado. Declarar isso separa spec boa de spec média.>

## 9. Critérios de aceite

O sistema está pronto quando:

- [ ] <critério verificável, sem ler código>
- [ ] <...>

## 10. O que fica em aberto

<Perguntas que você não conseguiu responder e a decisão provisória que tomou.
Honestidade aqui vale ponto — spec que finge não ter buraco é spec que esconde buraco.>
