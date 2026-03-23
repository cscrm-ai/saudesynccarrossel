---
id: "squads/saude-sync-content-v2/tasks/flag-issues"
name: "Gerar Relatório de Compliance"
agent: "carla-compliance"
output: "compliance-report"
---

# Tarefa: Gerar Relatório de Compliance com Correções

## Objetivo
Transformar o scan de afirmações (output de `check-claims.md`) em um relatório de compliance completo, com veredicto final, sugestões de reformulação para cada issue, e próximos passos claros.

## Input Esperado
- Lista de issues identificados na tarefa `check-claims.md`
- Versão completa dos slides para referência de contexto

## Processo

### 1. Consolidar Issues por Severidade

Agrupar os issues identificados por severidade (CRÍTICO primeiro, depois MODERADO, depois BAIXO). Contar o total por categoria para determinar o veredicto.

**Regra de veredicto:**
- 1 ou mais issues CRÍTICOS → BLOQUEADO
- Apenas issues MODERADOS (sem críticos) → APROVADO COM RESSALVAS
- Apenas issues BAIXOS ou nenhum issue → APROVADO

### 2. Criar Sugestão de Reformulação para Cada Issue

Para cada issue documentado, adicionar o bloco de correção:

```
CORREÇÃO SUGERIDA — ISSUE #[N]
Texto original: "[trecho problemático]"
Problema: [descrição resumida]
Texto reformulado: "[nova versão que elimina o risco sem esvaziar a mensagem]"
Nível de alteração: MÍNIMO / MODERADO / SIGNIFICATIVO
```

Priorizar reformulações de nível MÍNIMO — o objetivo é corrigir o problema com o menor impacto possível na intenção comunicativa original.

### 3. Emitir Veredicto Final

Estruturar o veredicto no seguinte formato:

```
VEREDICTO FINAL: [APROVADO / APROVADO COM RESSALVAS / BLOQUEADO]

Resumo:
- Issues CRÍTICOS: [N]
- Issues MODERADOS: [N]
- Issues BAIXOS: [N]
- Total de ajustes necessários antes da publicação: [N]

[Se BLOQUEADO:]
Issue bloqueante principal: ISSUE #[N] — [descrição resumida]
Ação necessária: [o que precisa ser feito antes de qualquer outra coisa]

[Se APROVADO COM RESSALVAS:]
Ajustes obrigatórios (MODERADO): Issues #[lista]
Ajustes recomendados (BAIXO): Issues #[lista]

[Se APROVADO:]
Nenhum ajuste obrigatório. Recomendações opcionais: [lista ou "nenhuma"]
```

### 4. Definir Próximos Passos

Encerrar o relatório com uma seção clara de próximos passos:
- Quem deve agir (Carlos Carrossel para revisão de texto / Marco Mapa Visual se aprovado)
- O que deve ser feito (quais issues corrigir, em qual ordem)
- Quando resubmeter para revisão (se aplicável)

## Output

Relatório de compliance completo contendo: todos os issues com sugestões de correção, veredicto final estruturado, e próximos passos.

## Critérios de Conclusão
- [ ] Todos os issues da tarefa `check-claims.md` tratados com sugestão de reformulação
- [ ] Veredicto final emitido com justificativa clara
- [ ] Próximos passos definidos com responsável e ação específica
- [ ] Se BLOQUEADO: issue bloqueante principal identificado explicitamente
- [ ] Reformulações preservam a intenção comunicativa original
- [ ] Relatório legível e acionável por Carlos Carrossel sem necessidade de interpretação adicional
