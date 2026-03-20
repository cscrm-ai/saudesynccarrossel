# Task: Organize and Save Tutorial Files

## Purpose

Receive the completed HTML tutorial and its screenshot assets, build the correct output folder structure, save all files, validate every relative path inside the HTML, and confirm that the tutorial is accessible offline.

---

## Inputs

| Source | File | Description |
|--------|------|-------------|
| Wanda Web (step-06) | `tutorial.html` | Fully assembled, self-contained HTML tutorial |
| Tico Tutorial (step-05) | `content-manifest.yaml` | Tutorial metadata: title, audience, step list |
| Navi Navegador (step-02) | `output/{session}/screenshots/step-NN-*.png` | All screenshot assets |

---

## Steps

### 1. Read metadata from `content-manifest.yaml`

Extract:
- `title` — used to generate the kebab-case folder name
- `audience` — either `medicos` or `pacientes`
- `step_count` — used for asset count validation

Convert `title` to kebab-case:
- Lowercase all characters
- Replace spaces with hyphens
- Remove or transliterate special characters (ã→a, ç→c, é→e, etc.)
- Strip any non-alphanumeric characters except hyphens

Example: `"Criação de Prontuário"` → `criacao-de-prontuario`

### 2. Generate the output path

Construct the session timestamp in `YYYY-MM-DD-HHMMSS` format using the current date and time.

Full output path pattern:
```
squads/tutorial-writer/output/{YYYY-MM-DD-HHMMSS}/{audience}/{kebab-title}/
```

Check if this path already exists. If it does, append `-v2` to the kebab-title segment. Note this in the final report.

### 3. Create the folder structure

Create the following directories in order:

```
output/{timestamp}/
output/{timestamp}/{audience}/
output/{timestamp}/{audience}/{kebab-title}/
output/{timestamp}/{audience}/{kebab-title}/assets/
```

Confirm each directory exists after creation before proceeding to the next step.

### 4. Save `tutorial.html` as `index.html`

Write `tutorial.html` to:
```
output/{timestamp}/{audience}/{kebab-title}/index.html
```

After writing:
- Verify the file exists at the target path
- Verify file size is greater than 0 bytes
- Do not proceed to asset copy if this step fails

### 5. Save screenshot assets

Copy all `step-NN-*.png` files from `output/{session}/screenshots/` into:
```
output/{timestamp}/{audience}/{kebab-title}/assets/
```

Preserve original filenames exactly. After copying each file, confirm it exists at the destination.

### 6. Validate all relative paths in `index.html`

Scan `index.html` for all occurrences of:
- `src="..."` attributes on `<img>` tags
- `href="..."` attributes on `<link>` tags
- `url(...)` in inline CSS

For each reference:
- Confirm the path is relative (not absolute, not a data URI, not an external URL)
- Resolve the path relative to `output/{timestamp}/{audience}/{kebab-title}/`
- Confirm the file exists at the resolved location

If any reference is broken:
- Record the filename and the line number in `index.html`
- Halt and report the error — do not produce a success confirmation

### 7. Produce the confirmation report

Write a plain-text confirmation block to be passed to step-09:

```
Tutorial salvo com sucesso.

Caminho: squads/tutorial-writer/output/{timestamp}/{audience}/{kebab-title}/index.html
Público: {audience}
Passos: {step_count}
Assets: {asset_count} arquivos em assets/
Tamanho total: {total_size}
Caminhos relativos validados: OK
```

Pass this report to the step-09-aprovacao-final checkpoint.

---

## Validation Checklist

- [ ] `index.html` exists and is non-empty
- [ ] All `step-NN-*.png` assets are present in `assets/`
- [ ] No broken relative paths in `index.html`
- [ ] Folder name is lowercase kebab-case, ASCII-safe
- [ ] Audience folder is either `medicos` or `pacientes`
- [ ] Confirmation report generated and available for step-09
