import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { XCircle, CheckCircle } from 'lucide-react';

export function PainPoints() {
    const points = [
        {
            pain: "Linux server maintenance fatigue",
            solution: "Fully Managed n8n Cloud + Control Panel"
        },
        {
            pain: "Manual provisioning for every client",
            solution: "Automated WHMCS Module Provisioning"
        },
        {
            pain: "No client self-service capabilities",
            solution: "Enhanced Client Area Dashboard"
        },
        {
            pain: "Scaling infrastructure is complex",
            solution: "Standardized Docker-level deployment"
        }
    ];

    return (
        <Section className="bg-slate-900 border-y border-slate-800">
            <div className="text-center mb-16">
                <Badge variant="warning" className="mb-4">The Problem</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What breaks most n8n hosting?</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Hosting n8n at scale is difficult. We solved the infrastructure bottlenecks so you don't have to.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
                {points.map((item, i) => (
                    <div key={i} className="grid md:grid-cols-2 gap-4 md:gap-8 items-center bg-slate-950/50 p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-3 text-red-300 font-medium">
                            <XCircle className="w-5 h-5 shrink-0" />
                            <span>{item.pain}</span>
                        </div>
                        <div className="hidden md:flex justify-center text-slate-600">
                            <svg className="w-6 h-6 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-300 font-medium">
                            <CheckCircle className="w-5 h-5 shrink-0" />
                            <span>{item.solution}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
