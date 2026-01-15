
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/proxy', async (req, res) => {
    const { action, params, config } = req.body;

    if (!config || !config.url) {
        return res.status(400).json({ error: 'Missing WHMCS config (url, identifier, secret)' });
    }

    console.log(`[Proxy] Forwarding ${action} to ${config.url}`);

    const formData = new URLSearchParams();
    formData.append('identifier', config.identifier);
    formData.append('secret', config.secret);
    formData.append('action', action);
    formData.append('responsetype', 'json');

    if (params) {
        Object.keys(params).forEach(key => formData.append(key, params[key]));
    }

    try {
        const response = await fetch(config.url, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy Request Failed:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Local Proxy Server running on http://localhost:${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/proxy`);
});
