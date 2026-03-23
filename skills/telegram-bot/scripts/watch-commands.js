#!/usr/bin/env node

// watch-commands.js — Long-poll Telegram for /carrossel command
// Usage: node --env-file=.env skills/telegram-bot/scripts/watch-commands.js
//
// When /carrossel is detected:
//   1. Sends acknowledgment to user
//   2. Prints "TRIGGER_CARROSSEL" to stdout
//   3. Exits with code 0
//
// On timeout (default 8h): prints "NO_COMMAND" and exits 0
// On error: exits 1

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const TIMEOUT_HOURS = 8;
const TIMEOUT_MS = TIMEOUT_HOURS * 60 * 60 * 1000;

async function sendMessage(text) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  });
}

async function main() {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
    process.exit(1);
  }

  const startTime = Date.now();
  let offset = 0;

  // Flush old updates first
  const flushRes = await fetch(`${API}/getUpdates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset: -1, limit: 1, timeout: 0 }),
  });
  const flushData = await flushRes.json();
  if (flushData.ok && flushData.result.length > 0) {
    offset = flushData.result[0].update_id + 1;
  }

  // Notify user we're listening
  await sendMessage("Estou ouvindo! Manda <b>/carrossel</b> quando quiser iniciar o pipeline.");

  while (Date.now() - startTime < TIMEOUT_MS) {
    const pollTimeout = Math.min(30, Math.floor((TIMEOUT_MS - (Date.now() - startTime)) / 1000));
    if (pollTimeout <= 0) break;

    let data;
    try {
      const res = await fetch(`${API}/getUpdates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offset,
          timeout: pollTimeout,
          allowed_updates: ['message'],
        }),
      });
      data = await res.json();
    } catch (err) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    if (!data.ok) {
      await new Promise((r) => setTimeout(r, 5000));
      continue;
    }

    for (const update of data.result) {
      offset = update.update_id + 1;

      if (update.message && String(update.message.chat.id) === String(CHAT_ID)) {
        const text = (update.message.text || '').trim().toLowerCase();

        if (text === '/carrossel') {
          await sendMessage("Entendido! Iniciando o pipeline do carrossel agora...");
          console.log('TRIGGER_CARROSSEL');
          process.exit(0);
        } else if (text === '/status') {
          await sendMessage("Estou online e ouvindo comandos.\n\nComandos disponíveis:\n/carrossel — Iniciar pipeline de carrossel\n/status — Verificar se estou online");
        } else if (text.startsWith('/')) {
          await sendMessage(`Comando <b>${update.message.text}</b> não reconhecido.\n\nComandos disponíveis:\n/carrossel — Iniciar pipeline\n/status — Status do bot`);
        } else {
          // Regular message - friendly response
          await sendMessage("Oi! Sou o bot da Saúde Sync.\n\nManda /carrossel pra iniciar o pipeline ou /status pra ver se estou online.");
        }
      }
    }
  }

  console.log('NO_COMMAND');
  process.exit(0);
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
