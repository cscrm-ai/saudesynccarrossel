# Telegram Pipeline Automation — Design Spec

**Date:** 2026-03-23
**Status:** Approved
**Squad:** saude-sync-content-v2

## Overview

Automate the Opensquad content pipeline so it runs daily at 9:00 AM and all user interactions (checkpoint approvals, theme selection, visual review) happen through a Telegram bot instead of the Claude Code terminal.

## Goals

1. Daily automated pipeline execution (Mon-Fri 9h)
2. All 5 checkpoints routed through Telegram with inline buttons
3. Visual approval via Telegram photo albums (10 JPEG slides)
4. Progress notifications at each step completion
5. Automatic Instagram publication after final Telegram approval
6. Zero terminal interaction required after initial setup

## Architecture

### Components

1. **Scheduled Task** — Claude Code `create_scheduled_task` with cron `0 9 * * 1-5`
2. **Telegram Bot Skill** — New Opensquad skill (`skills/telegram-bot/`) with Node.js scripts
3. **Checkpoint Adapter** — Configuration in `squad.yaml` to route checkpoints to Telegram
4. **Pipeline Runner** — Existing Opensquad runner, unmodified (reads interaction channel config)

### Data Flow

```
Scheduled Task (9h) → Pipeline Runner → Agent Steps (auto)
                                       → Checkpoint Steps → Telegram Bot Skill
                                                              → sendMessage/sendAlbum
                                                              → pollForResponse
                                                              → return to Runner
                                       → Bruna Broadcast → Blotato → Instagram
```

### Interaction Channel Config

The squad YAML gains an `interaction` block:

```yaml
# squads/saude-sync-content-v2/squad.yaml
interaction:
  channel: telegram
  telegram:
    notify_on_step: true
    send_album: true
    timeout_reminder: 4h
    timeout_pause: 8h
```

When `channel` is `telegram`, checkpoints use the Telegram Bot Skill instead of `AskUserQuestion`. Default is `terminal` (current behavior, backward compatible).

## Telegram Bot Skill

### Skill Definition

```yaml
# skills/telegram-bot/SKILL.md frontmatter
name: telegram-bot
type: script
version: "1.0.0"
env:
  - TELEGRAM_BOT_TOKEN
  - TELEGRAM_CHAT_ID
```

### Scripts

| Script | Purpose | Telegram API |
|--------|---------|-------------|
| `send-message.js` | Send text + inline keyboard (buttons) | `sendMessage` |
| `send-album.js` | Send photo album (up to 10 JPEG) | `sendMediaGroup` |
| `poll-response.js` | Long-poll for callback query (button press) | `getUpdates` + `answerCallbackQuery` |
| `bot-setup.js` | Verify token, get chat_id, test connectivity | `getMe` + `getUpdates` |

### Environment Variables

```env
TELEGRAM_BOT_TOKEN=        # From @BotFather
TELEGRAM_CHAT_ID=          # Personal chat ID (obtained via bot-setup.js)
```

## Checkpoint Mapping

Each pipeline checkpoint maps to a specific Telegram interaction pattern:

### Checkpoint 2 — Pauta Selection

**Trigger:** After Paulo Pauta generates 5 themes
**Telegram message:** Text with pauta titles, scores, and target audience
**Interaction:** 5 inline buttons (one per pauta)
**Response saved to:** `pipeline/data/pauta-selecionada.md`

### Checkpoint 4 — Angle Selection

**Trigger:** After Igor Ideia generates 5 angles
**Telegram message:** Text with angle names and emotional tones
**Interaction:** 5 inline buttons for angle + 3 buttons for tone
**Response saved to:** `pipeline/data/angulo-selecionado.md`

### Checkpoint 7 — Content Approval

**Trigger:** After Carlos Carrossel completes the script
**Telegram message:** Summary of hook, slide count, CTA
**Interaction:** 2 buttons (Aprovar / Solicitar Ajustes)
**Response saved to:** `pipeline/data/aprovacao-conteudo.md`

### Checkpoint 12 — Visual Approval

**Trigger:** After Daniela Design renders 10 JPEG slides
**Telegram message:** Photo album (10 images) + text with approval buttons
**Interaction:** 2 buttons (Aprovar / Pedir Ajustes)
**On "Pedir Ajustes":** Bot asks for free-text description of needed changes
**Response saved to:** `pipeline/data/aprovacao-visual.md`

### Checkpoint 14 — Publication Decision

**Trigger:** After Victor Veredicto review (score + recommendation)
**Telegram message:** Score, recommendation, summary table
**Interaction:** 2 buttons (Publicar / Rejeitar)
**Response saved to:** `pipeline/data/decisao-publicacao.md`

## Progress Notifications

At each step completion, the bot sends a status update:

```
✅ Step 5/16 — Leo Legenda concluiu copy
   Próximo: Carlos Carrossel (roteiro)
   ⏱️ ~3 min
```

These are informational only (no buttons). They give visibility into pipeline progress without requiring action.

## Timeout and Error Handling

### Timeouts

| Event | Action |
|-------|--------|
| No response in 4h | Send reminder message with original buttons |
| No response in 8h | Pause pipeline, save state, send "Pipeline pausado" message |
| Response after pause | Resume pipeline from saved state |

### Errors

| Error | Action |
|-------|--------|
| Telegram API unreachable | Retry 3x with exponential backoff, then fallback to terminal |
| Claude Code closed mid-pipeline | state.json preserves state; resumes when Claude Code reopens |
| Image generation failure | Retry with fallback model, notify via Telegram |
| Blotato publish failure | Notify via Telegram, prepare assets for manual publish |
| User rejects at checkpoint | Pipeline returns to appropriate step and reprocesses |

## Daily Timeline (Estimated)

```
09:00  Scheduled task triggers pipeline
09:01  Paulo Pauta generates 5 themes (~2min)
09:03  📱 TELEGRAM: 5 themes + buttons → User selects
09:04  Igor Ideia generates 5 angles (~2min)
09:06  📱 TELEGRAM: 5 angles + buttons → User selects
09:07  Leo (copy) + Carlos (script) (~4min)
09:11  📱 TELEGRAM: Content summary + approve/reject
09:12  Carla (compliance) + Marco (visual map) (~3min)
09:15  4 image agents generate in parallel (~5min)
09:20  Daniela assembles 10 slides (~5min)
09:25  📱 TELEGRAM: Photo album + approve/adjust
09:26  Victor reviews (~2min)
09:28  📱 TELEGRAM: Score + publish? → User approves
09:29  Bruna publishes via Blotato
09:30  📱 TELEGRAM: "Published! Link: ..."
```

Total estimated: ~30 minutes including user response times.

## Initial Setup (One-Time)

1. Create Telegram bot via @BotFather → obtain `TELEGRAM_BOT_TOKEN`
2. Start conversation with bot → run `bot-setup.js` to obtain `TELEGRAM_CHAT_ID`
3. Add both to `.env`
4. Configure `BLOTATO_API_KEY` in `.env` for automatic publication
5. Set `interaction.channel: telegram` in squad.yaml
6. Create scheduled task in Claude Code: cron `0 9 * * 1-5`

## Constraints

- Claude Code must be running at 9:00 AM for the scheduled task to fire
- If Claude Code was closed, the task fires when it reopens
- Telegram Bot API has rate limits (30 messages/sec to different chats — not a concern for 1 user)
- Photo albums support max 10 images (exactly what we need for 10 slides)
- Inline keyboard buttons have a 64-byte data limit per button (sufficient for pauta IDs)

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `skills/telegram-bot/SKILL.md` | Skill definition |
| `skills/telegram-bot/scripts/send-message.js` | Send text + inline keyboard |
| `skills/telegram-bot/scripts/send-album.js` | Send photo album |
| `skills/telegram-bot/scripts/poll-response.js` | Long-poll for response |
| `skills/telegram-bot/scripts/bot-setup.js` | Initial setup helper |

### Modified Files

| File | Change |
|------|--------|
| `squads/saude-sync-content-v2/squad.yaml` | Add `interaction` block |
| `_opensquad/core/runner.pipeline.md` | Add Telegram channel detection at checkpoint handling |
| `.env` | Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` |

### Unchanged

- All 16 step files (checkpoint markdown stays the same)
- All 14 agent files
- pipeline.yaml (steps definition stays the same)
- state.json management (same dashboard logic)

## Out of Scope

- Multi-user Telegram support (single user: Caio)
- Telegram group/channel publishing (only DM bot)
- Voice message responses (text + buttons only)
- Web dashboard for pipeline monitoring (Telegram is the dashboard)
- Weekend scheduling (Mon-Fri only, configurable later)

## Success Criteria

1. Pipeline runs daily at 9h without manual terminal intervention
2. All 5 checkpoints work via Telegram inline buttons
3. Visual approval shows all 10 slides as Telegram photo album
4. Pipeline completes end-to-end in under 45 minutes
5. Published post appears on Instagram automatically after final approval
6. Fallback to terminal works if Telegram is unavailable
