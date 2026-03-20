# Research Brief: Tutorial Writer Squad

**Preparado:** 2026-03-18
**Propósito:** Base de conhecimento para o squad de geração automática de tutoriais interativos do Saúde Sync

---

## Domínio 1: Design de Tutoriais Interativos e UX Writing

### Frameworks Principais

**1.1 Diátaxis Framework (Daniele Procida)**
A arquitetura de documentação mais rigorosa e adotada. Quatro tipos distintos, nunca misturados:
- **Tutoriais** — Orientados ao aprendizado. O usuário faz algo guiado, adquirindo competência pela prática.
- **How-To Guides** — Orientados à tarefa. Para quem já tem competência básica.
- **Referência** — Informação precisa sobre a mecânica do sistema.
- **Explicação** — Contexto e justificativa (o "porquê").

Regra central: esses quatro tipos NUNCA devem ser misturados em um único documento. Adotado por Python, Ubuntu/Canonical, Django.

**1.2 Gradual Release of Responsibility (GRR) — "I Do, We Do, You Do"**
Modelo scaffolded para habilidades procedurais:
- **I Do:** Demonstração completa do fluxo com narração de cada decisão
- **We Do:** Aprendiz segue passo a passo com orientação explícita
- **You Do:** Execução independente com ajuda disponível sob demanda

Eficaz para tutoriais de software porque espelha a transição cognitiva de observação para autonomia. Reduz o medo de errar em sistemas reais.

**1.3 Progressive Disclosure**
Informações reveladas incrementalmente, matching a complexidade cognitiva do usuário. Aplicado a tutoriais:
- Mostrar apenas os passos necessários para a tarefa imediata
- Exibir opções avançadas apenas após o fluxo principal ser dominado
- Validado pela Nielsen Norman Group como uma das técnicas mais eficazes para reduzir complexidade percebida

**1.4 Mayer's Multimedia Learning Principles**
- **Coherence:** Remover material irrelevante, mesmo que interessante
- **Signaling:** Usar pistas visuais (setas, destaques, numeração) para guiar atenção
- **Segmenting:** Fragmentar conteúdo em segmentos no ritmo do aprendiz
- **Contiguity:** Palavras e imagens correspondentes devem estar adjacentes — NUNCA separadas

**1.5 Critérios de Qualidade (Rubrica)**

| Critério | Excelente | Aceitável | Reprovado |
|---|---|---|---|
| Clareza do objetivo | Resultado explícito antes do passo 1 | Objetivo implícito | Sem objetivo |
| Atomicidade dos passos | 1 ação por passo | Às vezes combina ações | Múltiplas ações frequentes |
| Voz e tempo | Imperativo ativo consistente | Voz mista | Voz passiva dominante |
| Suporte visual | Screenshot anotado em todo passo não óbvio | Screenshots sem anotação | Sem suporte visual |
| Confirmação de conclusão | Feedback esperado descrito em cada passo | Alguns passos com confirmação | Sem indicadores de conclusão |

---

## Domínio 2: Automação de Screenshots com Playwright

### Padrões e Metodologias

**2.1 Playwright (Microsoft)**
Framework dominante para captura automatizada. Capacidades-chave:
- `page.screenshot({ path, clip })` para captura por área
- `page.locator('.element').screenshot()` para componentes isolados
- `page.evaluate()` para injetar CSS/JS e destacar elementos antes da captura
- Suporte nativo a ambientes CI/CD headless

**2.2 Playwright MCP**
Camada de integração que permite agentes de IA controlarem o Playwright como ferramenta. Permite:
- Navegação e setup de estado antes da captura
- Injeção de anotações via JavaScript evaluation
- Pipelines de geração de documentação onde a IA decide o que capturar e anota

**2.3 Docs-as-Code com CI/CD (modelo Kong/Twilio)**
- Documentação no mesmo repositório que o código
- PRs disparam re-geração de screenshots
- Screenshots commitados como build artifacts
- Kong implementou isso para documentar features internas sem expor UI proprietária
- Twilio escalou para +5.000 páginas e +3.000 imagens com geração automatizada de alt text via LLM

### Boas Práticas de Captura

**Nomear screenshots semanticamente:**
```
step-01-dashboard-menu-inferior.png
step-02-sinais-vitais-lista.png
step-03-selecionar-tipo-sinal.png
```

**Viewport obrigatório:** 1440x900, zoom 100%, device pixel ratio 1x ou 2x
**Estado determinístico:** Sempre capturar em estado limpo (sem tooltips, menus abertos, loading spinners)
**Dados ficcionais:** Paciente: "Maria Santos". Data: "01/01/1980". Nunca dados reais.
**Foco visual:** Injetar CSS/JS para criar destaque (borda colorida, overlay) no elemento focal antes da captura

### Critérios de Qualidade

| Critério | Excelente | Reprovado |
|---|---|---|
| Reprodutibilidade | Script Playwright em controle de versão | Screenshots manuais |
| Foco visual | Anotação com callout/destaque no elemento | Sem anotação |
| Segurança de dados | Apenas dados ficcionais | PHI/PII visível |
| Consistência | Todos no mesmo viewport definido | Tamanhos aleatórios |
| Alt text | Descritivo e instrutivo em todas as imagens | Alt text ausente |

---

## Domínio 3: HTML/CSS para Páginas de Tutorial Interativo

### Padrões de Estrutura

**3.1 Step Indicator / Stepper Component**
Padrão HTML canônico para tutoriais multi-passo:
- Barra de progresso numerada no topo (estados: pendente / ativo / completo)
- ARIA roles: `role="list"`, `aria-current="step"`
- U.S. Web Design System (USWDS) publica especificação de stepper acessível

**3.2 Estrutura Semântica HTML (Stripe/Notion/Intercom model)**
```html
<main>
  <article>
    <header><h1>Título do Tutorial</h1></header>
    <section class="prerequisites">...</section>
    <ol class="tutorial-steps">
      <li class="step" id="step-1">
        <h2>Passo 1: [Verbo imperativo] [Objeto]</h2>
        <p>Instrução que INTERPRETA, não repete a imagem</p>
        <figure>
          <img src="assets/step-01-*.png" alt="Descrição instrutiva">
          <figcaption>Legenda contextual</figcaption>
        </figure>
      </li>
    </ol>
  </article>
  <aside class="table-of-contents"><!-- TOC sticky --></aside>
</main>
```

**3.3 Sticky TOC com Scroll-Spy**
Para tutoriais com > 5 passos:
- `<aside>` com `position: sticky; top: 2rem`
- IntersectionObserver API para detectar qual passo está visível
- Highlighting do passo atual no índice

**3.4 Paleta Saúde Sync (aplicar em Wanda Web)**
```css
:root {
  --verde: #5BBB2F;    /* ações positivas, progresso, CTA principal */
  --azul: #1A3A8F;     /* header, elementos de autoridade */
  --teal: #2BBFBF;     /* badges, destaques secundários */
  --bg: #F8FAFB;
  --texto: #1A1A2E;
  --texto-sec: #6B7A8D;
  --borda: #E2E8F0;
}
```

### Erros de HTML a Evitar

1. Usar `<div>` em vez de `<ol><li>` para passos — sem semântica de sequência
2. Imagens sem `alt` text — falha WCAG 2.1 SC 1.1.1
3. Fontes carregadas de CDN externo — falha em ambientes offline
4. Pular níveis de heading — `<h1>` direto para `<h3>` quebra outline de acessibilidade
5. Layout com `<table>` — quebra reflow mobile

---

## Domínio 4: Documentação de Onboarding para Software de Saúde

### Frameworks de Compliance

**4.1 Plain Language Standards (FDA Guidelines)**
- Nível de leitura: abaixo de Flesch-Kincaid 6ª série para conteúdo de pacientes
- Frases: máximo 20 palavras; parágrafos: máximo 5 linhas
- Trocar terminologia clínica por equivalentes simples
- "prior authorization" → "aprovação do médico para o medicamento"
- "adverse event" → "efeito colateral ou problema de saúde inesperado"

**4.2 Treinamento por Função (Role-Based Training)**
- KLAS Arch Collaborative (2022): treinamento específico por especialidade = 25x mais satisfação
- Médicos, pacientes, administrativo, TI — caminhos completamente separados
- Tom para médicos: direto, técnico, eficiente
- Tom para pacientes: acolhedor, simples, sem jargão, foco no benefício de saúde

**4.3 WCAG 2.1 AA + LGPD (obrigatório)**
- Contraste mínimo 4.5:1 para texto
- Navegação completa por teclado
- Screen reader compatível
- Alt text em todas as imagens
- NUNCA usar PHI real em screenshots

### Erros Fatais em Documentação de Saúde

1. **Jargão clínico em conteúdo de paciente** — cria barreira, reduz adesão
2. **Tutorial único para todos os públicos** — serve mal a todos
3. **PHI real em screenshots** — violação de LGPD/HIPAA
4. **Sem recuperação de erro** — em saúde, erros têm implicações para segurança do paciente
5. **Assumir literacia digital** — pacientes incluem idosos e usuários com baixa literacia digital

### Vocabulário por Público

**Para pacientes — usar:**
- "Histórico de saúde" (não "prontuário")
- "Seu médico" (não "profissional de saúde")
- "Medicamentos" (não "prescrições")
- "Registrar" (não "inserir dados")
- "Ver seu histórico" (não "acessar o módulo de dados")

**Para médicos — usar:**
- "Prontuário SOAP"
- "Protocolo clínico"
- "Prescrição"
- "Monitoramento contínuo"
- "Adesão medicamentosa"

---

## Vocabulário do Domínio

### Usar (termos profissionais)
- "Atomicidade de passos" — um passo = uma ação
- "Progressive disclosure" — revelação progressiva de informações
- "Screenshot determinístico" — estado consistente e reproduzível
- "Foco visual" — destaque no elemento focal do screenshot
- "Estrutura semântica" — HTML com significado além do visual
- "Viewport canônico" — tamanho de tela padronizado (1440x900)

### Evitar (termos amadores)
- "Simplesmente clique" — minimiza dificuldade, patronizante
- "É fácil" — alienante para quem está com dificuldade
- "Gestão", "ERP", "sistema" — não é a identidade da Saúde Sync
- "Print" (em contextos formais) — use "captura de tela"
- "Usuário vai descobrir sozinho" — inaceitável em contexto clínico
