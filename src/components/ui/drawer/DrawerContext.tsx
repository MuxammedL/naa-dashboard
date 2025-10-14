import type { DrawerContextType } from '@/types/types';
import { createContext, useContext } from 'react';

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('Drawer components must be used within a Drawer');
    }
    return context;
};