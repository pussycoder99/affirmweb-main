
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        // 1. Get the request body
        const { action, params } = await req.json();

        if (!action) {
            throw new Error('Missing "action" parameter');
        }

        // 2. Fetch WHMCS Credentials from Database (securely)
        const { data: config, error: configError } = await supabaseClient
            .from('app_settings')
            .select('url, identifier, secret')
            .eq('id', 'whmcs_config')
            .single();

        if (configError || !config) {
            throw new Error('WHMCS Configuration not found in database');
        }

        // 3. Prepare data for WHMCS
        const formData = new URLSearchParams();
        formData.append('identifier', config.identifier);
        formData.append('secret', config.secret);
        formData.append('action', action);
        formData.append('responsetype', 'json');

        // Append all other params
        if (params) {
            Object.keys(params).forEach(key => formData.append(key, params[key]));
        }

        // 4. Call WHMCS API
        console.log(`Forwarding ${action} to ${config.url}`);

        const whmcsResponse = await fetch(config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        if (!whmcsResponse.ok) {
            throw new Error(`WHMCS Error: ${whmcsResponse.statusText}`);
        }

        const whmcsData = await whmcsResponse.json();

        // 5. Return result to frontend
        return new Response(JSON.stringify(whmcsData), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
