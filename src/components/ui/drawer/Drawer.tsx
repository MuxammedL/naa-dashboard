import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { DrawerTitle } from './DrawerTitle';
import { DrawerContent } from './DrawerContent';
import { DrawerFooter } from './DrawerFooter';
import { DrawerTrigger } from './DrawerTrigger';
import { DrawerContext } from '@/components/ui/drawer/DrawerContext';
import type { DrawerProps } from '@/types/props';
import type { DrawerSide } from '@/types/types';
import classNames from 'classnames';

export const Drawer: React.FC<DrawerProps> = ({
    children,
    open: controlledOpen,
    onOpenChange,
    side = 'right',
    className
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = (value: boolean) => {
        if (!isControlled) {
            setInternalOpen(value);
        }
        onOpenChange?.(value);
    };

    const sideClasses: Record<DrawerSide, string> = {
        right: 'right-0 top-0 h-full',
        left: 'left-0 top-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
    };

    const sizeClasses: Record<DrawerSide, string> = {
        right: 'w-80',
        left: 'w-80',
        top: 'h-80',
        bottom: 'h-80',
    };

    const transformClasses: Record<DrawerSide, string> = {
        right: isOpen ? 'translate-x-0' : 'translate-x-full',
        left: isOpen ? 'translate-x-0' : '-translate-x-full',
        top: isOpen ? 'translate-y-0' : '-translate-y-full',
        bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
    };

    const triggerElements = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === DrawerTrigger
    );

    const drawerContent = React.Children.toArray(children).filter(
        (child) =>
            React.isValidElement(child) &&
            (child.type === DrawerTitle ||
                child.type === DrawerContent ||
                child.type === DrawerFooter)
    );

    const portalNode = (
        <>
            <div
                className={`fixed inset-0 bg-white/20 backdrop-blur-[3px] transition-opacity duration-300 ease-out z-40 ${isOpen
                    ? 'pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setOpen(false)}
            />

            <div
                className={classNames(
                    `fixed ${sideClasses[side]} ${sizeClasses[side]} bg-white shadow-sm transition-transform duration-300 ease-out z-50 flex flex-col ${transformClasses[side]}`,
                    className
                )}
            >
                {drawerContent}
            </div>
        </>
    );

    return (
        <DrawerContext.Provider value={{ isOpen, setOpen, side }}>
            {triggerElements}
            {createPortal(portalNode, document.body)}
        </DrawerContext.Provider>
    );
};
