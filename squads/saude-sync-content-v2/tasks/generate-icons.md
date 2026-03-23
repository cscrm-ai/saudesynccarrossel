---
id: "squads/saude-sync-content-v2/tasks/generate-icons"
name: "Gerar Ícones e Elementos Visuais"
agent: "icaro-icone"
skill: nanobana
output_dir: "output/"
---

# Tarefa: Gerar Ícones via Google Imagen

## Objetivo

Gerar icones, elementos de UI e indicadores visuais para os slides do carousel da Saude Sync, com consistencia de estilo e compatibilidade com fundos escuros.

## Inputs Necessarios

Antes de iniciar, confirmar que voce recebeu do Marco:
- [ ] Seed de estilo (numero inteiro para reproducibilidade)
- [ ] Lista de slides designados a Icaro Icone
- [ ] Para cada slide: tipo de icone, quantidade, cor de destaque, contexto de uso

## Construcao do Prompt Imagen

Para cada slide, construir o prompt seguindo esta estrutura:

```
[TIPO DE ICONE] [CONCEITO/OBJETO] [ESTILO DE LINHA] [COR] [FUNDO] [RESTRICOES]
```

### Template de Prompt para Icones

```
Minimal outline icon of [conceito], line icon style, consistent stroke weight,
[cor] (#hex) on dark background (#0A0E17), modern clean design,
rounded corners, no fill or subtle fill, medical/health tech context,
isolated icon, transparent or dark background, 512x512px
```

### Parametros por Tipo de Icone

**Icone individual de funcionalidade:**
```
Single minimal line icon representing [funcionalidade do app],
outline style, 2-3px stroke weight equivalent, [cor] color (#hex),
dark background #0A0E17, rounded corners, health tech aesthetic,
clean geometric, 512x512px centered, no text
```

**Set de icones para lista:**
```
Set of [N] minimal outline icons representing [lista de conceitos],
uniform stroke weight, consistent style, [cor] (#hex) on dark background,
arranged in grid, health app UI aesthetic, flat line style,
each icon clearly distinguishable, 1080x1080px layout, no text
```

**Badge ou selo:**
```
Minimal badge or seal icon for [tipo: verified, premium, new],
clean geometric design, [cor] (#hex) primary color,
dark background #0A0E17, modern and trustworthy aesthetic,
simple iconography, 512x512px, no text inside (just shape)
```

**Indicador de saude:**
```
Health metric indicator icon for [metrica: heartbeat, blood pressure, glucose],
medical iconography, line/outline style, [cor] color (#hex),
dark background, clean and precise, internationally recognizable,
512x512px isolated
```

## Parametros de Qualidade para Imagen

Sempre incluir nos prompts:
- `minimal, clean, outline, line icon`
- `consistent stroke weight`
- `dark background #0A0E17`
- `no text, no labels, no typography`
- `isolated, centered`
- `health tech, medical app aesthetic`

Seed de estilo: usar o numero fornecido pelo Marco para garantir peso de linha e estilo consistentes.

## Execucao via Nanobana

Para cada slide designado:

1. Montar o prompt com descricao precisa do icone e contexto
2. Para sets: descrever cada icone individualmente na mesma geracao
3. Chamar a skill nanobana com:
   - `prompt`: texto construido acima
   - `seed`: valor recebido do Marco
   - `width`: 512 (individual) ou 1080 (set em contexto)
   - `height`: 512 (individual) ou 1080 (set em contexto)
   - `output_path`: `output/slide-{N}-icone-{descricao}.png`
4. Confirmar salvamento e legibilidade em tamanho reduzido
5. Registrar no relatorio final

## Salvamento e Nomenclatura

Diretorio: `squads/saude-sync-content-v2/output/`

Padrao icone individual: `slide-{numero}-icone-{conceito-kebab}.png`
Padrao set: `slide-{numero}-icones-set-{contexto-kebab}.png`
Padrao badge: `slide-{numero}-badge-{tipo-kebab}.png`

## Relatorio de Conclusao

Ao finalizar todos os slides, reportar ao Marco:

```
RELATORIO ICARO ICONE
Slides gerados: [lista]
Arquivos:
  - slide-XX: [caminho] — [descricao: tipo, cor, quantidade de icones]
Consistencia: [confirmacao de peso de linha uniforme]
Observacoes: [ajustes necessarios, icones que precisam de revisao]
```
