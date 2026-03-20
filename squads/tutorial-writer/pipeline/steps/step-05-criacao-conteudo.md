---
type: agent
agent: tico-tutorial
execution: inline
inputFile: squads/tutorial-writer/pipeline/data/step-list.yaml
outputFile: squads/tutorial-writer/pipeline/data/content-manifest.yaml
---

# Criação de Conteúdo do Tutorial

## Context

The following data is available from previous steps:

- **`step-list.yaml`** — Structured list of all tutorial steps from Pedro Passos, including screenshot filenames, UI context, user actions, and key elements.
- **`tutorial-selection.md`** — Contains `audience` (medicos or pacientes) and `flow_name` — use this to calibrate tone and vocabulary.

The tutorial must be written in **Brazilian Portuguese**, adapted to the selected audience:
- **Médicos:** professional tone, clinical terminology acceptable, assume familiarity with healthcare systems
- **Pacientes:** plain language, warm and encouraging tone, avoid jargon, use simple verbs and short sentences

---

## Instructions

1. **Read `step-list.yaml`** to get the full list of steps, their UI context, user actions, and key elements.

2. **Read `tutorial-selection.md`** to confirm the audience and flow name. Use these to set the overall tone and title.

3. **Write the tutorial title** — a clear, action-oriented title in Portuguese.
   - Example for médicos: `"Como cadastrar um novo paciente no Saúde Sync"`
   - Example for pacientes: `"Como registrar sua pressão arterial no Saúde Sync"`

4. **Write a short introduction** (2–3 sentences) explaining what the user will accomplish by following this tutorial.

5. **For each step in `step-list.yaml`**, write:
   - `title`: A concise step title (3–7 words), starting with a verb
     - Médicos: `"Clique em 'Novo Paciente'"`, `"Preencha os dados do paciente"`
     - Pacientes: `"Toque em 'Registrar Pressão'"`, `"Digite seu valor de pressão"`
   - `description`: 1–3 sentences explaining what to do and why. Match the tone for the audience. Highlight key UI elements mentioned in `key_elements`.
   - `tip` (optional): A short contextual tip if there is something worth calling attention to (e.g., a common mistake, a shortcut, a clarification).

6. **Skip or merge** any steps with `step_type: transition` that have no user action — or fold them into the preceding or following step's description.

7. **Generate `content-manifest.yaml`**.

---

## Output Format

Save to `squads/tutorial-writer/pipeline/data/content-manifest.yaml`:

```yaml
meta:
  session: "{YYYY-MM-DD-HHMMSS}"
  audience: "{medicos|pacientes}"
  flow: "{flow_name}"
  title: "{Full tutorial title in Portuguese}"
  intro: "{2–3 sentence introduction in Portuguese}"
  total_steps: {N}
  language: "pt-BR"

steps:
  - id: 1
    screenshot: "step-01-{slug}.png"
    title: "{Step title — verb phrase in Portuguese}"
    description: "{1–3 sentence description in Portuguese}"
    tip: "{Optional tip, or leave empty string}"

  - id: 2
    screenshot: "step-02-{slug}.png"
    title: "{Step title}"
    description: "{Description}"
    tip: ""
```

`tip` must always be present — use an empty string `""` if there is no tip for that step. All text fields must be in Brazilian Portuguese.
