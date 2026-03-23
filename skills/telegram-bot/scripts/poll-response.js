#!/usr/bin/env node

// poll-response.js — Poll Telegram for user response (button press or text)
// Usage: node --env-file=.env skills/telegram-bot/scripts/poll-response.js \
//   --mode callback --timeout 600 --message-id 12345
//
// Modes:
//   callback — wait for inline button press (callback_query)
//   text     — wait for a text message reply
//
// Output on stdout:
//   Success: the callback_data string or message text
//   Timeout: the literal string "NO_RESPONSE"
//
// Exit codes: 0 = got response or timeout, 1 = error

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

function parseArgs(argv) {
  const args = { mode: 'callback', timeout: 600, messageId: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--mode' && argv[i + 1]) args.mode = argv[++i];
    else if (argv[i] === '--timeout' && argv[i + 1]) args.timeout = parseInt(argv[++i], 10);
    else if (argv[i] === '--message-id' && argv[i + 1]) args.messageId = parseInt(argv[++i], 10);
    else if (argv[i] === '--chat-id' && argv[i + 1]) args.chatId = argv[++i];
  }
  return args;
}

async function answerCallbackQuery(callbackQueryId) {
  await fetch(`${API}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId }),
  });
}

async function main() {
  const args = parseArgs(process.argv);

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
    process.exit(1);
  }

  const chatId = args.chatId || CHAT_ID;
  const startTime = Date.now();
  const timeoutMs = args.timeout * 1000;
  let offset = 0;

  // Get initial offset to skip old updates
  const initRes = await fetch(`${API}/getUpdates?limit=1&offset=-1`);
  const initData = await initRes.json();
  if (initData.ok && initData.result.length > 0) {
    offset = initData.result[0].update_id + 1;
  }

  while (Date.now() - startTime < timeoutMs) {
    const pollTimeout = Math.min(30, Math.floor((timeoutMs - (Date.now() - startTime)) / 1000));
    if (pollTimeout <= 0) break;

    const reqBody = {
      offset,
      timeout: pollTimeout,
      allowed_updates: args.mode === 'callback' ? ['callback_query'] : ['message'],
    };

    let data;
    try {
      const res = await fetch(`${API}/getUpdates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      data = await res.json();
    } catch (err) {
      // Network error — wait and retry
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    if (!data.ok) {
      console.error(`Telegram API error: ${data.description}`);
      await new Promise((r) => setTimeout(r, 5000));
      continue;
    }

    for (const update of data.result) {
      offset = update.update_id + 1;

      if (args.mode === 'callback' && update.callback_query) {
        const cq = update.callback_query;
        const msgChatId = String(cq.message?.chat?.id);

        // Match: same chat, and optionally same message
        if (msgChatId === String(chatId)) {
          if (args.messageId && cq.message?.message_id !== args.messageId) continue;

          await answerCallbackQuery(cq.id);
          console.log(cq.data);
          process.exit(0);
        }
      }

      if (args.mode === 'text' && update.message) {
        const msg = update.message;
        if (String(msg.chat.id) === String(chatId) && msg.text) {
          console.log(msg.text);
          process.exit(0);
        }
      }
    }
  }

  // Timeout reached
  console.log('NO_RESPONSE');
  process.exit(0);
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
