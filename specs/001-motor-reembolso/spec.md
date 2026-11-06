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
- Não aplica restrição por dia da semana nem por feriado (AMB-014).
- Não faz `<...>`

## 4. Entrada e saída

**Entrada:** conforme `exemplos/despesas-exemplo.json`. Campos e significado:

| Campo | Tipo | Significado | Obrigatório |
|---|---|---|---|
| `colaborador.id` | texto | identificador do colaborador | sim |
| `colaborador.nome` | texto | nome do colaborador | sim |
| `colaborador.centro_custo` | texto | centro de custo | sim |
| `periodo.competencia` | texto `AAAA-MM` | mês de competência | sim |
| `periodo.inicio` | data `AAAA-MM-DD` | primeiro dia do período (inclusive) | sim |
| `periodo.fim` | data `AAAA-MM-DD` | último dia do período (inclusive) | sim |
| `despesas[]` | lista | despesas a avaliar (pode ser vazia) | sim |
| `despesas[].id` | texto | identificador único da despesa | sim |
| `despesas[].data` | data `AAAA-MM-DD` | data em que a despesa ocorreu; para hospedagem, a data de entrada | sim |
| `despesas[].categoria` | texto | categoria informada pelo colaborador (normalizada por RN-009) | sim |
| `despesas[].descricao` | texto | descrição livre; para hospedagem, fonte do número de diárias (RN-006) | sim |
| `despesas[].fornecedor` | texto | estabelecimento | sim |
| `despesas[].valor` | número | valor em reais, como informado (pode ter mais de 2 casas ou ser negativo) | sim |
| `despesas[].tem_nota_fiscal` | booleano | se há nota fiscal | sim |

Entrada que não segue este formato (campo obrigatório ausente, tipo errado, data inválida ou `id` repetido) é **rejeitada por inteiro**: nenhuma saída é gerada e o erro informa o problema encontrado.

**Saída:** um único documento com a mesma estrutura de `colaborador` e `periodo` da entrada, a avaliação de cada despesa e os totais.

| Campo | Tipo | Significado |
|---|---|---|
| `colaborador` | objeto | cópia do `colaborador` da entrada |
| `periodo` | objeto | cópia do `periodo` da entrada |
| `despesas[]` | lista | uma entrada por despesa da entrada, **na mesma ordem** |
| `despesas[].id` | texto | `id` da despesa |
| `despesas[].data` | data | `data` da despesa |
| `despesas[].categoria` | texto | categoria **normalizada** (RN-009) |
| `despesas[].valor_original` | número | `valor` exatamente como veio na entrada |
| `despesas[].valor_reembolsado` | número | valor a reembolsar, com 2 casas (RN-008); R$ 0,00 se recusada |
| `despesas[].status` | texto | `integral` (reembolsado = original), `parcial` (0 < reembolsado < original) ou `recusada` |
| `despesas[].motivos` | lista de textos | vazia se `integral`; se `parcial`, "limite diário excedido" ou "limite de hospedagem excedido"; se `recusada`, todos os motivos da fase 1 (seção 8) |
| `despesas[].limite_aplicado` | número ou nulo | limite que valeu para a despesa: diário da categoria (60, 90, 80 ou 120) ou de hospedagem (N × 375); nulo se recusada |
| `despesas[].em_viagem` | booleano | se a data da despesa é uma data em viagem (RN-007) |
| `despesas[].diarias` | inteiro ou nulo | N considerado (RN-006); nulo se não for hospedagem |
| `totais.valor_reembolsado` | número | soma dos `valor_reembolsado` de todas as despesas |
| `totais.quantidade.integral` | inteiro | número de despesas com status `integral` |
| `totais.quantidade.parcial` | inteiro | número de despesas com status `parcial` |
| `totais.quantidade.recusada` | inteiro | número de despesas com status `recusada` |

**Exemplo** (entrada com apenas d-001, d-002 e d-005):

```json
{
  "colaborador": { "id": "c-0417", "nome": "Marina Volpi", "centro_custo": "CC-ENG-PLATAFORMA" },
  "periodo": { "competencia": "2026-07", "inicio": "2026-07-01", "fim": "2026-07-31" },
  "despesas": [
    {
      "id": "d-001", "data": "2026-07-03", "categoria": "alimentacao",
      "valor_original": 72.50, "valor_reembolsado": 22.00,
      "status": "parcial", "motivos": ["limite diário excedido"],
      "limite_aplicado": 60.00, "em_viagem": false, "diarias": null
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
```

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

### RN-003 — Período de competência

**Regra:** uma despesa só é elegível se a sua `data` estiver entre `periodo.inicio` e `periodo.fim`, **ambos inclusive**. Despesas fora desse intervalo são **recusadas integralmente** (reembolso R$ 0,00), aparecem na saída com o motivo "fora do período de competência" e não consomem limite diário.
**Origem:** política do RH, item 7. Decisão AMB-007.
**Aceite:**
- d-008: data 15/04, período 01/07–31/07 → recusada, R$ 0,00, motivo "fora do período de competência".
- Despesa com data igual a `periodo.inicio` (01/07) → elegível.
- Despesa com data igual a `periodo.fim` (31/07) → elegível.
- Despesa com data 01/08 → recusada.

### RN-004 — Duplicatas

**Regra:** duas ou mais despesas são duplicatas quando todos os campos, exceto `id`, são iguais: `data`, `categoria`, `descricao`, `fornecedor`, `valor` e `tem_nota_fiscal`. Em cada grupo de duplicatas, a despesa de menor `id` segue normalmente para as demais regras; as outras são **recusadas integralmente** (reembolso R$ 0,00), com o motivo "duplicata de `<id mantido>`", e não consomem limite diário.
**Origem:** política do RH, item 8. Decisão AMB-008.
**Aceite:**
- d-006 e d-007 (idênticas) → d-006 segue para o limite e recebe R$ 54,90; d-007 recusada, R$ 0,00, motivo "duplicata de d-006".
- Duas despesas iguais exceto pela descrição ("Almoço" e "Almoço equipe") → não são duplicatas; ambas seguem para o limite.
- Três despesas idênticas d-020, d-021, d-022 → d-020 mantida; d-021 e d-022 recusadas como "duplicata de d-020".

### RN-005 — Valores não positivos

**Regra:** despesa com `valor` menor ou igual a R$ 0,00 é **recusada** (reembolso R$ 0,00), com o motivo "valor não positivo". Ela não entra na soma do limite diário nem abate o total do período.
**Origem:** silêncio da política. Decisão AMB-009.
**Aceite:**
- d-009: transporte −R$ 45,00 em 11/07 → recusada, R$ 0,00, motivo "valor não positivo"; total do período não é reduzido.
- Despesa de R$ 0,00 → recusada com o mesmo motivo.
- Transporte R$ 70,00 e −R$ 20,00 no mesmo dia → a de R$ 70,00 recebe R$ 70,00 (o negativo não altera a soma do dia).

### RN-006 — Limite de hospedagem por diária

**Regra:** cada despesa de hospedagem é avaliada isoladamente (não há soma por dia). O número de diárias **N** é obtido da `descricao`: o primeiro número inteiro escrito em algarismos, maior que zero, seguido (com ou sem espaço) de uma das palavras "diária", "diárias", "noite" ou "noites" — sem diferenciar maiúsculas/minúsculas nem acentos. Se não houver esse padrão, N = 1. O limite base é N × R$ 250,00; como toda hospedagem caracteriza viagem (RN-007), o limite aplicado é sempre o ampliado, **N × R$ 375,00**. Acima dele, paga-se o limite e o excedente é cortado (AMB-003). A saída informa o N considerado.
**Origem:** política do RH, itens 3, 4 e 6. Decisões AMB-003, AMB-010, AMB-011.
**Aceite:**
- d-010: "Hotel Rio - 2 diarias", R$ 480,00, com nota → N = 2, limite R$ 750,00 → recebe R$ 480,00 (integral).
- "Hotel - 2 diarias", R$ 800,00, com nota → limite R$ 750,00 → recebe R$ 750,00 (parcial).
- "Pousada", R$ 400,00, com nota → sem padrão, N = 1 → recebe R$ 375,00 (parcial).
- "Hotel duas diarias", R$ 400,00, com nota → número por extenso não é reconhecido, N = 1 → recebe R$ 375,00 (parcial).
- d-013: "Airbnb 3 noites", R$ 690,00, sem nota → recusada por RN-002 antes do limite (N = 3 não chega a ser aplicado).

### RN-007 — Ampliação de limites em viagem

**Regra:** o colaborador é considerado **em viagem** em cada data coberta por uma hospedagem **não recusada** (integral ou parcialmente reembolsada): da `data` da hospedagem até `data` + N dias, inclusive (o dia de check-out conta). Nessas datas, os limites diários de alimentação e transporte urbano são ampliados em 50%: alimentação R$ 90,00 e transporte urbano R$ 120,00. Hospedagem recusada por qualquer regra não caracteriza viagem. Hospedagens que se sobrepõem simplesmente somam suas datas cobertas (a ampliação não acumula). A saída indica, por despesa, se o limite ampliado foi aplicado.
**Origem:** política do RH, item 6. Decisão AMB-011.
**Aceite:**
- d-010 (14/07, N = 2, aceita) → em viagem em 14/07, 15/07 e 16/07.
- d-011: café de R$ 33,333 em 15/07 → limite de alimentação do dia R$ 90,00 → integral (R$ 33,33 após RN-008).
- Alimentação de R$ 85,00 em 16/07 (check-out de d-010) → integral (limite R$ 90,00).
- Alimentação de R$ 85,00 em 17/07 → R$ 60,00 (parcial; fora da viagem).
- d-013 (22/07, recusada por falta de nota) → 22/07 a 25/07 **não** são dias de viagem; alimentação de R$ 70,00 em 23/07 → R$ 60,00 (parcial).

### RN-008 — Precisão e arredondamento

**Regra:** todas as comparações e cálculos (limites, nota fiscal, soma do dia, distribuição do saldo) usam o `valor` **exatamente como informado na entrada**, sem arredondamento. Só o **valor reembolsado de cada despesa** é arredondado para 2 casas decimais, uma única vez, ao final, pelo critério **meio para o par** (quando a parte descartada é exatamente meio centavo, arredonda-se para o centavo par). Os totais da saída são a soma dos valores reembolsados já arredondados de cada despesa, para que a saída sempre feche item a item. O valor original é exibido na saída como veio na entrada.
**Origem:** silêncio da política. Decisão AMB-012.
**Aceite:**
- d-011: R$ 33,333 → reembolso R$ 33,33.
- Reembolso calculado de R$ 10,125 → R$ 10,12; de R$ 10,135 → R$ 10,14.
- Alimentação R$ 33,333 + R$ 40,00 no mesmo dia (limite R$ 60,00) → a de R$ 33,333 recebe R$ 33,33; a de R$ 40,00 recebe o saldo exato de R$ 26,667 → R$ 26,67; total do dia R$ 60,00.
- Despesa de R$ 100,004 sem nota → exige nota (100,004 > 100,00) e é recusada, embora R$ 100,004 arredondado fosse R$ 100,00.

### RN-009 — Categorias reembolsáveis

**Regra:** as únicas categorias reembolsáveis são `alimentacao`, `transporte_urbano` e `hospedagem`. Antes da comparação, a `categoria` informada é normalizada: maiúsculas e minúsculas não se diferenciam e acentos são desconsiderados (`ALIMENTACAO`, `Alimentação` e `alimentacao` são a mesma categoria). Nenhuma outra transformação é feita (espaços, hífens ou sinônimos não são reconhecidos). Despesa cuja categoria normalizada não seja uma das três é **recusada integralmente** (reembolso R$ 0,00), com o motivo "categoria fora da política", e não consome limite diário. A saída exibe a categoria normalizada.
**Origem:** política do RH, item 9. Decisão AMB-013.
**Aceite:**
- d-005: `coworking`, R$ 89,00 → recusada, R$ 0,00, motivo "categoria fora da política".
- d-014: `ALIMENTACAO`, R$ 61,00 em 31/07 → tratada como `alimentacao`; recebe R$ 60,00 (parcial).
- `Alimentação` (com acento e inicial maiúscula) → tratada como `alimentacao`.
- `transporte urbano` (espaço no lugar do sublinhado) → recusada como "categoria fora da política".

### RN-010 — ...

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

### AMB-007 — "Lançadas dentro do período de competência" sem data de lançamento

**Texto original do RH:** "Despesas devem ser lançadas dentro do período de competência."
**O que não está claro:** "lançada" remete à data de registro da despesa, mas a entrada só traz a data em que a despesa ocorreu (`data`). Leituras: (a) usar a data da despesa e exigir que esteja no período; (b) presumir que tudo o que está na entrada foi lançado no período, o que torna a regra inverificável. Também não está claro se os extremos do período são inclusivos, nem se a despesa fora do período deve ser recusada ou omitida. Exemplo: d-008 (15/04, "lançado com atraso") numa competência de julho; d-014 em 31/07, último dia.
**Decisão:** a regra é avaliada sobre a **data da despesa**, que deve estar entre `inicio` e `fim`, **inclusive**. Despesa fora do período é **recusada e listada na saída** com o motivo.
**Justificativa:** é o único dado disponível que torna a regra verificável; listar a recusa em vez de omitir mantém a saída auditável — o colaborador vê por que não recebeu.
**Regra afetada:** RN-003

### AMB-008 — Critério e tratamento de duplicatas

**Texto original do RH:** "Duplicatas devem ser tratadas."
**O que não está claro:** (1) o que caracteriza uma duplicata — todos os campos iguais, ou apenas alguns (data, categoria, fornecedor, valor); (2) o que "tratar" significa — manter uma e recusar as demais, recusar todas, ou apenas sinalizar e pagar. Exemplo: d-006 e d-007 são idênticas exceto pelo `id`.
**Decisão:** duplicata exige **todos os campos iguais exceto `id`**. Mantém-se a de **menor `id`**; as demais são recusadas com referência à mantida.
**Justificativa:** critério estrito evita recusar compras legítimas repetidas (ex.: dois cafés na mesma padaria com descrições diferentes); manter uma garante que o gasto real seja pago uma única vez.
**Regra afetada:** RN-004

### AMB-009 — Despesas com valor negativo (estorno)

**Texto original do RH:** (silêncio) — a política não menciona valores negativos.
**O que não está claro:** um lançamento negativo pode ser (a) erro de lançamento a recusar, (b) crédito que abate a soma do dia na categoria, ou (c) crédito que abate o total do período. Exemplo: d-009, "Estorno de corrida cancelada", −R$ 45,00 em 11/07; a corrida original não está na entrada.
**Decisão:** valores menores ou iguais a zero são **recusados** e listados na saída com motivo; não afetam limites nem totais.
**Justificativa:** o motor calcula o que pagar ao colaborador, não um saldo; sem a despesa original no período, não há o que estornar, e abater créditos cobraria do colaborador algo que pode nunca ter sido reembolsado.
**Regra afetada:** RN-005

### AMB-010 — Número de diárias de uma hospedagem

**Texto original do RH:** "Hospedagem tem limite de R$ 250 por diária."
**O que não está claro:** a entrada não tem campo de número de diárias nem data de saída; cada lançamento traz só uma data e o valor total. Leituras: (a) extrair o número de diárias da descrição; (b) tratar cada lançamento como uma diária; (c) recusar ou mandar para revisão. Exemplo: d-010, "Hotel Rio - 2 diarias", R$ 480,00 → R$ 480,00 em (a), R$ 250,00 em (b).
**Decisão:** o número de diárias é **extraído da descrição** segundo o padrão definido em RN-006; sem padrão reconhecível, considera-se **1 diária**.
**Justificativa:** a descrição é a única fonte da informação na entrada e tratar toda estadia como uma diária penalizaria viagens legítimas; o padrão é estrito e o fallback é conservador, para que o resultado seja sempre previsível.
**Regra afetada:** RN-006

### AMB-011 — O que caracteriza "em viagem"

**Texto original do RH:** "Colaborador em viagem tem limites ampliados em 50%."
**O que não está claro:** a entrada não tem campo que indique viagem. Leituras: (a) a ampliação nunca se aplica por falta de dado; (b) a viagem é inferida a partir de outras despesas. Se inferida, ficam em aberto: quais dias contam (inclusive o de check-out?), se uma hospedagem recusada ainda caracteriza viagem e se a ampliação vale para a própria hospedagem.
**Decisão:** viagem é **inferida das hospedagens não recusadas**: datas de `data` a `data` + N (inclusive o check-out). Hospedagem recusada não caracteriza viagem. A ampliação vale para alimentação, transporte urbano e para a própria hospedagem (que, por definição, ocorre em viagem).
**Justificativa:** hospedagem é a única evidência de deslocamento na entrada; o dia de check-out tem gastos típicos de viagem (refeição, táxi ao aeroporto); sem comprovante válido da hospedagem, não há prova de viagem.
**Consequência assumida:** como toda hospedagem implica viagem, o limite de R$ 250,00 por diária nunca é aplicado isoladamente — o limite efetivo de hospedagem é sempre R$ 375,00 por diária.
**Regra afetada:** RN-006, RN-007

### AMB-012 — Precisão de valores e arredondamento

**Texto original do RH:** (silêncio) — a política não fala de casas decimais.
**O que não está claro:** valores com mais de 2 casas (d-011, R$ 33,333) podem ser arredondados (a) na entrada, antes das regras, ou (b) apenas no valor reembolsado final; e o critério pode ser (c) meio para cima ou (d) meio para o par. A escolha muda resultados em fronteiras (ex.: R$ 100,004 frente à regra de nota fiscal).
**Decisão:** cálculos com o **valor exato**; arredondamento **só no reembolso de cada despesa**, para 2 casas, **meio para o par**. Totais = soma dos reembolsos já arredondados.
**Justificativa:** não altera o valor que o colaborador declarou antes de aplicar as regras; meio para o par evita viés sistemático a favor de uma das partes quando há muitos lançamentos; somar itens arredondados garante que a saída feche sem diferenças de centavo.
**Regra afetada:** RN-008

### AMB-013 — Grafia da categoria

**Texto original do RH:** "Categorias fora da política não são reembolsáveis."
**O que não está claro:** se uma categoria escrita com grafia diferente (d-014, `ALIMENTACAO`) é a mesma categoria da política ou uma categoria desconhecida, a ser recusada.
**Decisão:** maiúsculas/minúsculas e acentos são **normalizados**; qualquer outra diferença de grafia torna a categoria desconhecida.
**Justificativa:** diferença de caixa ou acento não muda o significado da categoria e não deve custar o reembolso ao colaborador; ir além disso (sinônimos, espaços) exigiria adivinhar a intenção.
**Regra afetada:** RN-009

### AMB-014 — Despesas em fim de semana

**Texto original do RH:** (silêncio) — a política não menciona dias da semana.
**O que não está claro:** se despesas em sábado, domingo ou feriado têm alguma restrição. Exemplo: d-012, "Almoço de sábado - plantão", R$ 47,20.
**Decisão:** **sem restrição**; despesas de fim de semana seguem exatamente as mesmas regras dos demais dias.
**Justificativa:** criar uma restrição seria inventar uma regra que o RH não escreveu; plantão e viagem em fim de semana são situações legítimas.
**Regra afetada:** nenhuma (RN-001 aplica-se a qualquer data). Aceite: d-012 recebe R$ 47,20 (integral).

<A política tem no mínimo oito. Se você achou menos, releia
`exemplos/despesas-exemplo.json` — cada item daquele arquivo existe por um motivo.>

---

## 7. Casos de borda

| Caso | Entrada | Comportamento esperado | Regra |
|---|---|---|---|
| | | | |

## 8. Ordem de aplicação das regras

O cálculo ocorre em duas fases. Uma despesa é **elegível** quando não é recusada por nenhuma regra da fase 1; só despesas elegíveis participam da fase 2.

**Fase 1 — elegibilidade.** Toda despesa é avaliada por **todas** as regras abaixo, mesmo que já tenha falhado em uma anterior. Se falhar em qualquer uma, é recusada (reembolso R$ 0,00) e a saída lista **todos** os motivos, na ordem da tabela.

| # | Etapa | Regra | Motivo de recusa |
|---|---|---|---|
| 1 | Normaliza a categoria e verifica se é reembolsável | RN-009 | "categoria fora da política" |
| 2 | Verifica se o valor é positivo | RN-005 | "valor não positivo" |
| 3 | Verifica se a data está no período | RN-003 | "fora do período de competência" |
| 4 | Detecta duplicatas, comparando a categoria **já normalizada** | RN-004 | "duplicata de `<id>`" |
| 5 | Verifica nota fiscal acima de R$ 100,00 | RN-002 | "nota fiscal ausente" |

Como duplicatas têm todos os campos iguais, elas sempre têm o mesmo resultado nas etapas 1, 2, 3 e 5; por isso a etapa 4 pode considerar todas as despesas da entrada.

**Fase 2 — valor reembolsado** (apenas despesas elegíveis):

| # | Etapa | Regra |
|---|---|---|
| 6 | Determina as datas em viagem a partir das hospedagens elegíveis | RN-007 |
| 7 | Aplica o limite de hospedagem por diária | RN-006 |
| 8 | Aplica o limite diário de alimentação e transporte urbano, ampliado nas datas em viagem | RN-001, RN-007 |
| 9 | Arredonda o reembolso de cada despesa | RN-008 |

**Aceite:**
- Despesa de alimentação em 15/04 (fora do período), R$ 150,00, sem nota → recusada com os motivos "fora do período de competência" e "nota fiscal ausente", nessa ordem.
- `ALIMENTACAO` e `alimentacao` com todos os demais campos iguais → duplicatas (a de maior `id` é recusada).
- Hospedagem sem nota acima de R$ 100,00 → recusada na fase 1 e, portanto, não gera datas em viagem na etapa 6.

## 9. Critérios de aceite

O sistema está pronto quando:

- [ ] <critério verificável, sem ler código>
- [ ] <...>

## 10. O que fica em aberto

<Perguntas que você não conseguiu responder e a decisão provisória que tomou.
Honestidade aqui vale ponto — spec que finge não ter buraco é spec que esconde buraco.>

- **Compras legítimas idênticas são tratadas como duplicata.** Duas despesas reais com todos os campos iguais (ex.: dois cafés de R$ 8,00, mesma descrição, mesma padaria, mesmo dia) não podem ser distinguidas, porque a entrada não traz horário nem número da nota. **Decisão provisória:** aplica-se AMB-008 — a segunda é recusada como duplicata. O colaborador pode relançá-la com descrição que a diferencie. Resolver de verdade exige um identificador da nota na entrada.
