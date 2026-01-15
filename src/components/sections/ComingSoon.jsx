import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Calculator, Wand2, Sparkles, Code2 } from 'lucide-react';

export function ComingSoon() {
    return (
        <Section className="bg-slate-950 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <Badge variant="default" className="bg-purple-900/30 text-purple-300 border-purple-800/50 mb-6">In Development</Badge>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    <span className="flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        AI Vibe Coding for n8n
                    </span>
                </h2>

                <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 decoration-slate-400">
                    The future of automation isn't just hosting. <br className="hidden md:block" />
                    Describe your workflow in plain English, and our AI generates the perfect node chain instantly.
                </p>

                <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-8 max-w-2xl mx-auto mb-10">
                    <div className="flex gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden shrink-0">
                            {/* User Avatar Placeholder */}
                            <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                        </div>
                        <div className="flex-1 bg-slate-950 rounded-lg p-3 text-left border border-slate-800 text-slate-300 text-sm">
                            "Create a workflow that listens for Stripe payments, checks if the customer exists in HubSpot, and sends a Slack notification."
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse delay-75"></div>
                        <div className="flex justify-center mt-4">
                            <div className="px-3 py-1 bg-emerald-950/30 border border-emerald-900/50 rounded-full text-xs text-emerald-400 flex items-center gap-2">
                                <Wand2 className="w-3 h-3" /> Generating Workflow...
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <input
                        type="email"
                        placeholder="Enter your email for access"
                        className="bg-slate-950 border border-slate-800 text-white px-4 py-2.5 rounded-lg w-full sm:w-80 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white w-full sm:w-auto">
                        Join Waitlist
                    </Button>
                </div>
            </div>
        </Section>
    );
}
