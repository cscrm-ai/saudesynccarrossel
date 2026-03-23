---
execution: inline
agent: marco-mapa-visual
inputFile: squads/saude-sync-content-v2/output/carousel-script.md
outputFile: squads/saude-sync-content-v2/output/visual-map.md
---

# Step 09 — Marco: Mapa Visual e Delegação de Imagens

## Objetivo

Marco é o diretor de arte e estrategista visual. Ele lê o roteiro do carrossel e cria um mapa visual detalhado que distribui a geração de imagens entre os 4 agentes especializados (Isa, Pedro, Ícaro e Bruno), garantindo coerência estética e identidade visual unificada.

## Entradas

- `squads/saude-sync-content-v2/output/carousel-script.md` — Roteiro completo com sugestões visuais por slide
- `squads/saude-sync-content-v2/output/compliance-report.md` — Versão corrigida do conteúdo (se aplicável)
- `_opensquad/_memory/company.md` — Paleta de cores, tipografia e diretrizes visuais da Saúde Sync

## Processo

1. Analisar todos os slides e suas necessidades visuais
2. Definir a **linguagem visual global** do carrossel (estilo, mood, paleta predominante, estilo de ilustração)
3. Classificar cada slide em uma das 4 categorias visuais e atribuir ao agente correspondente:
   - **Isa-Ilustra** — Slides que precisam de ilustrações personalizadas, cenários ou composições artísticas
   - **Pedro-Persona** — Slides com personagens humanos, representações de pessoas, diversidade e inclusão
   - **Ícaro-Ícone** — Slides que usam ícones, pictogramas, infográficos simples ou elementos gráficos vetoriais
   - **Bruno-Base** — Slides com fundos elaborados, texturas, gradientes, padrões ou elementos de composição estrutural
4. Para cada slide, criar um **brief visual detalhado** contendo:
   - Agente responsável
   - Descrição precisa do que deve ser gerado (objeto, cena, estilo, composição)
   - Paleta de cores específica (hex ou nome da cor da marca)
   - Dimensões e formato (quadrado 1080x1080px ou vertical 1080x1350px)
   - Estilo artístico (ex: flat design, ilustração orgânica, fotorrealista, minimalista)
   - Elementos que DEVEM aparecer
   - Elementos que NÃO devem aparecer
   - Nome do arquivo de saída esperado (ex: `slide-01-isa.png`)
5. Garantir coerência visual entre todos os slides — o carrossel deve parecer uma unidade

## Saída Esperada

Arquivo `visual-map.md` com:
- Resumo da linguagem visual global
- Brief detalhado por slide, organizado por agente responsável
- Tabela de distribuição (slide → agente → arquivo de saída)

## Critérios de Sucesso

- Todos os slides do roteiro têm brief visual correspondente
- Distribuição equilibrada entre os 4 agentes (nenhum fica sobrecarregado)
- Briefs são suficientemente detalhados para geração autônoma de imagens
- Nomenclatura de arquivos é padronizada e clara
- Coerência visual garantida por diretrizes globais do carrossel
