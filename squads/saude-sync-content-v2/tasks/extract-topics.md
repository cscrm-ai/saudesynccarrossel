---
id: "squads/saude-sync-content-v2/tasks/extract-topics"
name: "Extração de Tópicos de Conteúdo"
agent: "paulo-pauta"
order: 2
---

# Tarefa: Extração de Tópicos de Conteúdo

## Objetivo
A partir da base de conhecimento construída na tarefa anterior, identificar os tópicos com maior potencial para virar conteúdo de carrossel no Instagram da Saúde Sync.

---

## Instruções de Execução

### 1. Mapeamento de Fontes de Tópicos

Varre a base de conhecimento em busca de tópicos nas seguintes categorias:

| Categoria | Descrição | Exemplo |
|---|---|---|
| **Funcionalidade** | Recursos da plataforma que resolvem dores reais | "Prontuário por voz economiza 40% do tempo do médico" |
| **Valor de marca** | Princípios que diferenciam a Saúde Sync | "Cuidado contínuo, não episódico" |
| **Dor do público** | Problemas que o público enfrenta sem a Saúde Sync | "Paciente que perde o histórico ao trocar de médico" |
| **Prova social** | Resultados, casos de uso, métricas (se disponíveis) | "X pacientes monitorados continuamente" |
| **Educação** | Conceitos que a Saúde Sync pode ensinar com autoridade | "O que é cuidado preventivo vs. cuidado reativo" |

### 2. Critérios de Seleção

Para cada tópico identificado, avalie:
- **Ancoragem documental**: está explicitamente nos documentos internos? (obrigatório)
- **Especificidade Saúde Sync**: é algo que só a Saúde Sync faz ou representa? (peso alto)
- **Potencial emocional**: gera identificação, alívio, curiosidade ou orgulho? (peso alto)
- **Viabilidade de compliance**: pode ser comunicado sem promessa terapêutica? (filtro — descarta se não passar)
- **Histórico positivo**: tema similar performou bem antes? (bônus quando disponível)

### 3. Descarte

Descarte imediatamente tópicos que:
- Sejam dicas genéricas de saúde sem conexão com a plataforma
- Impliquem diagnóstico, cura ou garantia de resultado
- Já foram usados na última rodada (verificar `_memory/`)

---

## Formato de Entrega Interna

Liste os tópicos extraídos antes do ranqueamento:

```
TÓPICOS IDENTIFICADOS:
1. [Nome do tópico] — Categoria: [categoria] — Fonte: [documento/seção]
2. ...

TÓPICOS DESCARTADOS:
- [Tópico] — Motivo: [compliance/genérico/repetido]
```

Este bloco alimenta diretamente a tarefa seguinte (propose-pautas.md).
