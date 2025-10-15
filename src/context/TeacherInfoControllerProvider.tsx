import { useState, type ReactNode } from "react";
import { TeacherInfoControllerContext } from "./TeacherInfoControllerContext";

export const TeacherInfoControllerProvider = ({ children }: { children: ReactNode }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeID, setActiveID] = useState<number>(0);
    const [type, setType] = useState<"edit" | "add">("add")
    const openPanel = (type: "edit" | "add") => {
        setIsPanelOpen(true)
        setType(type)
    };

    const closePanel = () => setIsPanelOpen(false);

    return (
        <TeacherInfoControllerContext.Provider
            value={{ openPanel, closePanel, isPanelOpen, activeID, setActiveID, type }}
        >
            {children}
        </TeacherInfoControllerContext.Provider>
    );
};
