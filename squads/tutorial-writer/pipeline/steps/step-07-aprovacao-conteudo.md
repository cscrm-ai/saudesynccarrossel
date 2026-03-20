---
type: checkpoint
outputFile: squads/tutorial-writer/pipeline/data/content-approval.md
onReject: step-05-criacao-conteudo
---

# Aprovação do Conteúdo do Tutorial

Tico Tutorial e Wanda Web concluíram a criação do tutorial. Antes de salvar os arquivos definitivamente, revise o conteúdo abaixo.

> **Esta é uma etapa obrigatória.** O tutorial só será salvo após sua aprovação explícita.

---

## Resumo do tutorial gerado

> **Título:** {tutorial title from content-manifest.yaml}
> **Público:** {audience}
> **Número de passos:** {total_steps}
> **Sessão:** `squads/tutorial-writer/output/{session}/`

### Passos do tutorial

{Render the numbered list of step titles from content-manifest.yaml}

1. {step 1 title}
2. {step 2 title}
3. {step 3 title}
4. …

---

## 1. Aprovar o conteúdo do tutorial?

Revise os títulos dos passos acima. Se precisar revisar o HTML completo, ele está disponível em `squads/tutorial-writer/output/{session}/tutorial.html`.

1. **Sim, salvar os arquivos** — o conteúdo está correto, pode prosseguir para o salvamento definitivo
2. **Não, precisa de ajustes** — descreva as mudanças necessárias:

_(Texto livre — se escolher opção 2, descreva o que precisa mudar: títulos de passos, descrições, tom de voz, passos faltando, passos a remover, etc. O pipeline voltará para Tico Tutorial com suas instruções.)_

---

> **Se rejeitado:** O pipeline retorna ao step-05 (Tico Tutorial) com seu feedback. Tico irá reescrever o conteúdo e Wanda irá remontar o HTML antes de apresentar esta aprovação novamente.
