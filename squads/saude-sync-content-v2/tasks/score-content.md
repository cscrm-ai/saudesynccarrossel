---
id: "squads/saude-sync-content-v2/tasks/score-content"
title: "Pontuar Conteúdo por Dimensão"
agent: "victor-veredicto"
inputs:
  - output/slides/slide-0N.jpg (imagens renderizadas)
  - output/slides/slide-0N.html (HTML fonte)
  - copy e estrutura textual de Carlos Conteúdo
outputs:
  - pontuação estruturada por dimensão (interna, alimenta generate-feedback)
---

# Tarefa: Pontuar Conteúdo por Dimensão

## Objetivo

Avaliar o conteúdo do carrossel em 6 dimensões com nota de 1 a 10, produzindo um scorecard detalhado que fundamenta o veredicto final. Cada nota deve ser justificada com evidência específica do conteúdo analisado.

---

## Pré-Requisitos

- [ ] JPEGs de todos os slides recebidos de Daniela Design
- [ ] HTML fonte disponível para verificação de copy
- [ ] Estrutura textual original de Carlos Conteúdo disponível
- [ ] `quality-criteria.md` carregado para referência de pesos e critérios

---

## Dimensões e Critérios Detalhados

### 1. Relevância (peso: 20%)

Avalie:
- O tema é atual e relevante para o contexto de saúde digital?
- Existe conexão clara com a proposta de valor da Saúde Sync?
- O conteúdo tem utilidade real para o público (não é genérico)?
- Existe gancho de oportunidade (tendência, dado recente, evento relevante)?

**Referência de nota:**
- 9-10: Tema altamente relevante, dado atual, conexão direta com a marca
- 7-8: Relevante, mas conexão com a marca poderia ser mais explícita
- 5-6: Tema válido, mas abordagem genérica
- ≤4: Tema desconectado da marca ou sem utilidade para o público

### 2. Público (peso: 15%)

Avalie:
- A linguagem é adequada ao público-alvo (médicos, gestores, pacientes)?
- O nível de complexidade técnica está calibrado corretamente?
- A abordagem respeita a inteligência e o contexto do leitor?
- O conteúdo fala com alguém específico ou com "todo mundo"?

### 3. Copy (peso: 25%)

Avalie slide por slide:
- O título do slide capa gera interesse imediato?
- Cada slide tem uma ideia central clara?
- A progressão narrativa entre slides é coerente?
- Os CTAs são específicos e acionáveis?
- Há erros gramaticais ou de ortografia?
- Os dados estão formatados corretamente (números, percentuais, fontes)?

### 4. Compliance (peso: 20%) — OBRIGATÓRIO

Verifique item a item — qualquer falha = REJEITADO automático:
- [ ] Não há promessas de cura ou tratamento específico
- [ ] Estatísticas citam fonte ou são verificáveis
- [ ] Não há afirmações de eficácia sem respaldo científico
- [ ] Conteúdo não induz automedicação
- [ ] Não há menção a medicamentos sem ressalva médica adequada
- [ ] Linguagem não é alarmista ou sensacionalista sem base
- [ ] LGPD: nenhum dado pessoal de paciente identificável

### 5. Visual (peso: 10%)

Avalie:
- A paleta SaudeSync Dark está sendo usada corretamente?
- As fontes (Space Grotesk / DM Sans / JetBrains Mono) estão no padrão?
- O contraste texto/fundo é legível?
- A hierarquia visual de cada slide é clara?
- A consistência entre slides é mantida?

### 6. Engajamento (peso: 10%)

Avalie:
- O slide capa convida ao swipe (curiosidade, promessa, dado)?
- Existem elementos que incentivam save (checklist, dado útil, referência)?
- O CTA final convida à ação específica (comentar, salvar, compartilhar)?
- Há algum elemento de surpresa ou subversão de expectativa?

---

## Formato do Scorecard

Produza o scorecard neste formato:

```
## Scorecard — [Título do Conteúdo]
Data: [data da revisão]

| Dimensão      | Peso | Nota | Nota Ponderada | Status   |
|---------------|------|------|----------------|----------|
| Relevância    | 20%  | X.X  | X.X            | ✓ / ⚠ / ✗ |
| Público       | 15%  | X.X  | X.X            | ✓ / ⚠ / ✗ |
| Copy          | 25%  | X.X  | X.X            | ✓ / ⚠ / ✗ |
| Compliance    | 20%  | X.X  | X.X            | ✓ / ✗    |
| Visual        | 10%  | X.X  | X.X            | ✓ / ⚠ / ✗ |
| Engajamento   | 10%  | X.X  | X.X            | ✓ / ⚠ / ✗ |
| **TOTAL**     | 100% |      | **X.X**        |          |

### Evidências por Dimensão
[Para cada nota ≤ 8: citação direta do elemento problemático + explicação]

### Status Compliance
[Checklist item a item — todos os 7 itens verificados]
```

---

## Critérios de Conclusão

- [ ] Todas as 6 dimensões avaliadas com nota e justificativa
- [ ] Compliance verificado item a item (7 itens)
- [ ] Nota final calculada com pesos corretos
- [ ] Evidência específica fornecida para cada nota ≤ 8
- [ ] Scorecard no formato padronizado
- [ ] Cada slide avaliado individualmente na dimensão Copy
