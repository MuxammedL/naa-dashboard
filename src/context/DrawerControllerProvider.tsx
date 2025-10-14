import { useState, type ReactNode } from "react";
import { DrawerControllerContext, type DrawerKey } from "./DrawerControllerContext";

export const DrawerControllerProvider = ({ children }: { children: ReactNode }) => {
    const [openDrawers, setOpenDrawers] = useState<Record<DrawerKey, boolean>>({});

    const openDrawer = (key: DrawerKey) =>
        setOpenDrawers((prev) => ({ ...prev, [key]: true }));

    const closeDrawer = (key: DrawerKey) =>
        setOpenDrawers((prev) => ({ ...prev, [key]: false }));

    const isDrawerOpen = (key: DrawerKey) => !!openDrawers[key];

    return (
        <DrawerControllerContext.Provider
            value={{ openDrawer, closeDrawer, isDrawerOpen }}
        >
            {children}
        </DrawerControllerContext.Provider>
    );
};
