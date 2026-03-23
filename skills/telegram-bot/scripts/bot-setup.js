#!/usr/bin/env node

// bot-setup.js — Verify Telegram bot token and discover chat_id
// Usage: node --env-file=.env skills/telegram-bot/scripts/bot-setup.js

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function main() {
  if (!BOT_TOKEN) {
    console.error('ERROR: TELEGRAM_BOT_TOKEN not set in .env');
    console.error('1. Talk to @BotFather on Telegram');
    console.error('2. Create a new bot with /newbot');
    console.error('3. Copy the token to .env as TELEGRAM_BOT_TOKEN');
    process.exit(1);
  }

  // Step 1: Verify token via getMe
  console.log('Verifying bot token...');
  const meRes = await fetch(`${API}/getMe`);
  const me = await meRes.json();

  if (!me.ok) {
    console.error(`ERROR: Invalid token. Telegram says: ${me.description}`);
    process.exit(1);
  }

  console.log(`✅ Bot verified: @${me.result.username} (${me.result.first_name})`);

  // Step 2: Get recent updates to find chat_id
  console.log('\nLooking for your chat ID...');
  console.log('(Make sure you sent /start to the bot first)\n');

  const updatesRes = await fetch(`${API}/getUpdates?limit=10&offset=-10`);
  const updates = await updatesRes.json();

  if (!updates.ok || updates.result.length === 0) {
    console.error('No messages found. Please:');
    console.error('1. Open Telegram and find your bot (@' + me.result.username + ')');
    console.error('2. Send /start to the bot');
    console.error('3. Run this script again');
    process.exit(1);
  }

  // Extract unique chat IDs
  const chats = new Map();
  for (const update of updates.result) {
    const msg = update.message || update.callback_query?.message;
    if (msg?.chat) {
      chats.set(msg.chat.id, {
        id: msg.chat.id,
        name: msg.chat.first_name || msg.chat.title || 'Unknown',
        type: msg.chat.type,
      });
    }
  }

  if (chats.size === 0) {
    console.error('Could not extract chat ID from updates.');
    process.exit(1);
  }

  console.log('Found chats:');
  for (const [id, chat] of chats) {
    console.log(`  Chat ID: ${id} — ${chat.name} (${chat.type})`);
  }

  const firstChat = chats.values().next().value;
  console.log(`\n✅ Add this to your .env:`);
  console.log(`TELEGRAM_CHAT_ID=${firstChat.id}`);
}

main().catch((err) => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
