---
execution: subagent
agent: igor-ideia
model_tier: powerful
inputFile: squads/saude-sync-content-v2/output/pautas-propostas.md
outputFile: squads/saude-sync-content-v2/output/angulos.md
---

# Step 03 — Igor: Geração de Ângulos

## Objetivo

Igor é o agente de ideação criativa. Com base na pauta selecionada pelo usuário no checkpoint anterior, Igor gera 5 ângulos editoriais distintos para o carrossel, cada um com uma perspectiva, gancho e abordagem narrativa diferente.

## Entradas

- `squads/saude-sync-content-v2/output/pautas-propostas.md` — Contém todas as pautas propostas por Paulo e a seleção feita pelo usuário
- `squads/saude-sync-content-v2/pipeline/data/pauta-selecionada.md` — Confirmação da pauta escolhida
- `_opensquad/_memory/company.md` — Contexto de marca, público e posicionamento da Saúde Sync

## Processo

1. Identificar a pauta selecionada e seus atributos (tema, público, objetivo estratégico)
2. Gerar exatamente 5 ângulos distintos, cada um contendo:
   - **Nome do ângulo** (identificador criativo, ex: "A Virada de Jogo", "Por Dentro dos Números")
   - **Gancho do slide 1** (frase de abertura impactante, máx. 15 palavras)
   - **Público-alvo principal** (a quem esse ângulo ressoa mais)
   - **Abordagem narrativa** (como a história se desenvolve ao longo dos slides)
   - **Formato sugerido** (ex: lista, storytelling, comparativo, passo a passo, mito vs. verdade)
   - **Por que este ângulo funciona** (justificativa estratégica, 2-3 linhas)
3. Garantir que os 5 ângulos sejam genuinamente distintos entre si — diferentes estruturas, ganchos e públicos
4. Salvar todos os ângulos no outputFile de forma numerada e clara

## Saída Esperada

Arquivo `angulos.md` com os 5 ângulos formatados de maneira que o usuário possa comparar e escolher com clareza no próximo checkpoint.

## Critérios de Sucesso

- Exatamente 5 ângulos gerados
- Ganchos do slide 1 são distintos, criativos e adequados para Instagram
- Cada ângulo tem todos os campos obrigatórios preenchidos
- Nenhum ângulo se repete em abordagem ou estrutura
- Todo o conteúdo em Português (Brasil)
