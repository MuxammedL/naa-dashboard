import { useState, type ReactNode } from "react";
import { DrawerControllerContext } from "./DrawerControllerContext";
import type { DrawerKey } from "@/enum/DrawerKey";

export const DrawerControllerProvider = ({ children }: { children: ReactNode }) => {
    const [openDrawers, setOpenDrawers] = useState<Record<DrawerKey, boolean>>({
        TEACHERSTAFFDETAIL: false,
    });
    const [activeID, setActiveID] = useState<number>(0);

    const openDrawer = (key: DrawerKey) =>
        setOpenDrawers((prev) => ({ ...prev, [key]: true }));

    const closeDrawer = (key: DrawerKey) =>
        setOpenDrawers((prev) => ({ ...prev, [key]: false }));

    const isDrawerOpen = (key: DrawerKey) => !!openDrawers[key];

    return (
        <DrawerControllerContext.Provider
            value={{ openDrawer, closeDrawer, isDrawerOpen, activeID, setActiveID }}
        >
            {children}
        </DrawerControllerContext.Provider>
    );
};
