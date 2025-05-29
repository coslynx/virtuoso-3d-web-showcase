import { ReactNode } from 'react';
import { clsx } from '../../lib/utils';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
}

export function Button({
    children,
    className,
    href,
    onClick,
    variant = 'primary'
}: ButtonProps) {
    const baseClasses = 'inline-block px-8 py-4 font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg';

    const variantClasses = {
        primary: 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/50',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            className={clsx(baseClasses, variantClasses[variant], className)}
            href={href}
            onClick={onClick}
        >
            {children}
        </Component>
    );
}