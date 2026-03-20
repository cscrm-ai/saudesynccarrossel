---
task_id: capture-screenshots
agent: navi-navegador
title: Capture Clean Screenshots
description: >
  After each navigation action is prepared (pre-action state), capture a
  clean, stable screenshot at 1440x900 viewport, save it to the output
  folder with the correct numbered filename, and verify the image quality
  before confirming capture.
inputs:
  - step_number: number — current step counter (zero-padded to 2 digits)
  - action_description: string — kebab-case label for the filename
  - output_folder: string — absolute path to save screenshots
outputs:
  - screenshot_file: string — filename of the saved screenshot (e.g., step-03-click-login-button.png)
  - capture_status: enum[success, warning, failed]
tools:
  - browser_take_screenshot
  - browser_wait_for
  - browser_snapshot
  - browser_evaluate
---

# Task: Capture Clean Screenshots

## Process

### Step 1 — Confirm Page Stability
Before calling `browser_take_screenshot`, use `browser_wait_for` to verify the page is in a stable, actionable state. A stable state means:
  - No visible loading spinners (elements matching common spinner selectors are absent or hidden).
  - No skeleton screens — content areas are populated with real UI elements.
  - The primary action target for this step is visible in the viewport.

If stability cannot be confirmed within 5 seconds, wait an additional 3 seconds and take the screenshot anyway, marking `capture_status: warning` and noting "possible loading state" in the return value.

### Step 2 — Compose the Filename
Construct the filename using the pattern: `step-NN-action-description.png`
  - `NN` is the step number zero-padded to 2 digits (e.g., 01, 02, 09, 10).
  - `action-description` is the `action_description` input converted to lowercase kebab-case, truncated to 40 characters if necessary.
  - Example: step number 3, action "click login button" → `step-03-click-login-button.png`

### Step 3 — Take the Screenshot
Call `browser_take_screenshot` with the full output path (`output_folder/filename`). Ensure the viewport is confirmed as 1440x900 before capture. Use `browser_evaluate` to check `window.innerWidth` and `window.innerHeight` if there is any doubt about the current viewport dimensions.

### Step 4 — Verify the Screenshot
After capture, use `browser_snapshot` to confirm the current DOM state matches what the screenshot should show (the target element is present and visible). If the snapshot reveals an unexpected state (modal closed unexpectedly, page changed mid-capture), log a `WARNING` and retake the screenshot once. If the second capture also shows an unexpected state, log `capture_status: failed` with details.

### Step 5 — Return Capture Confirmation
Return the `screenshot_file` filename and `capture_status` to the `navigate-flow` task so it can be recorded in the navigation log entry for this step.

---

## Output Format

A capture confirmation object returned to the calling task:

```json
{
  "screenshot_file": "step-05-click-agendar-consulta.png",
  "capture_status": "success",
  "viewport_confirmed": "1440x900",
  "notes": null
}
```

---

## Output Example

Successful capture during a flow:

```json
{
  "screenshot_file": "step-03-fill-cpf-field.png",
  "capture_status": "success",
  "viewport_confirmed": "1440x900",
  "notes": null
}
```

Capture with stability warning:

```json
{
  "screenshot_file": "step-06-submit-form.png",
  "capture_status": "warning",
  "viewport_confirmed": "1440x900",
  "notes": "Possible loading state at capture — spinner selector was present but hidden. Screenshot taken after additional 3s wait."
}
```

---

## Quality Criteria

- Every screenshot file exists at the specified output path after task completion.
- All screenshots are exactly 1440x900 pixels.
- Screenshot filenames strictly match `step-NN-action-description.png` with no uppercase, no spaces.
- No screenshot contains a full-page loading spinner or skeleton screen as the primary visible element.
- Capture status is always returned — never null or undefined.
- Step-00 (`step-00-initial-state.png`) is always the first file created in the output folder.

---

## Veto Conditions

The capture task must return `capture_status: failed` and prevent the corresponding navigation-log step from being marked `completed` if:

- The screenshot file is not created at the target path (write failure, disk issue).
- Two consecutive capture attempts show an unexpected page state (wrong URL, error screen, blank white page).
- The viewport dimensions returned by `browser_evaluate` do not match 1440x900 and cannot be corrected.
