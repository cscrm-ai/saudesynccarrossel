# Task: Build HTML Tutorial

**Agent:** Wanda Web
**Purpose:** Construct a complete, self-contained, interactive HTML tutorial page from the content manifest and screenshots folder.

---

## Input

- Content manifest (YAML) from Tico Tutorial
- Path to `assets/` folder containing `step-NN-*.png` screenshots from Navi Navegador

---

## Step 1: Document Skeleton

Open with the following structure — do not deviate:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[tutorial_title] — Saúde Sync</title>
  <style>
    /* All CSS goes here */
  </style>
</head>
<body>
  <!-- All HTML structure goes here -->
  <script>
    /* All JavaScript goes here */
  </script>
</body>
</html>
```

---

## Step 2: CSS Structure

Declare in this order inside `<style>`:

1. **`:root` variables** — All 6 brand variables plus font stacks:
```css
:root {
  --verde: #5BBB2F;
  --azul: #1A3A8F;
  --teal: #2BBFBF;
  --bg: #F8FAFB;
  --texto: #1A1A2E;
  --texto-sec: #6B7A8D;
  --borda: #E2E8F0;
  --font-title: 'Poppins', 'Segoe UI', system-ui, sans-serif;
  --font-body: 'Nunito Sans', 'Segoe UI', system-ui, sans-serif;
}
```

2. **Reset and base** — `box-sizing: border-box`, `margin: 0`, `padding: 0`, `body` background `var(--bg)`, color `var(--texto)`.

3. **Layout** — CSS Grid: `header` full width, `sidebar` fixed left column (~260px), `main` fills remaining width.

4. **Header** — Background `var(--azul)`, white text, Poppins font. Contains tutorial title and audience badge.

5. **Audience badge** — `medico`: background `var(--teal)`. `paciente`: background `var(--verde)`. White text, border-radius pill shape.

6. **Sidebar** — White background, border-right `var(--borda)`. Ordered list of step titles. Active step: background `var(--azul)`, white text. Inactive steps: `var(--texto-sec)`, hover `var(--borda)` background.

7. **Progress bar** — Full-width thin bar (4px height) at the top of main, background `var(--borda)`, filled portion `var(--verde)`.

8. **Step section** — Each `.step` hidden by default (`display: none`). Active step (`display: block`). Step number label in `var(--teal)`, Poppins, small uppercase. Step title h2 in `var(--azul)`, Poppins.

9. **Screenshot** — `max-width: 100%`, `border-radius: 8px`, `border: 1px solid var(--borda)`, `box-shadow` subtle.

10. **Tip block** — `border-left: 4px solid var(--teal)`, background tint of teal at 8% opacity, padding, Nunito Sans.

11. **Navigation** — Flexbox row, space-between. Buttons with `var(--azul)` background, white text, `border-radius: 6px`. Disabled state: `var(--borda)` background, `var(--texto-sec)` text, `cursor: not-allowed`.

12. **Focus states** — `outline: 2px solid var(--teal)` with `outline-offset: 2px` on all interactive elements. Never `outline: none`.

---

## Step 3: HTML Body Structure

```html
<header class="tutorial-header">
  <div class="header-content">
    <h1 class="tutorial-title">[tutorial_title]</h1>
    <span class="audience-badge audience-[audience]">[Médico | Paciente]</span>
    <span class="estimated-time">⏱ [estimated_time]</span>
  </div>
  <div class="progress-bar-container" role="progressbar"
       aria-valuenow="1" aria-valuemin="1" aria-valuemax="[step_count]"
       aria-label="Progresso do tutorial">
    <div class="progress-bar-fill" id="progress-fill"></div>
  </div>
</header>

<div class="tutorial-layout">
  <aside class="sidebar" aria-label="Índice do tutorial">
    <p class="sidebar-heading">[Passos do tutorial | Seu progresso]</p>
    <ol class="step-index" id="step-index">
      <!-- One <li> per step, generated from manifest -->
      <li class="step-index-item [active]" data-step="[N]">[step title]</li>
    </ol>
  </aside>

  <main class="tutorial-main" id="tutorial-main">
    <div aria-live="polite" aria-atomic="true" class="sr-only" id="step-announcement"></div>

    <!-- One <section> per step -->
    <section class="step" id="step-[N]" role="region" aria-labelledby="step-[N]-title">
      <span class="step-label">Passo [N]</span>
      <h2 class="step-title" id="step-[N]-title">[title]</h2>
      <figure class="step-figure">
        <img src="[screenshot]" alt="[alt text]" class="step-screenshot" />
      </figure>
      <p class="step-description">[description]</p>
      <!-- Only if tip is not null: -->
      <aside class="step-tip" role="note">
        <strong>Dica:</strong> [tip]
      </aside>
    </section>

    <nav class="tutorial-nav" aria-label="Navegação entre passos">
      <button id="btn-prev" class="nav-btn nav-btn--prev"
              aria-label="Ir para o passo anterior" disabled>← Anterior</button>
      <span class="nav-counter" id="nav-counter">Passo 1 de [step_count]</span>
      <button id="btn-next" class="nav-btn nav-btn--next"
              aria-label="Ir para o próximo passo">Próximo →</button>
    </nav>
  </main>
</div>
```

---

## Step 4: JavaScript

Embed a `<script>` block with:

- `currentStep` variable starting at `1`
- `totalSteps` constant equal to `step_count`
- `showStep(n)` function: hide all `.step` sections, show `#step-[n]`, update sidebar active state, update progress bar width `(n / totalSteps * 100)%`, update `#nav-counter` text, set `#step-announcement` text for screen readers, disable/enable Prev/Next buttons
- Event listeners on `#btn-prev` (decrement) and `#btn-next` (increment)
- `keydown` listener on `document` for `ArrowLeft` (prev) and `ArrowRight` (next)
- Sidebar `<li>` click listeners calling `showStep(n)`
- `showStep(1)` called on `DOMContentLoaded`

---

## Execution Checklist

- [ ] `lang="pt-BR"` on `<html>`
- [ ] All CSS variables declared in `:root`
- [ ] No hardcoded color hex values outside `:root`
- [ ] No external `<link>` or `<script src>` tags
- [ ] All image `src` attributes use relative paths starting with `assets/`
- [ ] Every `<img>` has a non-empty `alt` attribute
- [ ] Navigation buttons have `aria-label`
- [ ] Progress bar has `role="progressbar"` and `aria-value*` attributes
- [ ] `aria-live` region present for step announcements
- [ ] Tip blocks only rendered for steps where `tip` is not null
- [ ] First step has "Anterior" button disabled on load
- [ ] Last step has "Próximo" button disabled (or replaced with "Concluir")
