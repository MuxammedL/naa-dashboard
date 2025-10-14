import type { DrawerContentProps } from '@/types/props';
import React from 'react';

export const DrawerContent: React.FC<DrawerContentProps> = ({ children }) => {
    return (
        <div className="flex-1 overflow-y-auto p-6">
            {children}
        </div>
    );
};