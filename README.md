# Love-button + Telegram bot

This adds a "Люблю" button on the site which, when clicked, sends a Telegram message via a bot.

Setup

1. Create a Telegram bot with BotFather and get the bot token.
2. Get your `chat_id` (send any message to the bot, then call `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` and look for `chat.id`).
3. Set environment variables before running the server:

PowerShell:

```powershell
$env:TELEGRAM_BOT_TOKEN = "<your-bot-token>"
$env:TELEGRAM_CHAT_ID = "<your-chat-id>"
node server.js
```

Command Prompt:

```cmd
set TELEGRAM_BOT_TOKEN=<your-bot-token>
set TELEGRAM_CHAT_ID=<your-chat-id>
node server.js
```

Then open `http://localhost:3000` and click the "Люблю" button.

Notes

- The server reads `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` from environment variables.
- If you want the bot to send messages to a group, use the group's chat id.
- For production, store secrets securely (do not commit them to git).
