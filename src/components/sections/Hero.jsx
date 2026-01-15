import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';
import { Server, Cloud, Shield, Zap, ArrowRight, LayoutDashboard } from 'lucide-react';

export function Hero() {
    return (
        <Section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 border-b border-slate-900">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="blue" className="mb-4">Production-Ready n8n Infrastructure</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Simple n8n. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                Professional Provisioning.
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
                            The complete automation hosting platform. Run fully managed n8n Cloud instances or sell n8n hosting via WHMCS with our powerful module manager.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" onClick={() => window.location.href = 'https://portal.affirmweb.com/cart.php'}>
                            Get Started in WHMCS
                        </Button>
                        <Button variant="outline" size="lg">
                            View Architecture
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: Cloud, text: "Managed n8n Cloud" },
                            { icon: Server, text: "WHMCS Provisioning" },
                            { icon: LayoutDashboard, text: "Enhanced Dashboard" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                <item.icon className="w-4 h-4 text-emerald-500" />
                                {item.text}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hero Visual - Architecture Diagram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative lg:h-[500px] w-full bg-slate-900/50 rounded-2xl border border-slate-800 p-8 flex items-center justify-center overflow-hidden"
                >
                    {/* Abstract Architecture Visualization */}
                    <div className="relative w-full max-w-md aspect-square">
                        {/* Center Node: n8n Instance */}
                        <div className="absolute inset-0 m-auto w-32 h-32 bg-slate-800 rounded-xl border border-blue-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] z-20">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#EA4B71] to-[#FF6D5A] rounded-lg flex items-center justify-center mb-2">
                                <Zap className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono text-slate-300">n8n Core</span>
                            <span className="text-[10px] text-emerald-400 mt-1">● Active</span>
                        </div>

                        {/* Orbiting Elements: WHMCS & Provisioning */}
                        <div className="absolute inset-0 m-auto w-64 h-64 border border-dashed border-slate-700 rounded-full animate-spin-slow opacity-50"></div>

                        {/* WHMCS Module */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg z-20">
                            <Server className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-medium text-slate-300">WHMCS Module</span>
                        </div>

                        {/* Docker Isolation */}
                        <div className="absolute bottom-10 right-0 bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg z-20">
                            <Shield className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-medium text-slate-300">Docker Isolation</span>
                        </div>

                        {/* Connecting Lines (CSS) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                            <path d="M50,50 Q200,50 200,200" fill="none" stroke="#3b82f6" strokeWidth="2" />
                            <path d="M350,350 Q200,350 200,200" fill="none" stroke="#10b981" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Decorative gradients */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/10 blur-3xl rounded-full pointer-events-none"></div>
                </motion.div>
            </div>
        </Section>
    );
}
