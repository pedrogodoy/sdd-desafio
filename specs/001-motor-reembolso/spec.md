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

- Não faz `<...>`
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

### RN-002 — ...

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

### AMB-002 — ...

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
