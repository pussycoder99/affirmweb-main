/**
 * WHMCS API Client
 * Uses Supabase Edge Function to proxy requests (Solves CORS)
 */
import { supabase } from './supabase';

class WhmcsClient {
    constructor() {
        this.config = null;
        this.initialized = false;
    }

    /**
     * Sends a request via the Supabase 'whmcs-proxy' function.
     * This avoids CORS issues by letting the server handle the WHMCS connection.
     */
    /**
     * Sends a request via the Supabase 'whmcs-proxy' function or Custom Proxy.
     */
    async request(action, params = {}) {
        await this.init();

        try {
            let result;

            // Route via Custom Proxy if Defined (e.g. Localhost / Ngrok)
            if (this.config && this.config.proxyUrl && this.config.proxyUrl.length > 0) {
                // Ensure request goes to Custom Proxy
                console.log(`[Proxy] Using Custom Proxy: ${this.config.proxyUrl}`);
                console.log(`[Proxy] Params keys:`, Object.keys(params)); // Debugging log

                const response = await fetch(this.config.proxyUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action,
                        params,
                        config: this.config // Pass config to local proxy since it can't read Supabase DB securely
                    })
                });

                if (!response.ok) throw new Error(`Custom Proxy Error: ${response.statusText}`);
                result = await response.json();
            }
            // Default: Route via Supabase Edge Function
            else {
                const { data, error } = await supabase.functions.invoke('whmcs-proxy', {
                    body: { action, params }
                });

                if (error) throw new Error(`Link Error: ${error.message}`);
                result = data;
            }

            if (result.result === 'error') {
                throw new Error(`WHMCS API Error: ${result.message}`);
            }

            return result;
        } catch (error) {
            console.warn('WHMCS Proxy Call Failed:', error);
            throw error;
        }
    }

    async init() {
        try {
            const { data, error } = await supabase
                .from('app_settings')
                .select('*')
                .eq('id', 'whmcs_config')
                .single();

            if (data && !error) {
                this.config = {
                    url: data.url,
                    identifier: data.identifier,
                    secret: data.secret,
                    proxyUrl: data.proxy_url
                };
                this.initialized = true;
            }
        } catch (err) {
            console.error('Failed to load WHMCS config:', err);
        }
    }

    async testConnection() {
        /* Note: We intentionally don't catch errors here so the caller (Settings page) 
               can catch and display the exact error log.
        */
        return this.request('GetActivityLog', { limit: 1 });
    }

    async validateLogin(email, password) {
        return this.request('ValidateLogin', { email, password });
    }

    async createClient(clientData) {
        return this.request('AddClient', clientData);
    }
}

export const whmcs = new WhmcsClient();
