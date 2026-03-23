# Mapa Visual de Delegacao — Carrossel Saude Sync

**Pauta:** Seu medico viu que sua pressao subiu antes mesmo de voce sentir
**Data:** 2026-03-23
**Diretor Visual:** Marco Mapa Visual
**Modelo:** Google Imagen 4.0 (imagen-4.0-generate-001)
**Dimensoes base:** 1080 x 1350 px (4:5)

---

## Legenda de Agentes

| Agente | Especialidade | Sigla |
|--------|--------------|-------|
| Isa Ilustra | Ilustracoes digitais estilizadas | ISA |
| Pedro Persona | Pessoas fotorrealistas | PEDRO |
| Icaro Icone | Icones, line art, graficos minimalistas | ICARO |
| Bruno Base | Backgrounds atmosfericos, gradientes, texturas | BRUNO |
| Daniela Dev | CSS/SVG/mockups de interface (sem geracao de imagem) | DANIELA |

---

## Slide 1 — CAPA

**Agentes:** BRUNO + ISA
**Daniela:** Tipografia e overlay de glow

### Bruno Base — Background atmosferico
```
Prompt: Dark cinematic background with deep navy blue tone (#0A0E17), subtle particle effects of floating light dots in cool blue (#00A3FF), volumetric light rays coming from a large digital panel in the distance, futuristic medical control room atmosphere, dramatic lighting, ultra wide perspective, 8K quality, no text, no people
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Atmosferico, cinematografico, profundidade de campo
- **Camada:** Background (z-index 0)

### Isa Ilustra — Silhueta do medico com painel
```
Prompt: Stylized digital illustration of a doctor silhouette seen from behind, wearing a white coat, standing in front of a large floating holographic medical dashboard displaying vital signs graphs and heart rate lines, data streams flowing around the figure, cool blue (#00A3FF) illumination creating rim light on the silhouette, dark background transparent, modern health tech aesthetic, cinematic composition, no text
```
- **Dimensoes:** 1080 x 1350 px (fundo transparente PNG)
- **Estilo:** Ilustracao digital estilizada, semi-realista
- **Camada:** Foreground (z-index 1), posicionada no centro-inferior do slide
- **Integracao:** Sobreposta ao background do Bruno, Daniela aplica glow azul e tipografia por cima

---

## Slide 2 — PROBLEMA

**Agentes:** BRUNO + DANIELA
**Daniela:** Numeros flutuantes em CSS, tipografia, overlay

### Bruno Base — Corredor de clinica desfocado
```
Prompt: Blurred out-of-focus hospital clinic corridor, warm fluorescent overhead lighting, many people waiting as silhouettes, shallow depth of field creating bokeh effect, overwhelming crowded atmosphere, slightly desaturated colors with hints of warm yellow light, photorealistic, no text, no faces visible, moody and tense feeling
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Fotorrealista desfocado, bokeh pesado
- **Camada:** Background (z-index 0), opacidade ~40% com overlay escuro #0A0E17
- **Integracao:** Daniela sobrepoe numeros flutuantes ("140/95", "180 mg/dL", "?") em CSS com glow vermelho e tipografia

---

## Slide 3 — AGRAVAMENTO

**Agentes:** DANIELA-ONLY
**Sem geracao de imagem**

**Justificativa:** O elemento visual principal e um mockup de tela de celular com lista de pacientes e icones de alerta. Isso e 100% interface UI — Daniela constroi com CSS/SVG: card de celular escuro (#0D1420), lista de nomes com icones vermelhos pulsando, bordas sutis em #FF4455, animacao de notificacao ignorada.

**Daniela entrega:**
- Mockup de celular em CSS com lista de pacientes
- 3 icones de alerta vermelhos (#FF4455) com efeito pulse
- Background #0D1420 com borda lateral sutil vermelha
- Tipografia completa do slide

---

## Slide 4 — AGRAVAMENTO EMOCIONAL

**Agentes:** PEDRO + BRUNO
**Daniela:** Overlay gradiente, vinheta, tipografia

### Pedro Persona — Medico(a) exausto(a)
```
Prompt: Photorealistic portrait of a tired Brazilian doctor in their 30s sitting at a desk, head down with hands covering face, wearing a white lab coat with stethoscope, exhausted posture showing emotional burnout, a computer screen with a packed appointment schedule glowing in the background slightly out of focus, warm intimate golden lighting from a desk lamp, shallow depth of field, emotional and vulnerable moment, no text, cinematic photography style
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Fotorrealista, emocional, iluminacao quente dourada
- **Camada:** Imagem principal, ocupa 60% inferior do slide

### Bruno Base — Atmosfera dourada intimista
```
Prompt: Dark moody background with warm golden ambient light, soft volumetric glow from a single light source on the right side, dark vignette on all edges, intimate atmosphere, subtle dust particles floating in warm light, color palette transitioning from deep navy (#0A0E17) to warm gold (#F5B800) highlights, no objects, no text, abstract mood lighting
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Abstrato atmosferico, vinheta pesada
- **Camada:** Background (z-index 0)
- **Integracao:** Pedro no foreground com blend mode sobre o Bruno. Daniela aplica vinheta extra e headline com muito espaco negativo

---

## Slide 5 — VIRADA

**Agentes:** BRUNO + ICARO
**Daniela:** Efeito de transicao diagonal, tipografia

### Bruno Base — Background de transicao problema-solucao
```
Prompt: Abstract diagonal split background, left side dark with deep red-tinted shadows (#0A0E17 with subtle #FF4455 undertone), right side illuminated with cool electric blue glow (#00A3FF), dramatic diagonal division line with soft gradient transition in the center, volumetric light emerging from the right side, particle effects along the division line, futuristic portal energy feeling, no text, no objects, cinematic atmosphere
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Abstrato, gradiente diagonal, cinematografico
- **Camada:** Background (z-index 0)

### Icaro Icone — Icone de alerta/sino brilhante
```
Prompt: Minimal glowing notification bell icon, clean line art style with thin strokes, electric blue color (#00A3FF) with bright glow effect radiating outward, small alert dot on top right of the bell, transparent background, centered composition, modern flat design with subtle 3D depth from the glow, health tech aesthetic, no text
```
- **Dimensoes:** 400 x 400 px (fundo transparente PNG)
- **Estilo:** Line art minimalista com glow
- **Camada:** Elemento central (z-index 2), posicionado no centro exato do slide sobre a linha de divisao
- **Integracao:** Icaro centralizado sobre o background do Bruno. Daniela adiciona efeito de portal e tipografia

---

## Slide 6 — SOLUCAO

**Agentes:** DANIELA-ONLY
**Sem geracao de imagem**

**Justificativa:** O elemento visual principal e um mockup de dashboard do Saude Sync com graficos de pressao e glicose, cards de dados de paciente. Isso e interface UI pura que Daniela constroi com precisao perfeita em CSS/SVG — graficos com linhas em #00A3FF e #00E08E, cards escuros (#0D1420) com bordas #00A3FF, dados em JetBrains Mono.

**Daniela entrega:**
- Dashboard mockup completo em CSS (dark mode)
- Graficos de linha de pressao arterial (#00A3FF) e glicose (#00E08E)
- Cards de paciente com dados em JetBrains Mono
- Borda sutil #00A3FF nos cards
- Ocupa 50% inferior do slide
- Tipografia do headline e body

---

## Slide 7 — FEATURE

**Agentes:** ICARO + DANIELA
**Daniela:** Layout de checklist, tipografia, checkmarks

### Icaro Icone — Set de 5 icones de features
```
Prompt: Set of 5 minimal line art icons arranged vertically with spacing between them, transparent background, thin stroke weight, modern flat design: (1) AI brain with alert signal in red (#FF4455), (2) chat bubble with lock symbol in blue (#00A3FF), (3) pill capsule with checkmark in green (#00E08E), (4) microphone with document in gold (#F5B800), (5) group of people with share arrows in blue (#00A3FF), each icon is 80x80 pixels, clean health tech style, no text, white line strokes with colored accent fills
```
- **Dimensoes:** 200 x 800 px (fundo transparente PNG, 5 icones empilhados)
- **Estilo:** Line art minimalista, flat, colorido por categoria
- **Camada:** Alinhado a esquerda, cada icone na mesma altura do bullet correspondente
- **Integracao:** Daniela posiciona icones do Icaro ao lado de cada bullet point, adiciona checkmarks verdes (#00E08E), tipografia e layout de lista premium

---

## Slide 8 — PROVA

**Agentes:** DANIELA-ONLY
**Sem geracao de imagem**

**Justificativa:** O elemento visual e uma timeline de 3 passos com mockups de interface: (1) dashboard com alerta, (2) grafico de pressao, (3) tela de chat com check verde. Todos sao componentes UI que Daniela constroi com CSS/SVG — cards conectados por linha pontilhada #00A3FF, dados em JetBrains Mono.

**Daniela entrega:**
- Timeline horizontal com 3 cards UI no terco inferior
- Card 1: mini-dashboard com badge de alerta
- Card 2: mini-grafico de pressao com seta subindo
- Card 3: mini-chat com mensagem e check verde (#00E08E)
- Linha pontilhada conectando os 3 cards (#00A3FF)
- Background #0A0E17
- Tipografia completa

---

## Slide 9 — EMOCIONAL

**Agentes:** PEDRO + BRUNO
**Daniela:** Overlay gradiente escuro, tipografia

### Pedro Persona — Medico(a) sorrindo com celular
```
Prompt: Photorealistic portrait of a confident smiling Brazilian doctor in their 30s, looking at a smartphone screen with a satisfied expression, wearing a clean white lab coat, standing in a bright organized modern medical office, natural soft golden sunlight coming through a window, warm hopeful atmosphere, the phone screen shows a clean blue health app interface, shallow depth of field with bokeh background, cinematic photography, no text on screen, human and optimistic mood
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Fotorrealista, iluminacao natural dourada, esperancoso
- **Camada:** Imagem principal, ocupa 60% inferior do slide com overlay gradiente escuro no topo

### Bruno Base — Atmosfera calma e esperancosa
```
Prompt: Soft warm background with gentle golden light (#F5B800 tones) transitioning to deep dark navy (#0A0E17) at the top, calm and serene atmosphere, subtle bokeh light circles, minimal and clean, no objects, no text, gradient from warm bottom to dark top, peaceful medical office ambient feeling
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Gradiente atmosferico, quente para escuro
- **Camada:** Background (z-index 0)
- **Integracao:** Foto do Pedro com blend sobre Bruno. Daniela aplica overlay gradiente escuro no terco superior para legibilidade do headline, muito espaco negativo

---

## Slide 10 — CTA

**Agentes:** BRUNO + ICARO
**Daniela:** Logo Saude Sync, botao CTA, tipografia, seta direcional

### Bruno Base — Background com particulas de luz
```
Prompt: Dark cinematic background (#0A0E17), floating luminous blue particles scattered across the frame like stars or digital dust, subtle electric blue (#00A3FF) light sources creating soft volumetric rays from the center, gentle radial glow in the middle of the composition fading to dark edges, futuristic and clean atmosphere, premium tech feeling, no text, no objects, 8K quality
```
- **Dimensoes:** 1080 x 1350 px
- **Estilo:** Atmosferico, particulas luminosas, premium
- **Camada:** Background (z-index 0)

### Icaro Icone — Logo Saude Sync estilizado
```
Prompt: Minimal modern health tech logo mark, abstract heartbeat line merging with a digital sync symbol, clean geometric design, electric blue (#00A3FF) color with subtle white glow effect radiating outward, transparent background, centered, premium and sophisticated, medical technology brand feeling, no text, vector-clean edges
```
- **Dimensoes:** 400 x 400 px (fundo transparente PNG)
- **Estilo:** Logo mark minimalista com glow
- **Camada:** Centralizado acima do headline, 120px com glow sutil
- **Integracao:** Logo do Icaro centralizado no topo. Bruno como background. Daniela adiciona botao CTA (#00A3FF com texto branco, bordas 12px), seta direcional, tipografia completa. Fecha o loop visual com Slide 1.

---

## Resumo de Delegacao

| Slide | Bruno Base | Isa Ilustra | Pedro Persona | Icaro Icone | Daniela Dev |
|-------|-----------|-------------|---------------|-------------|-------------|
| 1 - Capa | Background atmosferico | Silhueta medico + painel | - | - | Tipografia + glow |
| 2 - Problema | Corredor desfocado | - | - | - | Numeros flutuantes CSS |
| 3 - Agravamento | - | - | - | - | Mockup celular completo |
| 4 - Emocional | Atmosfera dourada | - | Medico exausto | - | Vinheta + tipografia |
| 5 - Virada | Transicao diagonal | - | - | Icone sino/alerta | Portal + tipografia |
| 6 - Solucao | - | - | - | - | Dashboard completo CSS |
| 7 - Feature | - | - | - | Set 5 icones | Layout checklist |
| 8 - Prova | - | - | - | - | Timeline 3 passos CSS |
| 9 - Emocional | Atmosfera calma | - | Medico sorrindo | - | Overlay + tipografia |
| 10 - CTA | Particulas de luz | - | - | Logo estilizado | Botao CTA + tipografia |

### Contagem por Agente

| Agente | Imagens a gerar | Slides |
|--------|----------------|--------|
| Bruno Base | 6 imagens | 1, 2, 4, 5, 9, 10 |
| Isa Ilustra | 1 imagem | 1 |
| Pedro Persona | 2 imagens | 4, 9 |
| Icaro Icone | 3 imagens | 5, 7, 10 |
| Daniela Dev (sem IA) | 10 slides | Todos |
| **Total imagens IA** | **12 imagens** | |

### Slides Daniela-Only (sem geracao de imagem)

- **Slide 3** — Mockup de celular com lista de pacientes (UI pura)
- **Slide 6** — Dashboard Saude Sync completo (UI pura)
- **Slide 8** — Timeline de 3 passos com mini-mockups (UI pura)

---

## Notas de Producao

1. **Ordem de geracao:** Bruno primeiro (backgrounds), depois Pedro e Isa (foreground), por ultimo Icaro (elementos pontuais)
2. **Formato de saida:** PNG com fundo transparente para Isa, Pedro (com recorte), e Icaro. JPEG para Bruno (backgrounds solidos)
3. **Consistencia visual:** Todos os prompts usam a mesma paleta (#0A0E17, #00A3FF, #FF4455, #00E08E, #F5B800) e estetica dark/cinematografica
4. **Pedro Persona:** Manter consistencia do personagem medico(a) entre Slides 4 e 9 — mesma pessoa, mesma faixa etaria, mesmo jaleco
5. **Seed de consistencia:** Usar mesma seed para Pedro nos slides 4 e 9 para manter coerencia do personagem
