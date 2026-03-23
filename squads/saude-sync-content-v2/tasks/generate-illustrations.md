---
id: "squads/saude-sync-content-v2/tasks/generate-illustrations"
name: "Gerar Ilustrações"
agent: "isa-ilustra"
skill: nanobana
output_dir: "output/"
---

# Tarefa: Gerar Ilustrações via Google Imagen

## Objetivo

Gerar ilustrações, infográficos e diagramas para os slides do carousel da Saúde Sync conforme o mapa visual recebido do Marco Mapa Visual.

## Inputs Necessários

Antes de iniciar, confirmar que voce recebeu do Marco:
- [ ] Seed de estilo (numero inteiro para reproducibilidade)
- [ ] Lista de slides designados a Isa Ilustra
- [ ] Para cada slide: tipo de ilustracao, conceito central, elementos obrigatorios

## Construcao do Prompt Imagen

Para cada slide, construir o prompt seguindo esta estrutura:

```
[TIPO DE VISUAL] [CONCEITO CENTRAL], [ESTILO], [PALETA], [COMPOSICAO], [RESTRICOES]
```

### Template de Prompt para Ilustracoes

```
Flat design illustration of [conceito], clean modern style, dark background #0A0E17,
[cor de destaque] accent colors, minimal linework, professional health tech aesthetic,
centered composition with negative space for text overlay, no text or typography,
high contrast elements, 1080x1080px square format
```

### Parametros por Tipo de Ilustracao

**Infografico de processo:**
```
Step-by-step flow diagram showing [processo], connected nodes with arrows,
[cor primaria] (#00A3FF) as primary color, dark theme (#0A0E17 background),
flat icons at each step, clean sans-serif style (sem texto real), medical tech aesthetic
```

**Visualizacao de dados:**
```
Abstract data visualization of [dado/metrica], charts or graphs style,
glowing [cor] lines on dark background, health monitoring aesthetic,
minimalist clean design, 1080x1080px
```

**Conceito abstrato:**
```
Abstract conceptual illustration of [conceito de saude], metaphorical visual,
[cor principal] as dominant accent on dark #0A0E17 background,
flat semi-flat style, professional and warm tone, no text
```

## Parametros de Qualidade para Imagen

Sempre incluir nos prompts:
- `high quality, professional`
- `dark background, dark theme`
- `no text, no typography, no words`
- `1080x1080 square format`
- `flat design` ou `semi-flat design`

Seed de estilo: usar o numero fornecido pelo Marco para manter coesao entre agentes.

## Execucao via Nanobana

Para cada slide designado:

1. Montar o prompt completo conforme templates acima
2. Chamar a skill nanobana com:
   - `prompt`: texto construido acima
   - `seed`: valor recebido do Marco
   - `width`: 1080
   - `height`: 1080
   - `output_path`: `output/slide-{N}-ilustracao-{descricao}.png`
3. Confirmar que o arquivo foi salvo corretamente
4. Registrar no relatorio final

## Salvamento e Nomenclatura

Diretorio: `squads/saude-sync-content-v2/output/`

Padrao: `slide-{numero-com-zeros}-ilustracao-{descricao-kebab-case}.png`

Exemplos:
- `slide-02-ilustracao-fluxo-consulta.png`
- `slide-04-ilustracao-monitoramento-dados.png`

## Relatorio de Conclusao

Ao finalizar todos os slides, reportar ao Marco:

```
RELATORIO ISA ILUSTRA
Slides gerados: [lista]
Arquivos:
  - slide-XX: [caminho] — [descricao breve do que foi gerado]
Observacoes: [ajustes necessarios, variantes sugeridas]
```
