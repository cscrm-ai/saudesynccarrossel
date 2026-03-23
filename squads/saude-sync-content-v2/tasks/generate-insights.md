---
id: "squads/saude-sync-content-v2/tasks/generate-insights"
title: "Gerar Briefing de Performance"
agent: "ana-analytics"
inputs:
  - dataset de métricas (de collect-metrics)
  - _memory/performance-history.md
outputs:
  - output/analytics/performance-[data].md
  - _memory/performance-history.md (atualizado)
---

# Tarefa: Gerar Briefing de Performance

## Objetivo

Transformar o dataset de métricas brutas em um briefing de performance acionável que alimenta o próximo ciclo de pauta de Paulo Pauta. O briefing deve identificar o que funcionou, o que não funcionou, e traduzir isso em recomendações concretas para o próximo conteúdo.

---

## Pré-Requisitos

- [ ] Dataset de métricas completo de `collect-metrics`
- [ ] Histórico de performance das últimas 10 publicações disponível
- [ ] Contexto do post: tema, tipo de conteúdo, horário de publicação

---

## Classificação de Performance

Antes de escrever o briefing, classificar o post com base na comparação com o histórico:

| Classificação      | Critério                                                     |
|--------------------|--------------------------------------------------------------|
| Alto desempenho    | Taxa de engajamento ≥ 130% da média histórica               |
| Desempenho normal  | Taxa de engajamento entre 70% e 130% da média histórica      |
| Baixo desempenho   | Taxa de engajamento < 70% da média histórica                |

Indicadores auxiliares para a classificação:
- Saves ≥ 150% da média → sinal de conteúdo de alto valor percebido
- Swipe-through > 60% no último slide → narrativa com boa retenção
- Taxa de comentários ≥ 2x a média → conteúdo gerou debate ou dúvida

---

## Estrutura do Briefing

### Cabeçalho

```markdown
# Performance — [Título do Post]
**Data de publicação:** [data]
**Data de análise:** [data] (+48h)
**Classificação:** Alto desempenho / Normal / Baixo desempenho
```

### Seção 1: Resultado em Uma Linha

Uma frase que captura a essência do desempenho:
> "Post de alto desempenho: taxa de engajamento de 8,2% vs média histórica de 5,1% — impulsionado por saves acima do padrão (+67%)."

### Seção 2: Métricas Completas

Tabela comparativa:

| Métrica              | Este post | Média histórica | Δ (desvio) |
|----------------------|-----------|-----------------|------------|
| Alcance              | X.XXX     | X.XXX           | +X% / -X% |
| Impressões           | X.XXX     | X.XXX           | +X% / -X% |
| Saves                | XXX       | XXX             | +X% / -X% |
| Compartilhamentos    | XX        | XX              | +X% / -X% |
| Comentários          | XX        | XX              | +X% / -X% |
| Taxa de engajamento  | X.X%      | X.X%            | +X pp      |
| Índice save/alcance  | X.X%      | X.X%            | +X pp      |

### Seção 3: Análise de Retenção (Carrossel)

Se dados de swipe-through disponíveis:
- Gráfico textual de retenção por slide (ex: slide-01: 100% → slide-03: 82% → slide-07: 54%)
- Identificação do slide com maior queda
- Hipótese sobre a causa da queda (complexidade, copy, design, tema)

### Seção 4: Sentimento dos Comentários

- Distribuição: XX% positivos / XX% neutros / XX% negativos
- Top 3 comentários mais relevantes (transcrição)
- Dúvidas recorrentes identificadas: [lista]

### Seção 5: O Que Funcionou

Lista objetiva dos elementos com melhor desempenho:
- Ex: "Título com dado numérico no slide capa → alto swipe-through inicial"
- Ex: "Checklist no slide 4 → correlação com alta taxa de saves"
- Ex: "Horário às 18h → acima da média de alcance"

### Seção 6: O Que Não Funcionou

Lista objetiva dos elementos com menor desempenho:
- Ex: "Slide 6 com texto denso → maior queda de retenção do carrossel"
- Ex: "CTA genérico no último slide → taxa de comentários abaixo da média"

### Seção 7: Recomendações para o Próximo Ciclo

Esta é a seção que Paulo Pauta lê primeiro. Máximo 5 recomendações, ordenadas por impacto esperado:

```markdown
## Recomendações para o Próximo Ciclo

1. **[Tema/Formato]** — [Recomendação específica] — Motivação: [dado que sustenta]
2. **[Tema/Formato]** — [Recomendação específica] — Motivação: [dado que sustenta]
3. **[Horário/Distribuição]** — [Recomendação] — Motivação: [dado]
4. **[Copy/Estrutura]** — [Recomendação] — Motivação: [dado]
5. **[CTA/Engajamento]** — [Recomendação] — Motivação: [dado]
```

---

## Atualizar Histórico de Performance

Após gerar o briefing, atualizar `_memory/performance-history.md` adicionando uma entrada:

```markdown
| [data] | [título do post] | [alcance] | [saves] | [tx. engaj.] | [classificação] |
```

Manter apenas as últimas 20 entradas no histórico para evitar arquivo excessivamente grande.

---

## Salvar e Notificar

- Salvar briefing em: `output/analytics/performance-[YYYY-MM-DD].md`
- Notificar Paulo Pauta que o briefing está disponível para o próximo ciclo

---

## Critérios de Conclusão

- [ ] Classificação de performance atribuída com base no histórico
- [ ] Resultado em uma linha escrito
- [ ] Tabela comparativa com desvios calculados
- [ ] Análise de retenção por slide incluída (ou ausência justificada)
- [ ] Sentimento de comentários analisado
- [ ] Seção "O Que Funcionou" com evidência de dado
- [ ] Seção "O Que Não Funcionou" com evidência de dado
- [ ] Máximo 5 recomendações acionáveis para Paulo Pauta
- [ ] `_memory/performance-history.md` atualizado
- [ ] Arquivo salvo em `output/analytics/performance-[data].md`
- [ ] Paulo Pauta notificado
