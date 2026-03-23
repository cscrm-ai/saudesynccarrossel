---
execution: inline
agent: victor-veredicto
inputFile: squads/saude-sync-content-v2/output/slides/
outputFile: squads/saude-sync-content-v2/output/review-report.md
---

# Step 13 — Victor: Revisão Final e Veredicto

## Objetivo

Victor é o crítico editorial e avaliador de qualidade do pipeline. Ele analisa o conteúdo final de forma holística — textos, visual, estratégia e alinhamento de marca — e emite uma pontuação e parecer detalhado antes da publicação.

## Entradas

- `squads/saude-sync-content-v2/output/slides/` — Slides finais renderizados (JPEG) e HTMLs
- `squads/saude-sync-content-v2/output/carousel-script.md` — Roteiro original
- `squads/saude-sync-content-v2/output/copy-brief.md` — Legenda, hashtags e CTAs
- `squads/saude-sync-content-v2/output/compliance-report.md` — Resultado da verificação de compliance
- `_opensquad/_memory/company.md` — Posicionamento, objetivos e voz da Saúde Sync

## Processo

1. Analisar o carrossel completo como um produto acabado, avaliando 6 dimensões:
   - **Impacto do slide 1** (0-10): O gancho prende? Gera vontade de continuar?
   - **Progressão narrativa** (0-10): Os slides fluem logicamente? Cada um motiva o próximo?
   - **Qualidade do copy** (0-10): Textos claros, corretos e no tom de voz certo?
   - **Execução visual** (0-10): Design limpo, hierarquia clara, identidade de marca preservada?
   - **Força do CTA** (0-10): O encerramento convida à ação de forma clara e natural?
   - **Alinhamento estratégico** (0-10): O conteúdo serve ao objetivo da pauta e à estratégia da marca?
2. Calcular **Score Final** (média das 6 dimensões)
3. Para cada dimensão, escrever:
   - Pontuação atribuída
   - Justificativa (2-3 linhas)
   - Ponto forte observado
   - Ponto de melhoria (se score < 8)
4. Escrever **parecer editorial** geral (parágrafo de 5-8 linhas)
5. Emitir recomendação: **Publicar**, **Publicar com ajuste menor** ou **Revisar antes de publicar**

## Saída Esperada

Arquivo `review-report.md` com:
- Score Final destacado (ex: **8,3 / 10**)
- Tabela de pontuações por dimensão
- Justificativas e pontos de melhoria
- Parecer editorial geral
- Recomendação final com justificativa

## Critérios de Sucesso

- Todas as 6 dimensões foram avaliadas com pontuação e justificativa
- Score Final calculado corretamente
- Pontos de melhoria são específicos e acionáveis (não genéricos)
- Parecer editorial reflete análise genuína, não elogios automáticos
- Recomendação é clara e baseada nos scores obtidos
- Análise em Português (Brasil)
