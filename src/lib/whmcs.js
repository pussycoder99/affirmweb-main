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

        // 1. Check if configured
        if (!this.config || !this.config.url || !this.config.identifier || !this.config.secret) {
            console.error('[WHMCS] Request failed: Not configured', { action, config: this.config });
            throw new Error('WHMCS API is not configured. Please set up your credentials in Admin Settings.');
        }

        try {
            let result;

            // Route via Custom Proxy if Defined (e.g. Localhost / Ngrok)
            if (this.config.proxyUrl && this.config.proxyUrl.length > 0) {
                console.log(`[Proxy] Forwarding ${action} to ${this.config.url} via ${this.config.proxyUrl}`);

                const response = await fetch(this.config.proxyUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action,
                        params,
                        config: this.config
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Proxy Error (${response.status}): ${errorText || response.statusText}`);
                }
                result = await response.json();
            }
            // Default: Route via Supabase Edge Function
            else {
                console.log(`[Edge] Forwarding ${action} to Supabase Edge Function`);
                const { data, error } = await supabase.functions.invoke('whmcs-proxy', {
                    body: { action, params }
                });

                if (error) {
                    // Check for specific Edge Function errors
                    if (error.message?.includes('status code')) {
                        throw new Error(`Edge Function Error: The proxy returned an error. Ensure your WHMCS credentials are correct in the database.`);
                    }
                    throw new Error(`Link Error: ${error.message}`);
                }
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
        if (this.initialized) return;

        // 1. Try Environment Variables First
        const envConfig = {
            url: import.meta.env.VITE_WHMCS_URL,
            identifier: import.meta.env.VITE_WHMCS_IDENTIFIER,
            secret: import.meta.env.VITE_WHMCS_SECRET,
            proxyUrl: import.meta.env.VITE_PROXY_URL || 'http://localhost:3001/proxy'
        };

        if (envConfig.url && envConfig.identifier && envConfig.secret) {
            console.log('[WHMCS] Using configuration from Environment Variables');
            this.config = envConfig;
            this.initialized = true;
            return;
        }

        // 2. Fallback to Database
        try {
            const { data, error } = await supabase
                .from('app_settings')
                .select('*')
                .eq('id', 'whmcs_config')
                .single();

            if (data && !error) {
                console.log('[WHMCS] Using configuration from Database');
                this.config = {
                    url: data.url,
                    identifier: data.identifier,
                    secret: data.secret,
                    proxyUrl: data.proxy_url || envConfig.proxyUrl // Use local proxy if DB doesn't have one
                };
                this.initialized = true;
            } else {
                // If not in DB, still keep the proxyUrl from env if it exists
                this.config = { ...this.config, proxyUrl: envConfig.proxyUrl };
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
        return this.request('ValidateLogin', {
            email,
            password: password,
            password2: password
        });
    }

    async createClient(clientData) {
        // WHMCS AddClient API requires 'password2' for the client password
        const { password, ...rest } = clientData;
        return this.request('AddClient', { ...rest, password2: password });
    }

    async getPaymentMethods() {
        return this.request('GetPaymentMethods');
    }

    async getInvoice(invoiceId) {
        return this.request('GetInvoice', { invoiceid: invoiceId });
    }
}

export const whmcs = new WhmcsClient();
