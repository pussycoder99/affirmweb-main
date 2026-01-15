import { Section } from '../ui/Section';
import { ArrowRight } from 'lucide-react';

export function WHMCSDeepDive() {
    const lifecycle = [
        { label: "Order & Payment", sub: "User purchases in WHMCS" },
        { label: "Provision Hook", sub: "Module triggers deployment" },
        { label: "Instance Active", sub: "Docker container spins up" },
        { label: "Lifecycle Sync", sub: "Syncs status to WHMCS" }
    ];

    return (
        <Section className="bg-slate-950 border-b border-slate-900">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Deep Integration with WHMCS</h2>
                    <div className="space-y-6 text-slate-400 leading-relaxed">
                        <p>
                            The <strong>AffirmWeb n8n Manager</strong> is not just a wrapper. It connects directly to your WHMCS provisioning hooks to automate the entire lifecycle of an n8n product.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="w-1.5 h-full bg-blue-600 rounded-full min-h-[1.5rem]"></div>
                                <div>
                                    <h4 className="text-white font-medium">True Automation</h4>
                                    <p className="text-sm mt-1">When a user pays, the instance is live in seconds. When they stop paying, it suspends automatically.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-1.5 h-full bg-blue-600 rounded-full min-h-[1.5rem]"></div>
                                <div>
                                    <h4 className="text-white font-medium">Infrastructure Agnostic</h4>
                                    <p className="text-sm mt-1">Configurable Server Pools allow you to provision instances tailored to standard or high-performance tiers.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
                    <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none rounded-2xl"></div>

                    <div className="relative space-y-6">
                        {lifecycle.map((step, i) => (
                            <div key={i} className="flex items-center gap-4 relative">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white z-10 font-mono">
                                        {i + 1}
                                    </div>
                                    {i < lifecycle.length - 1 && (
                                        <div className="w-px h-10 bg-slate-800 absolute top-8"></div>
                                    )}
                                </div>
                                <div className="flex-1 p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                                    <div>
                                        <div className="text-white font-medium">{step.label}</div>
                                        <div className="text-xs text-slate-500">{step.sub}</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
