---
execution: subagent
agent: carlos-carrossel
model_tier: powerful
format: instagram-feed
inputFile: squads/saude-sync-content-v2/output/copy-brief.md
outputFile: squads/saude-sync-content-v2/output/carousel-script.md
---

# Step 06 — Carlos: Roteiro do Carrossel

## Objetivo

Carlos é o roteirista de carrosséis. Ele transforma o copy-brief de Leo em um roteiro completo e detalhado para o carrossel de Instagram, com estrutura de 8 a 10 slides, hierarquia visual e otimização para retenção e salvamentos.

## Entradas

- `squads/saude-sync-content-v2/output/copy-brief.md` — Gancho, legenda, hashtags e CTA criados por Leo
- `squads/saude-sync-content-v2/pipeline/data/angulo-selecionado.md` — Ângulo narrativo e tom de voz definidos
- `_opensquad/_memory/company.md` — Identidade visual, paleta de cores e diretrizes da Saúde Sync

## Processo

1. Definir a arquitetura narrativa do carrossel (arco de começo, meio e fim)
2. Criar entre 8 e 10 slides, cada um contendo:
   - **Número do slide** e **tipo** (capa, conteúdo, transição, CTA, etc.)
   - **Título** (headline do slide, curto e direto)
   - **Corpo de texto** (conteúdo principal, máx. 3-4 linhas por slide)
   - **Elemento visual sugerido** (ícone, ilustração, foto, gráfico — descrição para os agentes de imagem)
   - **Hierarquia visual** (o que deve ter maior destaque: título, número, imagem ou dado)
   - **Cor de fundo sugerida** (com base na paleta da marca)
   - **Observações de design** (alinhamento, espaçamento, mood do slide)
3. Garantir progressão lógica: cada slide deve motivar a leitura do próximo
4. Slide 1 deve usar exatamente o gancho criado por Leo
5. Último slide deve conter o CTA definido no copy-brief
6. Otimizar para formatos quadrado (1:1) e vertical (4:5)

## Saída Esperada

Arquivo `carousel-script.md` com o roteiro completo, um slide por seção, formatado de maneira que sirva como briefing para os agentes de design e imagem nas etapas seguintes.

## Critérios de Sucesso

- Entre 8 e 10 slides (nunca menos de 8, nunca mais de 10)
- Cada slide tem todos os campos preenchidos (título, corpo, visual, hierarquia, cor, observações)
- Progressão narrativa coerente — o carrossel conta uma história ou entrega valor progressivo
- Slide 1 usa o gancho exato do copy-brief
- Slide final tem CTA claro e específico
- Elemento visual de cada slide é descrito com detalhes suficientes para os agentes de geração de imagem
- Todo o conteúdo em Português (Brasil)
