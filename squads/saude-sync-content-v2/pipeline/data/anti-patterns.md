# Anti-Padrões — saude-sync-content-v2

## Anti-Padrões de Copywriting para Saúde

### NUNCA FAZER

1. **Claims terapêuticos sem fonte**
   - ❌ "Este alimento cura a hipertensão."
   - ✅ "Estudos sugerem que dieta DASH pode auxiliar no controle da pressão arterial. Consulte seu médico."

2. **Tom alarmista sem direcionamento**
   - ❌ "Você pode estar em risco de infarto agora."
   - ✅ "Conheça os sinais de alerta que merecem atenção médica."

3. **Abertura genérica**
   - ❌ "Hoje vamos falar sobre saúde mental..."
   - ✅ "Você não tem preguiça. Você tem inflamação."

4. **CTA vago**
   - ❌ "Cuide-se!"
   - ✅ "Salve este post para consultar quando precisar."

5. **Jargão técnico sem tradução para pacientes**
   - ❌ "A HbA1c elevada indica DM2 descompensado."
   - ✅ "O exame HbA1c mostra seu controle de açúcar nos últimos 3 meses — acima de 7% é sinal de atenção."

6. **Parede de texto em slide de carrossel**
   - ❌ 3 parágrafos em um único slide
   - ✅ 1 headline + 2-3 linhas de suporte por slide

7. **Slide de solução com dicas genéricas**
   - ❌ "Mantenha hábitos saudáveis e pratique exercícios"
   - ✅ "No Saúde Sync, você registra seus sinais vitais e seu médico acompanha em tempo real — sem esperar a próxima consulta."

8. **Slide de introdução antes do hook**
   - ❌ "Olá! Hoje trouxemos um conteúdo especial para vocês!"
   - ✅ Slide 1 é sempre o hook — sem introduções

---

## Anti-Padrões Visuais

1. **Usar paleta fora do SaudeSync Dark**
   - ❌ Cores aleatórias ou paleta clara genérica
   - ✅ Sempre usar: Azul #00A3FF, Vermelho #FF4455, Verde #00E08E, Dourado #F5B800 sobre fundo #0A0E17

2. **Texto abaixo dos mínimos tipográficos**
   - ❌ Copy de 24px no corpo do slide
   - ✅ Corpo mínimo: 38px (DM Sans 500), Display mínimo: 88px (Space Grotesk Bold)

3. **Imagens geradas sem coesão entre slides**
   - ❌ Cada slide com estilo de imagem completamente diferente
   - ✅ Marco Mapa Visual define seed/estilo e todos os agentes de imagem seguem

4. **Fundo branco sólido em todos os slides**
   - ❌ Slides todos iguais, sem ritmo visual
   - ✅ Alternar entre fundo #0A0E17, #0D1420 e accent colors

5. **Texto sobre imagem sem overlay**
   - ❌ Texto diretamente sobre imagem complexa
   - ✅ Overlay sólido ou gradiente antes do texto

6. **Imagens de pessoas não diversas**
   - ❌ Apenas pessoas jovens/brancas em imagens
   - ✅ Representar diversidade (idade, etnia, gênero)

---

## Anti-Padrões de Compliance

1. **Publicar antes da revisão da Carla Compliance**
   - ❌ Ir direto para o design sem check de compliance
   - ✅ Compliance sempre antes do design para evitar retrabalho visual

2. **Usar testimonial de paciente sem consentimento**
   - ❌ "Maria, 45 anos, hipertensa, nos contou que..."
   - ✅ Histórias genéricas ou com consentimento documentado

3. **Simular consulta médica no conteúdo**
   - ❌ "Me conta nos comentários seus sintomas que a gente analisa."
   - ✅ "Se você identificou esses sinais, agende com seu médico."

4. **Mencionar medicamentos por nome**
   - ❌ "Metformina é o primeiro passo no DM2."
   - ✅ "O médico pode indicar medicamentos orais como primeira linha no diabetes tipo 2."

---

## Anti-Padrões de Geração de Imagens

1. **Gerar imagens sem briefing do Marco Mapa Visual**
   - ❌ Cada agente de imagem decide sozinho o que gerar
   - ✅ Marco mapeia, delega e define parâmetros antes da geração

2. **Imagens com texto embutido (via Imagen)**
   - ❌ Pedir para o Imagen gerar imagens com texto/lettering
   - ✅ Texto é sempre adicionado pela Daniela Design no HTML/CSS

3. **Imagens de estilo fotorrealista para conceitos abstratos**
   - ❌ Foto realista de "continuidade de cuidado"
   - ✅ Ilustração ou infográfico para conceitos abstratos

4. **Ignorar a paleta ao gerar imagens**
   - ❌ Imagens com cores que conflitam com SaudeSync Dark
   - ✅ Incluir referências de paleta no prompt do Imagen

---

## Anti-Padrões de Publicação

1. **Publicar sem confirmação do usuário**
   - ❌ Bruna publica automaticamente após a revisão
   - ✅ Sempre aguardar confirmação explícita antes de qualquer publish

2. **Usar PNG para carrossel Instagram**
   - ❌ Slides em .png
   - ✅ Converter para JPEG antes de publicar via Blotato

3. **Publicar mais de 25 posts em 24h no Instagram**
   - ❌ Ultrapassar o rate limit da API
   - ✅ Bruna verifica o rate limit antes de qualquer publish

---

## Anti-Padrões de Analytics

1. **Tirar conclusões com menos de 3 posts**
   - ❌ "Carrossel não funciona para nós" após 1 post
   - ✅ Analisar padrões com mínimo de 3 publicações

2. **Não alimentar o loop de aprendizado**
   - ❌ Ana Analytics gera o briefing mas Paulo Pauta não recebe
   - ✅ O briefing da Ana é input obrigatório para o próximo ciclo do Paulo Pauta
