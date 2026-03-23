---
id: "squads/saude-sync-content-v2/tasks/generate-backgrounds"
name: "Gerar Backgrounds e Texturas"
agent: "bruno-base"
skill: nanobana
output_dir: "output/"
---

# Tarefa: Gerar Backgrounds via Google Imagen

## Objetivo

Gerar backgrounds, texturas e elementos atmosfericos para os slides do carousel da Saude Sync. Os fundos devem ser sutis, escuros e compatíveis com sobreposicao de texto branco e dos demais elementos visuais.

## Inputs Necessarios

Antes de iniciar, confirmar que voce recebeu do Marco:
- [ ] Seed de estilo (numero inteiro para reproducibilidade)
- [ ] Lista de slides designados a Bruno Base
- [ ] Para cada slide: tipo de background, intensidade, cor de acento, tema

## Construcao do Prompt Imagen

Para cada slide, construir o prompt seguindo esta estrutura:

```
[TIPO DE TEXTURA/PADRAO] [TEMA] [INTENSIDADE] [PALETA] [COMPOSICAO] [RESTRICOES]
```

### Template de Prompt para Backgrounds

```
Subtle [tipo] texture/pattern for dark background, [tema] aesthetic,
very low opacity decorative elements, base color #0A0E17 dark navy,
[cor de acento] (#hex) subtle accents at 10-20% opacity,
full coverage 1080x1080px, text-overlay friendly, professional and clean,
no text, no logos, no recognizable symbols
```

### Parametros por Tipo de Background

**Textura tecnologica (circuitos, redes):**
```
Subtle dark tech background, circuit board or neural network pattern,
very faint glowing lines, dark navy base (#0A0E17), electric blue (#00A3FF)
subtle accents at 15% opacity, depth and dimensionality, full bleed,
clean professional health tech aesthetic, 1080x1080px, no text
```

**Padrao geometrico abstrato:**
```
Abstract geometric pattern on dark background, minimal subtle shapes,
hexagons or triangles or grid, dark navy (#0A0E17) base,
[cor] subtle accent lines at low opacity, professional modern aesthetic,
even coverage across full 1080x1080px canvas, suitable for text overlay
```

**Atmosferico/gradiente:**
```
Atmospheric dark gradient background, [descricao do mood: deep, calm, urgent],
dark navy (#0A0E17) to [variacao], subtle light bloom or vignette,
cinematic quality, no hard edges, smooth transitions,
1080x1080px full coverage, neutral zones for text placement
```

**Biomedico abstrato (DNA, celulas):**
```
Abstract biomedical pattern, subtle [DNA helix / cell structure / molecular],
very faint on dark navy (#0A0E17) background, soft [cor] glow,
organic flowing shapes at low opacity, scientific but artistic aesthetic,
full 1080x1080px coverage, text-friendly composition
```

**Ambiente clinico suave:**
```
Soft blurred healthcare environment background, out-of-focus clinic or hospital,
dark toned, warm but professional lighting, bokeh effect,
dark navy color grade, 1080x1080px, abstract enough to not be distracting
```

## Parametros de Qualidade para Imagen

Sempre incluir nos prompts:
- `dark background, dark theme, dark navy`
- `subtle, low opacity decorative elements`
- `text overlay friendly, high contrast zones`
- `full coverage, no white borders`
- `no text, no logos, no typography`
- `1080x1080px or 1080x1920px`
- `professional, clean`

Seed de estilo: usar o numero fornecido pelo Marco — fundamental para que todos os backgrounds do carousel tenham atmosfera coesa.

## Escala de Intensidade

Orientar o prompt conforme instrucao do Marco:

| Intensidade | Descricao no prompt |
|-------------|---------------------|
| Muito sutil | `barely visible, 5-10% opacity elements` |
| Sutil       | `subtle, 10-20% opacity, understated` |
| Moderado    | `noticeable but not dominant, 25-35% opacity` |
| Presente    | `visible textural layer, supporting the composition` |

## Execucao via Nanobana

Para cada slide designado:

1. Montar o prompt com tipo de background e intensidade correta
2. Chamar a skill nanobana com:
   - `prompt`: texto construido acima
   - `seed`: valor recebido do Marco
   - `width`: 1080
   - `height`: 1080 (ou 1920 para formato stories se solicitado)
   - `output_path`: `output/slide-{N}-bg-{descricao}.png`
3. Verificar mentalmente: o background permite leitura de texto branco sobreposto?
4. Confirmar salvamento
5. Registrar no relatorio final

## Salvamento e Nomenclatura

Diretorio: `squads/saude-sync-content-v2/output/`

Padrao: `slide-{numero-com-zeros}-bg-{tipo-kebab-case}.png`

Exemplos:
- `slide-01-bg-circuitos-tech.png`
- `slide-cover-bg-atmosferico-escuro.png`
- `slide-03-bg-geometrico-hexagonos.png`
- `slide-05-bg-dna-abstrato.png`

## Relatorio de Conclusao

Ao finalizar todos os slides, reportar ao Marco:

```
RELATORIO BRUNO BASE
Slides gerados: [lista]
Arquivos:
  - slide-XX: [caminho] — [tipo de background, intensidade, cor de acento]
Coesao visual: [confirmacao de que todos os bgs seguem a mesma atmosfera]
Zonas de texto: [confirmacao de que ha espaco legivel em cada slide]
Observacoes: [ajustes necessarios, slides que precisam de background mais sutil]
```
