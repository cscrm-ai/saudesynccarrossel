---
id: "squads/saude-sync-content-v2/tasks/design-slides"
title: "Criar HTML/CSS dos Slides"
agent: "daniela-design"
inputs:
  - slide-structure (de Carlos Conteúdo)
  - visual-map (de Marco Mapa)
  - generated-images (de Isa / Pedro / Ícaro / Bruno)
outputs:
  - output/slides/slide-01.html ... slide-0N.html
---

# Tarefa: Criar HTML/CSS dos Slides

## Objetivo

Construir um arquivo HTML/CSS autocontido por slide, integrando textos, dados e imagens dentro da identidade visual da Saúde Sync (paleta SaudeSync Dark). Os arquivos devem estar prontos para renderização via Playwright no viewport 1080x1440px.

---

## Inputs Necessários

Antes de iniciar, confirme que você recebeu:
- [ ] Estrutura textual de cada slide (Carlos Conteúdo): título, subtítulo, copy, dados, CTA
- [ ] Mapa visual de cada slide (Marco Mapa): layout, posição de elementos, indicações de imagem
- [ ] Imagens geradas disponíveis (URLs absolutas ou base64)

---

## Passo a Passo

### 1. Preparar o Template Base

Crie o esqueleto HTML com:
- `<meta viewport>` configurado para 1080x1440px
- Google Fonts: Space Grotesk (700), DM Sans (500), JetBrains Mono (600)
- CSS com variáveis de cor da paleta SaudeSync Dark
- Reset de box-sizing e margin/padding
- Comentário de documentação no `<head>` com: número do slide, título, imagens integradas

```html
<!-- Slide: XX | Título: [título do slide] | Imagens: [lista] -->
```

### 2. Implementar o Layout por Slide

Para cada slide, siga o mapa visual de Marco:
- Aplique a estrutura de grid ou flexbox conforme indicado
- Posicione elementos respeitando margem interna padrão de **64px**
- Use as variáveis CSS de cor — nunca valores hex diretos no markup

### 3. Integrar Imagens

- Imagens de fundo: `background-image` com `background-size: cover`
- Imagens de elemento: `<img>` com dimensões explícitas
- Sempre que texto sobrepor imagem: aplique overlay com gradiente semitransparente
  ```css
  background: linear-gradient(to bottom, rgba(10,14,23,0) 0%, rgba(10,14,23,0.85) 100%);
  ```

### 4. Aplicar Tipografia

| Elemento        | Fonte         | Peso | Tamanho mínimo |
|-----------------|---------------|------|----------------|
| Título principal| Space Grotesk | 700  | 88px           |
| Subtítulo       | DM Sans       | 500  | 48px           |
| Corpo / copy    | DM Sans       | 500  | 38px           |
| Dados / stats   | JetBrains Mono| 600  | 36px           |
| Rodapé / labels | DM Sans       | 500  | 32px           |

### 5. Aplicar Cores com Semântica

- Problema / dor → `--red: #FF4455`
- Solução / dado positivo → `--green: #00E08E`
- CTA / destaque principal → `--blue: #00A3FF`
- Valor / urgência / premium → `--gold: #F5B800`

### 6. Elementos Fixos de Marca

Presentes em todos os slides:
- **Logo Saúde Sync** no canto superior esquerdo (48px do topo, 64px da esquerda)
- **Rodapé** no canto inferior com `@saudesync` em `--text-sec`, DM Sans 500, 32px

---

## Nomenclatura e Entrega

- Salvar cada arquivo como: `output/slides/slide-01.html`, `slide-02.html`, etc.
- Ordem dos arquivos deve refletir a ordem do carrossel
- Confirmar ao squad a lista de arquivos gerados com nome e título de cada slide

---

## Critérios de Conclusão

- [ ] Um arquivo HTML por slide, autocontido
- [ ] Viewport 1080x1440px configurado
- [ ] Todas as cores da paleta usadas via variáveis CSS
- [ ] Fontes carregadas via Google Fonts CDN
- [ ] Imagens integradas sem dependências locais
- [ ] Comentário de documentação no `<head>` de cada arquivo
- [ ] Arquivos salvos com nomenclatura correta em `output/slides/`
