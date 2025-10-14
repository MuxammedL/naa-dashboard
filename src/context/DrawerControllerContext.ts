import type { DrawerKey } from "@/enum/DrawerKey";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type DrawerControllerType = {
  openDrawer: (key: DrawerKey) => void;
  closeDrawer: (key: DrawerKey) => void;
  isDrawerOpen: (key: DrawerKey) => boolean;
  setActiveID: Dispatch<SetStateAction<number>>;
  activeID: number;
};

export const DrawerControllerContext =
  createContext<DrawerControllerType | null>(null);
