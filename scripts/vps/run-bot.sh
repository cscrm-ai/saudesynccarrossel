#!/bin/bash
# SaúdeSync Bot — Telegram listener + Claude Code bridge via tmux
cd /root/saudesynccarrossel

export PATH="/root/.npm-global/bin:/root/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export HOME=/root

set -a
source .env 2>/dev/null
set +a

mkdir -p logs

TMUX_SESSION="claude-pipeline"

# Function: ensure Claude Code is running in tmux
ensure_claude() {
  if ! tmux has-session -t "$TMUX_SESSION" 2>/dev/null; then
    echo "[$(date)] Starting Claude Code in tmux session '$TMUX_SESSION'..."
    tmux new-session -d -s "$TMUX_SESSION" "cd /root/saudesynccarrossel && claude"
    # Wait for Claude Code to initialize
    sleep 15
    echo "[$(date)] Claude Code session started."
  else
    echo "[$(date)] Claude Code session already running."
  fi
}

# Function: send command to Claude Code via tmux
send_to_claude() {
  local cmd="$1"
  echo "[$(date)] Sending to Claude Code: $cmd"
  tmux send-keys -t "$TMUX_SESSION" "$cmd" Enter
}

# Start Claude Code on boot
ensure_claude

echo "[$(date)] Bot launcher started. Listening for Telegram commands..."

while true; do
  # Listen for Telegram /carrossel command (8h timeout per cycle)
  RESULT=$(node --env-file=.env skills/telegram-bot/scripts/watch-commands.js 2>&1)
  EXIT_CODE=$?

  echo "[$(date)] watch-commands exited ($EXIT_CODE)"

  if echo "$RESULT" | grep -q "TRIGGER_CARROSSEL"; then
    echo "[$(date)] CARROSSEL TRIGGERED!"

    # Ensure Claude Code is alive
    ensure_claude

    # Send notification
    node --env-file=.env skills/telegram-bot/scripts/send-message.js \
      --text "🚀 Pipeline disparado! Claude Code está processando... Aguarde ~2min para as pautas."

    # Send /carrossel to the running Claude Code session
    send_to_claude "/carrossel"

    # Wait a bit before restarting listener (pipeline will take ~15-30 min)
    # The watch-commands.js will restart and listen for next command
    # while Claude Code processes the pipeline in parallel
    sleep 10
  fi

  sleep 2
done
