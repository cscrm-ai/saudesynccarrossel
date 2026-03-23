---
id: "squads/saude-sync-content-v2/tasks/prepare-assets"
title: "Preparar Assets para Publicação"
agent: "bruna-broadcast"
inputs:
  - output/slides/slide-0N.jpg (aprovados por Victor)
  - legenda, hashtags e CTA (de Carlos Conteúdo)
  - veredicto de aprovação (de Victor Veredicto)
outputs:
  - assets validados prontos para upload
  - legenda validada
---

# Tarefa: Preparar Assets para Publicação

## Objetivo

Validar e organizar todos os assets do carrossel antes do upload. Garantir que cada JPEG está dentro das especificações do Instagram, que a ordem dos slides está correta, e que a legenda está dentro do limite de caracteres. Nenhum arquivo vai para o Blotato sem passar por esta checklist.

---

## Pré-Requisitos

- [ ] Veredicto APROVADO ou APROVADO COM RESSALVAS de Victor Veredicto confirmado
- [ ] Todos os JPEGs de Daniela Design disponíveis em `output/slides/`
- [ ] Legenda e hashtags fornecidas por Carlos Conteúdo
- [ ] Horário de publicação definido por Paulo Pauta

**BLOQUEANTE:** Se não houver veredicto de aprovação, interromper imediatamente e aguardar.

---

## Especificações de Validação

| Parâmetro         | Requisito                    | Ação se falhar                          |
|-------------------|------------------------------|-----------------------------------------|
| Formato           | JPEG                         | Sinalizar Daniela para converter        |
| Dimensões         | 1080 x 1440 px               | Sinalizar Daniela para rerenderizar     |
| Tamanho por slide | ≤ 8 MB                       | Recomprimir ou sinalizar Daniela        |
| Quantidade mínima | ≥ 2 slides                   | Sinalizar Carlos Conteúdo              |
| Quantidade máxima | ≤ 10 slides (limite Instagram)| Sinalizar Carlos / Paulo Pauta         |
| Integridade       | Arquivo não corrompido       | Rerenderizar via Daniela               |

---

## Passo a Passo

### 1. Confirmar Aprovação

Antes de qualquer ação técnica, verificar:
- Arquivo `output/review/veredicto-[data].md` com status APROVADO ou APROVADO COM RESSALVAS
- Se REJEITADO: parar, notificar squad, aguardar nova versão

### 2. Listar e Ordenar os Slides

- Listar todos os arquivos `slide-0N.jpg` em `output/slides/`
- Confirmar que a sequência é contínua e sem lacunas (ex: 01, 02, 03 — não 01, 03)
- O arquivo `slide-01.jpg` é sempre a capa — verificar se é visualmente impactante e adequado

### 3. Validar Dimensões

Para cada arquivo JPEG:
- Verificar dimensões: deve ser exatamente 1080 x 1440 px
- Registrar qualquer divergência com o nome do arquivo e as dimensões encontradas

### 4. Validar Tamanho de Arquivo

- Verificar tamanho de cada arquivo em bytes
- Converter para MB e confirmar que nenhum excede 8 MB
- Se algum exceder: tentar recompressão para qualidade 85%; se ainda exceder, sinalizar Daniela

### 5. Validar Legenda

Contar os caracteres da legenda (incluindo hashtags, emojis e espaços):
- Máximo: **2.200 caracteres**
- Se exceder: notificar Carlos Conteúdo com a contagem atual e o excesso em caracteres
- Confirmar que hashtags estão no corpo da legenda ou designadas para primeiro comentário

### 6. Organizar para Upload

Criar um manifesto de upload em `output/upload-manifest.md` com:
```markdown
## Manifesto de Upload — [Título do Post]
Data: [data]

### Slides
- slide-01.jpg | 1080x1440px | X.X MB | ✓
- slide-02.jpg | 1080x1440px | X.X MB | ✓
...

### Legenda
Caracteres: XXX / 2.200

### Horário de Publicação
[data e hora definidas por Paulo Pauta]

### Status
Pronto para upload: SIM / NÃO
```

---

## Critérios de Conclusão

- [ ] Veredicto de aprovação confirmado
- [ ] Todos os slides validados: JPEG, 1080x1440px, ≤ 8 MB
- [ ] Sequência de slides verificada e ordenada
- [ ] Legenda validada: ≤ 2.200 caracteres
- [ ] Nenhum arquivo corrompido
- [ ] Manifesto de upload criado em `output/upload-manifest.md`
- [ ] Sinal de "pronto para upload" emitido para a tarefa `publish-platforms`
