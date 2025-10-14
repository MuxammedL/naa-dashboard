import type { DrawerFooterProps } from '@/types/props';
import React from 'react';

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children }) => {
    return (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
            {children}
        </div>
    );
};