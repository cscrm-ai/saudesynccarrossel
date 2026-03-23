---
execution: inline
agent: ana-analytics
inputFile: squads/saude-sync-content-v2/output/publication-log.md
outputFile: squads/saude-sync-content-v2/output/performance-briefing.md
---

# Step 16 — Ana: Monitoramento e Briefing de Performance

## Objetivo

Ana é a agente de analytics e inteligência de dados. Ela monitora o desempenho do carrossel publicado nas primeiras 48 horas, coleta métricas-chave e gera um briefing de performance com insights acionáveis para aprimorar os próximos conteúdos.

## Entradas

- `squads/saude-sync-content-v2/output/publication-log.md` — Dados da publicação (ID do post, data/hora, URL)
- `squads/saude-sync-content-v2/output/copy-brief.md` — Copy e hashtags utilizados (para correlacionar com performance)
- `squads/saude-sync-content-v2/output/angulos.md` — Ângulo e abordagem escolhidos (para análise editorial)
- `_opensquad/_memory/company.md` — Objetivos estratégicos da Saúde Sync e benchmarks de referência

## Processo

1. **Coleta de dados (via API do Blotato ou Instagram):**
   - Alcance orgânico e impressões
   - Engajamento total (curtidas, comentários, compartilhamentos, salvamentos)
   - Taxa de engajamento (engajamento / alcance × 100)
   - Retenção do carrossel: quantas pessoas chegaram ao último slide
   - Cliques no perfil a partir do post
   - Novos seguidores atribuídos ao post (se disponível)
   - Dados demográficos do alcance (se disponível)

2. **Análise dos dados:**
   - Comparar com benchmarks históricos da Saúde Sync (se disponíveis em company.md)
   - Identificar o indicador de melhor performance e o de pior performance
   - Analisar padrão de salvamentos (métrica-chave para carrosséis educativos)
   - Avaliar se o CTA gerou resultado mensurável (cliques, seguidores)
   - Identificar horário de pico de engajamento dentro das 48h

3. **Geração de insights:**
   - O que funcionou neste conteúdo?
   - O que deve ser melhorado no próximo carrossel?
   - Qual elemento teve maior contribuição para o desempenho (gancho, visual, tema, horário)?
   - Recomendação de próximo tema ou ângulo baseada na performance deste

4. **Atualização da memória:**
   - Registrar benchmarks atualizados em `_opensquad/_memory/company.md` (métricas de referência)

## Saída Esperada

Arquivo `performance-briefing.md` contendo:
- **Resumo executivo** (3-5 linhas com os números mais importantes)
- **Tabela de métricas** (com valor absoluto e comparativo com benchmark, se disponível)
- **Análise de retenção do carrossel** (onde os usuários pararam de arrastar)
- **Top 3 insights** (numerados, acionáveis, específicos)
- **Recomendações para o próximo conteúdo** (pauta, ângulo ou formato sugerido)
- **Score de performance** geral (0-10 baseado nos KPIs da Saúde Sync)

## Critérios de Sucesso

- Dados coletados após mínimo de 24h da publicação (idealmente 48h)
- Todas as métricas-chave presentes no relatório
- Insights são específicos e acionáveis (não genéricos)
- Recomendações têm conexão direta com os dados apresentados
- Relatório em Português (Brasil), linguagem clara para tomada de decisão
- Benchmarks atualizados na memória da empresa após análise
