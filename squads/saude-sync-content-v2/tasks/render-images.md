---
id: "squads/saude-sync-content-v2/tasks/render-images"
title: "Renderizar Slides para JPEG"
agent: "daniela-design"
inputs:
  - output/slides/slide-01.html ... slide-0N.html
outputs:
  - output/slides/slide-01.jpg ... slide-0N.jpg
skill: image-creator
---

# Tarefa: Renderizar Slides para JPEG

## Objetivo

Renderizar cada arquivo HTML de slide para uma imagem JPEG de alta qualidade usando a skill `image-creator` (Playwright). O resultado deve ser um arquivo JPEG com exatamente 1080x1440px, qualidade ≥ 90%, pronto para upload no Instagram.

---

## Pré-Requisitos

- [ ] Todos os arquivos `output/slides/slide-0N.html` gerados e validados
- [ ] Skill `image-creator` disponível no ambiente
- [ ] Diretório `output/slides/` existe e tem permissão de escrita

---

## Passo a Passo

### 1. Configurar o Viewport do Playwright

Para cada slide, o Playwright deve ser configurado com:
```
width: 1080
height: 1440
deviceScaleFactor: 2  (para qualidade 2x / Retina quando possível)
```

### 2. Aguardar Carregamento Completo

Antes de capturar o screenshot, garantir que:
- Fontes do Google Fonts foram carregadas (`document.fonts.ready`)
- Imagens foram renderizadas (sem elementos com `loading` pendente)
- Animações CSS estão no estado final (desativar via `prefers-reduced-motion` se necessário)

Estratégia recomendada: `waitUntil: 'networkidle'` + aguardar 500ms adicionais.

### 3. Capturar Screenshot

Configurações da captura:
```
type: jpeg
quality: 92
fullPage: false
clip: { x: 0, y: 0, width: 1080, height: 1440 }
```

### 4. Nomear e Salvar

- Padrão de nome: `slide-01.jpg`, `slide-02.jpg`, ..., `slide-0N.jpg`
- Salvar em: `output/slides/`
- Manter correspondência exata entre `.html` e `.jpg` (slide-01.html → slide-01.jpg)

### 5. Validar Output

Após renderizar cada arquivo, verificar:
- Dimensões: exatamente 1080x1440px
- Tamanho: ≤ 8 MB por arquivo
- Arquivo não corrompido (verificação básica de integridade)

Se qualquer arquivo falhar na validação, rerenderizar antes de prosseguir.

---

## Tratamento de Erros

| Erro                            | Ação                                                      |
|---------------------------------|-----------------------------------------------------------|
| Fonte não carregada             | Aguardar mais 2s e rerenderizar                           |
| Imagem quebrada no HTML         | Reportar para Daniela revisar o HTML fonte                |
| Dimensão incorreta              | Verificar configuração de viewport e rerenderizar         |
| Arquivo > 8 MB                  | Reduzir qualidade para 85% e rerenderizar                 |
| Playwright timeout              | Retentar 1x; se falhar, reportar com detalhes do erro     |

---

## Entrega

Após concluir todos os slides:
1. Listar os arquivos JPEG gerados com nome, tamanho e dimensões confirmadas
2. Reportar qualquer slide que precisou de rerenderização e o motivo
3. Confirmar que os arquivos estão em `output/slides/` prontos para Victor Veredicto

---

## Critérios de Conclusão

- [ ] Um JPEG por slide, correspondendo a cada HTML gerado
- [ ] Todas as imagens com exatamente 1080x1440px
- [ ] Qualidade mínima de 85% (padrão: 92%)
- [ ] Nenhum arquivo excede 8 MB
- [ ] Arquivos salvos com nomenclatura correta: `slide-0N.jpg`
- [ ] Confirmação de entrega enviada ao squad com lista dos arquivos
