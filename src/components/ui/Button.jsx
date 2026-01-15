import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 focus:ring-blue-500 rounded-lg",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 focus:ring-slate-500 rounded-lg",
        outline: "bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg",
        whmcs: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 focus:ring-emerald-500 rounded-lg"
    };

    const sizes = {
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-3",
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
