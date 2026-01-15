import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, variant = 'default', className }) {
    const variants = {
        default: "bg-slate-800 text-slate-300 border-slate-700",
        success: "bg-emerald-950/30 text-emerald-400 border-emerald-900",
        blue: "bg-blue-950/30 text-blue-400 border-blue-900",
        warning: "bg-amber-950/30 text-amber-400 border-amber-900",
    };

    return (
        <span className={twMerge(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
