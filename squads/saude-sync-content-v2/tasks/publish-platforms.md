---
id: "squads/saude-sync-content-v2/tasks/publish-platforms"
title: "Publicar no Instagram via Blotato"
agent: "bruna-broadcast"
inputs:
  - assets validados (de prepare-assets)
  - output/upload-manifest.md
  - legenda finalizada
  - horário de publicação (de Paulo Pauta)
outputs:
  - output/publish-log.md (entrada de publicação)
  - post ID e confirmação para Ana Analytics
skills: [blotato, instagram-publisher]
---

# Tarefa: Publicar no Instagram via Blotato

## Objetivo

Fazer o upload dos slides para o Blotato, criar o post no Instagram com a legenda correta, publicar ou agendar no horário definido, confirmar o status de publicação e registrar o log com os dados necessários para Ana Analytics iniciar o monitoramento de performance.

---

## Pré-Requisitos

- [ ] Manifesto de upload em `output/upload-manifest.md` com status "Pronto para upload: SIM"
- [ ] Legenda validada (≤ 2.200 caracteres)
- [ ] Horário de publicação confirmado por Paulo Pauta
- [ ] Credenciais Blotato ativas na skill `blotato`

---

## Passo a Passo

### 1. Verificar Manifesto

Abrir `output/upload-manifest.md` e confirmar:
- Status: "Pronto para upload: SIM"
- Quantidade de slides listada
- Horário de publicação registrado

Se qualquer campo estiver incompleto, não prosseguir e notificar squad.

### 2. Upload de Mídia via Blotato

Para cada slide em ordem crescente (slide-01 → slide-0N):
- Fazer upload do arquivo JPEG para a fila de mídia do Blotato
- Confirmar que cada arquivo foi aceito antes de prosseguir para o próximo
- Registrar o media ID retornado pelo Blotato para cada arquivo

### 3. Criar o Post

Com todos os media IDs coletados:
- Criar rascunho de post no Blotato com:
  - Mídia: array de media IDs na ordem correta
  - Legenda: texto completo validado
  - Plataforma: Instagram
  - Tipo de post: Carrossel

### 4. Publicar ou Agendar

**Se publicação imediata:**
- Publicar diretamente via Blotato
- Aguardar confirmação de sucesso da API

**Se agendamento:**
- Configurar data e hora exatos conforme Paulo Pauta
- Confirmar que o agendamento foi aceito pelo Blotato
- Registrar data/hora do agendamento no log

### 5. Confirmar Status

Após publicação ou agendamento:
- Verificar status do post via Blotato (não assumir sucesso sem verificação)
- Coletar: post ID, permalink (quando disponível), status (`published` / `scheduled`)
- Se status for erro: registrar o código de erro e tentar nova publicação 1x antes de escalar

### 6. Registrar no Log de Publicação

Atualizar `output/publish-log.md` com nova entrada:

```markdown
## Publicação — [Título do Post]
- **Data/Hora:** [timestamp ISO 8601]
- **Plataforma:** Instagram
- **Tipo:** Carrossel — [N] slides
- **Post ID:** [id retornado pelo Blotato]
- **Permalink:** [URL do post, quando disponível]
- **Status:** publicado / agendado para [data/hora]
- **Legenda (primeiros 100 chars):** "[...]"
- **Observações:** [qualquer intercorrência]
```

### 7. Notificar Ana Analytics

Enviar para Ana Analytics:
- Post ID
- Timestamp de publicação (ou agendamento)
- Título do conteúdo
- Número de slides

Ana deve iniciar a coleta de métricas 48h após o timestamp de publicação.

---

## Tratamento de Erros

| Erro                       | Ação                                                            |
|----------------------------|-----------------------------------------------------------------|
| Upload recusado (formato)  | Verificar se arquivo é JPEG válido; rerenderizar se necessário  |
| Upload recusado (tamanho)  | Recomprimir e tentar novamente                                  |
| Post criado mas não publicado | Verificar status; tentar publicar manualmente via Blotato   |
| Agendamento não confirmado | Verificar na interface do Blotato; registrar como pendente      |
| API timeout                | Aguardar 30s e tentar 1x; se falhar, escalar para squad        |

---

## Critérios de Conclusão

- [ ] Todos os slides enviados para o Blotato com media ID confirmado
- [ ] Post criado com legenda correta e slides na ordem certa
- [ ] Publicação ou agendamento confirmado pelo Blotato
- [ ] Status verificado (não apenas "enviado")
- [ ] Post ID e timestamp registrados em `output/publish-log.md`
- [ ] Ana Analytics notificada com dados de publicação
