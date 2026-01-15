import { useState } from 'react';
import { Section } from '../ui/Section';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            q: "What is the difference between n8n Cloud and the WHMCS Manager?",
            a: "n8n Cloud is our fully managed hosting service where we host the instances for you. The WHMCS Manager is a software module for hosting providers that allows them to sell and provision n8n instances on their own servers."
        },
        {
            q: "Do I need my own servers for the WHMCS Manager?",
            a: "Yes. The module connects your WHMCS installation to your backend infrastructure (Docker Swarm, Portainer, or standalone SSH servers) to provision instances."
        },
        {
            q: "What does 'Docker-level isolation' mean?",
            a: "Each n8n instance runs in its own dedicated Docker container with strict resource limits. This ensures that one customer's heavy workflow does not impact another customer's performance."
        },
        {
            q: "Can I use custom domains?",
            a: "Yes. Both our Cloud platform and the WHMCS module support custom domains (e.g., automation.yourcompany.com) with automatic Let's Encrypt SSL provisioning."
        },
        {
            q: "How are backups handled?",
            a: "We perform daily automated backups of the n8n workflows and credentials database. You can restore from the control panel at any time."
        },
        {
            q: "What happens if a payment fails?",
            a: "For WHMCS Manager users, the system automatically suspends the instance after the grace period you define. Once paid, it unsuspends instantly."
        },
        {
            q: "When will the AI Vibe Coding tool be available?",
            a: "We are currently in private beta. Join the waitlist above to be notified when we open up early access."
        }
    ];

    return (
        <Section id="faq" className="bg-slate-950 border-t border-slate-900">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <div key={i} className="border border-slate-800 rounded-lg bg-slate-900/30 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900 transition-colors"
                            >
                                <span className="font-medium text-slate-200">{item.q}</span>
                                {openIndex === i ? <Minus className="w-4 h-4 text-blue-500" /> : <Plus className="w-4 h-4 text-slate-500" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-6 pb-4 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
