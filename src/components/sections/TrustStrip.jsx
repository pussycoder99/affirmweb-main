import { Shield, Server, RefreshCw, Zap, Briefcase, Clock } from 'lucide-react';

export function TrustStrip() {
    const items = [
        { icon: Shield, text: "Docker Isolation" },
        { icon: Zap, text: "Automated Provisioning" },
        { icon: Shield, text: "SSL + Custom Domains" },
        { icon: RefreshCw, text: "99.9% Uptime" },
        { icon: Briefcase, text: "Built for Agencies" },
        { icon: Clock, text: "Lifecycle Management" },
    ];

    return (
        <div className="border-y border-slate-800 bg-slate-950/50 backdrop-blur-sm relative z-20">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-400 font-medium group hover:text-slate-200 transition-colors">
                            <item.icon className="w-5 h-5 text-slate-600 group-hover:text-blue-500 transition-colors" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
