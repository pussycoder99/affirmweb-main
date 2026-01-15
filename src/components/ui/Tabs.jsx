import { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function Tabs({ tabs, activeTab, onChange, className }) {
    return (
        <div className={clsx("flex p-1 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-800", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={clsx(
                        "relative flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                        activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-slate-800 rounded-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
