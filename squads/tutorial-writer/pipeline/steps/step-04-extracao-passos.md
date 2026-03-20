---
type: agent
agent: pedro-passos
execution: subagent
inputFile: squads/tutorial-writer/pipeline/data/navigation-log.md
outputFile: squads/tutorial-writer/pipeline/data/step-list.yaml
---

# Extração e Estruturação dos Passos

## Context

The following data is available from previous steps:

- **`navigation-log.md`** — Contains session ID, audience, flow name, list of screenshots with filenames and short descriptions, and any navigation notes from Navi Navegador.
- **Screenshots** — Located at `squads/tutorial-writer/output/{session}/screenshots/step-NN-*.png`, where `{session}` is found in `navigation-log.md`.
- **`navigation-confirmation.md`** — Contains Caio's confirmation and any adjustment notes from step-03.

---

## Instructions

1. **Read `navigation-log.md`** to get the session ID, audience, flow name, and the list of screenshot filenames with descriptions.

2. **Load each screenshot** from `squads/tutorial-writer/output/{session}/screenshots/` in sequence order.

3. **Analyze each screenshot** to identify:
   - The primary UI element or action visible on screen
   - The user action required at this step (click, type, select, scroll, etc.)
   - Any form fields, buttons, or key interface elements present
   - Whether this is a transition screen (loading, confirmation, success) or an interactive screen

4. **Consolidate and deduplicate.** If two consecutive screenshots show the same state with trivial differences (e.g., hover state only), merge them into a single step.

5. **Generate `step-list.yaml`** with a structured entry for each step.

---

## Output Format

Save to `squads/tutorial-writer/pipeline/data/step-list.yaml`:

```yaml
meta:
  session: "{YYYY-MM-DD-HHMMSS}"
  audience: "{medicos|pacientes}"
  flow: "{flow_name}"
  total_steps: {N}

steps:
  - id: 1
    screenshot: "step-01-{slug}.png"
    raw_description: "{Description from navigation-log}"
    ui_context: "{What the screen shows — page title, section, modal name}"
    user_action: "{What the user must do at this step — verb phrase}"
    key_elements:
      - "{Element 1, e.g., 'Botão Novo Paciente'}"
      - "{Element 2, e.g., 'Campo Nome Completo'}"
    step_type: "{interactive|transition|confirmation}"

  - id: 2
    screenshot: "step-02-{slug}.png"
    raw_description: "{Description from navigation-log}"
    ui_context: "{What the screen shows}"
    user_action: "{What the user must do}"
    key_elements:
      - "{Element 1}"
    step_type: "{interactive|transition|confirmation}"
```

All fields are required for every step. `step_type` must be one of: `interactive`, `transition`, or `confirmation`.
