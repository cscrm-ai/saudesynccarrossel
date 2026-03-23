---
id: "squads/saude-sync-content-v2/tasks/collect-metrics"
title: "Coletar Métricas de Performance"
agent: "ana-analytics"
inputs:
  - post ID e timestamp (de Bruna Broadcast)
  - _memory/performance-history.md (histórico do squad)
outputs:
  - dataset de métricas brutas (interno, alimenta generate-insights)
skills: [blotato]
---

# Tarefa: Coletar Métricas de Performance

## Objetivo

Coletar as métricas de performance do post 48 horas após a publicação via Blotato. Organizar os dados brutos e calcular indicadores derivados (taxa de engajamento, taxa de retenção por slide) para alimentar a análise de insights.

---

## Pré-Requisitos

- [ ] Post ID recebido de Bruna Broadcast
- [ ] Timestamp de publicação confirmado
- [ ] Mínimo de 48 horas decorridas desde a publicação
- [ ] `_memory/performance-history.md` disponível para referência histórica

**BLOQUEANTE:** Não coletar antes de 48h. O período de distribuição orgânica do Instagram leva no mínimo 24-48h para estabilizar.

---

## Métricas a Coletar via Blotato

### Métricas de Distribuição

| Métrica      | Campo Blotato       | Descrição                                      |
|--------------|---------------------|------------------------------------------------|
| Alcance      | `reach`             | Contas únicas que tiveram o post exibido       |
| Impressões   | `impressions`       | Total de exibições (inclui múltiplas por conta)|

### Métricas de Engajamento

| Métrica           | Campo Blotato   | Descrição                                |
|-------------------|-----------------|------------------------------------------|
| Curtidas          | `likes`         | Total de curtidas                        |
| Comentários       | `comments`      | Total de comentários                     |
| Saves             | `saves`         | Total de salvamentos — KPI principal     |
| Compartilhamentos | `shares`        | Envios por DM ou repostagens em stories  |

### Métricas de Retenção (Carrossel)

| Métrica         | Campo Blotato        | Descrição                                    |
|-----------------|----------------------|----------------------------------------------|
| Swipe-through   | `carousel_album_engagement` ou `reach_by_slide` | Avanço por slide |

### Métricas Calculadas (derivadas)

| Indicador              | Fórmula                                              |
|------------------------|------------------------------------------------------|
| Taxa de engajamento    | (saves + shares + comments) / reach × 100           |
| Taxa de curtida        | likes / reach × 100                                 |
| Taxa de retenção slide | reach_slide_N / reach_slide_1 × 100 (por slide)     |
| Índice save/alcance    | saves / reach × 100 (benchmark de valor percebido)  |

---

## Passo a Passo

### 1. Verificar Janela de Coleta

Calcular: `timestamp_coleta - timestamp_publicação ≥ 48h`
Se não atingiu 48h: registrar a hora planejada de coleta e aguardar.

### 2. Chamar Blotato para Métricas

Usando a skill `blotato`, buscar as métricas do post usando o post ID:
- Endpoint de insights do post
- Período: desde a publicação até o momento da coleta

### 3. Coletar Dados de Swipe-Through por Slide

Se disponível via Blotato, coletar o alcance ou impressões por slide individualmente. Isso permite identificar o slide com maior abandono.

### 4. Coletar Comentários para Análise de Sentimento

Buscar o texto dos comentários (até 50 primeiros). Classificar manualmente:
- **Positivo:** elogio, agradecimento, interesse, pergunta de aprofundamento
- **Neutro:** observação sem carga emocional clara
- **Negativo:** crítica, discordância, reporte de problema

Destacar comentários que expressam dúvidas recorrentes (potencial de pauta futura).

### 5. Calcular Indicadores Derivados

Com os dados coletados:
- Calcular taxa de engajamento
- Calcular taxa de retenção por slide (se dados de swipe disponíveis)
- Calcular índice save/alcance

### 6. Carregar Histórico para Comparação

Abrir `_memory/performance-history.md` e extrair a média das últimas 10 publicações para cada métrica principal: alcance, saves, taxa de engajamento, comentários.

### 7. Organizar Dataset

Consolidar em um bloco de dados estruturado:

```markdown
## Dataset de Métricas — [Título do Post]
**Post ID:** [id]
**Publicado em:** [timestamp]
**Coletado em:** [timestamp] (+Xh)

### Métricas Brutas
- Alcance: X.XXX
- Impressões: X.XXX
- Curtidas: XXX
- Comentários: XX
- Saves: XXX
- Compartilhamentos: XX

### Indicadores Calculados
- Taxa de engajamento: X.X%
- Índice save/alcance: X.X%
- Slide com maior abandono: slide-0N (retenção: XX%)

### Sentimento de Comentários
- Positivos: XX (X%)
- Neutros: XX (X%)
- Negativos: XX (X%)
- Dúvidas recorrentes: [lista]

### Médias Históricas (últimas 10 publicações)
- Alcance médio: X.XXX
- Taxa de engajamento média: X.X%
- Saves médios: XXX
```

---

## Critérios de Conclusão

- [ ] Coleta realizada com mínimo de 48h após publicação
- [ ] Todas as métricas de distribuição coletadas
- [ ] Todas as métricas de engajamento coletadas
- [ ] Dados de swipe-through coletados (ou ausência documentada)
- [ ] Comentários classificados por sentimento
- [ ] Indicadores derivados calculados
- [ ] Histórico carregado para comparação
- [ ] Dataset organizado e pronto para `generate-insights`
