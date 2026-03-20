---
type: agent
agent: wanda-web
execution: inline
inputFile: squads/tutorial-writer/pipeline/data/content-manifest.yaml
outputFile: squads/tutorial-writer/output/{session}/tutorial.html
---

# Montagem do Tutorial HTML

## Context

The following data is available from previous steps:

- **`content-manifest.yaml`** — Full tutorial content: title, intro, all step titles, descriptions, tips, and screenshot filenames. Use `meta.session` to resolve screenshot paths.
- **Screenshots** — Located at `squads/tutorial-writer/output/{session}/screenshots/step-NN-*.png`. All images must be embedded or referenced with relative paths from the output folder.
- **Saúde Sync brand reference:**
  - Primary color: `#0EA5E9` (sky blue)
  - Secondary color: `#10B981` (emerald green)
  - Neutral background: `#F8FAFC`
  - Text primary: `#1E293B`
  - Text secondary: `#64748B`
  - Font: `Inter`, fallback `system-ui, sans-serif`
  - Border radius: `12px` for cards, `8px` for buttons
  - Audience badge — médicos: `#0EA5E9` / pacientes: `#10B981`

---

## Instructions

1. **Read `content-manifest.yaml`** to get the session ID, audience, title, intro, and all step content.

2. **Build a single self-contained `tutorial.html` file** that includes:

   ### Layout
   - **Sidebar** (left, fixed on desktop, collapsible on mobile): Lists all step titles as clickable navigation links. Highlights the currently active step. Shows a progress count ("Passo 3 de 8").
   - **Main content area** (right): Displays one step at a time with smooth scroll or JS-driven visibility. Each step shows: step number badge, step title, screenshot image, description paragraph, and tip block (if present).
   - **Header**: Tutorial title, audience badge (Médico or Paciente), and a Saúde Sync wordmark/logo placeholder.
   - **Progress bar**: Thin horizontal bar at the top showing completion percentage.
   - **Navigation buttons**: "Passo anterior" and "Próximo passo" at the bottom of each step.

   ### HTML requirements
   - Single HTML file — all CSS and JavaScript must be inline (`<style>` and `<script>` tags). No external CDN links.
   - Images referenced with relative paths: `assets/step-01-{slug}.png`
   - Responsive: must work on desktop (min 1024px) and mobile (320px+)
   - Accessible: use `alt` attributes on all images, semantic heading hierarchy (`<h1>`, `<h2>`, `<h3>`), ARIA labels on nav elements
   - Print-friendly: include a `@media print` CSS block that expands all steps and hides the sidebar and nav buttons

   ### JavaScript behavior
   - Step visibility: only the active step's content is visible at a time (others hidden with CSS class)
   - Sidebar links update the active step on click
   - "Próximo passo" and "Passo anterior" buttons navigate between steps
   - Progress bar updates on step change
   - On the last step, "Próximo passo" becomes "Concluir tutorial" and shows a completion message

   ### Branding
   - Apply Saúde Sync colors as specified above
   - Audience badge color: `#0EA5E9` for médicos, `#10B981` for pacientes
   - Step number badges use the primary color
   - Tip blocks use a light yellow background (`#FEFCE8`) with a left border (`#EAB308`)

3. **Save the completed HTML** to:
   ```
   squads/tutorial-writer/output/{session}/tutorial.html
   ```

---

## Output Format

A single valid HTML5 file saved at `squads/tutorial-writer/output/{session}/tutorial.html`.

The file must:
- Pass basic HTML5 validity (no unclosed tags, no duplicate IDs)
- Reference all screenshots using relative paths of the form `assets/step-NN-{slug}.png`
- Include `<!-- tutorial-writer: generated -->` as the first HTML comment
- Include a `<meta name="tutorial-session" content="{session}">` tag in the `<head>`
- Include a `<meta name="tutorial-audience" content="{medicos|pacientes}">` tag in the `<head>`
