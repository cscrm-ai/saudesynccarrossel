---
id: "squads/saude-sync-content-v2/tasks/propose-pautas"
name: "Proposta de Pautas Ranqueadas"
agent: "paulo-pauta"
order: 3
checkpoint: true
---

# Tarefa: Proposta de Pautas Ranqueadas

## Objetivo
Transformar os tópicos extraídos em pautas concretas, ranqueadas por score de engajamento estimado, prontas para apresentação e seleção humana.

---

## Instruções de Execução

### 1. Construção das Pautas

Para cada tópico selecionado (mínimo 3, máximo 5), construa uma pauta completa no formato abaixo.

### 2. Cálculo do Score de Engajamento

O score é calculado a partir de 4 dimensões (soma resulta em 0-100):

| Dimensão | Peso | Como avaliar |
|---|---|---|
| Alinhamento de marca | 30pts | Quanto reforça o posicionamento "cuidado contínuo e humanizado"? |
| Potencial emocional | 30pts | Qual a intensidade de identificação esperada pelo público? |
| Novidade do tema | 20pts | É algo que o público ainda não viu muito no feed de saúde? |
| Histórico de desempenho | 20pts | Temas similares tiveram bom resultado? (se sem histórico: 10pts neutros) |

Classifique o resultado:
- 80-100: **Alto**
- 60-79: **Médio**
- abaixo de 60: **Baixo** (descarta — não propõe pautas fracas)

### 3. Formato de Entrega Final

```
========================================
PAUTAS PROPOSTAS — SAÚDE SYNC
Rodada: [data atual]
========================================

PAUTA #1 (mais recomendada)
Título: [título criativo da pauta]
Ângulo central: [em 1 frase — o que o carrossel vai defender ou revelar]
Público-alvo: [segmento principal]
Funcionalidade âncora: [qual feature da plataforma sustenta esta pauta]
Score de engajamento: [número] — [Alto/Médio]
Justificativa: [2-3 frases explicando por que esta pauta faz sentido agora]
Fonte documental: [onde no company.md ou memory esta informação está]

---

PAUTA #2
[mesmo formato]

---

[repetir até pauta #5]

========================================
RECOMENDAÇÃO: Pauta #[número] tem maior potencial esta rodada.
========================================
```

---

## Checkpoint

Após gerar este arquivo, o squad PAUSA e aguarda seleção humana.
O humano deve indicar qual pauta seguirá para Igor Ideia (💡).
