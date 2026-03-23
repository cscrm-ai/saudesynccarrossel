# Relatório de Compliance — Carrossel Instagram

**Data da revisão:** 2026-03-23
**Revisora:** Carla Compliance (Agente Regulatório)
**Peça avaliada:** Carrossel "Seu médico viu que sua pressão subiu antes mesmo de você sentir"
**Arquivos analisados:** `carousel-script.md`, `copy-brief.md`

---

## Resultado Geral: APROVADO COM RESSALVAS

O conteúdo apresenta boa consciência regulatória geral — não faz promessas de cura, não substitui consulta médica e mantém o foco na ferramenta como apoio ao profissional. Entretanto, foram identificados pontos que exigem ajuste antes da publicação.

---

## Ocorrências Identificadas

### Ocorrência 1 — Slide 5 (Virada)

**Texto problemático:**
> "A pressão do Sr. Carlos subiu 15% nos últimos 7 dias."

**Severidade:** MODERADA

**Regulação aplicável:** LGPD (Lei 13.709/2018) — Art. 11 (dados sensíveis de saúde); CFM Resolução 2.336/2023 — publicidade médica.

**Problema:** Embora "Sr. Carlos" seja fictício, o uso de nome próprio associado a dado clínico específico (pressão arterial + percentual de variação) pode ser interpretado como referência a caso real, violando princípios de sigilo médico e proteção de dados sensíveis. Além disso, a especificidade do dado ("15% nos últimos 7 dias") pode ser interpretada como promessa de precisão diagnóstica.

**Correção sugerida:**
Substituir por linguagem genérica sem nome próprio e sem percentual exato:
> "Imagine receber um alerta dizendo: 'Um dos seus pacientes apresentou alteração significativa de pressão nos últimos dias.'"

---

### Ocorrência 2 — Slide 2 (Problema)

**Texto problemático:**
> "Entre uma consulta e outra, a pressão do seu João subiu. O açúcar da Dona Maria descontrolou."

**Severidade:** BAIXA

**Regulação aplicável:** LGPD — Art. 11; CFM — sigilo médico.

**Problema:** Mesmo sendo nomes fictícios genéricos, a associação direta nome + condição clínica específica em material publicitário pode ser questionada. O uso de "seu João" e "Dona Maria" é coloquial e provavelmente não geraria sanção isolada, mas combinado com o Slide 5, forma um padrão de uso de dados clínicos individualizados.

**Correção sugerida:**
Manter os nomes, mas retirar a condição clínica específica ou usar linguagem mais vaga:
> "Entre uma consulta e outra, a saúde do seu João mudou. A Dona Maria precisou de ajuste na conduta. E você só vai saber na próxima consulta — se ele voltar."

---

### Ocorrência 3 — Slide 7 (Feature)

**Texto problemático:**
> "Alertas preventivos de IA quando algo muda no padrão do paciente"

**Severidade:** MODERADA

**Regulação aplicável:** ANVISA RDC 656/2022 (Software como Dispositivo Médico — SaMD); CFM Resolução 2.338/2023 (telemedicina e IA).

**Problema:** A menção a "alertas preventivos de IA" pode enquadrar o software como dispositivo médico (SaMD Classe II) perante a ANVISA, caso a IA esteja fazendo triagem ou classificação de risco clínico. Se o produto não possui registro na ANVISA como SaMD, a alegação de "alertas de IA" em material publicitário pode configurar propaganda irregular de produto de saúde não registrado.

**Correção sugerida:**
Substituir "IA" por linguagem que descreva a funcionalidade sem implicar decisão clínica autônoma:
> "Alertas automáticos quando os dados do paciente apresentam variação significativa"

Alternativamente, se o produto possui registro ANVISA como SaMD, incluir o número de registro em nota de rodapé.

---

### Ocorrência 4 — Slide 7 (Feature)

**Texto problemático:**
> "Notas clínicas por voz convertidas em SOAP automaticamente"

**Severidade:** BAIXA

**Regulação aplicável:** CFM Resolução 1.638/2002 (prontuário médico); LGPD — Art. 11.

**Problema:** A conversão automática de voz em notas SOAP implica processamento de dados sensíveis de saúde. O material publicitário deve deixar claro que o profissional é responsável pela validação final do registro. Sem essa ressalva, pode-se interpretar que o sistema gera prontuário médico de forma autônoma, o que viola a responsabilidade do médico sobre o registro clínico.

**Correção sugerida:**
Adicionar qualificador de revisão humana:
> "Notas clínicas por voz convertidas em SOAP para revisão e aprovação do profissional"

---

### Ocorrência 5 — Slide 8 (Prova)

**Texto problemático:**
> "Isso é medicina preventiva de verdade."

**Severidade:** BAIXA

**Regulação aplicável:** CFM Resolução 2.336/2023 — Art. 3° (vedação de autopromoção com expressões de superioridade).

**Problema:** A expressão "de verdade" pode ser interpretada como desqualificação implícita de outras abordagens de medicina preventiva, configurando superioridade indevida conforme normas do CFM. É um risco baixo, mas evitável.

**Correção sugerida:**
> "Isso é medicina preventiva no dia a dia."

---

### Ocorrência 6 — Legenda do Instagram (copy-brief.md)

**Texto problemático:**
> "A primeira vez que recebi um alerta preventivo de pressão arterial alterada de um paciente — antes dele sentir qualquer coisa — eu parei."

**Severidade:** BAIXA

**Regulação aplicável:** CFM — publicidade médica; ANVISA — alegações de produto de saúde.

**Problema:** A narrativa em primeira pessoa sugere depoimento de médico real. Se não houver profissional real associado ao depoimento, pode configurar uso de personagem fictício apresentado como profissional de saúde, o que é vedado pelo CFM. Caso seja depoimento real, deve haver autorização expressa.

**Correção sugerida:**
Incluir no post alguma indicação de que se trata de narrativa ilustrativa, ou obter depoimento real com autorização:
> Adicionar em texto pequeno no último slide ou na legenda: "Relato ilustrativo. Funcionalidades sujeitas ao plano contratado."

---

### Ocorrência 7 — Slide 10 (CTA)

**Texto problemático:**
> "Teste o Saúde Sync grátis por 14 dias."

**Severidade:** BAIXA

**Regulação aplicável:** CDC (Código de Defesa do Consumidor) — Art. 31 e 37.

**Problema:** Oferta de período gratuito deve ter termos claros. Se houver cobrança automática após os 14 dias, isso deve estar explícito ou vinculado a termos de uso acessíveis. Não é uma violação de saúde, mas é risco consumerista que pode gerar reclamação.

**Correção sugerida:**
Adicionar qualificador:
> "Teste o Saúde Sync grátis por 14 dias. Sem compromisso."

Ou garantir que a landing page (link na bio) contenha os termos completos da oferta.

---

## Resumo das Ocorrências

| # | Slide/Trecho | Severidade | Regulação | Status |
|---|-------------|-----------|-----------|--------|
| 1 | Slide 5 — nome + dado clínico específico | MODERADA | LGPD / CFM | Ajuste necessário |
| 2 | Slide 2 — nomes fictícios + condição clínica | BAIXA | LGPD / CFM | Ajuste recomendado |
| 3 | Slide 7 — "Alertas preventivos de IA" | MODERADA | ANVISA / CFM | Ajuste necessário |
| 4 | Slide 7 — SOAP automático | BAIXA | CFM / LGPD | Ajuste recomendado |
| 5 | Slide 8 — "de verdade" | BAIXA | CFM | Ajuste recomendado |
| 6 | Legenda — depoimento em 1a pessoa | BAIXA | CFM | Ajuste recomendado |
| 7 | Slide 10 — trial gratuito | BAIXA | CDC | Ajuste recomendado |

---

## Pontos Positivos

- Nenhuma promessa de cura ou diagnóstico.
- O produto é posicionado como ferramenta de apoio ao profissional, não ao paciente diretamente.
- Não há menção a preços de serviços médicos ou comparação com concorrentes.
- Não expõe dados reais de pacientes.
- O CTA é acolhedor e sem urgência artificial.
- A legenda do copy-brief já contém nota explícita de ausência de promessas terapêuticas (seção 5, item "Ausência de promessas terapêuticas").

---

## Parecer Final

**Status: APROVADO COM RESSALVAS**

O conteúdo pode ser publicado após os ajustes das ocorrências de severidade MODERADA (itens 1 e 3). Os demais itens (BAIXA) são recomendações de melhoria que reduzem risco regulatório mas não impedem a publicação.

Nenhuma ocorrência de severidade ALTA foi identificada.

---

*Relatório gerado por Carla Compliance — Agente Regulatório Saúde Sync*
*Data: 2026-03-23*
