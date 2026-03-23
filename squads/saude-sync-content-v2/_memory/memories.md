# Squad Memory — saude-sync-content-v2

## Design Decisions

- **Pautas internas**: Este squad extrai pautas dos documentos internos da Saúde Sync (company.md, brand guidelines, funcionalidades) ao invés de buscar notícias externas.
- **Paleta SaudeSync Dark**: Usa a paleta oficial do company.md (#0A0E17, #00A3FF, #FF4455, #00E08E, #F5B800) com tipografia Space Grotesk / DM Sans / JetBrains Mono.
- **Geração de imagens**: 4 agentes especializados (Isa Ilustra, Pedro Persona, Ícaro Ícone, Bruno Base) geram imagens via Google Imagen (nanobana), coordenados pelo Marco Mapa Visual.
- **Slide de solução**: Sempre referenciar funcionalidades REAIS da plataforma Saúde Sync. Nunca usar dicas genéricas.
- **Publicação via Blotato**: Usar skill blotato para publicação no Instagram.

## Run Learnings (2026-03-20)

- **Imagen 3.0 indisponível**: `imagen-3.0-generate-002` retorna erro. Usar `imagen-4.0-generate-001` como modelo padrão.
- **Compliance proativo**: Correções de compliance devem ser aplicadas ANTES da geração visual (fail-fast). Neste run, slide 8 foi corrigido antes de ir para Daniela.
- **Blotato MCP requer credenciais**: `BLOTATO_API_KEY` precisa estar no `.env` para publicação automática. Alternativa: `instagram-publisher` skill requer `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID` e `IMGBB_API_KEY`.
- **Dimensão dos slides**: Pipeline gera 1080x1350px (4:5), dentro do padrão Instagram.
- **Legenda ideal**: ~1.400 chars funciona bem — margem confortável para os 2.200 do Instagram.

## Telegram Automation (2026-03-23)

- **Interaction channel**: Configurable in squad.yaml (`interaction.channel: terminal | telegram`)
- **Telegram Bot**: Created via @BotFather, token in `.env` as `TELEGRAM_BOT_TOKEN`
- **Checkpoint flow**: 5 checkpoints (steps 02, 04, 07, 12, 14) route to Telegram when channel is telegram
- **Visual review**: Step 12 sends 10 JPEG slides as Telegram photo album before approval buttons
- **Step 04 is two-stage**: First angle selection (5 buttons), then tone selection (6 buttons)
- **Polling**: poll-response.js runs in 600s chunks, runner loops until timeout_pause (8h default)
- **Pause/resume**: run-state.json saves full pipeline state for cross-session resume
- **Cancel**: Progress notifications include cancel button; also supports free-text via --mode text
- **Scheduled task**: Cron `0 9 * * 1-5` via Claude Code (re-register on each new session, expires after 3 days)

## Performance Insights

(Será preenchido pela Ana Analytics após cada ciclo de publicação)
