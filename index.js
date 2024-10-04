const express = require('express');
const http = require('http');
const axios = require('axios');
const app = express();
const server = http.createServer(app);

require('dotenv').config();

app.use(express.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public')); // Serves JS, CSS, images

app.post('/chat', async (req, res) => {
    if (!req.body) {
        return res.status(400).send('No request body');
    }

    console.log(req.body.text, "reqq");

    try {
        const apiKey = process.env.APIKEY;  // Securely accessing the API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const postData = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": req.body?.text
                        }
                    ]
                }
            ]
        };

        const response = await axios.post(apiUrl, postData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data });

    } catch (error) {
        res.status(500).send('Failed to fetch response');
    }
});

const port = 5000;
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});