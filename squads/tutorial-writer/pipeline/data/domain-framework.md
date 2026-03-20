# Framework Operacional: Tutorial Writer Squad

## Princípio Central

Cada tutorial cobre **um único fluxo completo**, de ponta a ponta, para **um único público**.
Nunca combinar fluxos. Nunca misturar médico e paciente no mesmo documento.

---

## Processo de Produção de Tutorial

### Fase 1: Navegação e Captura
1. Receber definição do tutorial: fluxo + público + URL do app
2. Acessar o ambiente de teste do Saúde Sync (NUNCA produção)
3. Navegar pelo fluxo completo do início ao fim
4. Capturar screenshot em cada passo relevante:
   - Antes da ação (estado inicial)
   - Após a ação (estado resultante) — incluir apenas o mais informativo
5. Salvar screenshots com nomenclatura sequencial: `step-NN-descricao-curta.png`
6. Gerar log de navegação: ação realizada + elemento clicado + screenshot associado

### Fase 2: Extração de Passos
1. Analisar cada screenshot em sequência
2. Identificar o elemento principal de cada passo (botão, campo, menu, link)
3. Verificar se o passo é essencial para o usuário final (eliminar tentativas e erros)
4. Estruturar lista de passos: `{numero, acao, elemento, screenshot}`
5. Validar completude: o tutorial cobre o fluxo do início até o resultado final?

### Fase 3: Redação do Conteúdo
1. Escrever título do tutorial (verbo + objeto: "Como registrar sua pressão arterial")
2. Escrever título de cada passo (verbo imperativo + objeto curto: "Toque em Registrar Sinal Vital")
3. Escrever descrição de cada passo:
   - Para médicos: direto, técnico, objetivo (máx. 2 frases)
   - Para pacientes: acolhedor, simples, sem jargão (máx. 3 frases)
4. Adicionar dica contextual quando relevante (alertas, atalhos, campos obrigatórios)
5. Revisar: nenhum passo repete literalmente o que a imagem mostra

### Fase 4: Montagem HTML
1. Usar template base com paleta Saúde Sync e tipografia Poppins + Nunito Sans
2. Estrutura: header, sidebar (índice), área de conteúdo, rodapé com navegação
3. Embutir screenshots como referências relativas de arquivo (`assets/step-NN-*.png`)
4. Adicionar destaque visual (overlay colorido ou seta) sobre o elemento de cada passo
5. Gerar HTML auto-contido sem dependências externas de CDN

### Fase 5: Organização e Salvamento
1. Criar pasta com nomenclatura: `{publico}/{kebab-case-titulo}/`
2. Salvar `index.html` na raiz da pasta
3. Criar subpasta `assets/` com todos os screenshots
4. Verificar links relativos funcionando (abrir HTML localmente e testar navegação)
5. Registrar tutorial no índice geral (`index.html` na raiz de `/tutoriais-saude-sync/`)

---

## Estrutura de Pastas de Output

```
squads/tutorial-writer/output/{YYYY-MM-DD-HHMMSS}/
    medicos/
        como-cadastrar-paciente/
            index.html
            assets/
                step-01-dashboard-inicial.png
                step-02-botao-novo-paciente.png
                ...
        como-criar-prontuario/
            index.html
            assets/
    pacientes/
        como-registrar-pressao-arterial/
            index.html
            assets/
        como-gerenciar-medicacoes/
            index.html
            assets/
```

---

## Critérios de Qualidade de Fluxo

| Critério | Padrão |
|---|---|
| Completude | Tutorial cobre 100% do fluxo, do início ao resultado final |
| Granularidade | 1 ação por passo, 1 elemento por screenshot |
| Público-específico | Linguagem e profundidade adequadas ao público definido |
| Auto-suficiência | Usuário consegue executar o fluxo usando apenas o tutorial |
| Acessibilidade | Alt text em todas as imagens, contraste adequado |
| Performance | HTML carrega em < 2s sem conexão com internet |

---

## Catálogo de Tutoriais por Público

### Para Profissionais da Saúde (Médicos)
- Cadastro de novo paciente
- Criação de prontuário clínico (com geração por voz)
- Criação de protocolo clínico
- Solicitação de acesso temporário para outro profissional
- Uso do chat com paciente
- Visualização de sinais vitais e tendências
- Upload de documentos médicos
- Criação de plano alimentar personalizado
- Definição de metas de saúde para paciente
- Agendamento de consulta

### Para Pacientes
- Registro de pressão arterial
- Gestão de medicações (marcar como tomada/perdida)
- Criação de meta de saúde
- Compartilhamento temporário de histórico
- Uso do Assistente de IA (Saúde Sync AI)
- Comunicação com médico via chat
- Upload de exames e documentos
- Visualização de plano alimentar
- Registro de dor e sintomas
- Acesso ao histórico completo
