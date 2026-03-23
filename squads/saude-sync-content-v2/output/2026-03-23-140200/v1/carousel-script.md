# Carousel Script — 2026-03-23

**Pauta:** Você esqueceu o remédio das 8h. O app não.
**Angle:** Curioso de Saúde
**Formato:** 1080 x 1350 px (4:5) — 10 slides

---

## Slide 1 — CAPA

**Tipo:** capa
**Headline:** Você sabe sua taxa de adesão ao tratamento?
**Body:** A maioria dos pacientes não faz ideia.
**Background:** #0A0E17
**Visual element:**
- Descrição: Tela escura com headline grande em branco, destaque "taxa de adesão" em #00A3FF. Um círculo parcialmente preenchido (tipo gauge/progress ring) a 67% em azul, sugerindo uma taxa de adesão incompleta. Ícone sutil de comprimido no canto.
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — progress ring gauge at 67% with pill icon, dark tech background)
**Design notes:** Progress ring animável. Headline em Space Grotesk Bold 88px. Body em DM Sans 500 38px. O número 67% no centro do ring em JetBrains Mono 600. Manter bastante respiro visual.

---

## Slide 2 — PROBLEMA

**Tipo:** problema
**Headline:** Você esqueceu o remédio das 8h.
**Body:** E das 14h. E de ontem. E de terça passada também.
**Background:** #0A0E17
**Visual element:**
- Descrição: Lista de horários de medicação com ícones de status — 8:00 (X vermelho), 14:00 (X vermelho), ontem 20:00 (X vermelho), terça 8:00 (X vermelho). Estilo de checklist sombrio com Xs em vermelho sobre fundo escuro.
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — medication checklist with red X marks on dark background)
**Design notes:** Cada item da lista aparece com animação de fade. Xs em #FF4455. Headline em Space Grotesk Bold 88px. Lista em DM Sans 500 38px. Fundo do card em #0D1420.

---

## Slide 3 — PROBLEMA (aprofundamento)

**Tipo:** problema
**Headline:** "Estou tomando direitinho, doutor."
**Body:** Estudos apontam que cerca de 42% dos pacientes crônicos não aderem ao tratamento conforme prescrito. E a maioria não percebe.
**Background:** #0A0E17
**Visual element:**
- Descrição: Aspas grandes estilizadas em vermelho envolvendo a frase do headline. Abaixo, o dado 42% em destaque grande com fonte mono. Silhueta sutil de uma conversa médico-paciente ao fundo em opacidade baixa.
- Agent type: background
- Imagen prompt: Subtle silhouette of a doctor and patient conversation in a clinical office, soft warm lighting, blurred background, cinematic feel, dark moody tones, minimal, no text, 4:5 aspect ratio
**Design notes:** O "42%" em JetBrains Mono 600 tamanho grande (120px+) em #FF4455. Aspas decorativas em #FF4455 com opacidade 30%. Headline em Space Grotesk Bold 88px branco. Body em DM Sans 500 38px. Imagem de fundo com overlay escuro 85%.

---

## Slide 4 — AGRAVAMENTO

**Tipo:** agravamento
**Headline:** Seu médico decide com base no que você lembra.
**Body:** Sem dados reais, o tratamento vira tentativa e erro. E quem paga o preço é você.
**Background:** #0A0E17
**Visual element:**
- Descrição: Dashboard médico vazio/apagado — gráficos com barras zeradas, campos em branco, ícone de interrogação no centro. Visual de "dados indisponíveis" numa interface de saúde.
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — empty medical dashboard with blank charts, question mark icon, dark UI)
**Design notes:** Dashboard estilo card (#0D1420) com bordas sutis. Gráficos em cinza apagado. Ícone de "?" em #FF4455. Headline em Space Grotesk Bold 88px. Body em DM Sans 500 38px.

---

## Slide 5 — VIRADA

**Tipo:** virada
**Headline:** E se existisse um jeito de saber — de verdade?
**Body:** Sem depender da memória. Sem achismos. Com dados reais de cada dose.
**Background:** #0A0E17
**Visual element:**
- Descrição: Transição visual — lado esquerdo escuro/vermelho (problema) gradando para lado direito com brilho azul (solução). Linha do tempo de medicação começando a se iluminar, como se estivesse "ligando".
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — gradient transition from dark red to bright blue, timeline lighting up)
**Design notes:** Gradiente horizontal de #FF4455 (10% opacidade) para #00A3FF (20% opacidade). Headline em Space Grotesk Bold 88px branco. Body em DM Sans 500 38px. Efeito de "glow" sutil no lado direito.

---

## Slide 6 — SOLUÇÃO

**Tipo:** solução
**Headline:** O Saúde Sync lembra por você.
**Body:** Lembretes inteligentes antes de cada dose. E se você esquecer, ele registra isso também.
**Background:** #0A0E17
**Visual element:**
- Descrição: Mockup de notificação push do app: "Hora do Losartana 50mg — 08:00" com botões "Tomei" e "Lembrar depois". Notificação sobre fundo escuro com glow azul.
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — push notification mockup with medication reminder, blue glow, dark background)
**Design notes:** Card de notificação em #0D1420 com borda #00A3FF. Botão "Tomei" em #00E08E, "Lembrar depois" em cinza. Headline em Space Grotesk Bold 88px. Body em DM Sans 500 38px. Ícone de sino com badge azul.

---

## Slide 7 — FEATURE (dados)

**Tipo:** feature
**Headline:** Sua taxa de adesão dos últimos 30 dias.
**Body:** Tomados: 24 · Atrasados: 3 · Esquecidos: 3 · Taxa: 80%
**Background:** #0A0E17
**Visual element:**
- Descrição: Dashboard do app mostrando um gráfico de barras dos últimos 30 dias (verde = tomado, amarelo = atrasado, vermelho = esquecido). Abaixo, cards com os números resumidos. Taxa geral 80% em destaque com progress ring.
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — adherence dashboard with bar chart, summary cards, progress ring at 80%)
**Design notes:** Gráfico de barras — verde #00E08E, amarelo #F5B800, vermelho #FF4455. Números em JetBrains Mono 600. Progress ring de 80% em #00A3FF. Cards em #0D1420. Headline em Space Grotesk Bold 72px (menor para caber com o dashboard).

---

## Slide 8 — FEATURE (médico)

**Tipo:** feature
**Headline:** Seu médico também vê.
**Body:** Com sua permissão, o histórico de adesão fica visível para o profissional que te acompanha. Decisões clínicas com base em dados, não em achismos.
**Background:** #0A0E17
**Visual element:**
- Descrição: Tela dividida — lado do paciente (app mobile com dados de adesão) e lado do médico (dashboard web com o mesmo histórico). Linha pontilhada conectando os dois com ícone de cadeado (privacidade/permissão).
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — split screen patient app and doctor dashboard connected by secure link icon)
**Design notes:** Dois cards (#0D1420) lado a lado. Ícone de cadeado em #00E08E entre eles. Linha pontilhada em #00A3FF. Headline em Space Grotesk Bold 72px. Body em DM Sans 500 36px. Badge "Com sua permissão" em #F5B800.

---

## Slide 9 — EMOCIONAL

**Tipo:** emocional
**Headline:** Entre uma consulta e outra, quem cuida de você?
**Body:** O Saúde Sync cuida. Todos os dias. Dose por dose.
**Background:** #0A0E17
**Visual element:**
- Descrição: Imagem de pessoa em casa, momento íntimo do cotidiano (tomando café, olhando o celular pela manhã), iluminação quente e acolhedora. Overlay escuro com texto sobreposto.
- Agent type: background
- Imagen prompt: Close-up of a person at home in the morning light checking their phone with a glass of water and medicine bottle on the table, warm soft lighting, cozy and intimate atmosphere, shallow depth of field, lifestyle photography, no text, 4:5 aspect ratio
**Design notes:** Foto com overlay escuro (#0A0E17 a 75%). Headline em Space Grotesk Bold 88px branco. Body em DM Sans 500 42px em #00A3FF. Respiro generoso. Este slide deve transmitir acolhimento.

---

## Slide 10 — CTA

**Tipo:** CTA
**Headline:** Descubra sua taxa de adesão real.
**Body:** Baixe o Saúde Sync — Link na bio
**Slogan:** A consulta acaba. O cuidado continua.
**Background:** #0A0E17
**Visual element:**
- Descrição: Logo do Saúde Sync centralizado no topo. Headline grande. Botão estilizado "Baixe agora" em azul. Slogan na base em dourado. Elementos sutis de UI do app em opacidade baixa ao fundo.
- Agent type: daniela-only
- Imagen prompt: N/A (CSS/SVG — CTA slide with logo, button, slogan, subtle app UI elements in background)
**Design notes:** Logo no topo com margem generosa. Headline em Space Grotesk Bold 96px branco. "Baixe o Saúde Sync" com "Saúde Sync" em #00A3FF. Botão retangular arredondado em #00A3FF com texto branco "Baixe agora". Slogan em #F5B800, DM Sans 500 32px, base do slide. Seta para baixo sutil indicando "link na bio".
