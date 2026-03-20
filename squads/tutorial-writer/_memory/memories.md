# Memória do Squad: tutorial-writer

## Decisões de Design

- Squad usa Playwright MCP para navegação (não Claude/OpenAI Operator)
- HTML auto-contido sem dependências externas (funciona offline)
- Paleta visual: verde #5BBB2F, azul #1A3A8F, teal #2BBFBF
- Tipografia: Poppins (títulos) + Nunito Sans (corpo)
- Output salvo em `squads/tutorial-writer/output/{YYYY-MM-DD-HHMMSS}/`
- NUNCA usar ambiente de produção — sempre staging/teste

## Aprendizados

_(registrar após cada execução)_
