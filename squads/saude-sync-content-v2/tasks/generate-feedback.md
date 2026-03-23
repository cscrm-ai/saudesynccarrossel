---
id: "squads/saude-sync-content-v2/tasks/generate-feedback"
title: "Gerar Relatório de Feedback"
agent: "victor-veredicto"
inputs:
  - scorecard produzido em score-content.md
outputs:
  - output/review/veredicto-[data].md
---

# Tarefa: Gerar Relatório de Feedback

## Objetivo

Consolidar o scorecard em um relatório de feedback completo e acionável. O relatório emite o veredicto final (APROVADO / APROVADO COM RESSALVAS / REJEITADO), detalha os problemas encontrados com evidência e instrução de correção, e — quando aprovado — confirma os pontos de qualidade que devem ser mantidos nos próximos ciclos.

---

## Pré-Requisitos

- [ ] Scorecard completo produzido na tarefa `score-content.md`
- [ ] Compliance verificado (7 itens)
- [ ] Nota final calculada

---

## Lógica de Veredicto

```
SE qualquer item de compliance = FALHOU
  → REJEITADO (independente das demais notas)

SENÃO SE nota final ≥ 7,0
  → APROVADO

SENÃO SE nota final ≥ 6,0 E nota final < 7,0
  → APROVADO COM RESSALVAS

SENÃO (nota final < 6,0)
  → REJEITADO
```

**Nota adicional:** Se qualquer dimensão individual tiver nota < 6,0, o conteúdo é automaticamente REJEITADO mesmo que a nota geral seja ≥ 6,0.

---

## Estrutura do Relatório

### Cabeçalho

```markdown
# Veredicto de Conteúdo — [Título do Post]
**Data:** [data]
**Agente Revisor:** Victor Veredicto
**Conteúdo:** [número de slides] slides — carrossel Instagram

---

## ✅ APROVADO / ⚠️ APROVADO COM RESSALVAS / ❌ REJEITADO

**Nota Geral:** X.X / 10
```

### Seção 1: Resumo Executivo

2-3 frases resumindo o estado geral do conteúdo. O que funciona, o que não funciona, e o que precisa ser feito.

### Seção 2: Scorecard Completo

Tabela com todas as dimensões (conforme produzida em `score-content.md`).

### Seção 3: Pontos Positivos (quando nota ≥ 8 em alguma dimensão)

Lista dos elementos que funcionaram bem e devem ser mantidos ou replicados.

### Seção 4: Problemas e Ações de Correção

Para cada problema identificado (nota < 8):

```markdown
#### Dimensão: [Nome]
**Problema:** [descrição específica com citação do elemento]
**Evidência:** "[trecho exato do copy / descrição do elemento visual]"
**Ação:** [instrução clara e específica de como corrigir]
**Prioridade:** Alta / Média / Baixa
```

Ordenar por prioridade (compliance e copy primeiro).

### Seção 5: Status de Compliance

Checklist completo com resultado de cada item:
```
- [✓] Sem promessas de cura
- [✓] Estatísticas com fonte
- [✗] Afirmação sem respaldo — FALHA DETECTADA: "[trecho]"
...
```

### Seção 6: Próximos Passos

**Se APROVADO:**
- Confirmação para Bruna Broadcast prosseguir com publicação

**Se APROVADO COM RESSALVAS:**
- Lista das melhorias recomendadas (não bloqueantes)
- Confirmação para Bruna Broadcast prosseguir (com ressalvas registradas)

**Se REJEITADO:**
- Lista ordenada de ações obrigatórias para resubmissão
- Identificação do(s) agente(s) responsável(is) por cada correção
- Estimativa de complexidade das correções (alta / média / baixa)

---

## Entrega

- Salvar relatório em: `output/review/veredicto-[YYYY-MM-DD].md`
- Notificar no contexto do squad:
  - Se APROVADO: sinalizar Bruna Broadcast para prosseguir
  - Se REJEITADO: sinalizar Paulo Pauta e Carlos Conteúdo com resumo das ações

---

## Critérios de Conclusão

- [ ] Veredicto emitido com justificativa clara
- [ ] Resumo executivo em 2-3 frases
- [ ] Scorecard incluído no relatório
- [ ] Problemas listados com evidência + ação + prioridade
- [ ] Compliance detalhado item a item
- [ ] Próximos passos claros para cada cenário de veredicto
- [ ] Arquivo salvo em `output/review/veredicto-[data].md`
- [ ] Squad notificado sobre o veredicto
