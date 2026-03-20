---
type: agent
agent: sara-save
execution: inline
inputFile: squads/tutorial-writer/pipeline/data/content-manifest.yaml
outputFile: squads/tutorial-writer/pipeline/data/save-confirmation.md
---

# Salvar Tutorial

## Context

Caio has approved the tutorial content in step-07. The following data is now ready for final saving:

- **`content-manifest.yaml`** — Tutorial metadata: `title`, `audience`, `session`, `total_steps`, list of steps with screenshot filenames.
- **`tutorial.html`** — Assembled HTML file located at `squads/tutorial-writer/output/{session}/tutorial.html`.
- **Screenshots** — Located at `squads/tutorial-writer/output/{session}/screenshots/step-NN-*.png`.

The `session` value (timestamp) is found in `content-manifest.yaml` under `meta.session`.

---

## Instructions

Execute the full file organization and saving workflow as defined in Sara Save's task file (`tasks/organize-files.md`):

1. **Read `content-manifest.yaml`** to extract `title`, `audience`, and `session`.

2. **Derive the output path:**
   - Convert `title` to ASCII kebab-case
   - Generate a new timestamp for the final output folder (`YYYY-MM-DD-HHMMSS`)
   - Build path: `squads/tutorial-writer/output/{new-timestamp}/{audience}/{kebab-title}/`

3. **Create the folder structure:**
   ```
   squads/tutorial-writer/output/{new-timestamp}/{audience}/{kebab-title}/
   squads/tutorial-writer/output/{new-timestamp}/{audience}/{kebab-title}/assets/
   ```

4. **Save `tutorial.html`** → `index.html` in the target folder.

5. **Copy all screenshots** from `output/{session}/screenshots/` → `output/{new-timestamp}/{audience}/{kebab-title}/assets/`.

6. **Validate all relative paths** in `index.html` — confirm every `assets/step-NN-*.png` reference resolves to an existing file.

7. **Write `save-confirmation.md`** to `squads/tutorial-writer/pipeline/data/save-confirmation.md` with the final confirmation report.

---

## Output Format

`save-confirmation.md` must contain:

```markdown
# Save Confirmation

status: success
timestamp: {new-timestamp}
audience: {medicos|pacientes}
flow: {flow_name}
title: {tutorial title}

## Final Path

squads/tutorial-writer/output/{new-timestamp}/{audience}/{kebab-title}/index.html

## Assets

total_assets: {N}
assets_validated: true

## Checklist

- [x] index.html saved and non-empty
- [x] All assets copied to assets/
- [x] All relative paths in index.html validated
- [x] Folder name is ASCII kebab-case
- [x] Audience folder is correct
```

If any validation fails, set `status: error` and add an `## Errors` section describing what failed before passing to the next step.
