#!/bin/bash
# SaúdeSync VPS Setup - Run once on the VPS
set -e

echo "=== SaúdeSync VPS Setup ==="

cd /root/saudesynccarrossel

# 1. Copy launcher script
echo "1. Installing run-bot.sh..."
cp scripts/vps/run-bot.sh /root/saudesynccarrossel/run-bot.sh
chmod +x /root/saudesynccarrossel/run-bot.sh

# 2. Stop Docker container (conflicts with Telegram polling)
echo "2. Stopping Docker bot container..."
docker compose -f /docker/saudesync-carrossel/docker-compose.yml down 2>/dev/null || true

# 3. Install systemd services
echo "3. Installing systemd services..."
cp scripts/vps/saudesync-bot.service /etc/systemd/system/
cp scripts/vps/saudesync-daily.service /etc/systemd/system/
cp scripts/vps/saudesync-daily.timer /etc/systemd/system/

# 4. Reload and enable
echo "4. Enabling services..."
systemctl daemon-reload
systemctl enable saudesync-bot.service
systemctl enable saudesync-daily.timer

# 5. Start
echo "5. Starting bot service..."
systemctl start saudesync-bot.service
systemctl start saudesync-daily.timer

# 6. Show status
echo ""
echo "=== Status ==="
echo "Bot service:"
systemctl status saudesync-bot.service --no-pager -l | head -10
echo ""
echo "Daily timer:"
systemctl status saudesync-daily.timer --no-pager -l | head -10
echo ""
echo "=== DONE ==="
echo "The bot is now listening on Telegram 24/7."
echo "Send /carrossel in Telegram to trigger the pipeline."
echo "Daily pipeline runs Mon-Fri at 9am BRT automatically."
echo ""
echo "Useful commands:"
echo "  journalctl -u saudesync-bot -f    # Follow bot logs"
echo "  systemctl restart saudesync-bot   # Restart bot"
echo "  systemctl status saudesync-bot    # Check status"
