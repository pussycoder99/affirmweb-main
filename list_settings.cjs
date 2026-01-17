const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

async function listSettings() {
    const { data, error } = await supabase
        .from('app_settings')
        .select('*');

    if (error) {
        console.error('Error fetching settings:', error);
        return;
    }

    console.log('Settings found:', JSON.stringify(data, null, 2));
}

listSettings();
