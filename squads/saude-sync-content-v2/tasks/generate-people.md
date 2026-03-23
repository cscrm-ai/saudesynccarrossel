---
id: "squads/saude-sync-content-v2/tasks/generate-people"
name: "Gerar Imagens de Pessoas"
agent: "pedro-persona"
skill: nanobana
output_dir: "output/"
---

# Tarefa: Gerar Imagens de Pessoas via Google Imagen

## Objetivo

Gerar imagens fotorrealistas de pacientes, medicos e profissionais de saude para os slides do carousel da Saude Sync, com autenticidade, diversidade e contexto brasileiro.

## Inputs Necessarios

Antes de iniciar, confirmar que voce recebeu do Marco:
- [ ] Seed de estilo (numero inteiro para reproducibilidade)
- [ ] Lista de slides designados a Pedro Persona
- [ ] Para cada slide: perfil de pessoa, emocao/expressao, contexto/cena, composicao

## Construcao do Prompt Imagen

Para cada slide, construir o prompt seguindo esta estrutura:

```
[DESCRICAO DA PESSOA] [ACAO/CONTEXTO] [EMOCAO] [ESTILO FOTOGRAFICO] [COMPOSICAO] [RESTRICOES]
```

### Template de Prompt para Pessoas

```
Authentic photorealistic portrait of [descricao da pessoa com diversidade],
[acao ou contexto de saude], [expressao emocional], warm natural lighting,
Brazilian healthcare setting, dark or neutral background compatible with
dark overlay (#0A0E17), professional photography style, not stock photo,
genuine expression, 1080x1080px square format, no text
```

### Parametros por Perfil

**Paciente:**
```
[idade] [etnia] [genero] patient in [contexto: home, clinic, hospital],
[emocao: relieved, hopeful, engaged, at ease], warm natural light,
casual contemporary Brazilian clothing, authentic expression,
soft dark background, portrait composition with space for text overlay
```

**Medico/Profissional de saude:**
```
[idade] [etnia] [genero] doctor/healthcare professional, [contexto clinico],
confident and empathetic expression, white coat or scrubs, Brazilian setting,
professional but warm and approachable, soft studio or clinical lighting,
dark or neutral background, 1080x1080px
```

**Cena de interacao:**
```
Authentic interaction between doctor and patient, [detalhe da cena],
warm and trustful atmosphere, Brazilian healthcare context,
natural poses, genuine connection, soft lighting,
composition with negative space for text, no stock photo aesthetic
```

## Parametros de Qualidade para Imagen

Sempre incluir nos prompts:
- `photorealistic, high quality, authentic`
- `not stock photo, genuine, natural`
- `Brazilian, diverse representation`
- `dark or neutral background`
- `no text, no typography`
- `1080x1080 square format`

Seed de estilo: usar o numero fornecido pelo Marco para manter coesao entre agentes.

## Execucao via Nanobana

Para cada slide designado:

1. Montar o prompt completo com perfil detalhado de diversidade
2. Chamar a skill nanobana com:
   - `prompt`: texto construido acima
   - `seed`: valor recebido do Marco
   - `width`: 1080
   - `height`: 1080
   - `output_path`: `output/slide-{N}-pessoa-{descricao}.png`
3. Confirmar salvamento do arquivo
4. Registrar no relatorio final

## Salvamento e Nomenclatura

Diretorio: `squads/saude-sync-content-v2/output/`

Padrao: `slide-{numero-com-zeros}-pessoa-{perfil-kebab-case}.png`

Exemplos:
- `slide-01-pessoa-paciente-idosa-sorrindo.png`
- `slide-03-pessoa-medico-consulta.png`
- `slide-05-pessoa-interacao-cuidado.png`

## Checklist de Diversidade

Antes de finalizar o prompt, verificar:
- [ ] Etnia especificada (nao deixar padrao caucasiano)
- [ ] Faixa etaria definida (nao apenas jovens adultos)
- [ ] Expressao especificada como autentica, nao de stock photo
- [ ] Contexto brasileiro mencionado
- [ ] Composicao com espaco para texto overlay

## Relatorio de Conclusao

Ao finalizar todos os slides, reportar ao Marco:

```
RELATORIO PEDRO PERSONA
Slides gerados: [lista]
Arquivos:
  - slide-XX: [caminho] — [descricao: perfil da pessoa, etnia, emocao, contexto]
Observacoes: [ajustes necessarios, representatividade atingida]
```
