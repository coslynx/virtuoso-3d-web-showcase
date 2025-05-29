import { ReactNode } from 'react';
import { clsx } from '../../lib/utils';

interface BoundedProps {
    children: ReactNode;
    className?: string;
    'data-slice-type'?: string;
    'data-slice-variation'?: string;
}

export function Bounded({
    children,
    className,
    'data-slice-type': dataSliceType,
    'data-slice-variation': dataSliceVariation,
    ...props
}: BoundedProps) {
    return (
        <section
            className={clsx('px-4 py-10 md:px-6 md:py-14 lg:py-16', className)}
            data-slice-type={dataSliceType}
            data-slice-variation={dataSliceVariation}
            {...props}
        >
            <div className="mx-auto w-full max-w-7xl">
                {children}
            </div>
        </section>
    );
}