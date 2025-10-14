import { useDrawerContext } from '@/components/ui/drawer/DrawerContext';
import type { DrawerTriggerProps } from '@/types/props';
import React from 'react';

export const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children, asChild }) => {
    const { setOpen } = useDrawerContext();

    const handleClick = () => setOpen(true);

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: handleClick
        } as React.DOMAttributes<Element>);
    }

    return (
        <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
            {children}
        </button>
    );
};