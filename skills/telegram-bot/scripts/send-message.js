#!/usr/bin/env node

// send-message.js — Send a text message with optional inline keyboard buttons
// Usage: node --env-file=.env skills/telegram-bot/scripts/send-message.js \
//   --text "Choose:" --buttons '[{"text":"A","data":"a"},{"text":"B","data":"b"}]'
// Output: JSON with message_id on stdout

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const MAX_RETRIES = 3;

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--text' && argv[i + 1]) args.text = argv[++i];
    else if (argv[i] === '--buttons' && argv[i + 1]) args.buttons = argv[++i];
    else if (argv[i] === '--chat-id' && argv[i + 1]) args.chatId = argv[++i];
    else if (argv[i] === '--rows' && argv[i + 1]) args.rows = parseInt(argv[++i], 10);
  }
  return args;
}

async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      return res;
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = Math.pow(2, attempt) * 1000;
      console.error(`Retry ${attempt}/${retries} after ${delay}ms: ${err.message}`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

function buildKeyboard(buttonsJson, maxPerRow = 2) {
  let buttons;
  try {
    buttons = JSON.parse(buttonsJson);
  } catch (err) {
    console.error(`ERROR: Invalid --buttons JSON: ${err.message}`);
    process.exit(1);
  }
  const rows = [];
  let currentRow = [];

  for (const btn of buttons) {
    currentRow.push({ text: btn.text, callback_data: btn.data });
    if (currentRow.length >= maxPerRow) {
      rows.push(currentRow);
      currentRow = [];
    }
  }
  if (currentRow.length > 0) rows.push(currentRow);

  return { inline_keyboard: rows };
}

async function main() {
  const args = parseArgs(process.argv);

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
    process.exit(1);
  }

  if (!args.text) {
    console.error('ERROR: --text is required');
    process.exit(1);
  }

  const chatId = args.chatId || CHAT_ID;
  const body = {
    chat_id: chatId,
    text: args.text,
    parse_mode: 'HTML',
  };

  if (args.buttons) {
    body.reply_markup = buildKeyboard(args.buttons, args.rows || 2);
  }

  const res = await fetchWithRetry(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!data.ok) {
    console.error(`Telegram API error: ${data.description}`);
    process.exit(1);
  }

  // Output message_id for poll-response.js to track
  console.log(JSON.stringify({ message_id: data.result.message_id, chat_id: chatId }));
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
