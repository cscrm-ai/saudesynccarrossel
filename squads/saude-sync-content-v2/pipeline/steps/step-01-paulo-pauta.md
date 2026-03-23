---
execution: subagent
agent: paulo-pauta
model_tier: powerful
outputFile: squads/saude-sync-content-v2/output/pautas-propostas.md
---

# Step 01 — Paulo: Geração de Pautas

## Objetivo

Paulo é o agente responsável por identificar os temas mais relevantes e estratégicos para o próximo conteúdo do Instagram da Saúde Sync. Ele lê os documentos internos da marca e propõe pautas com base em relevância editorial, momento de mercado e alinhamento com os objetivos da empresa.

## Entradas

- `_opensquad/_memory/company.md` — Contexto da empresa, posicionamento, público-alvo e tom de voz
- Todos os documentos internos disponíveis em `squads/saude-sync-content-v2/` (briefings, guias de marca, calendários editoriais, etc.)

## Processo

1. Ler e internalizar o contexto da Saúde Sync a partir do `company.md`
2. Varrer os documentos internos em busca de temas prioritários, lançamentos, tendências relevantes e lacunas de conteúdo
3. Gerar entre 3 e 5 propostas de pauta, cada uma com:
   - **Título da pauta** (claro e direto)
   - **Descrição** (2-3 linhas explicando o tema e por que é relevante agora)
   - **Público-alvo principal** (a quem esse conteúdo se destina)
   - **Objetivo estratégico** (educar, engajar, converter, awareness, etc.)
   - **Score de prioridade** (0–10, com justificativa breve)
4. Ordenar as pautas do maior para o menor score
5. Salvar o resultado no outputFile

## Saída Esperada

Arquivo `pautas-propostas.md` contendo lista ranqueada de 3-5 pautas, formatada de maneira clara para leitura humana no checkpoint seguinte.

## Critérios de Sucesso

- Mínimo de 3 pautas geradas
- Cada pauta possui todos os campos obrigatórios preenchidos
- Scores justificados com base em critérios editoriais e estratégicos
- Linguagem em Português (Brasil), tom profissional e acessível
