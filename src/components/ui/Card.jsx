import { twMerge } from 'tailwind-merge';

export function Card({ children, className }) {
    return (
        <div className={twMerge(
            "glass-card p-6 rounded-xl",
            className
        )}>
            {children}
        </div>
    );
}
