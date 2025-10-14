import type { DrawerTitleProps } from '@/types/props';
import React from 'react';

export const DrawerTitle: React.FC<DrawerTitleProps> = ({ children }) => {
    return (
        <div className="p-6 pb-0 flex flex-col gap-4">
            <div className='flex items-center justify-between '>
                {children}
            </div>
            <div className='bg-table-border h-[1px] w-full'></div>
        </div>
    );
};