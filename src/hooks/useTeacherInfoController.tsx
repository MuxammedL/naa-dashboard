import { TeacherInfoControllerContext } from "@/context/TeacherInfoControllerContext";
import { useContext } from "react";

export const useTeacherInfoController = () => {
    const ctx = useContext(TeacherInfoControllerContext);
    if (!ctx)
        throw new Error("useTeacherInfoController must be used within TeacherInfoControllerProvider");
    return ctx;
};
