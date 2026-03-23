---
execution: inline
agent: daniela-design
inputFile: squads/saude-sync-content-v2/output/carousel-script.md
outputFile: squads/saude-sync-content-v2/output/slides/
---

# Step 11 — Daniela: Montagem e Renderização dos Slides

## Objetivo

Daniela é a agente de design e produção final. Ela combina os textos do roteiro com as imagens geradas pelos 4 agentes visuais, monta slides HTML/CSS pixel-perfect e os renderiza como arquivos JPEG prontos para publicação no Instagram.

## Entradas

- `squads/saude-sync-content-v2/output/carousel-script.md` — Roteiro com textos, hierarquia visual e especificações por slide
- `squads/saude-sync-content-v2/output/generated-images/` — Todas as imagens geradas (Isa, Pedro, Ícaro e Bruno)
- `squads/saude-sync-content-v2/output/visual-map.md` — Mapa visual com diretrizes de composição
- `_opensquad/_memory/company.md` — Tipografia, cores e identidade visual da Saúde Sync

## Processo

1. Para cada slide do roteiro:
   a. Criar arquivo HTML com estrutura semântica e layout responsivo para 1080x1080px (ou 1080x1350px conforme roteiro)
   b. Aplicar CSS com:
      - Tipografia correta (fontes da Saúde Sync, tamanhos e pesos conforme hierarquia)
      - Paleta de cores definida no mapa visual
      - Posicionamento de texto sobre a imagem de fundo
      - Espaçamentos e margens adequados para leitura em mobile
   c. Incorporar a imagem do agente visual correspondente (background ou elemento)
   d. Renderizar o HTML para JPEG via image-creator com qualidade máxima
   e. Salvar: arquivo HTML em `output/slides/html/slide-XX.html` e JPEG em `output/slides/jpeg/slide-XX.jpg`
2. Criar arquivo de índice `output/slides/index.md` listando todos os slides com miniaturas (se disponível) e textos correspondentes
3. Verificar consistência visual entre todos os slides antes de finalizar

## Saída Esperada

Diretório `output/slides/` contendo:
- `html/` — Arquivos HTML de cada slide (um por slide)
- `jpeg/` — Arquivos JPEG renderizados (um por slide, 1080px de largura, qualidade 95%+)
- `index.md` — Índice com mapeamento slide → arquivo → texto principal

## Critérios de Sucesso

- Todos os slides do roteiro têm correspondente HTML e JPEG
- JPEGs com dimensões corretas (1080x1080px ou 1080x1350px) e qualidade de publicação
- Tipografia legível em tela de smartphone (fonte mínima 28px equivalente)
- Identidade visual da Saúde Sync preservada em todos os slides
- Nenhum elemento visual cortado nas bordas do slide
- Arquivos nomeados sequencialmente (`slide-01`, `slide-02`, etc.)
