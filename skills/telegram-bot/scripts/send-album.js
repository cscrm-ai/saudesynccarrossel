#!/usr/bin/env node

// send-album.js — Send a photo album (up to 10 images) to Telegram
// Usage: node --env-file=.env skills/telegram-bot/scripts/send-album.js \
//   --images "path/to/slide-01.jpeg,path/to/slide-02.jpeg,..."
// Output: JSON with message_ids on stdout

const { readFileSync } = require('node:fs');
const { basename } = require('node:path');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const MAX_RETRIES = 3;

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--images' && argv[i + 1]) args.images = argv[++i];
    else if (argv[i] === '--chat-id' && argv[i + 1]) args.chatId = argv[++i];
    else if (argv[i] === '--caption' && argv[i + 1]) args.caption = argv[++i];
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
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.error(`Retry ${attempt}/${retries} after ${delay}ms: ${err.message}`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

async function main() {
  const args = parseArgs(process.argv);

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
    process.exit(1);
  }

  if (!args.images) {
    console.error('ERROR: --images is required (comma-separated paths)');
    process.exit(1);
  }

  const chatId = args.chatId || CHAT_ID;
  const imagePaths = args.images.split(',').map((p) => p.trim());

  if (imagePaths.length < 2 || imagePaths.length > 10) {
    console.error('ERROR: Telegram albums require 2-10 images (got ' + imagePaths.length + ')');
    process.exit(1);
  }

  // Build multipart form data
  const formData = new FormData();
  formData.append('chat_id', chatId);

  const media = imagePaths.map((imgPath, i) => {
    const fieldName = `photo${i}`;
    const fileData = readFileSync(imgPath);
    const blob = new Blob([fileData], { type: 'image/jpeg' });
    formData.append(fieldName, blob, basename(imgPath));

    const entry = { type: 'photo', media: `attach://${fieldName}` };
    if (i === 0 && args.caption) entry.caption = args.caption;
    return entry;
  });

  formData.append('media', JSON.stringify(media));

  const res = await fetchWithRetry(`${API}/sendMediaGroup`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!data.ok) {
    console.error(`Telegram API error: ${data.description}`);
    process.exit(1);
  }

  const messageIds = data.result.map((msg) => msg.message_id);
  console.log(JSON.stringify({ message_ids: messageIds, chat_id: chatId }));
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
