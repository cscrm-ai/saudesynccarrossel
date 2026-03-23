---
execution: subagent
agent: leo-legenda
model_tier: powerful
inputFile: squads/saude-sync-content-v2/output/angulos.md
outputFile: squads/saude-sync-content-v2/output/copy-brief.md
---

# Step 05 — Leo: Criação de Copy e Legenda

## Objetivo

Leo é o especialista em copywriting para Instagram. Com base no ângulo e no tom de voz selecionados, Leo cria toda a copy textual do post: legenda completa, gancho do slide 1, hashtags estratégicas e chamada para ação (CTA).

## Entradas

- `squads/saude-sync-content-v2/output/angulos.md` — Ângulos propostos por Igor
- `squads/saude-sync-content-v2/pipeline/data/angulo-selecionado.md` — Ângulo e tom de voz escolhidos pelo usuário
- `_opensquad/_memory/company.md` — Voz da marca, público e diretrizes editoriais da Saúde Sync

## Processo

1. Internalizar o ângulo selecionado e o tom de voz definido pelo usuário
2. Criar o **gancho do slide 1** — frase de abertura que aparece no preview do carrossel (máx. 12 palavras, impactante, gera curiosidade ou identificação imediata)
3. Escrever a **legenda completa** do post, estruturada em:
   - Parágrafo de abertura (expande o gancho, cria conexão)
   - Corpo (desenvolvimento, contexto ou promessa de valor)
   - Parágrafo de encerramento (convida à ação de forma orgânica)
   - CTA explícito (ex: "Salve esse post", "Marque quem precisa ver isso", "Arraste para saber mais")
4. Selecionar entre 8 e 12 **hashtags** relevantes: mix de alta competição, média e nicho, alinhadas ao tema e ao perfil da Saúde Sync
5. Definir o **CTA do último slide** (slide de encerramento do carrossel, diferente do CTA da legenda)
6. Compilar tudo no copy-brief com seções claramente separadas

## Saída Esperada

Arquivo `copy-brief.md` com:
- Gancho do slide 1
- Legenda completa (formatada para Instagram, com quebras de linha adequadas)
- Lista de hashtags
- CTA do último slide
- Nota de tom de voz aplicado (como o tom escolhido foi incorporado)

## Critérios de Sucesso

- Gancho do slide 1 tem no máximo 12 palavras e é genuinamente atrativo
- Legenda está formatada para Instagram (sem markdown excessivo, quebras de linha naturais)
- Entre 8 e 12 hashtags, variando entre alta, média e baixa competição
- CTA é específico, não genérico
- Tom de voz selecionado está consistentemente aplicado em todo o texto
- Todo o conteúdo em Português (Brasil)
