import { createContext, type Dispatch, type SetStateAction } from "react";

export type TeacherInfoControllerType = {
  openPanel: (type: "add" | "edit") => void;
  closePanel: () => void;
  isPanelOpen: boolean;
  setActiveID: Dispatch<SetStateAction<number>>;
  activeID: number;
  type: "add" | "edit";
};

export const TeacherInfoControllerContext =
  createContext<TeacherInfoControllerType | null>(null);
