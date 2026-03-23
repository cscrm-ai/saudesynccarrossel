---
execution: subagent
agent: daniela-design
model_tier: powerful
outputFile: squads/saude-sync-content-v2/output/slides/
---

# Step 09 — Daniela Design: Montagem e Renderização

## Objetivo

Daniela monta os 10 slides como HTML/CSS e renderiza cada um como JPEG usando Playwright MCP.

## Entradas

- `output/{run_id}/v1/carousel-script.md` — Roteiro com textos e design notes
- `output/{run_id}/v1/generated-images/` — Imagens geradas pelo agente Visual

## Processo

1. Para cada slide: criar arquivo HTML (1080x1350px, inline CSS, Google Fonts)
2. Incorporar imagens geradas como backgrounds/foregrounds
3. Slides Daniela-only: construir elementos visuais em CSS/SVG puro
4. Renderizar cada HTML como JPEG via Playwright MCP
5. IMPORTANTE: Todos os textos DEVEM ter acentuação correta (verificar charset UTF-8)

## Saída

- `output/{run_id}/v1/slides/slide-01.html` ... `slide-10.html`
- `output/{run_id}/v1/slides/slide-01.jpeg` ... `slide-10.jpeg`
