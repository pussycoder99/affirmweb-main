import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Play, Square, RotateCw, Globe, Server, Activity } from 'lucide-react';

export function ControlPanelPreview() {
    return (
        <Section className="bg-slate-950">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Control Panel</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Whether you use our Cloud or the WHMCS Manager, you get a powerful, purpose-built dashboard. Not just a raw Docker container.
                </p>
            </div>

            <div className="max-w-5xl mx-auto bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                {/* Fake Browser Header */}
                <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                    </div>
                    <div className="flex-1 bg-slate-900 rounded border border-slate-800 h-6 mx-4 flex items-center px-3 text-xs text-slate-500 font-mono">
                        portal.affirmweb.com/clientarea/services/n8n/manage
                    </div>
                </div>

                <div className="flex flex-col md:flex-row h-[500px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-slate-950/50 border-r border-slate-800 p-4 flex flex-col gap-1">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Management</div>
                        {['Overview', 'Console', 'Environment', 'Backups', 'Domains', 'Networking'].map((item, i) => (
                            <div key={i} className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${i === 0 ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                    n8n-production-01
                                    <Badge variant="success">Running</Badge>
                                </h3>
                                <p className="text-slate-400 text-sm mt-1">i-0f9a8b7c6d5e4f3a2 • us-east-1</p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="secondary" className="gap-2">
                                    <RotateCw className="w-4 h-4" /> Restart
                                </Button>
                                <Button size="sm" variant="primary" className="gap-2">
                                    <ExternalLinkIcon /> Open n8n
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                    <Activity className="w-4 h-4" /> CPU Usage
                                </div>
                                <div className="text-2xl font-mono text-white">12%</div>
                                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[12%]"></div>
                                </div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                    <Server className="w-4 h-4" /> Memory
                                </div>
                                <div className="text-2xl font-mono text-white">1.2 GB</div>
                                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[45%]"></div>
                                </div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                    <Globe className="w-4 h-4" /> Domain
                                </div>
                                <div className="text-sm font-mono text-white break-all">n8n.myagency.com</div>
                                <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> SSL Active
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-950 rounded-lg border border-slate-800">
                            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                                <span className="font-medium text-white text-sm">Instance Logs</span>
                                <span className="text-xs text-slate-500 font-mono">Live</span>
                            </div>
                            <div className="p-4 font-mono text-xs md:text-sm text-slate-400 space-y-1">
                                <div><span className="text-slate-600">[2023-10-27 10:42:01]</span> <span className="text-emerald-400">INFO</span> n8n ready on 0.0.0.0, port 5678</div>
                                <div><span className="text-slate-600">[2023-10-27 10:42:02]</span> <span className="text-blue-400">DEBUG</span> Initializing workflow runner...</div>
                                <div><span className="text-slate-600">[2023-10-27 10:42:05]</span> <span className="text-emerald-400">INFO</span> Editor UI is now accessible</div>
                                <div><span className="text-slate-600">[2023-10-27 10:45:12]</span> <span className="text-blue-400">EXEC</span> Workflow "Webhook Handler" started</div>
                                <div className="animate-pulse">_</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

function ExternalLinkIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    );
}
