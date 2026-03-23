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
6. Minimal terminal interaction after initial setup (re-register scheduled task on session start)

## Architecture

### Components

1. **Scheduled Task** — Claude Code `create_scheduled_task` with cron `0 9 * * 1-5` (must be re-registered on each new session — see Scheduling Constraints)
2. **Telegram Bot Skill** — New Opensquad skill (`skills/telegram-bot/`) with Node.js scripts
3. **Checkpoint Adapter** — Logic added to `runner.pipeline.md` to fork checkpoint behavior based on `interaction.channel` config
4. **Pipeline State Persistence** — Extended `run-state.json` for resuming paused pipelines
5. **Pipeline Runner** — Modified to support Telegram channel at checkpoint handling

### Data Flow

```
Scheduled Task (9h) → Pipeline Runner → Agent Steps (auto)
                                       → Checkpoint Steps → Checkpoint Adapter
                                         if terminal → AskUserQuestion (current)
                                         if telegram → Telegram Bot Skill
                                                        → sendMessage/sendAlbum
                                                        → pollForResponse (loop)
                                                        → return to Runner
                                       → Bruna Broadcast → Blotato → Instagram
                                       → Ana Analytics → performance-briefing.md
```

### Interaction Channel Config

The existing `squad.yaml` gains an `interaction` block:

```yaml
# squads/saude-sync-content-v2/squad.yaml (append)
interaction:
  channel: telegram          # "terminal" (default) or "telegram"
  telegram:
    notify_on_step: true     # Send status message after each step
    send_album: true         # Send slides as photo album
    timeout_reminder: 4h     # Reminder if no response
    timeout_pause: 8h        # Pause pipeline if no response
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
| `poll-response.js` | Poll for response (callback query or text message) | `getUpdates` + `answerCallbackQuery` |
| `bot-setup.js` | Verify token, get chat_id, test connectivity | `getMe` + `getUpdates` |

### Dependencies

Scripts use Node.js 18+ native `fetch` (no npm dependencies). The `fs`, `path`, and `crypto` modules are also used (all built-in). No `package.json` needed inside the skill directory.

### Environment Variables

```env
TELEGRAM_BOT_TOKEN=        # From @BotFather
TELEGRAM_CHAT_ID=          # Personal chat ID (obtained via bot-setup.js)
```

## Runner Modification Detail

### Where the fork happens

In `_opensquad/core/runner.pipeline.md`, the checkpoint handling section (the `#### If type: checkpoint` block) currently:
1. Reads the checkpoint markdown
2. Presents text to the user
3. Waits for user response via conversation (AskUserQuestion)
4. Saves response to `outputFile`

### Modified checkpoint flow (pseudocode)

```
WHEN step.type == "checkpoint":
  1. Read squad.yaml → get interaction.channel
  2. Read checkpoint .md file → extract question, options

  IF channel == "terminal":
    → Use AskUserQuestion as today (no change)

  IF channel == "telegram":
    a. Determine message type:
       - If checkpoint has associated images (step 12):
           → Run: node skills/telegram-bot/scripts/send-album.js \
               --images "path/to/slides/*.jpeg" \
               --chat-id $TELEGRAM_CHAT_ID
       - Always:
           → Run: node skills/telegram-bot/scripts/send-message.js \
               --text "{checkpoint question}" \
               --buttons "{JSON array of button labels}" \
               --chat-id $TELEGRAM_CHAT_ID
           → Capture: message_id from stdout

    b. Poll for response:
       → Run: node skills/telegram-bot/scripts/poll-response.js \
           --message-id {message_id} \
           --mode "callback"  (or "text" for free-text follow-up) \
           --timeout 28800    (8h in seconds) \
           --reminder 14400   (4h in seconds) \
           --chat-id $TELEGRAM_CHAT_ID
       → The poll script:
           - Calls getUpdates with 30-second long-poll timeout
           - Loops internally until response or timeout
           - At reminder threshold: calls send-message.js to send reminder
           - At pause threshold: outputs "TIMEOUT" and exits
           - On response: outputs the callback_data or message text and exits
       → Capture: response text from stdout

    c. If response == "TIMEOUT":
       → Save run-state.json with current step + all collected checkpoint data
       → Send Telegram: "Pipeline pausado. Responda quando quiser retomar."
       → Exit pipeline (will resume on next trigger)

    d. If response is valid:
       → Parse response into checkpoint output format
       → Save to outputFile
       → Continue pipeline to next step

  3. Save response to outputFile (same for both channels)
```

### Polling mechanism (addressing Claude Code constraints)

The `poll-response.js` script handles its own polling loop internally. It is invoked as a single Bash command with a long timeout:

```bash
# Runner invokes with extended timeout (up to 8 hours = 28800 seconds)
timeout 28800 node skills/telegram-bot/scripts/poll-response.js \
  --message-id 12345 --mode callback --timeout 28800 --reminder 14400

# The script internally:
# 1. Calls Telegram getUpdates with timeout=30 (30-second long poll)
# 2. If no relevant update, loops (new getUpdates call)
# 3. At 4h mark, sends reminder via send-message.js
# 4. At 8h mark, prints "TIMEOUT" and exits with code 0
# 5. On matching callback_query, prints callback_data and exits with code 0
```

**Bash timeout handling:** The Bash tool's default timeout is 120s. The runner must invoke this command with `timeout: 28800000` (ms) parameter to allow the long poll. This is within the Bash tool's 600000ms max, so we cap at 600s (10 min) per poll cycle and re-invoke in a loop from the runner.

**Actual implementation:** The runner calls `poll-response.js` with `--timeout 600` (10 min). If no response, it re-invokes. This loop continues up to the configured `timeout_pause` (8h). This avoids hitting Bash tool timeout limits.

```
Runner loop (pseudocode):
  elapsed = 0
  WHILE elapsed < timeout_pause:
    result = bash("node poll-response.js --timeout 600 ...", timeout=660000)
    IF result != "NO_RESPONSE":
      return result  // got user response
    elapsed += 600
    IF elapsed >= timeout_reminder AND not reminded:
      bash("node send-message.js --text 'Lembrete: checkpoint pendente'")
      reminded = true
  return "TIMEOUT"
```

## Pipeline State Persistence

### Problem

The current `state.json` only stores dashboard display data (agent statuses, step counter). It does not contain enough information to resume a paused pipeline.

### Solution: `run-state.json`

A separate file `run-state.json` is created alongside `state.json` during pipeline execution:

```json
{
  "run_id": "2026-03-23-090000",
  "squad": "saude-sync-content-v2",
  "current_step": 12,
  "status": "paused_at_checkpoint",
  "checkpoint_data": {
    "step-02": { "file": "pipeline/data/pauta-selecionada.md", "completed": true },
    "step-04": { "file": "pipeline/data/angulo-selecionado.md", "completed": true },
    "step-07": { "file": "pipeline/data/aprovacao-conteudo.md", "completed": true },
    "step-12": { "file": "pipeline/data/aprovacao-visual.md", "completed": false },
    "step-14": { "file": "pipeline/data/decisao-publicacao.md", "completed": false }
  },
  "completed_outputs": [
    "output/2026-03-23-090000/v1/pautas-propostas.md",
    "output/2026-03-23-090000/v1/angulos.md",
    "output/2026-03-23-090000/v1/copy-brief.md",
    "output/2026-03-23-090000/v1/carousel-script.md",
    "output/2026-03-23-090000/v1/compliance-report.md",
    "output/2026-03-23-090000/v1/visual-map.md",
    "output/2026-03-23-090000/v1/slides/"
  ],
  "paused_at": "2026-03-23T13:25:00-03:00",
  "telegram_pending_message_id": 12345
}
```

### Resume flow

When the scheduled task fires (or Claude Code reopens):
1. Check for `run-state.json` in the squad directory
2. If found and `status == "paused_at_checkpoint"`:
   - Skip to the paused step
   - Re-send the checkpoint message to Telegram (user may have missed it)
   - Resume polling
3. If found and `status == "paused_timeout"`:
   - Send Telegram: "Pipeline de ontem pausou. Retomar de onde parou?"
   - Inline buttons: [Retomar] [Cancelar e iniciar novo]
4. If not found: start fresh pipeline

## Checkpoint Mapping

Each pipeline checkpoint maps to a specific Telegram interaction pattern:

### Checkpoint 2 — Pauta Selection (step-02)

**Trigger:** After Paulo Pauta generates 5 themes
**Telegram message:** Text with pauta titles, scores, and target audience
**Interaction:** 5 inline buttons (one per pauta), layout: rows of 2 + 1
**Response saved to:** `pipeline/data/pauta-selecionada.md`

### Checkpoint 4 — Angle + Tone Selection (step-04)

**Trigger:** After Igor Ideia generates 5 angles
**Two-stage interaction:**
1. **Message 1:** Text with 5 angle names and descriptions. 5 inline buttons (rows of 2 + 1).
2. **After angle selected → Message 2:** "Qual tom de voz?" with 6 inline buttons (rows of 2):
   - Educativo | Inspirador
   - Direto | Empático
   - Técnico | Bem-humorado
3. Both responses combined into single output file.
**Response saved to:** `pipeline/data/angulo-selecionado.md`

### Checkpoint 7 — Content Approval (step-07)

**Trigger:** After Carlos Carrossel completes the script
**Telegram message:** Summary of hook, slide count, CTA
**Interaction:** 2 buttons (Aprovar / Solicitar Ajustes)
**On "Solicitar Ajustes":** Bot sends "Descreva os ajustes:" and switches to text-message polling mode
**Response saved to:** `pipeline/data/aprovacao-conteudo.md`

### Checkpoint 12 — Visual Approval (step-12)

**Trigger:** After Daniela Design renders 10 JPEG slides
**Telegram sequence:**
1. Photo album (10 images via `sendMediaGroup`)
2. Text message with approval buttons: (Aprovar / Pedir Ajustes)
**On "Pedir Ajustes":** Bot sends "Descreva os ajustes (número do slide + o que mudar):" and switches `poll-response.js` to `--mode text` to capture free-text message instead of callback query
**Response saved to:** `pipeline/data/aprovacao-visual.md`

### Checkpoint 14 — Publication Decision (step-14)

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

These are informational only (no buttons). They give visibility into pipeline progress without requiring action. Includes a persistent "❌ Cancelar pipeline" button for mid-run cancellation.

### Cancel mechanism

Each progress notification includes an inline button "❌ Cancelar". If pressed:
1. Bot sends `answerCallbackQuery` with "Pipeline cancelado"
2. Runner receives cancel signal on next poll cycle
3. Pipeline saves `run-state.json` with `status: "cancelled"`
4. Bot sends: "Pipeline cancelado. Assets parciais salvos em output/{run_id}/"

## Step 16 — Ana Analytics (Post-Publication)

After Bruna publishes, Ana Analytics runs as the final step. In Telegram mode:
- Ana generates `performance-briefing.md` as a baseline (no real metrics yet)
- Bot sends: "📊 Pipeline completo! Post publicado. Briefing de performance será atualizado em 48h."
- Ana's 48h monitoring is out of scope for this automation (would require a separate scheduled task to collect metrics after 48h). The baseline briefing is generated inline.

## Timeout and Error Handling

### Timeouts

| Event | Action |
|-------|--------|
| No response in 4h | Send reminder message with original buttons |
| No response in 8h | Pause pipeline, save `run-state.json`, send "Pipeline pausado" |
| Response after pause | Resume pipeline from saved state (next session trigger) |

### Errors

| Error | Action |
|-------|--------|
| Telegram API unreachable | Retry 3x with exponential backoff, then fallback to terminal |
| Claude Code closed mid-pipeline | `run-state.json` preserves full state; resumes on next session |
| Image generation failure | Retry with fallback model, notify via Telegram |
| Blotato publish failure | Notify via Telegram, prepare assets for manual publish |
| User rejects at checkpoint | Pipeline returns to appropriate step and reprocesses |

## Scheduling Constraints

**Claude Code scheduled tasks expire after 3 days.** This means:

- The daily cron task (`0 9 * * 1-5`) will stop firing after 3 days
- **Workaround:** On each new Claude Code session start, the system must re-register the scheduled task
- This can be automated via a Claude Code hook or by adding a startup instruction to `CLAUDE.md`
- Practical impact: when you open Claude Code on Monday morning, the task re-registers and fires at 9h. If Claude Code stays open Mon-Wed, the task expires Wed night. Reopening Thu re-registers.
- **Alternative (future):** Move scheduling to `mcp__scheduled-tasks__create_scheduled_task` which persists across sessions, or to an external cron (GitHub Actions, systemd timer)

## Daily Timeline (Estimated)

### Best Case (instant responses)

```
09:00  Scheduled task triggers pipeline
09:01  Paulo Pauta generates 5 themes (~2min)
09:03  📱 TELEGRAM: 5 themes + buttons → User selects
09:04  Igor Ideia generates 5 angles (~2min)
09:06  📱 TELEGRAM: 5 angles + tone buttons → User selects
09:07  Leo (copy) + Carlos (script) (~4min)
09:11  📱 TELEGRAM: Content summary + approve/reject
09:12  Carla (compliance) + Marco (visual map) (~3min)
09:15  4 image agents generate in parallel (~5min)
09:20  Daniela assembles 10 slides (~5min)
09:25  📱 TELEGRAM: Photo album + approve/adjust
09:26  Victor reviews (~2min)
09:28  📱 TELEGRAM: Score + publish? → User approves
09:29  Bruna publishes via Blotato
09:30  Ana Analytics generates baseline briefing
09:31  📱 TELEGRAM: "✅ Publicado! Link: ..."
```

**Best case: ~31 minutes**

### Typical Case (5-15 min per checkpoint)

```
09:00  Pipeline starts
09:03  📱 Checkpoint 1 (pauta) → responds in ~5min
09:10  📱 Checkpoint 2 (ângulo) → responds in ~5min
09:19  📱 Checkpoint 3 (conteúdo) → responds in ~10min (reads copy)
09:42  📱 Checkpoint 4 (visual) → responds in ~15min (reviews 10 slides)
10:01  📱 Checkpoint 5 (publicação) → responds in ~2min
10:04  Published + briefing
```

**Typical case: ~60-65 minutes**

## Initial Setup (One-Time)

1. Create Telegram bot via @BotFather → obtain `TELEGRAM_BOT_TOKEN`
2. Start conversation with bot → run `bot-setup.js` to obtain `TELEGRAM_CHAT_ID`
3. Add both to `.env` (already gitignored)
4. Configure `BLOTATO_API_KEY` in `.env` for automatic publication
5. Set `interaction.channel: telegram` in squad.yaml
6. Create scheduled task in Claude Code: cron `0 9 * * 1-5`
7. Add re-registration instruction to `CLAUDE.md` for new sessions

## Constraints

- Claude Code must be running at 9:00 AM for the scheduled task to fire
- Scheduled tasks expire after 3 days (must re-register on new sessions)
- If Claude Code was closed, the task fires when it reopens
- Telegram Bot API has rate limits (30 messages/sec — not a concern for 1 user)
- Photo albums support max 10 images (exactly what we need for 10 slides)
- Inline keyboard buttons have a 64-byte data limit per button (sufficient for pauta IDs)
- Node.js 18+ required for native fetch (no npm dependencies needed)

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `skills/telegram-bot/SKILL.md` | Skill definition |
| `skills/telegram-bot/scripts/send-message.js` | Send text + inline keyboard |
| `skills/telegram-bot/scripts/send-album.js` | Send photo album |
| `skills/telegram-bot/scripts/poll-response.js` | Poll for callback query or text message |
| `skills/telegram-bot/scripts/bot-setup.js` | Initial setup helper |

### Modified Files

| File | Change |
|------|--------|
| `squads/saude-sync-content-v2/squad.yaml` | Add `interaction` block |
| `_opensquad/core/runner.pipeline.md` | Add Telegram channel fork at checkpoint handling (see Runner Modification Detail) |
| `.env` | Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` |

### Unchanged

- All 16 step files (checkpoint markdown stays the same)
- All 14 agent files
- pipeline.yaml (steps definition stays the same)
- state.json dashboard management (same logic)

## Out of Scope

- Multi-user Telegram support (single user: Caio)
- Telegram group/channel publishing (only DM bot)
- Voice message responses (text + buttons only)
- Web dashboard for pipeline monitoring (Telegram is the dashboard)
- Weekend scheduling (Mon-Fri only, configurable later)
- Ana Analytics 48h real-metrics collection (separate scheduled task, future)

## Success Criteria

1. Pipeline runs daily at 9h without manual terminal intervention
2. All 5 checkpoints work via Telegram inline buttons
3. Visual approval shows all 10 slides as Telegram photo album
4. Pipeline completes end-to-end in under 90 minutes (typical case)
5. Published post appears on Instagram automatically after final approval
6. Fallback to terminal works if Telegram is unavailable
7. Pipeline can be paused and resumed across Claude Code sessions
8. Cancel button available at any point during execution
