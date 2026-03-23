---
execution: subagent
agent: leo-carrossel
model_tier: powerful
outputFile: squads/saude-sync-content-v2/output/copy-brief.md
---

# Step 05 — Leo Carrossel: Copy + Roteiro Completo

## Objetivo

Leo Carrossel recebe o ângulo aprovado e entrega DOIS arquivos num único passo:
1. `copy-brief.md` — Legenda Instagram, hook, hashtags, CTA
2. `carousel-script.md` — Roteiro de 10 slides com textos exatos, especificações visuais E briefings de imagem para o agente Visual

## Entradas

- `pipeline/data/pauta-selecionada.md` — Pauta escolhida
- `pipeline/data/angulo-selecionado.md` — Ângulo + tom aprovados
- `_opensquad/_memory/company.md` — Contexto da empresa

## Saída

- `output/{run_id}/v1/copy-brief.md`
- `output/{run_id}/v1/carousel-script.md`

## Importante

- Todos os textos DEVEM usar acentuação correta (á, é, í, ó, ú, ã, õ, ç)
- Cada slide deve incluir briefing visual com prompt para Imagen 4.0
- Slides CSS-only (dashboards, timelines, chats) devem ser marcados "Daniela-only"
