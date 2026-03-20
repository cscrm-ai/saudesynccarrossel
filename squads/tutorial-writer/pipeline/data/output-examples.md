# Exemplos de Output — Tutorial Writer Squad

## Exemplo 1: Tutorial para Paciente — "Como registrar sua pressão arterial"

### Estrutura de Passos (saída de Pedro Passos)

```yaml
tutorial:
  titulo: "Como registrar sua pressão arterial"
  publico: paciente
  fluxo: registro-pressao-arterial
  total_passos: 6

passos:
  - numero: 1
    acao: "Toque no ícone de saúde na barra inferior"
    elemento: "Ícone 'Sinais Vitais' no menu de navegação inferior"
    screenshot: "step-01-dashboard-menu-inferior.png"

  - numero: 2
    acao: "Toque em 'Registrar Novo'"
    elemento: "Botão azul 'Registrar Novo' no canto superior direito"
    screenshot: "step-02-sinais-vitais-lista.png"

  - numero: 3
    acao: "Selecione 'Pressão Arterial'"
    elemento: "Card 'Pressão Arterial' na lista de tipos de sinal"
    screenshot: "step-03-selecionar-tipo-sinal.png"

  - numero: 4
    acao: "Digite os valores de pressão"
    elemento: "Campos 'Sistólica (mmHg)' e 'Diastólica (mmHg)'"
    screenshot: "step-04-campos-pressao.png"

  - numero: 5
    acao: "Confirme o horário da medição"
    elemento: "Campo de data e hora, pré-preenchido com horário atual"
    screenshot: "step-05-horario-medicao.png"

  - numero: 6
    acao: "Toque em 'Salvar Registro'"
    elemento: "Botão verde 'Salvar Registro' na parte inferior"
    screenshot: "step-06-botao-salvar.png"
    resultado: "Novo registro aparece no histórico com gráfico atualizado"
```

### Conteúdo Redigido (saída de Tico Tutorial)

**Título:** Como registrar sua pressão arterial

**Público:** Paciente | **Duração estimada:** 2 minutos

---

**Passo 1 — Acesse Sinais Vitais**
Toque no ícone de saúde na barra de navegação na parte inferior da tela. Este ícone fica disponível em qualquer parte do aplicativo.

**Passo 2 — Inicie um novo registro**
Toque no botão "Registrar Novo" no canto superior direito. Você verá todos os tipos de medições disponíveis.

**Passo 3 — Escolha Pressão Arterial**
Toque no card "Pressão Arterial". O Saúde Sync vai abrir o formulário de registro específico para esta medição.

**Passo 4 — Digite seus valores**
Informe os dois números da sua pressão: o primeiro (sistólica) é o maior, o segundo (diastólica) é o menor. Exemplo: se sua pressão foi 120/80, digite 120 no primeiro campo e 80 no segundo.
> **Dica:** Registre imediatamente após a medição para manter o histórico preciso.

**Passo 5 — Confirme o horário**
O horário é preenchido automaticamente com o momento atual. Se a medição foi em um horário diferente, ajuste antes de salvar.

**Passo 6 — Salve o registro**
Toque em "Salvar Registro". Seu novo valor será adicionado ao histórico e o gráfico de tendências será atualizado automaticamente. Seu médico poderá acompanhar essa evolução.

---

## Exemplo 2: Tutorial para Médico — "Como criar um prontuário clínico"

### Estrutura de Passos (saída de Pedro Passos)

```yaml
tutorial:
  titulo: "Como criar um prontuário clínico"
  publico: medico
  fluxo: criacao-prontuario
  total_passos: 5

passos:
  - numero: 1
    acao: "Acesse o perfil do paciente"
    elemento: "Botão 'Ver Perfil' no card do paciente no dashboard"
    screenshot: "step-01-dashboard-lista-pacientes.png"

  - numero: 2
    acao: "Abra a seção Prontuários"
    elemento: "Aba 'Prontuários' no perfil do paciente"
    screenshot: "step-02-perfil-paciente-abas.png"

  - numero: 3
    acao: "Inicie novo prontuário"
    elemento: "Botão '+ Novo Prontuário' no canto superior direito"
    screenshot: "step-03-lista-prontuarios.png"

  - numero: 4
    acao: "Preencha ou dite o conteúdo"
    elemento: "Editor de texto ou botão de microfone para geração por voz"
    screenshot: "step-04-editor-prontuario.png"
    dica: "O microfone transcreve e estrutura automaticamente em formato SOAP"

  - numero: 5
    acao: "Salve o prontuário"
    elemento: "Botão 'Salvar Prontuário'"
    screenshot: "step-05-salvar-prontuario.png"
    resultado: "Prontuário salvo no histórico do paciente com data e assinatura digital"
```

### Conteúdo Redigido (saída de Tico Tutorial)

**Título:** Como criar um prontuário clínico

**Público:** Profissional da Saúde | **Duração estimada:** 3 minutos

---

**Passo 1 — Acesse o perfil do paciente**
No dashboard, localize o paciente e clique em "Ver Perfil". Use a busca por nome ou CPF para agilizar.

**Passo 2 — Abra a seção Prontuários**
Clique na aba "Prontuários" no perfil do paciente. Você verá o histórico completo de atendimentos anteriores.

**Passo 3 — Inicie um novo prontuário**
Clique em "+ Novo Prontuário" no canto superior direito. O editor será aberto em branco.

**Passo 4 — Registre o atendimento**
Você tem duas opções:
- **Digitação manual:** Use o editor de texto livre para documentar em formato SOAP.
- **Geração por voz:** Clique no ícone de microfone, fale o atendimento naturalmente. A IA transcreve e estrutura automaticamente em SOAP (Subjetivo, Objetivo, Avaliação, Plano).

> **Importante:** Revise sempre o prontuário gerado por voz antes de salvar. A IA captura com precisão, mas a revisão é sua responsabilidade médica.

**Passo 5 — Salve o prontuário**
Clique em "Salvar Prontuário". O documento é imediatamente disponibilizado para o paciente e fica registrado com sua assinatura digital e timestamp.

---

## Exemplo de HTML Output (Wanda Web)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Como registrar sua pressão arterial — Saúde Sync</title>
  <style>
    /* Paleta Saúde Sync */
    :root {
      --verde: #5BBB2F;
      --azul: #1A3A8F;
      --teal: #2BBFBF;
      --bg: #F8FAFB;
      --texto: #1A1A2E;
      --texto-sec: #6B7A8D;
      --borda: #E2E8F0;
    }

    body { font-family: 'Nunito Sans', sans-serif; background: var(--bg); margin: 0; }

    .header {
      background: var(--azul); color: white; padding: 20px 32px;
      display: flex; align-items: center; gap: 16px;
    }
    .badge-publico {
      background: var(--teal); border-radius: 20px;
      padding: 4px 12px; font-size: 12px; font-weight: 700;
    }

    .layout { display: grid; grid-template-columns: 260px 1fr; min-height: calc(100vh - 80px); }

    .sidebar {
      background: white; border-right: 1px solid var(--borda);
      padding: 24px 0;
    }
    .sidebar-item {
      padding: 12px 24px; cursor: pointer; display: flex; align-items: center; gap: 12px;
      border-left: 3px solid transparent; color: var(--texto-sec);
    }
    .sidebar-item.ativo {
      border-left-color: var(--verde); background: #F0F9EC; color: var(--azul); font-weight: 700;
    }
    .step-numero {
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--borda); display: flex; align-items: center;
      justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0;
    }
    .sidebar-item.ativo .step-numero { background: var(--verde); color: white; }

    .conteudo { padding: 40px 48px; }
    .passo-atual { color: var(--texto-sec); font-size: 14px; margin-bottom: 8px; }
    .passo-titulo { font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 700; color: var(--azul); margin-bottom: 24px; }

    .screenshot-container { margin-bottom: 24px; border-radius: 12px; overflow: hidden; border: 1px solid var(--borda); }
    .screenshot-container img { width: 100%; display: block; }

    .descricao { font-size: 16px; line-height: 1.7; color: var(--texto); margin-bottom: 16px; }
    .dica { background: #F0F9EC; border-left: 4px solid var(--verde); padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 14px; }

    .navegacao { display: flex; gap: 12px; margin-top: 40px; }
    .btn { padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; cursor: pointer; border: none; }
    .btn-anterior { background: white; border: 2px solid var(--borda); color: var(--texto-sec); }
    .btn-proximo { background: var(--verde); color: white; }
  </style>
</head>
<body>
  <!-- ... conteúdo gerado por Wanda Web ... -->
</body>
</html>
```
