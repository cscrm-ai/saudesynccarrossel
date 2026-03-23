---
id: "squads/saude-sync-content-v2/tasks/check-claims"
name: "Verificar Afirmações Regulatórias"
agent: "carla-compliance"
output: "compliance-scan"
---

# Tarefa: Escanear Conteúdo por Violações Regulatórias

## Objetivo
Revisar todos os textos (headlines e body copies) de um carrossel e identificar afirmações que violem normas do CFM, ANVISA ou LGPD. Classificar cada issue por severidade e categoria.

## Input Esperado
- Todos os slides do carrossel com headline e body copy completos
- Contexto de publicação (plataforma: Instagram; formato: carrossel educativo)
- Público-alvo (pacientes / médicos / cuidadores)

## Processo

### 1. Leitura Completa

Ler todos os slides na sequência, identificando o tom geral e o propósito comunicativo antes de analisar afirmações individuais. Contexto importa: uma afirmação aceitável em slide de dado estatístico pode ser problemática em slide de CTA.

### 2. Aplicar Matriz de Risco

Para cada afirmação suspeita, classificar usando a matriz padrão de Carla Compliance:

| Categoria | Severidade |
|---|---|
| Promessa de cura ou eliminação definitiva | CRÍTICO |
| Diagnóstico implícito baseado em sintomas | CRÍTICO |
| Menção a medicamento comercial sem contexto educativo | CRÍTICO |
| Exposição de dados de pacientes sem consentimento | CRÍTICO |
| Afirmação clínica sem fonte referenciada | MODERADO |
| Estatística sem origem identificada | MODERADO |
| Garantia de resultado | MODERADO |
| Linguagem de auto-diagnóstico | MODERADO |
| Ausência de disclaimer médico em conteúdo clínico | BAIXO |

### 3. Documentar Cada Issue

Para cada afirmação problemática encontrada, registrar:

```
ISSUE #[N]
Slide: [número do slide]
Texto exato: "[trecho exato da afirmação]"
Categoria: [categoria da matriz de risco]
Severidade: CRÍTICO / MODERADO / BAIXO
Norma aplicável: [ex: CFM Resolução 2.336/2023 / ANVISA RDC 96/2008 / LGPD Art. 11]
Descrição do problema: [por que esta afirmação é problemática]
```

### 4. Verificar Ausências Relevantes

Além de afirmações problemáticas, verificar se faltam elementos obrigatórios:
- Disclaimer "consulte seu médico" em conteúdo com orientações clínicas
- Declaração de conteúdo fictício em casos hipotéticos
- Fonte de dados em estatísticas apresentadas como fato

## Output

Lista estruturada de todos os issues identificados, no formato acima, pronta para ser consumida pela tarefa `flag-issues.md`.

## Critérios de Conclusão
- [ ] Todos os slides revisados (headline + body copy)
- [ ] Todos os issues documentados no formato padrão
- [ ] Categorias e severidades corretas aplicadas
- [ ] Normas referenciadas para cada issue
- [ ] Ausências relevantes identificadas além de afirmações problemáticas
- [ ] Output estruturado pronto para geração do relatório final
