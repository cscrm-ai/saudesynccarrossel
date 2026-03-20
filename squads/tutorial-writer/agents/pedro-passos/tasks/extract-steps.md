---
task_id: extract-steps
agent: pedro-passos
title: Extract Structured Step List
description: >
  Using the screenshot analyses and navigation log, filter the full action
  sequence to keep only user-relevant steps, structure them into a YAML
  step list, validate completeness, and emit the final extracted-steps.yaml
  ready for the downstream tutorial composer.
inputs:
  - screenshot_analyses: array — output from analyze-screenshots task
  - navigation_log: array — parsed contents of navigation-log.json
  - tutorial_definition: object — original flow definition (name, audience, expected step count)
outputs:
  - extracted-steps.yaml — structured YAML file with steps and metadata
tools:
  - Write (for extracted-steps.yaml)
---

# Task: Extract Structured Step List

## Process

### Step 1 — Merge Analyses with Log Entries
Join each screenshot analysis object with its corresponding navigation log entry on `step_number_original` / `step`. The merged record for each step contains: log action description, selector, URL, log status, and all analysis fields (element type, action type, page context, warning/tip evidence).

Separate out all log entries with `status: "BLOCKED"` into a `blocked_list`. These will populate `skipped_steps` in the output.

### Step 2 — Apply Relevance Filter
For each merged step record (excluding blocked), apply the relevance filter. A step passes the filter if ALL of the following are true:
  - The action was initiated by a user (not an automatic system redirect with no user decision involved).
  - The screenshot does not show a loading state as its primary content.
  - The step is not a retry of a previous step that already passed the filter (duplicates from WARNING retries are collapsed into the original step).

Steps that fail the filter are moved to `skipped_steps` with reason `"filtered: not user-relevant"`.

**Special case — informational screens:** Confirmation pages, success screens, and summary views pass the filter even if the user takes no action. They are kept as `element_type: informational`, `action: observe`.

### Step 3 — Construct YAML Steps
For each step that passed the filter, construct a YAML step block. Assign a clean sequential `step_number` starting from 1. Write the `label` in Portuguese, imperative second-person, describing the action concisely:
  - Use the log's action description as source material, but rewrite it in the correct voice.
  - Prefix with an action verb: "Clique em", "Preencha o campo", "Selecione", "Confirme", "Verifique".

Populate `warning` and `tip` from the analysis evidence fields: if `warning_evidence` is present, write a concise warning sentence. If `tip_evidence` is present, write a concise tip sentence. Both should be plain Portuguese, no jargon.

Set `review_needed: true` on any step where `element_type_confidence` was `low` or any required field is `unknown`.

### Step 4 — Validate Flow Completeness
Compare the number of extracted steps against the `expected_step_count` in the tutorial definition (if provided). If the extracted count is more than 20% lower than expected, add a `completeness_warning` to the output metadata. This signals that significant steps may have been lost to blocking or filtering and a human should review.

Also verify the flow has a logical start (a login or entry-point step) and a logical end (a confirmation, completion, or exit step). If either is missing, add a `structure_warning` to metadata.

### Step 5 — Emit YAML File
Compile the final YAML structure with three top-level keys: `metadata`, `steps`, and `skipped_steps`. Write to `{output_folder}/extracted-steps.yaml`. Log the summary: total extracted steps, total skipped, review flags raised, and any completeness or structure warnings.

---

## Output Format

```yaml
metadata:
  flow_name: string
  audience: medico | paciente
  extraction_date: ISO date string
  total_steps_extracted: number
  total_steps_skipped: number
  review_flags: number
  completeness_warning: string | null
  structure_warning: string | null

steps:
  - step_number: number
    label: string (Portuguese, imperative)
    element_type: string
    action: string
    screenshot: string
    page_context: string
    audience: medico | paciente
    warning: string | null
    tip: string | null
    review_needed: boolean

skipped_steps:
  - original_step: number
    reason: string
    screenshot: string | null
```

---

## Output Example

```yaml
metadata:
  flow_name: agendamento-consulta
  audience: paciente
  extraction_date: "2026-03-18"
  total_steps_extracted: 9
  total_steps_skipped: 3
  review_flags: 1
  completeness_warning: null
  structure_warning: null

steps:
  - step_number: 1
    label: "Clique em 'Entrar' para acessar o sistema"
    element_type: button
    action: click
    screenshot: step-01-click-entrar.png
    page_context: login
    audience: paciente
    warning: null
    tip: null
    review_needed: false

  - step_number: 2
    label: "Preencha o campo de e-mail"
    element_type: text_field
    action: fill
    screenshot: step-02-fill-email.png
    page_context: login
    audience: paciente
    warning: "Campo obrigatório"
    tip: null
    review_needed: false

  - step_number: 5
    label: "Selecione a especialidade desejada"
    element_type: dropdown
    action: select
    screenshot: step-05-select-specialty.png
    page_context: agendamento/nova-consulta
    audience: paciente
    warning: null
    tip: "Apenas especialidades disponíveis na sua cidade aparecem na lista"
    review_needed: false

skipped_steps:
  - original_step: 8
    reason: "BLOCKED — element not found in navigation log"
    screenshot: step-08-select-time.png
  - original_step: 10
    reason: "filtered: not user-relevant — automatic redirect, no user action"
    screenshot: step-10-loading.png
  - original_step: 11
    reason: "filtered: duplicate — retry of step 9 already captured"
    screenshot: step-11-retry-confirm.png
```

---

## Quality Criteria

- `extracted-steps.yaml` parses as valid YAML without errors.
- All steps are numbered sequentially starting from 1 with no gaps.
- Every step contains all required fields — no field is absent (nullable fields must be present and explicitly set to `null` if empty).
- Labels are in Portuguese, imperative form, beginning with an action verb.
- `skipped_steps` is present even when empty (`skipped_steps: []`).
- Total of `total_steps_extracted` + `total_steps_skipped` equals the count of log entries in `navigation-log.json` minus 1 (step-00 is excluded from processing).
- `metadata.review_flags` matches the actual count of steps with `review_needed: true`.

---

## Veto Conditions

Halt and return an error without writing the output file if:

- The merged dataset from analyses and log produces zero steps that pass the relevance filter (empty step list is not a valid output — it indicates a pipeline failure).
- The `screenshot_analyses` input array is empty or malformed.
- A YAML serialization error occurs — do not write partial or invalid YAML. Log the error and halt.
