import type { DrawerKey } from "@/enum/DrawerKey";
import { createContext } from "react";

export type DrawerControllerType = {
  openDrawer: (key: DrawerKey) => void;
  closeDrawer: (key: DrawerKey) => void;
  isDrawerOpen: (key: DrawerKey) => boolean;
};

export const DrawerControllerContext =
  createContext<DrawerControllerType | null>(null);
