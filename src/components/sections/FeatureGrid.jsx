import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';

export function FeatureGrid() {
    const features = {
        "n8n Cloud Features": [
            "Fully Managed Updates",
            "Docker-level Isolation",
            "SSL Auto-Provisioning",
            "Custom Domain Support",
            "Daily Backups",
            "Instant Deployment",
            "DDoS Protection",
            "Global CDN"
        ],
        "WHMCS Manager Features": [
            "Automated Provisioning Module",
            "Client Area Dashboard integration",
            "Suspend / Unsuspend Hooks",
            "Upgrade / Downgrade Support",
            "Per-customer Instance Mapping",
            "Server Pool Support",
            "Admin Control Panel",
            "White-label Ready"
        ]
    };

    return (
        <Section id="features" className="bg-slate-900 border-y border-slate-800">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {Object.entries(features).map(([category, list]) => (
                    <div key={category}>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            {category}
                            {category.includes("Cloud") ?
                                <Badge variant="blue">Managed</Badge> :
                                <Badge variant="success">Module</Badge>
                            }
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {list.map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-all">
                                    <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <span className="text-slate-300 text-sm font-medium">{feat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
