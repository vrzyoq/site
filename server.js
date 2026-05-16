const express = require("express");
const path = require("path");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// test
app.get("/api/test", (req, res) => {
    res.json({ message: "backend works" });
});

// Telegram configuration
const telegramToken = "7084873915:AAEysVk7UqFtsHkH9o1aP1YRHGfpxjDfIcw";
const telegramChatId = process.env.TELEGRAM_CHAT_ID || 6563619324;

function sendTelegramMessage(text, res) {
    if (!telegramToken || !telegramChatId) {
        return res.status(500).json({ ok: false, error: 'Telegram config missing. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.' });
    }

    const postData = JSON.stringify({ chat_id: telegramChatId, text });
    const options = {
        hostname: 'api.telegram.org',
        path: `/bot${telegramToken}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const reqApi = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                if (parsed && parsed.ok) {
                    return res.json({ ok: true });
                } else {
                    return res.status(500).json({ ok: false, error: parsed });
                }
            } catch (e) {
                return res.status(500).json({ ok: false, error: 'Invalid response from Telegram' });
            }
        });
    });

    reqApi.on('error', (e) => {
        console.error('Telegram request error:', e);
        return res.status(500).json({ ok: false, error: e.message });
    });

    reqApi.write(postData);
    reqApi.end();
}

// POST /love -> send Telegram message via Bot API
app.post('/love', (req, res) => {
    sendTelegramMessage('Кто-то нажал "Люблю" на вашем сайте ❤️', res);
});

app.post('/contact', (req, res) => {
    const { name, from, message } = req.body || {};
    if (!name || !from || !message) {
        return res.status(400).json({ ok: false, error: 'Заполните все поля формы.' });
    }

    const text = `Новое сообщение с сайта:\nИмя: ${name}\nКонтакт: ${from}\nСообщение:\n${message}`;
    sendTelegramMessage(text, res);
});

// fallback to SPA
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// запуск
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});