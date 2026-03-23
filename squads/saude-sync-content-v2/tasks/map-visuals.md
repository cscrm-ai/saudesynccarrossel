---
id: "squads/saude-sync-content-v2/tasks/map-visuals"
name: "Criar Mapa Visual do Carrossel"
agent: "marco-mapa-visual"
output: "visual-map"
---

# Tarefa: Criar Mapa Visual com Delegações por Slide

## Objetivo
Analisar a estrutura completa do carrossel (aprovada por Carla Compliance) e produzir um mapa visual detalhado: definir a semente visual global do carrossel e criar delegações específicas por slide para os agentes de imagem (Isa Ilustra, Pedro Persona, Ícaro Ícone, Bruno Base).

## Input Esperado
- Estrutura completa do carrossel (output final de Carlos Carrossel, versão aprovada)
- Veredicto APROVADO ou APROVADO COM RESSALVAS de Carla Compliance
- Tema e público-alvo do carrossel

## Processo

### 1. Definir a Visual Seed

Antes de mapear qualquer slide individualmente, estabelecer a semente visual global. Esta seed é distribuída para todos os agentes de imagem junto com suas delegações individuais.

Preencher o bloco completo:

```
VISUAL SEED — [Nome/Tema do Carrossel]

Paleta principal: [hex codes predominantes neste carrossel]
Paleta de acento: [hex codes de destaque]
Mood global: [3-5 adjetivos que definem o universo visual]
Estilo fotográfico (Pedro Persona): [instruções de estilo para fotos de pessoas]
Estilo de ilustração (Isa Ilustra): [instruções de estilo para ilustrações e infográficos]
Estilo de ícones (Ícaro Ícone): [instruções de estilo para ícones e elementos UI]
Estilo de fundos (Bruno Base): [instruções de estilo para backgrounds e texturas]
Restrições globais: [elementos visuais que NUNCA devem aparecer em nenhum slide]
Referência de universo: [1-2 linhas descrevendo o universo visual unificado]
```

### 2. Mapear Cada Slide

Para cada slide do carrossel, criar um bloco de delegação:

```
SLIDE [N] — [Tipo do Slide]

DECISÃO VISUAL: [Imagem gerada / Tipografia pura com fundo sólido]

[Se imagem gerada:]
Agente delegado: [Isa Ilustra / Pedro Persona / Ícaro Ícone / Bruno Base]
Tipo de imagem: [ilustração / foto / ícone / fundo / composição]
Descrição concreta: [o que a imagem deve mostrar — específico, sem ambiguidade]
Função no slide: [o que esta imagem comunica no contexto da narrativa]
Emoção desejada: [como o usuário deve se sentir ao ver este slide]
Composição: [onde a imagem aparece, proporção que ocupa, relação com o texto]
Restrições específicas deste slide: [elementos a evitar, além das restrições globais]

[Se tipografia pura:]
Cor de fundo: [hex da paleta SaudeSync Dark]
Justificativa: [por que este slide não precisa de imagem gerada]
```

### 3. Verificar Coerência do Mapa

Após mapear todos os slides, revisar:
- A visual seed está refletida nas delegações individuais?
- Nenhum slide usa dois agentes de imagem no mesmo espaço sem justificativa?
- A distribuição entre agentes faz sentido para o tema do carrossel?
- Os slides "tipografia pura" estão distribuídos intencionalmente, não por omissão?

## Output

Documento completo contendo: Visual Seed + bloco de delegação para cada slide do carrossel.

## Critérios de Conclusão
- [ ] Visual Seed completa e preenchida em todos os campos
- [ ] Todos os slides do carrossel mapeados (sem exceção)
- [ ] Cada slide tem decisão visual clara (imagem gerada ou tipografia pura)
- [ ] Delegações com agente correto para o tipo de necessidade visual
- [ ] Descrições concretas e acionáveis (sem linguagem ambígua)
- [ ] Restrições globais e específicas documentadas
- [ ] Mapa coerente: visual seed refletida nas delegações individuais
- [ ] Output estruturado e pronto para distribuição direta aos agentes de imagem
