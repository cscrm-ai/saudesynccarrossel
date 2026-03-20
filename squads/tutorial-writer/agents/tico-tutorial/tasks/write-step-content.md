# Task: Write Step Content

**Agent:** Tico Tutorial
**Purpose:** For each step in the input YAML, produce a step title and description following Saúde Sync content rules.

---

## Input

A YAML step list from Pedro Passos with the following structure per step:

```yaml
- step_number: 1
  action_type: tap | click | input | select | confirm | wait
  screen_description: "Brief description of what is visible on screen"
  audience: medico | paciente
  screenshot: "step-01-nome-da-tela.png"
```

---

## Rules for Step Titles

Titles must be 3–6 words. Always begin with an imperative verb matched to the `action_type`:

| action_type | Required verb |
|-------------|---------------|
| tap         | Toque em      |
| click       | Clique em     |
| input       | Digite        |
| select      | Selecione     |
| confirm     | Confirme      |
| wait        | Aguarde       |

The verb is followed by the name of the UI element or the object of the action. Example: "Toque em Confirmar Consulta", "Digite seu e-mail", "Selecione a data".

Never write a title that is a noun phrase alone ("Tela de login", "Confirmação"). Every title must be a command.

---

## Rules for Step Descriptions

**Core rule:** Describe what the action achieves, not what the interface looks like.

- Do NOT write: "A tela exibe um botão azul chamado 'Entrar'."
- DO write: "Ao tocar em Entrar, você acessa sua conta e vê seu painel de informações de saúde."

**For `medico` audience:**
- Maximum 2 sentences.
- Focus on clinical outcome, data saved, or workflow efficiency.
- Use technical terms appropriate to the clinical context (CID, prontuário, prescrição, SOAP).

**For `paciente` audience:**
- Maximum 3 sentences.
- Connect the step to a personal health benefit or practical outcome.
- Use plain language: "seu histórico de saúde" (not "prontuário"), "receita médica" (not "prescrição"), "sua consulta" (not "agendamento").
- At least one sentence should explain why this step matters for the patient.

---

## Rules for Tips

Add a `tip` field only when one of these conditions is true:

1. There is a common user error at this step that is not obvious from the description.
2. There is a faster alternative method to complete the action.
3. There is a prerequisite that must be true for the step to work.

If none of these apply, set `tip: null`. Never write a tip that restates the description.

Tips follow the same audience vocabulary rules as descriptions.

---

## Output Format

For each step, produce:

```yaml
- step_number: [N]
  title: "[Imperative verb + object]"
  description: "[Interpretive description, audience-appropriate]"
  tip: "[Contextual tip or null]"
  screenshot: "[filename from input]"
```

Preserve the original `step_number` and `screenshot` values from the input. Do not renumber steps.

---

## Execution Checklist

Before passing output to the next task, verify:

- [ ] Every title starts with an imperative verb
- [ ] No title exceeds 6 words
- [ ] No description contains forbidden words: "gestão", "ERP", "sistema", "simplesmente", "apenas"
- [ ] `medico` descriptions: 2 sentences max
- [ ] `paciente` descriptions: 3 sentences max
- [ ] Tips are only present when genuinely informative
- [ ] `tip: null` is explicit (not an empty string) when no tip applies
- [ ] All original `screenshot` filenames preserved unchanged
