import { useState } from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';
import { Tabs } from '../ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';

export function Pricing() {
    const [activeType, setActiveType] = useState('cloud');

    const plans = {
        cloud: [
            {
                name: "Starter",
                price: "$29",
                period: "/mo",
                desc: "For individuals and small teams.",
                features: ["1 Instance", "Standard Performance", "20GB Storage", "Daily Backups", "Community Support"],
                highlight: false,
                pid: "1"
            },
            {
                name: "Growth",
                price: "$79",
                period: "/mo",
                desc: "For growing agencies and businesses.",
                features: ["3 Instances", "High Performance CPU", "50GB Storage", "Pro Monitoring", "Priority Support"],
                highlight: true,
                pid: "2"
            },
            {
                name: "Scale",
                price: "$199",
                period: "/mo",
                desc: "For production-critical workloads.",
                features: ["Unlimited Instances", "Dedicated Infrastructure", "100GB Storage", "SLA Guarantee", "24/7 Phone Support"],
                highlight: false,
                pid: "3"
            }
        ],
        manager: [
            {
                name: "Provider License",
                price: "$99",
                period: "/mo",
                desc: "Single WHMCS installation license.",
                features: ["Unlimited Provisioning", "White-label Dashboard", "Lifetime Updates", "Module Source Code", "Standard Support"],
                highlight: true,
                pid: "4"
            },
            {
                name: "Enterprise",
                price: "Contact",
                period: "",
                desc: "For large hosting companies.",
                features: ["Multi-WHMCS Support", "Custom Development", "On-premise Audit", "Dedicated Account Manager", "SLA Contracts"],
                highlight: false,
                action: "Contact Sales"
            }
        ]
    };

    return (
        <Section id="pricing" className="bg-slate-950">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
                <div className="flex justify-center mb-8">
                    <Tabs
                        tabs={[
                            { id: 'cloud', label: 'n8n Cloud Managed' },
                            { id: 'manager', label: 'WHMCS Module License' }
                        ]}
                        activeTab={activeType}
                        onChange={setActiveType}
                        className="w-full max-w-sm"
                    />
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeType}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`grid gap-8 ${activeType === 'cloud' ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'}`}
                    >
                        {plans[activeType].map((plan, i) => (
                            <Card key={i} className={`flex flex-col relative ${plan.highlight ? 'border-blue-500/50 bg-blue-900/10' : 'bg-slate-950'}`}>
                                {plan.highlight && (
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                                        <span className="text-slate-500">{plan.period}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm">{plan.desc}</p>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-300 text-sm">
                                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-400' : 'text-slate-600'}`} />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.highlight ? 'primary' : 'outline'}
                                    className="w-full"
                                    onClick={() => window.location.href = plan.action === "Contact Sales" ? 'https://portal.affirmweb.com/contact.php' : `https://portal.affirmweb.com/cart.php?a=add&pid=${plan.pid}`}
                                >
                                    {plan.action || "Get Started"}
                                </Button>
                            </Card>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>
    );
}
