---
name: telegram-bot
description: >
  Telegram bot for pipeline checkpoint interactions.
  Sends messages with inline buttons, photo albums, and polls for user responses
  via the Telegram Bot API.
description_pt-BR: >
  Bot do Telegram para interações de checkpoint do pipeline.
  Envia mensagens com botões inline, álbuns de fotos e aguarda respostas
  do usuário via Telegram Bot API.
type: script
version: "1.0.0"
script:
  path: scripts/
  runtime: node
env:
  - TELEGRAM_BOT_TOKEN
  - TELEGRAM_CHAT_ID
categories: [messaging, automation, notifications]
---

# Telegram Bot

## When to use

Use this skill when the pipeline needs to interact with the user via Telegram instead of the terminal. It handles sending checkpoint questions, receiving button presses, and sending photo albums for visual review.

## Instructions

### Setup

1. Talk to @BotFather on Telegram and create a new bot
2. Copy the bot token to `.env` as `TELEGRAM_BOT_TOKEN`
3. Start a conversation with your bot on Telegram (send `/start`)
4. Run `node --env-file=.env skills/telegram-bot/scripts/bot-setup.js` to discover your chat ID
5. Copy the chat ID to `.env` as `TELEGRAM_CHAT_ID`

### Scripts

- `bot-setup.js` — Initial setup: verify token, get chat_id
- `send-message.js` — Send text with optional inline keyboard buttons
- `send-album.js` — Send photo album (2-10 JPEG images)
- `poll-response.js` — Poll for user response (button callback or text message)

### Usage from pipeline runner

```bash
# Send message with buttons
node --env-file=.env skills/telegram-bot/scripts/send-message.js \
  --text "Choose a theme:" \
  --buttons '[{"text":"Theme 1","data":"1"},{"text":"Theme 2","data":"2"}]'

# Send photo album
node --env-file=.env skills/telegram-bot/scripts/send-album.js \
  --images "slide-01.jpeg,slide-02.jpeg,slide-03.jpeg"

# Poll for response (callback mode for buttons, text mode for free-text)
node --env-file=.env skills/telegram-bot/scripts/poll-response.js \
  --mode callback --timeout 600
```

## Available operations

- **Send Message** — Send text with optional inline keyboard
- **Send Album** — Send photo album (up to 10 images)
- **Poll Response** — Wait for user to press a button or type a message
- **Bot Setup** — Verify token and discover chat_id
