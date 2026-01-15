import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { whmcs } from '../../lib/whmcs';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Save, Server, Shield, Key, Activity, Globe } from 'lucide-react';

export default function Settings() {
    const [config, setConfig] = useState({ url: '', identifier: '', secret: '', proxyUrl: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [testing, setTesting] = useState(false);
    const [testStatus, setTestStatus] = useState('idle'); // idle, success, error
    const [testLogs, setTestLogs] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('app_settings')
                .select('*')
                .eq('id', 'whmcs_config')
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows

            if (data) {
                setConfig({
                    url: data.url || '',
                    identifier: data.identifier || '',
                    secret: data.secret || '',
                    proxyUrl: data.proxy_url || ''
                });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const { error } = await supabase
                .from('app_settings')
                .upsert({
                    id: 'whmcs_config',
                    url: config.url,
                    identifier: config.identifier,
                    secret: config.secret,
                    proxy_url: config.proxyUrl
                });

            if (error) throw error;

            // Update the local instance immediately so test uses new values
            await whmcs.init();

            setMessage({ type: 'success', text: 'Settings saved successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setSaving(false);
        }
    };

    const handleTestConnection = async () => {
        setTesting(true);
        setTestStatus('idle');
        setTestLogs('Initializing connection test...\n');

        try {
            // Force reload config in case it's not init'd
            await whmcs.init();

            if (!whmcs.config || !whmcs.config.url) {
                throw new Error("Configuration missing. Please save settings first.");
            }

            setTestLogs(prev => prev + `Target URL: ${whmcs.config.url}\nSending 'GetActivityLog' request...\n`);

            const startTime = performance.now();
            const result = await whmcs.testConnection();
            const duration = Math.round(performance.now() - startTime);

            setTestStatus('success');
            setTestLogs(prev => prev + `\n✅ Connection Successful (${duration}ms)\n\nResponse:\n${JSON.stringify(result, null, 2)}`);

        } catch (error) {
            setTestStatus('error');
            setTestLogs(prev => prev + `\n❌ Connection Failed: ${error.message}\n\nTroubleshooting:\n- Check if CORs is enabled on your WHMCS server.\n- Verify API Credentials.\n- Ensure your IP is whitelisted in WHMCS.`);
            console.error(error);
        } finally {
            setTesting(false);
        }
    };

    if (loading) return <div className="text-slate-400">Loading settings...</div>;

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
                <p className="text-slate-400">Configure global application parameters and integrations.</p>
            </div>

            <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <Server className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">WHMCS Integration</h3>
                        <p className="text-sm text-slate-400">Connection details for the billing system API</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-5 h-5 text-emerald-500" />
                            <div>
                                <h4 className="text-sm font-medium text-white">Custom Proxy (Optional)</h4>
                                <p className="text-xs text-slate-500">Run 'npm run start-proxy' locally or use Ngrok. Leave empty to use default Edge Function.</p>
                            </div>
                        </div>
                        <input
                            type="url"
                            value={config.proxyUrl}
                            onChange={(e) => setConfig({ ...config, proxyUrl: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-1 focus:ring-emerald-500 outline-none placeholder-slate-600"
                            placeholder="http://localhost:3001/proxy"
                        />
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {message.text && (
                        <div className={`p-3 rounded-lg text-sm border ${message.type === 'success' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900' : 'bg-red-950/30 text-red-500 border-red-900'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">WHMCS System URL</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    value={config.url}
                                    onChange={(e) => setConfig({ ...config, url: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="https://your-whmcs.com/includes/api.php"
                                />
                                <Server className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Full URL to your api.php endpoint</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">API Identifier</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={config.identifier}
                                        onChange={(e) => setConfig({ ...config, identifier: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                        placeholder="identifier_key"
                                    />
                                    <Shield className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">API Secret</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={config.secret}
                                        onChange={(e) => setConfig({ ...config, secret: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                        placeholder="••••••••••••"
                                    />
                                    <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center border-t border-slate-800 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleTestConnection}
                            disabled={testing || saving}
                            className="gap-2"
                        >
                            {testing ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Activity className="w-4 h-4" />}
                            Test Connection
                        </Button>

                        <Button type="submit" disabled={saving} className="gap-2">
                            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Configuration'}
                        </Button>
                    </div>
                </form>

                {/* Connection Logs */}
                {testLogs && (
                    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                        <h4 className="text-sm font-medium text-slate-300 mb-2">Connection Logs</h4>
                        <div className={`p-4 rounded-lg font-mono text-xs border ${testStatus === 'success'
                            ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300'
                            : testStatus === 'error'
                                ? 'bg-red-950/30 border-red-900/50 text-red-300'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}>
                            <pre className="whitespace-pre-wrap break-all">{testLogs}</pre>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
