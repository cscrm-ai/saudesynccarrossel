# Telegram Pipeline Automation — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route all Opensquad pipeline checkpoints through a Telegram bot and automate daily execution via scheduled task, so the user approves content from their phone instead of the terminal.

**Architecture:** A new `telegram-bot` skill (4 Node.js scripts using native fetch) handles Telegram Bot API communication. The Opensquad pipeline runner is modified to fork checkpoint handling based on `interaction.channel` config in `squad.yaml`. A `run-state.json` file enables pipeline pause/resume across sessions.

**Tech Stack:** Node.js 24 (native fetch, CommonJS), Telegram Bot API, Opensquad framework, Claude Code scheduled tasks.

**Spec:** `docs/superpowers/specs/2026-03-23-telegram-pipeline-automation-design.md`

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `skills/telegram-bot/SKILL.md` | Skill definition (type: script, env vars) |
| `skills/telegram-bot/scripts/bot-setup.js` | Verify token, discover chat_id, test connectivity |
| `skills/telegram-bot/scripts/send-message.js` | Send text + inline keyboard buttons to Telegram |
| `skills/telegram-bot/scripts/send-album.js` | Send photo album (up to 10 JPEG) to Telegram |
| `skills/telegram-bot/scripts/poll-response.js` | Poll for callback query or text message response |

### Modified Files

| File | Change |
|------|--------|
| `squads/saude-sync-content-v2/squad.yaml` | Append `interaction` config block |
| `_opensquad/core/runner.pipeline.md` | Fork checkpoint handling for telegram channel |

---

## Task 1: Telegram Bot Skill Definition

**Files:**
- Create: `skills/telegram-bot/SKILL.md`

- [ ] **Step 1: Create the SKILL.md file**

```markdown
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
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `head -5 skills/telegram-bot/SKILL.md`
Expected: First 5 lines of frontmatter starting with `---`

- [ ] **Step 3: Commit**

```bash
git add skills/telegram-bot/SKILL.md
git commit -m "feat: add telegram-bot skill definition"
```

---

## Task 2: bot-setup.js — Initial Setup Script

**Files:**
- Create: `skills/telegram-bot/scripts/bot-setup.js`

- [ ] **Step 1: Create bot-setup.js**

```javascript
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
```

- [ ] **Step 2: Test the script exits with helpful error when no token**

Run: `node skills/telegram-bot/scripts/bot-setup.js 2>&1 | head -3`
Expected: `ERROR: TELEGRAM_BOT_TOKEN not set in .env`

- [ ] **Step 3: Commit**

```bash
git add skills/telegram-bot/scripts/bot-setup.js
git commit -m "feat: add bot-setup.js for Telegram token verification"
```

---

## Task 3: send-message.js — Text + Inline Keyboard

**Files:**
- Create: `skills/telegram-bot/scripts/send-message.js`

- [ ] **Step 1: Create send-message.js**

```javascript
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
```

- [ ] **Step 2: Test the script exits with error when no env vars**

Run: `node skills/telegram-bot/scripts/send-message.js --text "test" 2>&1 | head -1`
Expected: `ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set`

- [ ] **Step 3: Commit**

```bash
git add skills/telegram-bot/scripts/send-message.js
git commit -m "feat: add send-message.js for Telegram text + inline keyboard"
```

---

## Task 4: send-album.js — Photo Album

**Files:**
- Create: `skills/telegram-bot/scripts/send-album.js`

- [ ] **Step 1: Create send-album.js**

```javascript
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
```

- [ ] **Step 2: Test the script exits with error when no images arg**

Run: `node skills/telegram-bot/scripts/send-album.js 2>&1 | head -1`
Expected: `ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set`

- [ ] **Step 3: Commit**

```bash
git add skills/telegram-bot/scripts/send-album.js
git commit -m "feat: add send-album.js for Telegram photo album sending"
```

---

## Task 5: poll-response.js — Poll for User Response

**Files:**
- Create: `skills/telegram-bot/scripts/poll-response.js`

- [ ] **Step 1: Create poll-response.js**

This is the most complex script. It polls Telegram's `getUpdates` in a loop, watching for either a `callback_query` (button press) or a regular text `message` depending on mode.

```javascript
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
```

- [ ] **Step 2: Test the script exits with error when no env vars**

Run: `node skills/telegram-bot/scripts/poll-response.js 2>&1 | head -1`
Expected: `ERROR: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set`

- [ ] **Step 3: Commit**

```bash
git add skills/telegram-bot/scripts/poll-response.js
git commit -m "feat: add poll-response.js for Telegram button/text polling"
```

---

## Task 6: squad.yaml — Add Interaction Config

**Files:**
- Modify: `squads/saude-sync-content-v2/squad.yaml` (append after line 129)

- [ ] **Step 1: Append interaction block to squad.yaml**

Add the following block at the end of the file (after `memory_file: _memory/memories.md`):

```yaml

  interaction:
    channel: terminal
    telegram:
      notify_on_step: true
      send_album: true
      timeout_reminder: 4h
      timeout_pause: 8h
```

Note: `channel` defaults to `terminal` so existing behavior is preserved. User switches to `telegram` after configuring credentials.

- [ ] **Step 2: Verify YAML is valid**

Run: `node -e "const fs=require('fs'); const y=require('yaml'); console.log(JSON.stringify(y.parse(fs.readFileSync('squads/saude-sync-content-v2/squad.yaml','utf8')).squad.interaction))"`

If `yaml` module not available, just verify the file isn't malformed:
Run: `tail -8 squads/saude-sync-content-v2/squad.yaml`
Expected: The interaction block appears at the end.

- [ ] **Step 3: Commit**

```bash
git add squads/saude-sync-content-v2/squad.yaml
git commit -m "feat: add interaction channel config to squad.yaml"
```

---

## Task 7: Runner Modification — Checkpoint Telegram Fork

**Files:**
- Modify: `_opensquad/core/runner.pipeline.md` (lines 256-271, the checkpoint section)

This is the critical change. The runner's checkpoint handling must detect the interaction channel and fork behavior.

- [ ] **Step 1: Read the current checkpoint block**

Read `_opensquad/core/runner.pipeline.md` lines 256-271 to confirm the exact text to replace.

- [ ] **Step 2: Replace the checkpoint section**

Replace the existing `#### If type: checkpoint` block (lines 256-271) with:

```markdown
#### If `type: checkpoint`

**1. Determine interaction channel:**
- Read the squad YAML file (path from squad config)
- Check `squad.interaction.channel` value
- If not present or `terminal`: use terminal mode (current behavior)
- If `telegram`: use Telegram mode

**2a. Terminal mode (default — current behavior):**
- Present the checkpoint message to the user
- If the checkpoint requires a choice (numbered list), present options as a numbered list and tell the user to reply with a number
- Wait for user input before proceeding
- Save the user's choice/response for the next step
- **If the step frontmatter contains `outputFile`**: after collecting the user's full response,
  write it to the specified file using the Write tool before moving to the next step.

**2b. Telegram mode:**
- Read the checkpoint markdown file to extract:
  - The question text (everything after the `---` separator)
  - The options (if numbered or bulleted list present)
- Determine the checkpoint type:
  - **Selection checkpoint** (steps 02, 04): has numbered options → send as inline buttons
  - **Approval checkpoint** (steps 07, 12, 14): binary approve/reject → send 2 buttons
  - **Visual checkpoint** (step 12): has associated slide images → send album first

- **For selection checkpoints:**
  1. Build button data from the agent's output (e.g., pauta titles from `pautas-propostas.md`)
  2. Run: `node --env-file=.env skills/telegram-bot/scripts/send-message.js --text "{question}" --buttons '{json_buttons}'`
  3. Capture `message_id` from stdout
  4. Run: `node --env-file=.env skills/telegram-bot/scripts/poll-response.js --mode callback --timeout 600 --message-id {message_id}`
  5. If result is `NO_RESPONSE`: re-invoke poll-response.js (loop up to `timeout_pause` from squad config)
  6. Parse the callback_data to determine user's selection

- **For step-04 (two-stage: angle + tone):**
  1. Send angle selection buttons (5 buttons)
  2. Poll for angle response
  3. Send tone selection buttons (6 buttons: Educativo, Inspirador, Direto, Empático, Técnico, Bem-humorado)
  4. Poll for tone response
  5. Combine both into the checkpoint output

- **For visual checkpoint (step-12):**
  1. First send the album: `node --env-file=.env skills/telegram-bot/scripts/send-album.js --images "{comma_separated_jpeg_paths}"`
  2. Then send the approval message with buttons
  3. If user selects "Pedir Ajustes":
     a. Send follow-up: "Descreva os ajustes necessários (número do slide + o que mudar):"
     b. Switch to text polling: `node --env-file=.env skills/telegram-bot/scripts/poll-response.js --mode text --timeout 600`
     c. Capture free-text response

- **For approval checkpoints (steps 07, 14):**
  1. Build summary text from the agent's output
  2. Send with 2 buttons: `[{"text":"✅ Aprovar","data":"approve"},{"text":"✏️ Solicitar Ajustes","data":"adjust"}]`
  3. Poll for response
  4. If user selects "adjust" (step 07 or 14):
     a. Send follow-up: "Descreva os ajustes necessários:"
     b. Switch to text polling: `poll-response.js --mode text --timeout 600`
     c. Capture free-text response and save to outputFile

- **Fallback to terminal (all Telegram checkpoints):**
  - If any Telegram API call fails after 3 retries (via `fetchWithRetry`), log the error
  - Fall back to terminal mode: use `AskUserQuestion` as if `channel == terminal`
  - Send a Telegram notification (best-effort) saying "⚠️ Telegram indisponível, checkpoint movido pro terminal"
  - This ensures the pipeline never gets stuck due to Telegram API outages

- **Timeout handling (applies to all Telegram checkpoints):**
  - The runner invokes poll-response.js in a loop with 600-second chunks
  - Track elapsed time across invocations
  - At `timeout_reminder` (4h default): send reminder via send-message.js
  - At `timeout_pause` (8h default):
    1. Write `run-state.json` to the squad directory (see Pipeline State Persistence)
    2. Send Telegram message: "⏸️ Pipeline pausado. Responda quando quiser retomar."
    3. Stop pipeline execution (exit gracefully)

- **After receiving response (either channel):**
  - Save the user's choice/response to the step's `outputFile` (if specified in frontmatter)
  - Use the same output format as terminal mode
  - Continue to next step

**3. Send progress notification (Telegram mode only):**
- After each non-checkpoint step completes, if `interaction.channel == telegram` and `telegram.notify_on_step == true`:
- Run: `node --env-file=.env skills/telegram-bot/scripts/send-message.js --text "✅ Step {N}/{total} — {agent_name} concluiu {step_label}\nPróximo: {next_agent}\n⏱️ ~{est_minutes} min" --buttons '[{"text":"❌ Cancelar pipeline","data":"cancel_pipeline"}]'`
- Check for cancel: run a quick poll (5-second timeout) to see if user pressed cancel
- If cancel detected: save run-state.json with status "cancelled", send confirmation, stop pipeline
```

- [ ] **Step 3: Verify the edit was applied correctly**

Read `_opensquad/core/runner.pipeline.md` lines 256-290 to confirm the new checkpoint section is in place.

- [ ] **Step 4: Commit**

```bash
git add _opensquad/core/runner.pipeline.md
git commit -m "feat: add Telegram channel fork to checkpoint handling in runner"
```

---

## Task 8: Runner Modification — Pipeline State Persistence

**Files:**
- Modify: `_opensquad/core/runner.pipeline.md` (add new section after the checkpoint block)

- [ ] **Step 1: Add Pipeline State Persistence section**

Add the following section after the checkpoint handling block (after "Continue to next step"):

```markdown
### Pipeline State Persistence (run-state.json)

When the pipeline needs to pause (Telegram timeout, user cancel, session close), save a `run-state.json` file in the squad directory:

**Write path:** `squads/{squad-name}/run-state.json`

**Schema:**
```json
{
  "run_id": "{YYYY-MM-DD-HHmmss}",
  "squad": "{squad-name}",
  "current_step": {step_number},
  "status": "paused_at_checkpoint | paused_timeout | cancelled",
  "checkpoint_data": {
    "step-02": { "file": "pipeline/data/pauta-selecionada.md", "completed": true },
    "step-04": { "file": "pipeline/data/angulo-selecionado.md", "completed": false }
  },
  "completed_outputs": ["output/{run_id}/v1/pautas-propostas.md"],
  "paused_at": "{ISO-8601 timestamp}",
  "telegram_pending_message_id": null
}
```

**Resume flow (at pipeline start):**

1. Before starting a new run, check for `squads/{squad-name}/run-state.json`
2. If found:
   - Read the file and check `status`
   - If `status == "paused_at_checkpoint"` or `status == "paused_timeout"`:
     - If `interaction.channel == telegram`: send Telegram message "Pipeline de {date} pausou no step {N}. Retomar?" with buttons [Retomar] [Cancelar]
     - If user selects "Retomar": skip to `current_step`, using saved checkpoint data
     - If user selects "Cancelar": delete `run-state.json`, start fresh
   - If `status == "cancelled"`: delete `run-state.json`, start fresh
3. If not found: start normal pipeline execution
4. After pipeline completes successfully: delete `run-state.json`
```

- [ ] **Step 2: Verify the section was added**

Search for "run-state.json" in the runner file to confirm it appears.

- [ ] **Step 3: Commit**

```bash
git add _opensquad/core/runner.pipeline.md
git commit -m "feat: add run-state.json persistence for pipeline pause/resume"
```

---

## Task 9: Integration Test — End-to-End Dry Run

This task verifies all scripts work together without actually connecting to Telegram.

**Files:** (no new files — testing existing scripts)

- [ ] **Step 1: Verify all 4 scripts exist and have correct structure**

Run:
```bash
for f in bot-setup send-message send-album poll-response; do
  echo "=== $f.js ==="
  head -3 "skills/telegram-bot/scripts/$f.js"
  echo ""
done
```

Expected: Each file starts with `#!/usr/bin/env node` and a comment describing its purpose.

- [ ] **Step 2: Verify all scripts fail gracefully without env vars**

Run:
```bash
for f in bot-setup send-message send-album poll-response; do
  echo "--- $f ---"
  node "skills/telegram-bot/scripts/$f.js" 2>&1 | head -1
done
```

Expected: Each script outputs an ERROR message about missing env vars and exits without crashing.

- [ ] **Step 3: Verify send-message.js argument parsing**

Run:
```bash
TELEGRAM_BOT_TOKEN=fake TELEGRAM_CHAT_ID=123 \
  node skills/telegram-bot/scripts/send-message.js 2>&1 | head -1
```

Expected: Error about `--text is required` (not a crash).

- [ ] **Step 4: Verify squad.yaml has interaction config**

Run: `grep -A 6 "interaction:" squads/saude-sync-content-v2/squad.yaml`
Expected: Shows the interaction block with `channel: terminal`.

- [ ] **Step 5: Test poll-response.js timeout behavior**

Run:
```bash
TELEGRAM_BOT_TOKEN=fake TELEGRAM_CHAT_ID=123 \
  node skills/telegram-bot/scripts/poll-response.js --mode callback --timeout 3 2>&1
```

Expected: After ~3 seconds, outputs `NO_RESPONSE` (the fake token will cause API errors, but the timeout loop should still work and exit cleanly).

- [ ] **Step 6: Verify runner has checkpoint Telegram fork**

Run: `grep -c "Telegram mode" _opensquad/core/runner.pipeline.md`
Expected: At least 1 match.

- [ ] **Step 7: Verify runner has fallback-to-terminal logic**

Run: `grep -c "fallback" _opensquad/core/runner.pipeline.md`
Expected: At least 1 match (the "Fallback to terminal" section).

- [ ] **Step 8: Commit any fixes if tests revealed issues**

```bash
git add -A
git commit -m "fix: address issues found during integration testing"
```

---

## Task 10: Documentation — Update CLAUDE.md and Squad Memory

**Files:**
- Modify: `squads/saude-sync-content-v2/_memory/memories.md`

- [ ] **Step 1: Add Telegram automation entry to squad memory**

Append to `squads/saude-sync-content-v2/_memory/memories.md`:

```markdown

## Telegram Automation (2026-03-23)

- **Interaction channel**: Configurable in squad.yaml (`interaction.channel: terminal | telegram`)
- **Telegram Bot**: Created via @BotFather, token in `.env` as `TELEGRAM_BOT_TOKEN`
- **Checkpoint flow**: 5 checkpoints (steps 02, 04, 07, 12, 14) route to Telegram when channel is telegram
- **Visual review**: Step 12 sends 10 JPEG slides as Telegram photo album before approval buttons
- **Step 04 is two-stage**: First angle selection (5 buttons), then tone selection (6 buttons)
- **Polling**: poll-response.js runs in 600s chunks, runner loops until timeout_pause (8h default)
- **Pause/resume**: run-state.json saves full pipeline state for cross-session resume
- **Cancel**: Progress notifications include cancel button; also supports free-text via --mode text
- **Scheduled task**: Cron `0 9 * * 1-5` via Claude Code (re-register on each new session, expires after 3 days)
```

- [ ] **Step 2: Commit**

```bash
git add squads/saude-sync-content-v2/_memory/memories.md
git commit -m "docs: add Telegram automation notes to squad memory"
```

---

## Task 11: Activation — Switch to Telegram and Register Scheduled Task

This task is done manually by the user after configuring credentials.

- [ ] **Step 1: Verify .env has Telegram credentials**

Run: `grep -c "TELEGRAM_BOT_TOKEN\|TELEGRAM_CHAT_ID" .env`
Expected: 2 (both variables present).

If not present, the user must:
1. Create bot via @BotFather
2. Run `node --env-file=.env skills/telegram-bot/scripts/bot-setup.js`
3. Add both tokens to `.env`

- [ ] **Step 2: Switch interaction channel to telegram**

Edit `squads/saude-sync-content-v2/squad.yaml`:
Change `channel: terminal` to `channel: telegram`

- [ ] **Step 3: Test with a live Telegram message**

Run:
```bash
node --env-file=.env skills/telegram-bot/scripts/send-message.js \
  --text "🧪 Teste do Saúde Sync Pipeline Bot! Se você recebeu esta mensagem, a integração está funcionando." \
  --buttons '[{"text":"✅ Funcionou!","data":"test_ok"}]'
```

Expected: Message appears in your Telegram chat with a button. Press the button.

- [ ] **Step 4: Test polling**

Run:
```bash
node --env-file=.env skills/telegram-bot/scripts/poll-response.js \
  --mode callback --timeout 30
```

Expected: After pressing the button in Telegram, the script outputs `test_ok` and exits.

- [ ] **Step 5: Register scheduled task**

Use Claude Code to create the scheduled task:
```
Cron: 0 9 * * 1-5
Prompt: /opensquad run saude-sync-content-v2
```

Note: Task expires after 3 days. Re-register on new Claude Code sessions.

- [ ] **Step 6: Final commit**

```bash
git add squads/saude-sync-content-v2/squad.yaml
git commit -m "feat: activate Telegram channel for pipeline checkpoints"
```

---

## Summary

| Task | What it does | Files |
|------|-------------|-------|
| 1 | Skill definition | `skills/telegram-bot/SKILL.md` |
| 2 | Bot setup script | `skills/telegram-bot/scripts/bot-setup.js` |
| 3 | Send message + buttons | `skills/telegram-bot/scripts/send-message.js` |
| 4 | Send photo album | `skills/telegram-bot/scripts/send-album.js` |
| 5 | Poll for response | `skills/telegram-bot/scripts/poll-response.js` |
| 6 | Squad interaction config | `squads/saude-sync-content-v2/squad.yaml` |
| 7 | Runner checkpoint fork | `_opensquad/core/runner.pipeline.md` |
| 8 | Pipeline state persistence | `_opensquad/core/runner.pipeline.md` |
| 9 | Integration dry-run test | (verification only) |
| 10 | Documentation | `_memory/memories.md` |
| 11 | Activation + live test | squad.yaml + scheduled task |

**Estimated total implementation time: 45-60 minutes**
