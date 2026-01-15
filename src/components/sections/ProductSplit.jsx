import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Check, ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';

export function ProductSplit() {
    return (
        <Section id="products" className="bg-slate-950">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Solution</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Whether you need a managed instance or want to become a provider, we have the infrastructure solution ready.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Left: Cloud */}
                <Card className="relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-950/50 rounded-lg border border-blue-900/50">
                                    <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <Badge variant="blue">For Teams</Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">AffirmWeb n8n Cloud</h3>
                            <p className="text-slate-400 text-sm h-12">
                                Fully managed, isolated n8n instances. Forget about Docker, VPS maintenance, or SSL issues. Just build workflows.
                            </p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {[
                                "No server management required",
                                "Instant Docker-level container isolation",
                                "Automatic updates & SSL Handling",
                                "High-performance runtime",
                                "Dedicated IPv4 available"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                    <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-slate-800">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Best For</span>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Badge variant="default">Agencies</Badge>
                                <Badge variant="default">Marketing Teams</Badge>
                                <Badge variant="default">SMBs</Badge>
                            </div>
                            <Button className="w-full justify-between group" onClick={() => window.location.href = 'https://portal.affirmweb.com/cart.php?gid=1'}>
                                Deploy n8n Cloud
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Right: Manager */}
                <Card className="relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-900/50">
                                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <Badge variant="success">For Providers</Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">n8n Manager for WHMCS</h3>
                            <p className="text-slate-400 text-sm h-12">
                                Turn your WHMCS install into an n8n hosting engine. Provisions instances on your infrastructure with an enhanced client dashboard.
                            </p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {[
                                "Sell n8n hosting as a WHMCS Product",
                                "Automated provisioning on your servers",
                                "Lifecycle management (Suspend/Unsuspend)",
                                "Enhanced Client Area Control Panel",
                                "Standardized Docker deployment pipeline"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-slate-800">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Best For</span>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Badge variant="default">Hosting Providers</Badge>
                                <Badge variant="default">SaaS Resellers</Badge>
                                <Badge variant="default">IT Consultancies</Badge>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="whmcs" className="flex-1 justify-between group" onClick={() => window.location.href = 'https://portal.affirmweb.com/cart.php?gid=2'}>
                                    Enable Provisioning
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button variant="outline" className="px-3" onClick={() => window.location.href = 'https://portal.affirmweb.com/contact.php'}>
                                    Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Section>
    );
}
