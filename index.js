const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
const TOKEN = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`Bot đã sẵn sàng: ${client.user.tag}`);
});
app.get('/', (req, res) => {
    res.send('Bot is running 24/7!');
});
app.post('/send-dm', async (req, res) => {
    const { userId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).send({ error: 'Thiếu userId hoặc message' });
    }

    try {
        const user = await client.users.fetch(userId);
        await user.send(message);
        res.status(200).send({ success: true, message: 'Đã gửi tin nhắn!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Không thể gửi tin nhắn cho người dùng này.' });
    }
});

app.listen(3000, () => {
    console.log('API đang chạy tại port 3000');
});

client.login(process.env.DISCORD_TOKEN);
