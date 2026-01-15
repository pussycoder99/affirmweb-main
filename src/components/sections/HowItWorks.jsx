import { useState } from 'react';
import { Section } from '../ui/Section';
import { Tabs } from '../ui/Tabs';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export function HowItWorks() {
    const [activeTab, setActiveTab] = useState('cloud');

    const steps = {
        cloud: [
            { step: "01", title: "Select Plan", desc: "Choose your n8n Cloud tier in our WHMCS portal" },
            { step: "02", title: "Instant Deploy", desc: "System provisions your isolated Docker container" },
            { step: "03", title: "Access n8n", desc: "Login instantly to your private n8n workspace" },
            { step: "04", title: "Manage", desc: "Use the console for logs, backups, and domains" }
        ],
        manager: [
            { step: "01", title: "Install Module", desc: "Deploy AffirmWeb Manager on your WHMCS" },
            { step: "02", title: "Create Products", desc: "Configure your n8n hosting plans and pricing" },
            { step: "03", title: "Client Orders", desc: "Module automates provisioning on your servers" },
            { step: "04", title: "Client Manages", desc: "Users get a powerful dashboard in client area" }
        ]
    };

    return (
        <Section id="how-it-works" className="bg-slate-950">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How It Works</h2>
                <div className="flex justify-center">
                    <Tabs
                        tabs={[
                            { id: 'cloud', label: 'Managed n8n Cloud' },
                            { id: 'manager', label: 'Sell via WHMCS' }
                        ]}
                        activeTab={activeTab}
                        onChange={setActiveTab}
                        className="w-full max-w-sm"
                    />
                </div>
            </div>

            <div className="max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-4 gap-6"
                    >
                        {steps[activeTab].map((item, i) => (
                            <Card key={i} className="relative group hover:bg-slate-900 border-slate-800">
                                <div className="text-4xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-slate-800 z-10"></div>
                                )}
                            </Card>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>
    );
}
