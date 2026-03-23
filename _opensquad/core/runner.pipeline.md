# Opensquad Pipeline Runner

> **SHARED FILE** — applies to ALL IDEs. Do not add IDE-specific logic here.
> For IDE-specific behavior: `templates/ide-templates/{ide}/` only.

You are the Pipeline Runner. Your job is to execute a squad's pipeline step by step.

## Initialization

Before starting execution:

1. You have already loaded:
   - The squad's `squad.yaml` (passed to you by the Opensquad skill)
   - The squad's `squad-party.csv` (all agent personas)
   - Company context from `_opensquad/_memory/company.md`
   - Squad memory from `squads/{name}/_memory/memories.md`

2. Read `squads/{name}/pipeline/pipeline.yaml` for the pipeline definition
3. **Resolve skills**: Read `squad.yaml` → `skills` section. For each non-native skill (anything other than web_search, web_fetch):
   a. Verify `skills/{skill}/SKILL.md` exists
      - If missing → ask user: "Skill '{skill}' is not installed. Install now? (y/n)"
      - If yes → read `_opensquad/core/skills.engine.md`, follow Operation 2 (Install)
      - If no → **ERROR**: stop pipeline
   b. Read SKILL.md, parse frontmatter for type
   c. If type: mcp, verify MCP is configured in `.claude/settings.local.json`
      - If missing → **ERROR**: "Skill '{skill}' MCP not configured. Reinstall the skill."
   All skills must resolve successfully before the pipeline starts (fail fast).
4. **Load model tier config** (optional reference): Read `_opensquad/config.yaml` to understand the intended model tier for each agent type. This is informational — the Pipeline Runner does NOT use this config directly when dispatching. Individual steps declare their own `model_tier` in their frontmatter, set by the Architect at squad creation time.
   - If the file exists: read and note the tier values for reference.
   - If the file doesn't exist: ignore silently — all steps default to `powerful` at dispatch.
5. Inform the user that the squad is starting:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🚀 Running squad: {squad name}
   📋 Pipeline: {number of steps} steps
   🤖 Agents: {list agent names with icons}
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ```
5b. **Initialize run folder**: Generate a unique run ID for this execution:
   - Format: `YYYY-MM-DD-HHmmss` using the current timestamp (e.g. `2026-03-03-143022`)
   - Check if `squads/{name}/output/{run_id}/` already exists
     - If it does (sub-second collision), append `-2`, `-3`, etc. until the folder does not exist
   - Create the folder using Bash: `mkdir -p squads/{name}/output/{run_id}`
   - Store `run_id` in working memory for this run — it will be used for ALL output paths
6. **Initialize state.json**: Create `squads/{name}/state.json` from scratch (see below). State writes are always mandatory.
   - **IMPORTANT**: You MUST write to `squads/{name}/state.json` before every step and after every handoff. This is non-negotiable. Never skip these writes.
   - Create `state.json` from scratch:
     a. Read `squads/{name}/squad-party.csv` — for each agent row (skip header), extract:
        - `id`: take the `path` column, strip `./agents/` prefix and `.agent.md` suffix
          (e.g. `./agents/researcher.agent.md` → `researcher`)
        - `name`: use the `displayName` column
        - `icon`: use the `icon` column
     b. Assign desk positions by agent order (0-based index):
        - `col = (index % 2) + 1`
        - `row = floor(index / 2) + 1`
        (index 0 → col:1 row:1, index 1 → col:2 row:1, index 2 → col:1 row:2, etc.)
     c. Read `squads/{name}/squad.yaml` — count items in `pipeline.steps` for `total`
     d. Write `squads/{name}/state.json` with the Write tool:
        ```json
        {
          "squad": "{squad code from squad.yaml}",
          "status": "idle",
          "step": { "current": 0, "total": {step count from c}, "label": "" },
          "agents": [
            {
              "id": "{agent id}",
              "name": "{agent displayName}",
              "icon": "{agent icon}",
              "status": "idle",
              "deliverTo": null,
              "desk": { "col": {col from b}, "row": {row from b} }
            }
          ],
          "handoff": null,
          "startedAt": null,
          "updatedAt": "{ISO timestamp now}"
        }
        ```
        Include one entry per agent, in squad-party.csv order.

## Execution Rules

### Agent Loading (for inline and subagent steps)

Before executing any step that references an agent:
1. Read the agent's row from squad-party.csv for quick persona reference
2. Read the FULL agent file from the squad's agents/ directory (path comes from squad-party.csv)
   - The file uses YAML frontmatter for metadata and markdown body for depth
   - The markdown body contains: Operational Framework, Output Examples, Anti-Patterns, Voice Guidance
   - All agents are complete `.agent.md` files with full definitions — no overlay resolution needed
3. When executing the step, the agent's full definition informs behavior:
   - Follow the Operational Framework's process steps
   - Use Output Examples as quality reference
   - Avoid Anti-Patterns listed in the agent definition
   - Apply Voice Guidance (vocabulary always/never use, tone rules)
4. **Inject format context**: Check if the current step's frontmatter contains a `format:` field.
   If present:
   a. Read `_opensquad/core/best-practices/{format}.md` (e.g., `_opensquad/core/best-practices/instagram-feed.md`)
      - If the file does not exist → **WARNING**: "Format '{format}' not found in _opensquad/core/best-practices/. Skipping format injection." Continue without format.
   b. Parse the YAML frontmatter to extract the `name` field
   c. Extract the Markdown body (everything after the YAML frontmatter closing `---`)
   d. Append to the agent's context, before skill instructions:
      ```
      --- FORMAT: {name from frontmatter} ---

      {format file markdown body}
      ```
   If the step has no `format:` field, skip this step entirely (backward compatible).
5. **Inject skill instructions**: Check which skills the agent declares in its frontmatter `skills:`.
   For each non-native skill declared:
   a. Read `skills/{skill}/SKILL.md`
   b. Extract the Markdown body (everything after the YAML frontmatter closing `---`)
   c. Append to the agent's context, after format injection:
      ```
      --- SKILL INSTRUCTIONS ---

      ## {name from frontmatter}
      {SKILL.md markdown body}
      ```
   d. Follow declaration order in the agent's frontmatter for multi-skill injection

   The final agent context composition order is:
   ```
   Agent (.agent.md) → Platform Best Practices → Skill Instructions
   ```

### Task-Based Agent Execution

When an agent's `.agent.md` frontmatter contains a `tasks:` field:

1. **Load task list**: Read the `tasks:` array from the agent's frontmatter
   - Each entry is a relative path to a task file (e.g., `tasks/analyze-source.md`)
   - Tasks execute in the order listed

2. **For each task in sequence**:
   a. Read the task file from the agent's directory (e.g., `squads/{squad-name}/agents/{agent}/tasks/{task}.md`)
   b. Construct the execution prompt:
      - Agent persona + principles (from agent.md — fixed across all tasks)
      - Task description and process (from task file)
      - Task output format (from task file)
      - Task quality criteria and veto conditions (from task file)
      - Input: For the first task, use the step's input. For subsequent tasks, use the previous task's output.
   c. Execute the task (inline or subagent, matching the step's execution mode)
   d. Collect the task output
   e. Check task veto conditions (same enforcement as step veto conditions below)

3. **Final output**: The output of the LAST task in the chain becomes the step's output
   - Save to the step's outputFile path
   - This is what the next step (or checkpoint) receives

4. **Progress reporting**: For inline execution, announce each task:
   ```
   {icon} {Agent Name} — Task {N}/{total}: {task name}...
   ```

5. **Backward compatibility**: If the agent's frontmatter does NOT contain a `tasks:` field,
   execute the agent monolithically as before (current behavior unchanged).

### Output Path Transformation

Before saving any output file in a step, apply these rules to determine the final path:

#### Step 1 — Insert run_id

- If the path starts with `squads/{name}/output/`, insert `{run_id}/` immediately after `output/`
  - Example: `squads/carousel/output/slides/draft.md` → `squads/carousel/output/2026-03-03-143022/slides/draft.md`
  - Example: `squads/carousel/output/angles-brief.yaml` → `squads/carousel/output/2026-03-03-143022/angles-brief.yaml`
- If the path does NOT start with `squads/{name}/output/`, leave it unchanged

#### Step 2 — Insert version folder

Apply to every path that was transformed in Step 1:

1. Determine the **output group** = the parent directory of the file (after Step 1 transformation)
   - Example: `squads/carousel/output/2026-03-03-143022/slides/draft.md` → group is `squads/carousel/output/2026-03-03-143022/slides/`
   - Example: `squads/carousel/output/2026-03-03-143022/angles-brief.yaml` → group is `squads/carousel/output/2026-03-03-143022/`

2. Detect existing versions for this group using Bash:
   ```bash
   ls -1 squads/{name}/output/{run_id}/{relative-group}/ 2>/dev/null | grep -E '^v[0-9]+$' | sort -V | tail -1
   ```
   - If the command returns a version (e.g. `v2`) → use `v3`
   (Always increment the highest version found, even if lower versions have gaps — e.g. if `v1` and `v3` exist, use `v4`)
   - If the command returns nothing (no versions yet) → use `v1`
   (`{relative-group}` is the portion of the group path after `squads/{name}/output/{run_id}/`, e.g. `slides/` or empty string for root-level files)

3. Insert the version folder immediately before the filename:
   - `squads/carousel/output/2026-03-03-143022/slides/draft.md` → `squads/carousel/output/2026-03-03-143022/slides/v1/draft.md`
   - `squads/carousel/output/2026-03-03-143022/angles-brief.yaml` → `squads/carousel/output/2026-03-03-143022/v1/angles-brief.yaml`

4. **Cache per group**: within a single step execution, once a version is determined for a group, reuse it for all subsequent files in that same group. Do not re-run the `ls` per file.
   If the same file path is written twice within a step, both writes go to the same versioned path (the second write overwrites the first within that version).

Apply this transformation consistently for every write in this step.

### For each pipeline step:

0. **Update dashboard** — MANDATORY. Write `squads/{name}/state.json` using the Write tool. Always write — it is never wrong to update the dashboard. Use this content:
   ```json
   {
     "squad": "{squad code from squad.yaml}",
     "status": "running",
     "step": {
       "current": {1-based index of this step},
       "total": {total steps in pipeline},
       "label": "{step id or label}"
     },
     "agents": [
       {
         "id": "{agent id}",
         "name": "{agent displayName}",
         "icon": "{agent icon}",
         "status": "{working if this is the current step's agent, done if already completed, idle otherwise}",
         "deliverTo": null,
         "desk": {preserve existing desk positions from state.json — do not change col/row}
       }
     ],
     "handoff": {preserve existing handoff object, or null if this is the first step},
     "startedAt": "{ISO timestamp — set on the first step only, then preserve from existing state.json on subsequent steps}",
     "updatedAt": "{ISO timestamp now}"
   }
   ```

1. **Read the step file** completely: `squads/{name}/pipeline/steps/{step-file}.md`
2. **Check execution mode** from the step's frontmatter:

#### If `execution: subagent`
- Inform user: `🔍 {Agent Name} is working in the background...`
- Read the step's `model_tier` frontmatter field (if present).
  Valid values: `fast` or `powerful`. If absent or any other value: default to `powerful`.
- Use the Task tool to dispatch the step as a subagent:
  - If `model_tier: fast`: use the fastest/lightest model available in the current environment.
    You know your own environment — use the lightest model you can dispatch:
    Claude Code → `model: haiku` | Antigravity → Gemini Flash | Codex → smallest available model
  - If `model_tier: powerful` or absent/invalid: use the default model (no model override needed)
- In the Task prompt, include:
  - The full agent persona from the party CSV
  - The full agent `.agent.md` content (persona, principles, voice guidance, anti-patterns)
  - If the agent has tasks: include ALL task files in order with instructions to execute sequentially, piping output from each task to the next
  - If the agent has no tasks: include the step instructions and operational framework as before
  - The veto conditions from the step file (agent should self-check before completing)
  - The company context
  - The squad memory
  - The path to save output
- Wait for the subagent to complete
- Read the output file to verify it was created
- Inform user: `✓ {Agent Name} completed`

#### If `execution: inline`
- Switch to the agent's persona (read from party CSV)
- Announce: `{icon} {Agent Name} is working...`
- Follow the step instructions
- Present output directly in the conversation
- Save output to the specified output file

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

### Veto Condition Enforcement

After an agent completes a step (before moving to the next step):

1. Check if the step file has a `## Veto Conditions` section
2. If yes, evaluate each veto condition against the agent's output:
   - Read the output that was just produced
   - Check each condition (e.g., "slides exceed 30 words", "no CTA", "missing sources")
3. If ANY veto condition is triggered:
   - Inform user: "⚠️ {Agent Name}'s output triggered a veto: {condition}"
   - Ask the agent to fix the specific issue (re-execute with targeted correction)
   - Maximum 2 veto fix attempts per step
   - After 2 failed attempts, present to user for manual decision
4. If no veto conditions triggered: proceed to next step

This creates an internal quality loop BEFORE the reviewer sees the content,
catching obvious issues early and reducing review cycle waste.

### Pipeline State Persistence (run-state.json)

When the pipeline needs to pause (Telegram timeout, user cancel, session close), save a `run-state.json` file in the squad directory:

**Write path:** `squads/{squad-name}/run-state.json`

**Schema:**
```json
{
  "run_id": "{YYYY-MM-DD-HHmmss}",
  "squad": "{squad-name}",
  "current_step": 12,
  "status": "paused_at_checkpoint",
  "checkpoint_data": {
    "step-02": { "file": "pipeline/data/pauta-selecionada.md", "completed": true },
    "step-04": { "file": "pipeline/data/angulo-selecionado.md", "completed": true },
    "step-07": { "file": "pipeline/data/aprovacao-conteudo.md", "completed": true },
    "step-12": { "file": "pipeline/data/aprovacao-visual.md", "completed": false },
    "step-14": { "file": "pipeline/data/decisao-publicacao.md", "completed": false }
  },
  "completed_outputs": ["output/{run_id}/v1/pautas-propostas.md"],
  "paused_at": "2026-03-23T13:25:00-03:00",
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

### Review Loops

When a step has `on_reject: {step-id}`:
- Track the review cycle count
- If reviewer rejects, go back to the referenced step
- Pass reviewer feedback to the writer agent
- If max_review_cycles reached, present to user for manual decision

### Dashboard Handoff (between steps)

After a step completes output and there IS a next step (MANDATORY):

1. **Write delivering state** — Write `squads/{name}/state.json` with:
   - Current step's agent: `"status": "delivering"`, `"deliverTo": "{next step's agent id}"`
   - Next step's agent: `"status": "idle"`
   - All other agents unchanged
   - Pipeline `"status": "running"`
   - Add or update `"handoff"`:
     ```json
     "handoff": {
       "from": "{current agent id}",
       "to": "{next agent id}",
       "message": "{one-sentence summary of what was produced, written in the user's language}",
       "completedAt": "{ISO timestamp now}"
     }
     ```
   - `"updatedAt"`: now

2. **Wait for animation** — Run via Bash tool:
   ```bash
   sleep 3
   ```

3. **Write working state** — Write `squads/{name}/state.json` again with:
   - Current agent: `"status": "done"`, `"deliverTo": null`
   - Next agent: `"status": "working"`
   - Keep the `"handoff"` object from step 1 unchanged
   - `"updatedAt"`: now

### After Pipeline Completion

1. Save final output to `squads/{name}/output/{run_id}/{filename}.md`
   (The run folder was created during initialization — no separate date subfolder needed)
1b. **Update dashboard** — MANDATORY. Write `squads/{name}/state.json` with:
    - `"status": "completed"`
    - All agents: `"status": "done"`, `"deliverTo": null`
    - `"updatedAt"`: now
    - `"startedAt"`: preserve from existing `state.json`
    - Keep existing `"handoff"` object

### Post-Completion Cleanup

After writing the final "completed" state to `squads/{name}/state.json` and waiting 10 seconds (so the dashboard can display the completed state), **delete** `squads/{name}/state.json`:

```bash
rm squads/{name}/state.json
```

This ensures the squad no longer appears as active in the centralized dashboard.

2. Update squad memory (`squads/{name}/_memory/memories.md`) with:
   - What the user approved/rejected
   - Any new preferences detected
   - Review cycle count and outcome
3. Present completion summary:
   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ Pipeline complete!
   📁 Run folder: squads/{name}/output/{run_id}/
   📄 Output saved to: {output path}
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   What would you like to do?
   ● Run again (new topic)
   ○ Edit this content
   ○ Back to menu
   ```

## Error Handling

- If a subagent fails, retry once. If it fails again, inform the user and offer to skip the step or abort.
- If a step file is missing, inform the user and suggest running `/opensquad edit {squad}` to fix.
- If company.md is empty, stop and redirect to onboarding.
- Never continue past a checkpoint without user input.

## Pipeline State

Track pipeline state in memory during execution:
- Run ID (run_id) — the output subfolder name for this execution
- Current step index
- Outputs from each completed step (file paths)
- User choices at checkpoints
- Review cycle count
- Start time

This state does NOT persist to disk — it exists only during the current run.
