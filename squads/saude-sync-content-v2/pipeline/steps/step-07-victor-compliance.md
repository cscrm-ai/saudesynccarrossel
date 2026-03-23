---
execution: subagent
agent: victor-compliance
model_tier: fast
outputFile: squads/saude-sync-content-v2/output/compliance-report.md
---

# Step 07 — Victor Compliance: Review + Scoring

## Objetivo

Victor verifica compliance regulatório E avalia qualidade editorial num único passo.

## Entradas

- `output/{run_id}/v1/carousel-script.md` — Roteiro dos slides
- `output/{run_id}/v1/copy-brief.md` — Legenda e hashtags
- `_opensquad/_memory/company.md` — Posicionamento da marca

## Processo

1. **Compliance check** — CFM, ANVISA, LGPD. Se encontrar issues MODERATE, aplicar correções direto no carousel-script.md.
2. **Scoring** — 6 dimensões (Relevância, Público, Copy, Compliance, Visual, Engajamento) com notas 0-10 e média ponderada.
3. **Veredicto** — APROVADO (≥7.0), APROVADO COM RESSALVAS (≥6.0), REJEITADO (<6.0 ou falha compliance HIGH).

## Saída

`output/{run_id}/v1/compliance-report.md` com compliance check + scoring + veredicto.

Se REJEITADO: pipeline retorna ao step 05 (Leo Carrossel).
Se APROVADO: pipeline avança para geração visual.
