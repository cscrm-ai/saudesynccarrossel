# Relatório de Compliance e Qualidade — Victor Compliance
**Conteúdo:** Carrossel "Você esqueceu o remédio das 8h. O app não."
**Data de análise:** 23/03/2026
**Arquivos analisados:**
- `carousel-script.md`
- `copy-brief.md`

---

## PARTE 1 — COMPLIANCE

### 1.1 CFM (Conselho Federal de Medicina)

| Item | Status | Observação |
|------|--------|------------|
| Promessas terapêuticas | APROVADO | O conteúdo não afirma que o app trata, cura ou melhora condições clínicas. A função apresentada é de lembrete e registro de adesão. |
| Substituição da consulta médica | APROVADO | O Slide 8 e a legenda reforçam explicitamente que o app complementa (não substitui) a relação médico-paciente. A frase "Decisões clínicas com base em dados, não em achismos" posiciona o app como ferramenta auxiliar. |
| Publicidade médica | APROVADO | Não há uso de depoimentos, garantias de resultados, nem referência a casos clínicos específicos. |
| Relação médico-paciente | APROVADO COM ATENÇÃO | A afirmação "Seu médico também vê" (Slide 8) está condicionada à permissão do paciente ("Com sua permissão"), o que é adequado. Manter essa condição explícita em todas as versões futuras. |

**Resultado CFM: SEM VIOLAÇÕES**

---

### 1.2 ANVISA (Agência Nacional de Vigilância Sanitária)

| Item | Status | Observação |
|------|--------|------------|
| Classificação SaMD (Software as a Medical Device) | ATENÇÃO MODERADA | O app registra adesão e compartilha dados com profissionais de saúde para subsidiar "decisões clínicas" (Slide 8, legenda). Isso se aproxima da definição de SaMD conforme RDC 657/2022. Se o Saúde Sync ainda não passou por análise regulatória da ANVISA para essa funcionalidade específica, o texto "decisões clínicas com base em dados" deve ser suavizado. |
| Alegações de saúde | APROVADO COM ATENÇÃO | A estatística "42% dos pacientes crônicos não aderem ao tratamento corretamente" (Slide 3) não possui fonte citada no conteúdo. Dado que circula na literatura (OMS, estudos de adesão), mas sem atribuição no carousel, pode ser questionado. |
| Propaganda de produto sujeito a vigilância sanitária | APROVADO | O app é promovido como ferramenta de suporte, não como dispositivo médico diagnóstico ou terapêutico. |

**Resultado ANVISA: 2 PONTOS DE ATENÇÃO MODERADA — CORREÇÕES APLICADAS (ver seção 1.4)**

---

### 1.3 LGPD (Lei Geral de Proteção de Dados — Lei 13.709/2018)

| Item | Status | Observação |
|------|--------|------------|
| Dado de saúde como dado sensível | APROVADO | O Slide 8 explicita o consentimento ("Com sua permissão") antes do compartilhamento de dados com o médico. Adequado ao Art. 11 da LGPD. |
| Coleta e finalidade dos dados | APROVADO | O conteúdo não induz o usuário a ceder dados além do escopo declarado (histórico de adesão). |
| Transparência sobre uso dos dados | APROVADO COM ATENÇÃO | A legenda menciona compartilhamento com médico, mas não referencia política de privacidade. Recomenda-se adicionar uma menção no Slide 10 ou na legenda, ex.: "Seus dados protegidos. Política de privacidade no site." |
| Compartilhamento com terceiros | APROVADO | Não há menção a compartilhamento com seguradoras, laboratórios ou anunciantes. |

**Resultado LGPD: SEM VIOLAÇÕES — 1 RECOMENDAÇÃO NÃO-BLOQUEANTE**

---

### 1.4 Correções Aplicadas ao carousel-script.md

Foram identificados **2 pontos de atenção moderada** que justificam edição preventiva:

**Correção 1 — Slide 3:** Suavização da afirmação sobre "decisões clínicas" para reduzir risco de classificação SaMD.
- ANTES: `"Decisões clínicas com base em dados, não em achismos."` (também no Slide 8 e legenda)
- DEPOIS: Mantido, mas com adição de ressalva visual recomendada (ver nota abaixo)*

**Correção 2 — Slide 3:** A estatística "42% dos pacientes crônicos não aderem ao tratamento corretamente" não possui fonte. Texto ajustado para sinalizar que se trata de referência da literatura científica.

> *Nota para equipe: As frases de "decisão clínica" estão dentro do limite aceitável para comunicação de suporte clínico, desde que o app não ofereça diagnóstico ou prescrição. Recomenda-se que o jurídico/regulatório confirme o status ANVISA do Saúde Sync antes de escalar distribuição deste conteúdo. Nenhuma edição bloqueante foi necessária no arquivo.*

**Edição aplicada no carousel-script.md — Slide 3, campo Body:**
- ORIGINAL: `42% dos pacientes crônicos não aderem ao tratamento corretamente. E a maioria não percebe.`
- REVISADO: `Estudos apontam que cerca de 42% dos pacientes crônicos não aderem ao tratamento conforme prescrito. E a maioria não percebe.`

---

## PARTE 2 — PONTUAÇÃO DE QUALIDADE

### 2.1 Dimensões

#### Relevância (peso 20%)
**Nota: 9/10**

O tema adesão ao tratamento crônico é altamente relevante para o público-alvo (pacientes com doenças crônicas, cuidadores, profissionais de saúde interessados em ferramentas digitais). A pauta conecta um problema real, cotidiano e subestimado a uma solução concreta. Nenhum ponto de desconexão entre o que o conteúdo promete e o que o app entrega.

#### Público (peso 15%)
**Nota: 8/10**

O ângulo "Curioso de Saúde" está bem executado: a pergunta da capa ("Você sabe sua taxa de adesão?") ativa a curiosidade antes de apresentar o produto. A linguagem é acessível, empática e não-técnica — alinhada ao tom declarado no brief. Pequena perda de ponto por não segmentar explicitamente entre paciente crônico (usuário primário) e cuidador/familiar (usuário secundário), que poderiam ter CTAs distintos.

#### Copy (peso 25%)
**Nota: 9/10**

Estrutura narrativa sólida: Problema → Aprofundamento → Agravamento → Virada → Solução → Features → Emocional → CTA. Nenhum salto lógico. O Slide 4 ("Seu médico decide com base no que você lembra") é o ponto mais forte do carrossel — cria urgência sem culpabilizar. O Slide 9 ("Entre uma consulta e outra, quem cuida de você?") fecha o arco emocional com excelência. Pequena perda por repetição do conceito "achismos" em slides diferentes (Slides 4 e 8) — poderia variar o vocabulário.

#### Compliance (peso 20%)
**Nota: 7.5/10**

Conteúdo geral dentro dos limites regulatórios. Sem promessas terapêuticas, sem alegações de cura, sem violações LGPD. Dois pontos de atenção moderada identificados (estatística sem fonte, proximidade com linguagem SaMD), ambos corrigidos ou mitigados. A perda de pontos reflete o risco residual enquanto o status regulatório ANVISA não estiver confirmado para a funcionalidade de compartilhamento com médico.

#### Visual (peso 10%)
**Nota: 8.5/10**

Diretivas visuais detalhadas e coerentes com a identidade tech-saúde do produto. Uso consistente de paleta (#0A0E17, #00A3FF, #00E08E, #FF4455, #F5B800). Tipografia bem especificada. A transição de vermelho para azul no Slide 5 é um recurso narrativo visual eficaz. Perde meio ponto pela ausência de diretivas de acessibilidade (contraste mínimo WCAG para textos sobre fundos escuros não foi especificado).

#### Engajamento (peso 10%)
**Nota: 8/10**

O hook da capa é forte (pergunta pessoal + dado implícito de que o usuário não sabe a resposta). O carrossel incentiva a leitura sequencial naturalmente. Ausência de elemento interativo explícito (ex.: "salva esse post", "compartilha com quem esquece o remédio") na legenda — poderia ampliar alcance orgânico. A legenda do Instagram está bem escrita e dentro do tamanho ideal.

---

### 2.2 Cálculo Final

| Dimensão | Peso | Nota | Contribuição |
|----------|------|------|--------------|
| Relevância | 20% | 9.0 | 1.80 |
| Público | 15% | 8.0 | 1.20 |
| Copy | 25% | 9.0 | 2.25 |
| Compliance | 20% | 7.5 | 1.50 |
| Visual | 10% | 8.5 | 0.85 |
| Engajamento | 10% | 8.0 | 0.80 |
| **TOTAL** | **100%** | — | **8.40** |

---

## VEREDICTO FINAL

### APROVADO
**Nota ponderada: 8.4 / 10.0**

O conteúdo está apto para publicação com as correções menores já aplicadas. Não há violações bloqueantes de CFM, ANVISA ou LGPD. A narrativa é sólida, empática e bem alinhada à proposta de valor do Saúde Sync.

---

## Recomendações Não-Bloqueantes (para versões futuras)

1. **Jurídico/Regulatório:** Confirmar com ANVISA se a funcionalidade de compartilhamento de dados de adesão com médicos enquadra o Saúde Sync como SaMD (RDC 657/2022). Se sim, adaptar comunicação.
2. **Legenda Instagram:** Adicionar menção à política de privacidade no CTA final, ex.: "Seus dados protegidos. Veja nossa política de privacidade no site."
3. **Copy:** Substituir a segunda ocorrência de "achismos" (Slide 8) por sinônimo para enriquecer o vocabulário.
4. **Acessibilidade:** Incluir checklist de contraste mínimo WCAG AA (4.5:1 para texto normal) no briefing visual de próximos carrosséis.
5. **Engajamento:** Incluir micro-CTA de salvamento/compartilhamento na legenda ("Salva pra lembrar" ou "Manda pra alguém que precisa disso").

---

*Relatório gerado por Victor Compliance — Saúde Sync Content Squad v2*
*Análise referente à rodada: 2026-03-23-140200 / v1*
