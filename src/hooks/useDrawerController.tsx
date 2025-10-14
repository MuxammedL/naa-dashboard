import { DrawerControllerContext } from "@/context/DrawerControllerContext";
import { useContext } from "react";

export const useDrawerController = () => {
  const ctx = useContext(DrawerControllerContext);
  if (!ctx)
    throw new Error("useDrawerController must be used within DrawerControllerProvider");
  return ctx;
};
