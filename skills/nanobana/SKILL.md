---
name: nanobana
description: >
  Geração de imagens via Google Imagen API.
  Gera ilustrações, fotos de pessoas, ícones e backgrounds
  para uso em carrosséis e conteúdo visual.
description_pt-BR: >
  Geração de imagens via Google Imagen API.
  Gera ilustrações, fotos de pessoas, ícones e backgrounds
  para uso em carrosséis e conteúdo visual.
type: api
version: "1.0.0"
env:
  - GOOGLE_API_KEY
categories: [design, ai, images, generation]
---

# Nanobana — Google Imagen Image Generator

## When to use

Use Nanobana quando precisar gerar imagens via Google Imagen para conteúdo visual:
ilustrações, fotos de pessoas, ícones, backgrounds, infográficos.

## Instructions

### Configuração

O Nanobana usa a API do Google Gemini/Imagen para gerar imagens.
É necessário configurar a variável de ambiente `GOOGLE_API_KEY`.

### Workflow de Geração

1. **Construir o prompt** — Descrever a imagem desejada em inglês (melhores resultados)
   - Incluir estilo visual (flat illustration, realistic photo, icon, texture)
   - Incluir paleta de cores quando necessário
   - Incluir contexto (healthcare, medical, wellness)
   - Incluir composição (centered, full-body, close-up, pattern)

2. **Gerar a imagem** — Usar a API do Imagen via chamada HTTP:
   ```bash
   curl -s "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict" \
     -H "Content-Type: application/json" \
     -H "x-goog-api-key: $GOOGLE_API_KEY" \
     -d '{
       "instances": [{"prompt": "YOUR_PROMPT_HERE"}],
       "parameters": {
         "sampleCount": 1,
         "aspectRatio": "3:4",
         "personGeneration": "allow_adult"
       }
     }' | python3 -c "
   import sys, json, base64
   data = json.load(sys.stdin)
   img = base64.b64decode(data['predictions'][0]['bytesBase64Encoded'])
   with open('OUTPUT_PATH.png', 'wb') as f:
       f.write(img)
   print('Image saved successfully')
   "
   ```

3. **Verificar qualidade** — Abrir a imagem gerada e verificar:
   - Resolução adequada
   - Estilo consistente com a paleta
   - Sem artefatos visuais
   - Sem texto embutido indesejado

4. **Salvar no output** — Mover para o diretório de output do squad

### Parâmetros Úteis

| Parâmetro | Valores | Uso |
|---|---|---|
| aspectRatio | "1:1", "3:4", "4:3", "9:16", "16:9" | Proporção da imagem |
| sampleCount | 1-4 | Número de variações |
| personGeneration | "dont_allow", "allow_adult" | Permitir pessoas |

### Dicas de Prompt

**Para ilustrações (Isa Ilustra):**
- "Clean flat illustration of [concept], modern healthcare style, blue (#00A3FF) and dark navy (#0A0E17) color scheme, minimal, vector-like"

**Para pessoas (Pedro Persona):**
- "Professional photo of [description], warm lighting, healthcare setting, diverse, authentic expression, NOT stock photo style"

**Para ícones (Ícaro Ícone):**
- "Minimal line icon of [concept], white outline on transparent background, consistent 2px stroke, modern medical style"

**Para backgrounds (Bruno Base):**
- "Abstract subtle texture, dark navy (#0A0E17) base, faint blue (#00A3FF) geometric pattern, medical tech aesthetic, suitable for text overlay"

### Limitações

- Imagen pode gerar texto dentro das imagens — evitar pedindo "no text, no letters, no words"
- Resultados variam — gerar 2-3 variações e escolher a melhor
- Imagens com pessoas: pedir diversidade explicitamente
- Paleta: incluir cores hex no prompt para melhor aderência

## Available operations

- **Generate Image** — Criar imagem a partir de prompt textual
- **Batch Generate** — Criar múltiplas variações de uma mesma imagem
- **Style Control** — Controlar estilo via prompt engineering (flat, realistic, icon, texture)
