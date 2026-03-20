# Task: Finalize Content

**Agent:** Tico Tutorial
**Purpose:** Assemble the complete content manifest with tutorial metadata and all step data, ready for Wanda Web to consume.

---

## Input

The reviewed and corrected step content list from `adapt-for-audience.md`, plus the original YAML metadata from Pedro Passos (tutorial topic, audience, product area).

---

## Step 1: Generate Tutorial Metadata

Derive and populate the following fields:

| Field              | Rule                                                                                 |
|--------------------|--------------------------------------------------------------------------------------|
| `tutorial_id`      | Slug derived from title: lowercase, hyphens, no accents. E.g., "como-registrar-atendimento" |
| `tutorial_title`   | Must follow "Como + verb in infinitive". Verify one final time.                       |
| `audience`         | Copied from input: `medico` or `paciente`.                                            |
| `product_area`     | Copied from input metadata (e.g., "Consultas", "Prontuário", "Agenda").               |
| `step_count`       | Total number of steps in the manifest.                                                |
| `estimated_time`   | Calculate as: `step_count × 1.5` minutes, rounded up. Format: "X minutos".           |
| `created_date`     | Today's date in ISO 8601 format (YYYY-MM-DD).                                         |
| `version`          | Always `"1.0"` for first generation.                                                  |

---

## Step 2: Validate Step Sequence

Before writing the manifest:

- Confirm steps are numbered sequentially from 1 to N with no gaps.
- Confirm `step_count` in metadata equals the actual number of step entries.
- Confirm every step has all required fields: `step_number`, `title`, `description`, `tip`, `screenshot`.
- If any step is missing a required field, flag it explicitly: `[INCOMPLETE: step N missing field X]`.

---

## Step 3: Assemble the Manifest

Write the final manifest in YAML format:

```yaml
tutorial:
  tutorial_id: "como-[slug]"
  tutorial_title: "Como [verb] [object]"
  audience: "medico | paciente"
  product_area: "[area]"
  step_count: N
  estimated_time: "X minutos"
  created_date: "YYYY-MM-DD"
  version: "1.0"

steps:
  - step_number: 1
    title: "[Imperative verb + object]"
    description: "[Audience-appropriate description]"
    tip: "[Tip text or null]"
    screenshot: "assets/step-01-[slug].png"

  - step_number: 2
    title: "[Imperative verb + object]"
    description: "[Audience-appropriate description]"
    tip: null
    screenshot: "assets/step-02-[slug].png"

  # ... repeat for all steps
```

---

## Step 4: Final Content Quality Gate

Before outputting, run this final checklist:

- [ ] `tutorial_title` starts with "Como + verb in infinitive"
- [ ] `tutorial_id` is a valid URL slug (lowercase, hyphens only, no accents)
- [ ] `step_count` matches the actual number of entries in `steps:`
- [ ] `estimated_time` correctly calculated
- [ ] Every step title begins with an imperative verb
- [ ] No forbidden words anywhere in the manifest: "gestão", "ERP", "sistema", "simplesmente", "apenas"
- [ ] No clinical jargon in `paciente` tutorials (re-verify after full assembly)
- [ ] All `screenshot` values follow the pattern `assets/step-NN-[slug].png`
- [ ] `tip: null` is used (not empty string `""`) when no tip applies
- [ ] `version` is set to `"1.0"`

---

## Output

Pass the complete manifest to Wanda Web as the primary input for `build-html-tutorial.md`.

The manifest must be the only output of this task — no prose, no explanation, just the structured YAML block ready for programmatic consumption.
