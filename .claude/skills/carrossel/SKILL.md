# /carrossel — Disparar Pipeline de Carrossel

Atalho para executar o pipeline completo do squad `saude-sync-content-v2` com checkpoints via Telegram.

## Quando usar

Quando o Caio digitar `/carrossel` a qualquer momento. Isso inicia o pipeline de produção de conteúdo Instagram da Saúde Sync fora do horário agendado (que é Seg-Sex às 9h).

## O que fazer

Execute EXATAMENTE este fluxo:

1. Invoke the `/opensquad` skill com argumento `run saude-sync-content-v2`:

```
Skill("opensquad", args="run saude-sync-content-v2")
```

Isso carrega o pipeline runner que:
- Lê o squad.yaml (interaction.channel: telegram)
- Executa os 16 steps
- Envia checkpoints pro Telegram com botões inline
- Faz polling das respostas
- Publica no Instagram ao final

## Importante

- O canal de interação é **telegram** — todos os checkpoints vão pro Telegram do Caio
- NÃO use AskUserQuestion — use os scripts de `skills/telegram-bot/scripts/`
- O pipeline inteiro roda sem intervenção no terminal
- Notificações de progresso são enviadas a cada step via Telegram
