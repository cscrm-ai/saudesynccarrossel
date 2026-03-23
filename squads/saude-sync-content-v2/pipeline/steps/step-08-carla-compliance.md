---
execution: inline
agent: carla-compliance
inputFile: squads/saude-sync-content-v2/output/carousel-script.md
outputFile: squads/saude-sync-content-v2/output/compliance-report.md
---

# Step 08 — Carla: Verificação de Compliance

## Objetivo

Carla é a agente de compliance regulatório. Ela revisa todo o conteúdo do carrossel para garantir que nenhuma informação viole regulamentações do setor de saúde, faça promessas não comprovadas ou exponha a Saúde Sync a riscos legais ou reputacionais.

## Entradas

- `squads/saude-sync-content-v2/output/carousel-script.md` — Roteiro completo do carrossel
- `squads/saude-sync-content-v2/output/copy-brief.md` — Legenda, hashtags e CTAs

## Processo

1. Revisar cada slide do roteiro, identificando:
   - **Afirmações de saúde** que precisam de embasamento científico ou qualificação
   - **Promessas ou garantias** que possam ser consideradas enganosas ou antiéticas
   - **Termos médicos** usados de forma inadequada ou fora de contexto
   - **Conteúdo que exige disclaimer** (ex: "consulte um médico", "resultados individuais variam")
   - **Dados e estatísticas** sem fonte citada
   - **Linguagem excludente** ou que possa gerar discriminação
2. Classificar cada item encontrado em:
   - **Bloqueador** — Deve ser corrigido antes de prosseguir
   - **Recomendação** — Melhoria sugerida, mas não obrigatória
   - **OK** — Conteúdo aprovado sem ressalvas
3. Se houver itens Bloqueadores, propor correções específicas para cada um
4. Emitir veredicto final: **Aprovado**, **Aprovado com Ressalvas** ou **Reprovado**

## Saída Esperada

Arquivo `compliance-report.md` com:
- Veredicto geral (Aprovado / Aprovado com Ressalvas / Reprovado)
- Lista de itens analisados por slide, com classificação
- Correções propostas para itens Bloqueadores
- Recomendações para itens de melhoria
- Versão corrigida do conteúdo (se houver itens Bloqueadores)

## Critérios de Sucesso

- Todos os slides foram analisados individualmente
- Nenhum item Bloqueador segue para as etapas seguintes sem correção
- Correções propostas mantêm a intenção e o impacto original do conteúdo
- Relatório é claro e acionável
- Análise em Português (Brasil)
