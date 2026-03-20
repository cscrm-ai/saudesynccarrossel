# Task: Optimize Page

**Agent:** Wanda Web
**Purpose:** Review the generated HTML tutorial for offline functionality, accessibility compliance, image path integrity, keyboard navigation, and cross-browser compatibility. Produce the final optimized HTML file.

---

## Input

The raw HTML output from `build-html-tutorial.md`.

---

## Review Area 1: Offline Functionality

Verify that the page works correctly when opened by double-clicking the `.html` file from a file explorer (no local server).

- [ ] No `<link rel="stylesheet" href="...">` pointing to an external URL
- [ ] No `<script src="...">` pointing to an external URL
- [ ] No `@import url(...)` inside `<style>` pointing to an external URL
- [ ] All image paths are relative and match the pattern `assets/step-NN-*.png`
- [ ] No `fetch()` or `XMLHttpRequest` calls in JavaScript (would fail without a server)
- [ ] Page renders with a static `file://` protocol — test mentally by tracing all resource references

If any external resource is found: inline it or replace with a system font fallback. External resources are a blocking defect.

---

## Review Area 2: Accessibility (WCAG 2.1 AA)

### Images
- [ ] Every `<img>` has an `alt` attribute
- [ ] `alt` text is descriptive: "Captura de tela do passo N: [what is shown]" — not empty, not "image", not the filename
- [ ] Decorative images (if any) use `alt=""`

### Keyboard Navigation
- [ ] Tab order follows logical reading order: header → sidebar → main content → navigation
- [ ] "Anterior" and "Próximo" buttons are reachable via Tab
- [ ] Sidebar step items are clickable/activatable via keyboard (Enter or Space)
- [ ] ArrowLeft / ArrowRight keyboard shortcuts work for step navigation
- [ ] No keyboard trap: user can always Tab out of any focusable element

### Focus Visibility
- [ ] All focusable elements show a visible focus ring
- [ ] Focus ring uses `outline: 2px solid var(--teal)` — never `outline: none` or `outline: 0`

### Color Contrast
- [ ] Body text (`var(--texto)` on `var(--bg)`): #1A1A2E on #F8FAFB — verify passes 4.5:1
- [ ] Secondary text (`var(--texto-sec)` on `var(--bg)`): check and adjust size if below threshold
- [ ] White text on `var(--azul)` (#1A3A8F): verify passes 4.5:1
- [ ] Audience badge text: white on `var(--verde)` or `var(--teal)` — verify passes 3:1 for large text

### Semantic Structure
- [ ] `<html lang="pt-BR">` present
- [ ] One `<h1>` only (the tutorial title in the header)
- [ ] Step titles use `<h2>` — no skipped heading levels
- [ ] `<main>` landmark present
- [ ] `<aside>` used for sidebar and tip blocks
- [ ] `<nav>` used for navigation buttons with `aria-label`
- [ ] `aria-live="polite"` region announces step changes to screen readers

### ARIA
- [ ] Progress bar has `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] Disabled buttons have `disabled` attribute (not just `aria-disabled`)
- [ ] No `aria-hidden="true"` on content that should be accessible

---

## Review Area 3: Image Path Integrity

- [ ] Count the number of `<img src="assets/...">` references in the HTML
- [ ] Confirm this count equals `step_count` from the tutorial metadata
- [ ] Confirm each filename follows the pattern: `step-NN-[slug].png` where NN is zero-padded (01, 02, ..., 10, 11)
- [ ] No step is missing a screenshot reference
- [ ] No screenshot filename is duplicated

If a filename mismatch is found: correct it to match the actual filename from the `assets/` folder exactly.

---

## Review Area 4: JavaScript Logic

- [ ] `showStep(1)` is called on `DOMContentLoaded` — first step is visible on load
- [ ] "Anterior" button is `disabled` on step 1
- [ ] "Próximo" button is `disabled` on the last step (or changes to "Concluir")
- [ ] Clicking a sidebar item calls `showStep(n)` correctly
- [ ] Keyboard arrows do not trigger navigation when focus is inside a text input (if any input elements exist on the page)
- [ ] Progress bar fills correctly: at step 1 it shows 1/N, at the last step it shows 100%
- [ ] `#step-announcement` text is updated on every step change (for screen readers)
- [ ] No JavaScript errors are produced by tracing the logic manually

---

## Review Area 5: Cross-Browser Compatibility

- [ ] No CSS features requiring vendor prefixes that are not widely supported (avoid `-webkit-` only properties unless adding the unprefixed version too)
- [ ] CSS Grid layout has a Flexbox fallback or uses only broadly supported Grid syntax
- [ ] `const`, `let`, arrow functions, and `addEventListener` are used (no IE-era syntax needed — modern browsers only)
- [ ] No `document.write()` usage
- [ ] `<meta name="viewport">` present for mobile rendering

---

## Final Output

After all review areas pass, write the final `.html` file to:

```
squads/tutorial-writer/output/[tutorial_id].html
```

Where `tutorial_id` is the slug from the content manifest (e.g., `como-registrar-atendimento.html`).

The file must be the complete, self-contained HTML — not a diff, not a patch, but the entire final document.

---

## Execution Checklist Summary

- [ ] Zero external resource references
- [ ] All images have descriptive `alt` text
- [ ] Full keyboard navigation functional
- [ ] Focus rings visible on all interactive elements
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Semantic HTML structure correct
- [ ] All ARIA attributes present and accurate
- [ ] Image path count matches step count
- [ ] JavaScript logic verified (step 1 active on load, first/last button states correct)
- [ ] Cross-browser compatible syntax used throughout
- [ ] Output file written to `squads/tutorial-writer/output/[tutorial_id].html`
