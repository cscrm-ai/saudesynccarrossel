---
execution: inline
agent: bruna-broadcast
inputFile: squads/saude-sync-content-v2/output/slides/
outputFile: squads/saude-sync-content-v2/output/publication-log.md
---

# Step 15 — Bruna: Preparação e Publicação

## Objetivo

Bruna é a agente de distribuição e publicação. Ela organiza todos os assets aprovados, prepara o pacote de publicação e envia o carrossel ao Instagram da Saúde Sync via Blotato, registrando todos os detalhes da publicação para rastreamento posterior.

## Entradas

- `squads/saude-sync-content-v2/output/slides/jpeg/` — Arquivos JPEG dos slides aprovados (ordenados)
- `squads/saude-sync-content-v2/output/copy-brief.md` — Legenda final, hashtags e CTA
- `squads/saude-sync-content-v2/output/review-report.md` — Confirmação de aprovação por Victor
- `squads/saude-sync-content-v2/pipeline/data/decisao-publicacao.md` — Decisão final do usuário

## Processo

1. **Preparação dos assets:**
   a. Verificar que todos os slides JPEG estão presentes e em ordem sequencial
   b. Confirmar que a legenda está formatada corretamente para Instagram (quebras de linha, hashtags ao final)
   c. Verificar que o número de slides está dentro do limite do Instagram (máx. 10 imagens por carrossel)
   d. Organizar assets em ordem de publicação: slide-01.jpg → slide-02.jpg → ... → slide-N.jpg

2. **Publicação via Blotato:**
   a. Conectar à API do Blotato usando as credenciais configuradas
   b. Criar o post do tipo carrossel com os arquivos JPEG na ordem correta
   c. Inserir a legenda completa (texto + hashtags)
   d. Definir horário de publicação:
      - Se o usuário especificou horário no checkpoint final, agendar para essa data/hora
      - Se não especificado, publicar imediatamente ou agendar para o próximo horário de pico configurado
   e. Confirmar envio e capturar ID do post e URL (quando disponível)

3. **Registro da publicação:**
   a. Salvar todos os detalhes no publication-log

## Saída Esperada

Arquivo `publication-log.md` contendo:
- Data e hora da publicação (ou agendamento)
- ID do post no Instagram (via Blotato)
- URL do post (se disponível)
- Lista de slides publicados com nomes dos arquivos
- Legenda utilizada (exata)
- Hashtags utilizadas
- Status final: **Publicado** ou **Agendado para [data/hora]**
- Eventuais erros ou avisos durante o processo

## Critérios de Sucesso

- Todos os slides publicados na ordem correta
- Legenda com formatação adequada para Instagram
- ID ou confirmação de publicação registrada no log
- Nenhum slide faltando ou fora de ordem
- Log completo e rastreável para auditoria posterior
