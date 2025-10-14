import { Icons } from '@/assets';
import { useDrawerContext } from '@/components/ui/drawer/DrawerContext';
import type { DrawerCloserProps } from '@/types/props';
import React from 'react';

export const DrawerCloser: React.FC<DrawerCloserProps> = ({ children }) => {
    const { setOpen } = useDrawerContext();

    return (
        <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
        >
            {children || <Icons.x width={20} height={20} />}
        </button>
    );
};