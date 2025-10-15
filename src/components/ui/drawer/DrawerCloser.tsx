import { Icons } from '@/assets';
import { useDrawerContext } from '@/components/ui/drawer/DrawerContext';
import type { DrawerCloserProps } from '@/types/props';
import React from 'react';

export const DrawerCloser: React.FC<DrawerCloserProps> = ({ children }) => {
    const { setOpen } = useDrawerContext();

    return (
        <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 text-gray-500 cursor-pointer"
        >
            {children || <Icons.x width={20} height={20} />}
        </button>
    );
};