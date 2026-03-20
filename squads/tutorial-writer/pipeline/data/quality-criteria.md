# Critérios de Qualidade — Tutorial Writer Squad

## Critérios de Avaliação do Tutorial Final

### Critério 1: Completude do Fluxo (peso: crítico)
- [ ] O tutorial começa no estado inicial (ex: dashboard, tela de login)
- [ ] O tutorial termina no resultado final desejado (ex: paciente cadastrado, pressão registrada)
- [ ] Nenhum passo essencial está faltando
- [ ] O usuário consegue executar o fluxo completo sem consultar outra fonte

Threshold: Qualquer passo faltante = REJEITAR

### Critério 2: Granularidade dos Passos (peso: alto)
- [ ] Cada passo contém exatamente 1 ação (não combinar "clique em X e depois em Y")
- [ ] Cada screenshot foca em 1 elemento principal
- [ ] Passos de espera/loading são documentados quando o tempo de resposta é > 2s
- [ ] Passos de erro/validação são documentados quando são comuns

Threshold: > 20% dos passos com mais de 1 ação = REJEITAR

### Critério 3: Adequação ao Público (peso: crítico)
**Para médicos:**
- [ ] Linguagem técnica e direta
- [ ] Terminologia clínica usada corretamente
- [ ] Foco em eficiência e controle
- [ ] Sem explicações condescendentes

**Para pacientes:**
- [ ] Linguagem simples, sem jargão clínico
- [ ] Tom acolhedor e encorajador
- [ ] Termos médicos explicados quando necessários
- [ ] Foco no benefício para a saúde, não na tecnologia

Threshold: Qualquer uso de jargão clínico em tutorial de paciente = REJEITAR

### Critério 4: Qualidade dos Screenshots (peso: alto)
- [ ] Todos os screenshots estão nítidos e legíveis
- [ ] Viewport consistente em todos os screenshots (mesma resolução)
- [ ] Elemento principal visível e não cortado
- [ ] Estado da tela é limpo (sem tooltips, notificações, ou elementos temporários)

Threshold: > 1 screenshot ilegível = REJEITAR

### Critério 5: Qualidade do HTML (peso: alto)
- [ ] HTML abre corretamente em navegador sem conexão com internet
- [ ] Imagens carregam corretamente (caminhos relativos funcionando)
- [ ] Navegação entre passos funciona (botões anterior/próximo)
- [ ] Sidebar com índice dos passos funciona
- [ ] Design usa a paleta correta do Saúde Sync
- [ ] Tipografia Poppins + Nunito Sans presente

Threshold: HTML não funciona offline = REJEITAR

### Critério 6: Acessibilidade (peso: médio)
- [ ] Todas as imagens têm `alt` descritivo
- [ ] Contraste de texto >= 4.5:1
- [ ] Navegação funcional por teclado (Tab, Enter)
- [ ] Landmarks semânticos presentes (`<main>`, `<nav>`, `<aside>`)

Threshold: Imagens sem alt text = REJEITAR

### Critério 7: Descrições dos Passos (peso: médio)
- [ ] Título de cada passo usa verbo imperativo (Toque / Clique / Digite / Selecione)
- [ ] Descrição INTERPRETA a imagem, não a repete literalmente
- [ ] Nenhuma descrição usa "simplesmente", "apenas", "fácil"
- [ ] Dicas contextuais agregam informação não óbvia

### Critério 8: Estrutura de Arquivos (peso: médio)
- [ ] Pasta com nomenclatura kebab-case correta
- [ ] Subpasta `assets/` com todos os screenshots
- [ ] Screenshots nomeados com `step-NN-descricao.png`
- [ ] Tutorial registrado no índice geral

---

## Rubrica de Aprovação

| Score | Decisão |
|---|---|
| Todos os críticos OK + >= 80% dos outros | APROVAR |
| Qualquer crítico falhou | REJEITAR |
| Críticos OK + 60-79% dos outros | APROVAR COM RESSALVAS |
| Críticos OK + < 60% dos outros | REJEITAR |

---

## Critérios de Veto Automático

Qualquer um destes itens resulta em REJEIÇÃO imediata, independente do restante:
1. Passo do fluxo faltando (tutorial incompleto)
2. Jargão clínico em tutorial de paciente
3. HTML não funciona sem internet
4. Screenshot principal ilegível ou elemento cortado
5. Audience mismatch: tom de médico em tutorial de paciente ou vice-versa
