---
execution: subagent
parallel: true
agents:
  - isa-ilustra
  - pedro-persona
  - icaro-icone
  - bruno-base
model_tier: powerful
inputFile: squads/saude-sync-content-v2/output/visual-map.md
outputFile: squads/saude-sync-content-v2/output/generated-images/
---

# Step 10 — Geração de Imagens (4 Agentes em Paralelo)

## Objetivo

Quatro agentes especializados em geração de imagens trabalham simultaneamente, cada um responsável pelos slides atribuídos por Marco no mapa visual. A execução é paralela para maximizar velocidade.

## Agentes e Responsabilidades

### Isa-Ilustra
Responsável por ilustrações personalizadas, composições artísticas e cenários visuais. Gera imagens com estilo ilustrativo alinhado à identidade da Saúde Sync.
- Pasta de saída: `squads/saude-sync-content-v2/output/generated-images/isa-ilustra/`

### Pedro-Persona
Responsável por representações de personagens humanos, rostos, cenas com pessoas e elementos de diversidade e inclusão. Garante representatividade visual adequada ao público da Saúde Sync.
- Pasta de saída: `squads/saude-sync-content-v2/output/generated-images/pedro-persona/`

### Ícaro-Ícone
Responsável por ícones, pictogramas, infográficos, elementos gráficos vetoriais e visualizações de dados. Cria assets limpos e funcionais para slides informativos.
- Pasta de saída: `squads/saude-sync-content-v2/output/generated-images/icaro-icone/`

### Bruno-Base
Responsável por fundos, texturas, gradientes, padrões decorativos e elementos de composição estrutural. Cria as bases visuais sobre as quais textos e outros elementos serão sobrepostos.
- Pasta de saída: `squads/saude-sync-content-v2/output/generated-images/bruno-base/`

## Entradas (para todos os agentes)

- `squads/saude-sync-content-v2/output/visual-map.md` — Mapa visual com briefs detalhados por slide e agente
- `_opensquad/_memory/company.md` — Paleta de cores, estilo visual e diretrizes da Saúde Sync

## Processo (por agente)

1. Ler o `visual-map.md` e identificar os slides atribuídos ao seu agente
2. Para cada slide atribuído:
   - Ler o brief visual detalhado (descrição, paleta, dimensões, estilo, restrições)
   - Gerar a imagem seguindo as especificações exatas
   - Salvar na pasta correspondente com o nome de arquivo definido no mapa visual
3. Ao finalizar todos os slides, gerar um log resumido com os arquivos criados e eventuais adaptações feitas

## Saída Esperada

Diretório `output/generated-images/` com 4 subpastas, cada uma contendo as imagens geradas pelo respectivo agente, nomeadas conforme a convenção definida no mapa visual (ex: `slide-01-isa.png`, `slide-03-pedro.png`).

## Critérios de Sucesso

- Todos os slides do mapa visual têm imagem correspondente gerada
- Imagens seguem as especificações de dimensão (1080x1080px ou 1080x1350px)
- Paleta de cores da Saúde Sync é respeitada em todos os assets
- Nomenclatura de arquivos segue o padrão definido por Marco
- Nenhum elemento visual viola o compliance aprovado por Carla
- Os 4 agentes operam verdadeiramente em paralelo, sem dependências entre si
