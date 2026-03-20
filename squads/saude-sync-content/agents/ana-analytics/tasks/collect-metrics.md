---
task: "Coletar Métricas de Performance"
order: 1
input: |
  - post_ids: Lista de IDs dos posts publicados pela Bruna Broadcast (Instagram + TikTok)
  - post_metadata: Título do conteúdo, formato, data de publicação, público-alvo, ângulo
  - plataformas: instagram-feed / instagram-reels / instagram-stories / tiktok
output: |
  - metricas_brutas: Tabela completa de métricas por post e por plataforma
  - metricas_normalizadas: Métricas com scores normalizados 0-10 por categoria
  - snapshot_48h: Captura dos dados às 24h e às 48h pós-publicação
---

# Coletar Métricas de Performance

Você é Ana Analytics, a especialista em dados do squad saude-sync-content da SaudeSync.
Sua missão nesta tarefa é coletar e organizar as métricas de performance dos conteúdos publicados,
criando a base de dados que alimentará a análise de insights e o próximo ciclo do Paulo Pauta.

## Process

1. Acesse os dados de cada post via API/relatório de cada plataforma (use os post_ids fornecidos)
2. Colete as métricas primárias e secundárias de cada formato
3. Registre o snapshot de 24h e o snapshot de 48h separadamente
4. Normalize as métricas em scores de 0 a 10 por categoria
5. Compile a tabela consolidada no formato estruturado abaixo

## Métricas por Formato

### Instagram Feed (Carrossel)

| Métrica | O que mede | Peso no score |
|---|---|---|
| Alcance orgânico | Quantas contas únicas viram | 15% |
| Taxa de salvamento | Saves / Alcance | 30% |
| Taxa de compartilhamento | Shares / Alcance | 20% |
| Taxa de swipe (slides) | Usuários que chegaram ao slide 5+ | 15% |
| Taxa de comentários | Comentários / Alcance | 10% |
| Taxa de seguimento | Novos seguidores vindos do post | 10% |

**Benchmark interno (atualizar a cada ciclo):**
- Taxa de salvamento: referência inicial 3-5% (alto: >5%, baixo: <2%)
- Taxa de compartilhamento: referência inicial 1-2%
- Taxa de swipe até slide 5+: referência inicial 40-60%

---

### Instagram Reels

| Métrica | O que mede | Peso no score |
|---|---|---|
| Visualizações totais | Views únicas + replays | 20% |
| Taxa de conclusão | % que assistiu até o final | 35% |
| Taxa de compartilhamento | Shares / Views | 20% |
| Taxa de salvamento | Saves / Views | 15% |
| Taxa de comentários | Comentários / Views | 10% |

**Benchmark interno:**
- Taxa de conclusão: referência inicial 30-50% (alto: >50%, baixo: <25%)
- Taxa de compartilhamento: referência inicial 0.5-1.5%

---

### Instagram Stories

| Métrica | O que mede | Peso no score |
|---|---|---|
| Taxa de retenção entre frames | Visualizações frame N / frame 1 | 40% |
| Taxa de resposta / interação | Respostas + taps em elementos interativos | 30% |
| Taxa de saída (exit) no último frame | Exit rate / Views frame 1 | -15% (penaliza saídas altas) |
| Taxa de avanço rápido (tap forward) | Taps forward / Views | -15% (penaliza conteúdo ignorado) |

**Benchmark interno:**
- Retenção de frame 3 / frame 1: referência inicial 60-75%
- Taxa de resposta: referência inicial 1-3%

---

### TikTok

| Métrica | O que mede | Peso no score |
|---|---|---|
| Visualizações totais | Total de plays | 10% |
| Taxa de conclusão | % que assistiu até o final | 40% |
| Taxa de compartilhamento | Shares / Views | 20% |
| Taxa de comentários | Comentários / Views | 15% |
| Taxa de seguimento | Novos seguidores vindos do vídeo | 15% |

**Benchmark interno:**
- Taxa de conclusão: referência inicial 25-45% (alto: >45%, baixo: <20%)
- Taxa de compartilhamento: referência inicial 1-3%

---

## Output Format

```
COLETA DE MÉTRICAS — [título do conteúdo] — publicado em [data]
Formatos monitorados: [lista de formatos]

─────────────────────────────────────────────
SNAPSHOT 24H

[Formato: Instagram Feed]
  Alcance orgânico: [N]
  Salvamentos: [N] ([X]%)
  Compartilhamentos: [N] ([X]%)
  Swipe até slide 5+: [X]%
  Comentários: [N] ([X]%)
  Novos seguidores: [N]
  Score 24h: [X]/10

[Formato: Instagram Reels]
  Visualizações: [N]
  Taxa de conclusão: [X]%
  Compartilhamentos: [N] ([X]%)
  Salvamentos: [N] ([X]%)
  Score 24h: [X]/10

[Formato: TikTok]
  Visualizações: [N]
  Taxa de conclusão: [X]%
  Compartilhamentos: [N] ([X]%)
  Comentários: [N] ([X]%)
  Score 24h: [X]/10

─────────────────────────────────────────────
SNAPSHOT 48H

[mesmo formato do 24h com dados atualizados]

─────────────────────────────────────────────
MÉTRICAS NORMALIZADAS (score 0-10 por formato)

| Formato | Score 24h | Score 48h | Variação |
|---|---|---|---|
| Instagram Feed | [X] | [X] | [+/-X] |
| Instagram Reels | [X] | [X] | [+/-X] |
| Instagram Stories | [X] | [X] | [+/-X] |
| TikTok | [X] | [X] | [+/-X] |

Score médio do conteúdo: [X]/10
Melhor formato: [formato]
Pior formato: [formato]
```

## Quality Criteria

- [ ] Dados coletados em 2 momentos: 24h e 48h pós-publicação
- [ ] Todas as métricas primárias de cada formato presentes
- [ ] Score normalizado calculado para cada formato
- [ ] Melhor e pior formato identificados
- [ ] Nenhum campo vazio — usar "N/D" se dado não disponível

## Veto Conditions

Rejeitar e refazer se QUALQUER condição for verdadeira:
1. Snapshot de apenas um momento (24h OU 48h) — ambos são obrigatórios
2. Score calculado sem considerar os pesos da tabela de métricas do formato correspondente
