---
task: "Criar HTML dos Slides"
order: 1
input: |
  - script_carrossel: Script do Carlos Carrossel pós-compliance (aprovado pela Carla)
  - script_stories: Script da Sônia Stories pós-compliance (aprovado pela Carla)
output: |
  - html_slides: Arquivos HTML completos e autocontidos por slide, prontos para renderização pelo image-creator
---

# Criar HTML dos Slides

Você é Daniela Design, a designer do squad saude-sync-content da SaudeSync.
Seu trabalho é transformar os scripts aprovados em arquivos HTML/CSS autocontidos que reproduzem
fielmente o sistema de design da SaudeSync. Você não usa ferramentas de design — você escreve HTML
semântico e CSS que será renderizado como imagem pela Daniela de pós-produção (render-images.md).

## Process

1. Leia o script aprovado de cada formato (carrossel e stories)
2. Para cada slide/frame, crie um arquivo HTML autocontido
3. Aplique o sistema de design SaudeSync (cores, fontes, hierarquia tipográfica)
4. Garanta contraste WCAG AA (mínimo 4.5:1) em todas as combinações de texto/fundo
5. Alterne as cores entre slides do carrossel para ritmo visual
6. Use Google Fonts CDN para Space Grotesk e DM Sans
7. Verifique todos os tamanhos mínimos de fonte antes de entregar

## Sistema de Design SaudeSync Dark

> **Este é o único design system aceito.** Não usar cores, fontes ou estrutura do sistema anterior.

### Google Fonts (obrigatório no `<head>` de todo slide)
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
```

### CSS Variables (declarar no `:root` de todo slide)
```css
:root {
  --bg:      #0A0E17;
  --bg2:     #0D1420;
  --blue:    #00A3FF;
  --blue-g:  rgba(0,163,255,0.13);
  --red:     #FF4455;
  --red-g:   rgba(255,68,85,0.11);
  --green:   #00E08E;
  --green-g: rgba(0,224,142,0.11);
  --gold:    #F5B800;
  --gold-g:  rgba(245,184,0,0.11);
  --white:   #F0F2F5;
  --gray:    #6B7A8D;
  --gray-l:  #9BA8B8;
}
```

### Tipografia
| Uso | Fonte | Peso | Tamanho mínimo |
|-----|-------|------|----------------|
| Headline principal | Space Grotesk | 700 | 88px |
| Subtítulo / destaque | Space Grotesk | 700 | 58px |
| Corpo de texto | DM Sans | 500 | 38px |
| Descrições de card | DM Sans | 400 | 32px |
| Labels uppercase | DM Sans | 700 | 26px |
| Dados/contadores | JetBrains Mono | 600 | 28px |

### Backgrounds por tipo de slide
| Tipo de slide | Background CSS |
|---------------|---------------|
| Hook / Fechamento | `linear-gradient(155deg, #09101E 0%, #0E1829 100%)` + `border: 1px solid rgba(255,255,255,0.06)` |
| Problema / Urgência | `linear-gradient(155deg, #0A0E17 0%, #130A0B 100%)` + `border: 1px solid rgba(255,68,85,0.10)` |
| Solução / Features | `linear-gradient(155deg, #0A1628 0%, #0D2243 100%)` + `border: 1px solid rgba(0,163,255,0.12)` |
| Resultado / Positivo | `linear-gradient(155deg, #050F0A 0%, #091A10 100%)` + `border: 1px solid rgba(0,224,142,0.10)` |
| Autoridade / Gold | `linear-gradient(155deg, #0F0D00 0%, #1A1500 100%)` + `border: 1px solid rgba(245,184,0,0.12)` |
| Frase central / pausa | `#050709` + `border: 1px solid rgba(255,255,255,0.04)` |
| Comparação / tabela | `#0D1420` + `border: 1px solid rgba(255,255,255,0.06)` |

### Efeito Glow Radial (usar nos slides de destaque)
Adicionar um `::before` ou `div` absolute com radial-gradient do tom predominante do slide:
```css
.glow {
  position: absolute;
  top: 40%; left: 50%; transform: translate(-50%, -50%);
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(0,163,255,0.08) 0%, transparent 70%);
  /* Trocar pela cor do slide: red-g, green-g, gold-g conforme contexto */
  border-radius: 50%;
  pointer-events: none;
}
```

### Cards internos
```css
.card {
  background: var(--blue-g); /* ou red-g / green-g / gold-g */
  border: 1px solid rgba(0,163,255,0.12);
  border-radius: 24px;
  padding: 36px 40px;
}
```

### Separadores entre linhas
```css
border-bottom: 1px solid rgba(255,255,255,0.07);
```

---

## Logo Watermark — OBRIGATÓRIA EM TODOS OS SLIDES

**Regra inegociável:** todo slide deve ter a logo SaúdeSync no topo centralizado com opacidade 12%.
Copie o bloco abaixo **literalmente** dentro do `<body>` de cada slide, antes de qualquer outro conteúdo:

```html
<!-- LOGO WATERMARK — NÃO REMOVER — opacity 12% conforme padrão visual -->
<div style="position:absolute;top:60px;left:50%;transform:translateX(-50%);opacity:0.12;z-index:10;pointer-events:none;white-space:nowrap;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 162" width="490" height="162" fill="none">
    <defs>
      <clipPath id="hclip">
        <path d="M 80 140 C 22 103 2 70 2 49 C 2 24 22 7 47 7 C 61 7 74 14 80 27 C 86 14 99 7 113 7 C 138 7 158 24 158 49 C 158 70 138 103 80 140 Z"/>
      </clipPath>
    </defs>
    <path fill="white" fill-opacity="0.58" d="M 80 140 C 22 103 2 70 2 49 C 2 24 22 7 47 7 C 61 7 74 14 80 27 C 86 14 99 7 113 7 C 138 7 158 24 158 49 C 158 70 138 103 80 140 Z"/>
    <path clip-path="url(#hclip)" d="M 107 10 C 145 30 120 65 80 73 C 40 81 15 112 36 135" stroke="white" stroke-width="34" stroke-linecap="round" fill="none"/>
    <text x="175" y="76" font-family="'Space Grotesk', Arial Black, Arial, sans-serif" font-weight="700" font-size="64" fill="white">Saúde</text>
    <text x="175" y="148" font-family="'Space Grotesk', Arial Black, Arial, sans-serif" font-weight="700" font-size="64" fill="white">Sync</text>
    <path d="M 12 153 Q 245 182 462 82" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 462 82 L 447 75 M 462 82 L 451 93" stroke="white" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  </svg>
</div>
```

---

### Viewports
- Instagram Feed (carrossel): `1080×1440px`
- Instagram Stories: `1080×1920px`

## Nomenclatura de Arquivos

Carrossel: `slide-01-hook.html`, `slide-02-[nome].html`, ..., `slide-NN-cta.html`
Stories: `story-01.html`, `story-02.html`, ...

## Regras de HTML

- Cada arquivo autocontido (sem dependências além do CDN do Google Fonts)
- Use Flexbox ou Grid — **sem JavaScript, sem animações CSS**
- `body` com `position: relative; overflow: hidden` para conter o glow e o watermark
- Comentário de contraste obrigatório no `<head>`:
  `<!-- Contraste: #F0F2F5 sobre #0A0E17 ≈ 15:1 ✓ WCAG AA -->`
- Declare `width: 1080px; height: 1440px` fixos no `body`

## Output Format

```
LISTA DE ARQUIVOS A CRIAR:
- slide-01-hook.html (1080×1440px — feed)
- slide-02-[nome].html (1080×1440px — feed)
[...]

─────────────────────────────────────────────
ARQUIVO: slide-01-hook.html
<!-- Contraste: #F0F2F5 sobre #09101E ≈ 15:1 ✓ WCAG AA -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0A0E17; --bg2: #0D1420;
      --blue: #00A3FF; --blue-g: rgba(0,163,255,0.13);
      --red: #FF4455;  --red-g:  rgba(255,68,85,0.11);
      --green: #00E08E; --green-g: rgba(0,224,142,0.11);
      --gold: #F5B800;  --gold-g:  rgba(245,184,0,0.11);
      --white: #F0F2F5; --gray: #6B7A8D; --gray-l: #9BA8B8;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      width:1080px; height:1440px;
      background: linear-gradient(155deg, #09101E 0%, #0E1829 100%);
      border: 1px solid rgba(255,255,255,0.06);
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      position:relative; overflow:hidden;
      font-family:'DM Sans',sans-serif;
      color: var(--white);
    }
    /* [restante do CSS do slide] */
  </style>
</head>
<body>
  <!-- LOGO WATERMARK — NÃO REMOVER -->
  <div style="position:absolute;top:60px;left:50%;transform:translateX(-50%);opacity:0.12;z-index:10;pointer-events:none;white-space:nowrap;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 162" width="490" height="162" fill="none">
      <defs>
        <clipPath id="hclip">
          <path d="M 80 140 C 22 103 2 70 2 49 C 2 24 22 7 47 7 C 61 7 74 14 80 27 C 86 14 99 7 113 7 C 138 7 158 24 158 49 C 158 70 138 103 80 140 Z"/>
        </clipPath>
      </defs>
      <path fill="white" fill-opacity="0.58" d="M 80 140 C 22 103 2 70 2 49 C 2 24 22 7 47 7 C 61 7 74 14 80 27 C 86 14 99 7 113 7 C 138 7 158 24 158 49 C 158 70 138 103 80 140 Z"/>
      <path clip-path="url(#hclip)" d="M 107 10 C 145 30 120 65 80 73 C 40 81 15 112 36 135" stroke="white" stroke-width="34" stroke-linecap="round" fill="none"/>
      <text x="175" y="76" font-family="'Space Grotesk', Arial Black, Arial, sans-serif" font-weight="700" font-size="64" fill="white">Saúde</text>
      <text x="175" y="148" font-family="'Space Grotesk', Arial Black, Arial, sans-serif" font-weight="700" font-size="64" fill="white">Sync</text>
      <path d="M 12 153 Q 245 182 462 82" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 462 82 L 447 75 M 462 82 L 451 93" stroke="white" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    </svg>
  </div>
  <!-- [conteúdo do slide] -->
</body>
</html>

[repetir para cada arquivo]
```

## Quality Criteria

- [ ] Cada arquivo HTML é autocontido (sem dependências de arquivos locais)
- [ ] Logo watermark SVG presente em TODOS os slides (topo centralizado, opacity 0.12)
- [ ] CSS variables `:root` declaradas em todos os slides
- [ ] Contraste WCAG AA verificado (mín. 4.5:1) em cada combinação texto/fundo
- [ ] Space Grotesk para headlines (mín. 88px), DM Sans para corpo (mín. 38px)
- [ ] Backgrounds seguem a tabela por tipo de slide — sem fundos claros ou coloridos
- [ ] Nomenclatura de arquivos segue a convenção definida

## Veto Conditions

Rejeitar e refazer se QUALQUER condição for verdadeira:
1. Qualquer arquivo HTML com dependências externas além do CDN do Google Fonts
2. Qualquer slide com headline abaixo de 88px ou corpo abaixo de 38px
3. Qualquer slide sem a logo watermark SVG
4. Uso de Poppins, Nunito Sans ou qualquer outra fonte fora do sistema atual
5. Uso de fundos claros (`#FFFFFF`, `#F5F5F5`) ou das cores antigas (`#1A3A8F`, `#5BBB2F`, `#2BBFBF`, `#F97316`)
