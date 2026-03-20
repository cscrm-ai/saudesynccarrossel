---
task_id: analyze-screenshots
agent: pedro-passos
title: Analyze Screenshots for UI Elements
description: >
  Load each screenshot from the Navi Navegador output folder, visually
  identify the primary interactive UI element and action context, determine
  the element type, and note any warnings or tips that are directly
  evidenced by visible UI indicators.
inputs:
  - output_folder: string — path to folder containing Navi's screenshots
  - navigation_log: array — parsed contents of navigation-log.json
outputs:
  - screenshot_analyses: array — one analysis object per screenshot
tools:
  - Read (for navigation-log.json)
  - Visual inspection of each screenshot file
---

# Task: Analyze Screenshots for UI Elements

## Process

### Step 1 — Build the Screenshot Index
Read `navigation-log.json` from `output_folder`. Build a lookup table mapping each screenshot filename to its corresponding log entry (step number, action description, selector, status, notes). This context from the log informs visual analysis — the selector gives a strong signal about element type, and the action description confirms what the user is doing.

Skip any log entry with `status: "BLOCKED"` — its screenshot will be excluded and listed in `skipped_steps` at extraction time.

### Step 2 — Inspect Each Screenshot
For each screenshot (in step-number order, starting from step-01 — skip step-00 initial state), perform visual analysis:

  a. **Identify the primary interactive element.** Look for the element most relevant to the action logged: it may be focused (highlighted border), button-shaped, a form field with a cursor, a dropdown with an arrow, etc. Use the selector from the log entry as confirmation.

  b. **Classify the element type.** Assign one of: `button`, `text_field`, `dropdown`, `checkbox`, `radio`, `link`, `toggle`, `date_picker`, `file_upload`, `icon_action`, `informational`, or `other`. If unsure, assign the closest match and set `element_type_confidence: low`.

  c. **Determine the action type.** Map the action to one of: `click`, `fill`, `select`, `check`, `toggle`, `upload`, `press_key`, `scroll`, or `observe` (for informational steps).

  d. **Identify the page context.** Note which section of Saúde Sync is shown. Use URL path from the log entry and visual cues (header text, breadcrumb, page title visible in screenshot) to label context (e.g., `login`, `dashboard`, `agendamento/nova-consulta`, `prontuario/visualizar`, `cadastro/dados-pessoais`).

### Step 3 — Extract Warnings and Tips
Scan the screenshot for visible UI indicators that signal constraints or guidance:

  - **Warning triggers:** asterisk (*) next to a label, text containing "obrigatório", "required", a red border or error state on a field, a lock icon.
  - **Tip triggers:** an info icon (i), a tooltip visible on screen, helper text below a field, a character counter, a format hint (e.g., "DD/MM/AAAA" in a date field placeholder), a CPF/CNPJ mask pattern in a field.

  Only populate `warning` or `tip` when the trigger is directly observable in the screenshot. Do not infer from general knowledge of the platform.

---

## Output Format

An array of analysis objects, one per analyzed screenshot:

```json
{
  "screenshot": "step-04-select-specialty.png",
  "step_number_original": 4,
  "element_type": "dropdown",
  "element_type_confidence": "high",
  "action_type": "select",
  "page_context": "agendamento/nova-consulta",
  "warning_evidence": null,
  "tip_evidence": "Helper text visible: 'Apenas especialidades disponíveis na sua cidade'",
  "notes": null
}
```

---

## Output Example

Full analysis for three screenshots:

```json
[
  {
    "screenshot": "step-02-fill-email.png",
    "step_number_original": 2,
    "element_type": "text_field",
    "element_type_confidence": "high",
    "action_type": "fill",
    "page_context": "login",
    "warning_evidence": "Asterisk (*) visible next to 'E-mail' label",
    "tip_evidence": null,
    "notes": null
  },
  {
    "screenshot": "step-05-select-date.png",
    "step_number_original": 5,
    "element_type": "date_picker",
    "element_type_confidence": "high",
    "action_type": "click",
    "page_context": "agendamento/nova-consulta",
    "warning_evidence": null,
    "tip_evidence": "Placeholder format 'DD/MM/AAAA' visible in field",
    "notes": null
  },
  {
    "screenshot": "step-11-confirmation.png",
    "step_number_original": 11,
    "element_type": "informational",
    "element_type_confidence": "high",
    "action_type": "observe",
    "page_context": "agendamento/confirmacao",
    "warning_evidence": null,
    "tip_evidence": "Text visible: 'Você receberá um e-mail de confirmação em até 5 minutos'",
    "notes": "No interactive element — confirmation screen only"
  }
]
```

---

## Quality Criteria

- One analysis object exists for every screenshot except `step-00-initial-state.png` and BLOCKED steps.
- Every object contains all required fields with no nulls except `warning_evidence`, `tip_evidence`, and `notes` (which are nullable).
- `element_type` is always one of the defined classification values — never free text.
- `element_type_confidence` is always set: `high`, `medium`, or `low`.
- `warning_evidence` and `tip_evidence` contain a description of the specific visual indicator observed — not just `true` or generic statements.
- Analysis objects are in step-number order (ascending by `step_number_original`).

---

## Veto Conditions

Halt analysis and return an error if:

- `navigation-log.json` is missing from `output_folder` or cannot be parsed as valid JSON.
- The output folder contains zero screenshots (excluding step-00).
- More than 50% of screenshots show loading states or blank pages — indicates Navi's run may have failed and the input is not usable.
