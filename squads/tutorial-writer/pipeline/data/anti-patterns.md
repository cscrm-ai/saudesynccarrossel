# Anti-Patterns — Tutorial Writer Squad

## Nunca Fazer

### 1. Combinar dois públicos em um tutorial
**Problema:** Criar um tutorial "Para médicos e pacientes" que tenta servir a ambos.
**Por quê é prejudicial:** Médicos e pacientes têm objetivos, vocabulários e profundidades completamente diferentes. Um tutorial genérico serve mal a ambos.
**Correção:** Criar versões separadas. Se o fluxo é parecido, criar dois arquivos distintos com linguagem diferente.

### 2. Capturar screenshots em ambiente de produção
**Problema:** Navegar e capturar na URL de produção do Saúde Sync.
**Por quê é prejudicial:** Risco de expor dados reais de pacientes, violação da LGPD, possível criação de dados médicos fictícios em sistema real.
**Correção:** SEMPRE usar o ambiente de teste/staging. Verificar a URL antes de iniciar qualquer navegação.

### 3. Múltiplas ações por passo
**Problema:** "Clique no menu Pacientes e depois selecione Novo Paciente e preencha o campo Nome."
**Por quê é prejudicial:** Aumenta a carga cognitiva, confunde usuários iniciantes, torna difícil identificar qual ação causou um problema.
**Correção:** Um passo = uma ação. Três ações = três passos separados.

### 4. Descrever literalmente o screenshot
**Problema:** "Na imagem acima você pode ver um botão verde com o texto 'Registrar'."
**Por quê é prejudicial:** É redundante. O usuário já vê a imagem. O texto não agrega valor.
**Correção:** Interpretar, contextualizar e orientar. "O botão fica disponível somente após preencher todos os campos obrigatórios (marcados com *). Se estiver cinza, verifique os campos."

### 5. Usar jargão clínico em tutoriais de pacientes
**Problema:** "Acesse seu prontuário e verifique os dados da anamnese registrados pelo seu médico."
**Por quê é prejudicial:** Cria barreira de entrada para pacientes sem formação médica.
**Correção:** "Acesse seu histórico de saúde para ver as informações registradas pelo seu médico durante a consulta."

### 6. Screenshots com tooltips, menus abertos ou estados temporários
**Problema:** Capturar tela com dropdown aberto, tooltip aparecendo ou loading spinner visível.
**Por quê é prejudicial:** O tutorial vai mostrar um estado que o usuário não consegue reproduzir facilmente.
**Correção:** Capturar o estado estável antes da ação (antes de hover/click) ou o resultado final limpo após a ação.

### 7. HTML com dependências externas de CDN
**Problema:** `<link rel="stylesheet" href="https://fonts.googleapis.com/...">`
**Por quê é prejudicial:** O tutorial não funciona sem internet, quebrando o requisito de funcionamento offline.
**Correção:** Embeber fontes como base64 ou usar system fonts como fallback. Todos os assets locais.

### 8. Pular estados de erro ou validação comuns
**Problema:** Mostrar apenas o caminho feliz (happy path), sem mencionar o que acontece se o usuário errar.
**Por quê é prejudicial:** Quando o usuário comete um erro esperado (campo obrigatório vazio, formato incorreto), ele se sente perdido.
**Correção:** Incluir um passo de "O que fazer se..." para erros comuns identificados durante a navegação.

### 9. Usar "simplesmente", "apenas", "é fácil"
**Problema:** "Simplesmente clique no botão azul para continuar."
**Por quê é prejudicial:** Patronizante para usuários que estão tendo dificuldade. Cria frustração quando a tarefa não parece simples para eles.
**Correção:** Ser direto sem qualificativos: "Clique no botão Continuar."

### 10. Tutorial sem título descritivo no formato "Como + ação"
**Problema:** "Registro de pressão" ou "Funcionalidade de pressão arterial"
**Por quê é prejudicial:** Título vago não diz ao usuário o que ele vai aprender a FAZER.
**Correção:** "Como registrar sua pressão arterial" — sempre começa com "Como" seguido de verbo de ação.

---

## Sempre Fazer

1. **Testar o HTML localmente antes de aprovar** — abrir o arquivo diretamente no navegador e navegar por todos os passos
2. **Nomear screenshots com número e descrição** — `step-05-botao-salvar-clicado.png` é rastreável; `img_005.png` não é
3. **Verificar viewport antes de cada captura** — sempre 1440x900, sem zoom diferente de 100%
4. **Adaptar o tom ao público ANTES de escrever** — definir o público uma vez e manter consistente
5. **Incluir dica de "o que acontece depois"** — no último passo, sempre dizer qual é o resultado esperado e como o usuário sabe que deu certo
