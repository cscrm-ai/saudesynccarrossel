---
task_id: navigate-flow
agent: navi-navegador
title: Navigate Saúde Sync Flow
description: >
  Open the Saúde Sync staging app and navigate the complete tutorial flow
  step by step, following the tutorial definition. Document every action
  in the navigation log as each step is executed.
inputs:
  - flow_name: string — identifier of the flow (e.g., "agendamento-consulta")
  - audience: enum[medico, paciente]
  - app_url: string — staging/test URL of the Saúde Sync app
  - steps: array — ordered list of steps from the tutorial definition
outputs:
  - navigation-log.json — structured log of all actions taken
  - output_folder: string — path to the folder where screenshots were saved
tools:
  - browser_navigate
  - browser_click
  - browser_fill_form
  - browser_press_key
  - browser_select_option
  - browser_wait_for
  - browser_snapshot
---

# Task: Navigate Saúde Sync Flow

## Process

### Step 1 — Validate Environment
Extract the base domain from `app_url`. Confirm it matches an approved pattern: `staging.`, `sandbox.`, `test.`, `localhost`, or a non-standard port (e.g., `:3000`, `:8080`). If no approved pattern is found, emit `ENV_ERROR: production URL detected — [url]` and halt. Log the validation result as step 0 in the navigation log.

### Step 2 — Open the Application
Call `browser_navigate` with the validated `app_url`. Use `browser_wait_for` to confirm the page is fully loaded (no visible loading spinners, page title is set). Confirm the viewport is 1440x900 — if not already set, apply it before proceeding.

### Step 3 — Navigate to Flow Starting Point
From the landing page, navigate to the entry point of the flow defined in the tutorial definition. This may involve logging in with test credentials, clicking a menu item, or going directly to a path. Each navigation action counts as a documented step and must have a pre-action screenshot captured by the `capture-screenshots` task running in tandem.

### Step 4 — Execute Flow Steps Sequentially
For each step in the `steps` array from the tutorial definition:
  a. Confirm the current page matches the expected context for this step (check URL path and key visible element).
  b. Signal the `capture-screenshots` task to take the pre-action screenshot.
  c. Execute the action using the appropriate Playwright MCP tool (`browser_click`, `browser_fill_form`, `browser_select_option`, `browser_press_key`).
  d. Use `browser_wait_for` to confirm the expected result (element appears, URL changes, form advances).
  e. Write the log entry immediately. If the action failed, log the failure and attempt one retry. On second failure, log `BLOCKED` and move to the next step only if the tutorial definition marks it as optional; otherwise halt.

### Step 5 — Complete and Emit Log
When all steps are processed (or the flow reaches its natural end state), write the complete `navigation-log.json` to the output folder. Emit the flow-complete summary line containing: flow name, environment domain, steps completed, screenshots captured, warnings, and blocked steps.

---

## Output Format

`navigation-log.json` — a JSON array. Each element is an object with these fields:

| Field        | Type   | Description                                            |
|-------------|--------|--------------------------------------------------------|
| step        | number | Sequential step number (0 = environment validation)   |
| action      | string | Human-readable description of the action               |
| selector    | string | CSS selector or locator used                           |
| screenshot  | string | Filename of pre-action screenshot                      |
| url         | string | Full URL at time of action                             |
| status      | string | "completed", "WARNING", or "BLOCKED"                  |
| notes       | string | Additional context or null                             |

---

## Output Example

```json
[
  {
    "step": 0,
    "action": "Environment validation",
    "selector": null,
    "screenshot": "step-00-initial-state.png",
    "url": "https://staging.saudesync.com.br",
    "status": "completed",
    "notes": "Staging domain confirmed."
  },
  {
    "step": 1,
    "action": "Navigate to login page",
    "selector": "a[href='/login']",
    "screenshot": "step-01-navigate-login.png",
    "url": "https://staging.saudesync.com.br",
    "status": "completed",
    "notes": null
  },
  {
    "step": 2,
    "action": "Fill email field with test credentials",
    "selector": "input[name='email']",
    "screenshot": "step-02-fill-email.png",
    "url": "https://staging.saudesync.com.br/login",
    "status": "completed",
    "notes": "Used test account: paciente.teste@saudesync-staging.com.br"
  }
]
```

---

## Quality Criteria

- `navigation-log.json` is a valid JSON array parseable without errors.
- Step 0 is always the environment validation entry.
- Every completed action has a corresponding screenshot filename in the log.
- No entry is missing any of the seven required fields.
- No production domain appears in any `url` field.

---

## Veto Conditions

The task must halt immediately and emit an error if any of the following occur:

- `app_url` resolves to a production domain (no staging/test indicator found).
- The browser cannot reach the app URL after one retry (network error, 5xx response).
- More than 3 consecutive steps are `BLOCKED` — indicates the tutorial definition may be incorrect or the environment is misconfigured.
- Any screenshot shows a page containing what appears to be real patient health data (names + dates + diagnoses visible together).
