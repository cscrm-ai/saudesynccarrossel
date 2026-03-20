# Task: Adapt for Audience

**Agent:** Tico Tutorial
**Purpose:** Review all written step content and ensure it fully conforms to the target audience's vocabulary, tone, and depth requirements.

---

## Input

The step content draft produced by `write-step-content.md`, plus the `audience` field from the tutorial metadata (`medico` or `paciente`).

---

## Audience Rules: `paciente`

### Vocabulary Transformations (mandatory)

Replace all clinical terms with patient-friendly equivalents:

| Clinical term      | Patient-friendly replacement         |
|--------------------|--------------------------------------|
| prontuário         | seu histórico de saúde               |
| prescrição         | receita médica                       |
| agendamento        | sua consulta                         |
| triagem            | avaliação inicial                    |
| anamnese           | conversa com seu médico              |
| CID                | código da sua doença (if mentioned)  |
| SOAP               | (remove entirely)                    |
| atendimento        | consulta                             |
| laudo              | resultado do exame                   |
| elegibilidade      | cobertura do seu plano               |

### Tone Checks

- [ ] Every step description connects the action to the patient's personal health, convenience, or safety.
- [ ] No step sounds bureaucratic or administrative. Replace transactional language with care-focused language.
- [ ] Tone is warm and reassuring — not condescending. Do not over-explain obvious actions.
- [ ] No sentence longer than 25 words.
- [ ] Verify no forbidden words remain: "gestão", "ERP", "sistema", "simplesmente", "apenas".

### Depth Checks

- [ ] Each description answers: "What does this step do for me as a patient?"
- [ ] No step assumes prior knowledge of healthcare workflows or digital health platforms.
- [ ] Tips for `paciente` use the same plain language standards.

---

## Audience Rules: `medico`

### Vocabulary Standards

- Technical terms are permitted and expected: CID, prontuário, prescrição, SOAP, anamnese, laudo, triagem.
- Abbreviations used in clinical practice are acceptable (e.g., "PA", "FC", "Sat O2") when they relate directly to the step.
- Do not use informal synonyms for clinical terms. "Prontuário" is correct — "histórico do paciente" is acceptable but less precise.

### Tone Checks

- [ ] Language is direct, objective, and professional.
- [ ] No motivational or emotional language ("Parabéns!", "Ótimo trabalho!").
- [ ] No hand-holding for standard digital actions (logging in, clicking a save button).
- [ ] Each description focuses on what data is captured, what action is recorded, or what clinical control the step provides.
- [ ] No sentence longer than 20 words.
- [ ] Verify no forbidden words: "gestão", "ERP", "sistema", "simplesmente", "apenas".

### Depth Checks

- [ ] Descriptions assume the reader is a trained clinical professional.
- [ ] Tips for `medico` highlight efficiency gains, edge cases in clinical data entry, or integration behaviors.

---

## Cross-Audience Rules (apply to both)

- Tutorial title must follow "Como + verb in infinitive" — verify this has not been altered.
- All step titles must still begin with an imperative verb after this review pass.
- Sentence count limits must be preserved after any rewrites.
- `tip: null` must remain null if no new information was available. Do not add tips during this pass.

---

## Rewrite Protocol

When a sentence violates audience rules:

1. Identify the violation (wrong vocabulary, wrong tone, wrong depth, or forbidden word).
2. Rewrite only the offending sentence — preserve the rest of the description.
3. Confirm the rewritten sentence still describes the correct action and outcome.
4. Do not change the `step_number` or `screenshot` fields.

---

## Output

Return the full step content list, with all corrections applied in place. The structure is identical to the input — this task modifies content, not schema.

Pass the corrected content to `finalize-content.md`.

---

## Execution Checklist

- [ ] All clinical terms replaced with patient-friendly equivalents (if `paciente`)
- [ ] All descriptions pass tone checks for the target audience
- [ ] No forbidden words in any field
- [ ] Tutorial title still follows "Como + verb"
- [ ] All step titles still begin with imperative verbs
- [ ] Sentence count limits respected after rewrites
- [ ] Tips unchanged from the write-step-content output (no new tips added, no existing valid tips removed)
