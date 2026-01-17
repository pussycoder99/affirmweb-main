const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Read .env
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function test() {
    // 1. Get Config
    const { data: config, error } = await supabase
        .from('app_settings')
        .select('*')
        .eq('id', 'whmcs_config')
        .single();

    if (error) {
        console.error('Error fetching config:', error);
        return;
    }

    console.log('Config loaded from DB');

    // 2. Prepare Signup Data
    const signupData = {
        firstname: 'Test',
        lastname: 'User',
        email: 'test' + Date.now() + '@example.com',
        password: 'TestPassword123!',
        address1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        postcode: '12345',
        country: 'US',
        phonenumber: '1234567890'
    };

    // 3. Call Proxy
    const proxyUrl = 'http://localhost:3001/proxy';
    console.log('Calling proxy:', proxyUrl);

    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'AddClient',
            params: signupData,
            config: {
                url: config.url,
                identifier: config.identifier,
                secret: config.secret
            }
        })
    });

    const result = await response.json();
    console.log('Proxy Response:', JSON.stringify(result, null, 2));
}

test();
