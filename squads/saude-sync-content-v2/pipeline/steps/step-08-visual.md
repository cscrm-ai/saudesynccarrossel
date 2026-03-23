---
execution: subagent
agent: visual
model_tier: fast
outputFile: squads/saude-sync-content-v2/output/generated-images/
---

# Step 08 — Visual: Geração de Todas as Imagens

## Objetivo

O agente Visual lê o carousel-script.md e gera TODAS as imagens necessárias via Google Imagen 4.0, sequencialmente. Combina backgrounds, ilustrações, fotos e ícones num único passo.

## Entradas

- `output/{run_id}/v1/carousel-script.md` — Roteiro com briefings visuais por slide

## Processo

1. Ler carousel-script.md
2. Identificar slides que precisam de imagens (ignorar "Daniela-only")
3. Para cada imagem: construir prompt → chamar API Imagen 4.0 → salvar PNG
4. Reportar sucesso/falha

## API

- Modelo: `imagen-4.0-generate-001`
- Endpoint: `:predict`
- Auth: `GOOGLE_API_KEY`
- Aspect ratios: 3:4 (slides) ou 1:1 (ícones)

## Saída

Pasta `output/{run_id}/v1/generated-images/` com todas as imagens necessárias.
