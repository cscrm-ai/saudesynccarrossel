#!/bin/bash
cd /root/saudesynccarrossel

export PATH="/root/.npm-global/bin:/root/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export HOME=/root

# Load env
set -a
source .env 2>/dev/null
set +a

mkdir -p logs

echo "[$(date)] Bot launcher started"

while true; do
  echo "[$(date)] Waiting for Telegram commands..."

  RESULT=$(node --env-file=.env skills/telegram-bot/scripts/watch-commands.js 2>&1)
  EXIT_CODE=$?

  echo "[$(date)] watch-commands exited ($EXIT_CODE)"

  if echo "$RESULT" | grep -q "TRIGGER_CARROSSEL"; then
    echo "[$(date)] CARROSSEL TRIGGERED!"

    node --env-file=.env skills/telegram-bot/scripts/send-message.js \
      --text "🚀 Pipeline iniciando via Claude Code... Aguarde ~2min."

    LOGFILE="logs/pipeline-$(date +%Y%m%d-%H%M%S).log"
    claude -p "/carrossel" --yes 2>&1 | tee -a "$LOGFILE"

    PIPE_EXIT=$?
    echo "[$(date)] Pipeline finished ($PIPE_EXIT)"

    if [ $PIPE_EXIT -ne 0 ]; then
      node --env-file=.env skills/telegram-bot/scripts/send-message.js \
        --text "⚠️ Pipeline terminou com erro ($PIPE_EXIT). Verifique logs."
    fi
  fi

  sleep 2
done
