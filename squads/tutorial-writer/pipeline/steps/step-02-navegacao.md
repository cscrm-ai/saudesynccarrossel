---
type: agent
agent: navi-navegador
execution: subagent
inputFile: squads/tutorial-writer/pipeline/data/tutorial-selection.md
outputFile: squads/tutorial-writer/pipeline/data/navigation-log.md
---

# Navegação e Captura de Screenshots

## Context

The following data is available from the previous checkpoint (step-01):

- **`tutorial-selection.md`** — Contains:
  - `audience`: either `medicos` or `pacientes`
  - `flow_name`: the tutorial title selected by Caio (e.g., "Cadastro de novo paciente")
  - `app_url`: the base URL of the Saúde Sync test environment

Screenshots will be saved to: `squads/tutorial-writer/output/{session}/screenshots/`

Where `{session}` is a timestamp generated at the start of this step in `YYYY-MM-DD-HHMMSS` format. Store this session ID so downstream steps can locate the files.

---

## Instructions

1. **Read `tutorial-selection.md`** to extract `audience`, `flow_name`, and `app_url`.

2. **Open the Saúde Sync app** at `app_url` using the browser.

3. **Navigate the selected flow** (`flow_name`) from start to finish, following the natural user journey for the specified `audience`. Proceed step by step — do not skip screens.

4. **Capture a screenshot at every distinct step**, including:
   - Every page load or route change
   - Every modal, drawer, or dialog that opens
   - Every form before and after filling
   - Any confirmation or success screen

   Name each screenshot with a zero-padded sequence number and a short slug:
   ```
   step-01-{short-slug}.png
   step-02-{short-slug}.png
   ...
   ```
   Example: `step-01-tela-login.png`, `step-02-menu-principal.png`

5. **Save all screenshots** to:
   ```
   squads/tutorial-writer/output/{session}/screenshots/
   ```

6. **Generate `navigation-log.md`** and save it to:
   ```
   squads/tutorial-writer/pipeline/data/navigation-log.md
   ```

---

## Output Format

`navigation-log.md` must follow this exact structure:

```markdown
# Navigation Log

session: {YYYY-MM-DD-HHMMSS}
audience: {medicos|pacientes}
flow: {flow_name}
app_url: {app_url}
screenshots_path: squads/tutorial-writer/output/{session}/screenshots/
total_steps: {N}

## Steps Captured

| # | Filename | Description |
|---|----------|-------------|
| 1 | step-01-{slug}.png | {Brief description of what is shown} |
| 2 | step-02-{slug}.png | {Brief description of what is shown} |
| … | … | … |

## Notes

{Any navigation issues, skipped screens, or observations relevant to content creation.}
```

All fields are required. The `session` value must match the folder name used in `screenshots_path`.
