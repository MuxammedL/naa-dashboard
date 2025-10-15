import { useTeacherInfoController } from "@/hooks/useTeacherInfoController";
import styles from "./teacherInfoPanel.module.css"
import { Icons } from "@/assets";
import { useQuery } from "@tanstack/react-query";
import type { TeacherDTO } from "@/types/types";
import { TeacherService } from "@/services/TeacherService";
import TeacherInfoForm from "../forms/TeacherInfoForm";

const TeacherInfoPanel = () => {
    const { isPanelOpen, activeID, closePanel, type } = useTeacherInfoController();

    const {
        data: teacher,
        isLoading,
        error
    } = useQuery<TeacherDTO | null>({
        queryKey: [activeID],
        queryFn: async () => {
            const res = await TeacherService.getTeacherByIdFromAllTeachers(activeID);
            return res;
        }
    })

    return (
        <div className={`${styles.container} ${isPanelOpen ? styles.active : ""}`}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={closePanel} className={styles.backBtn}>
                            <Icons.leftArrow width={20} height={20} />
                            Geri
                        </button>
                        <button type="button" onClick={closePanel} className={styles.closeBtn}>
                            <Icons.x width={20} height={20} />
                        </button>
                    </div>
                </div>
                {error ?
                    <div className="flex flex-col w-full items-center justify-center min-h-[200px]">
                        <span className="text-red-500">
                            {error instanceof Error ? error.message : "Xəta baş verdi"}
                        </span>
                    </div>
                    : isLoading ?
                        <div className="flex flex-col gap-4 h-full w-full">

                        </div>
                        : teacher == undefined ?
                            <div className="grid place-items-center h-full">
                                <span className="text-xl">Müəllim tapilmadi</span>
                            </div>
                            :
                            <TeacherInfoForm teacher={teacher} type={type} />
                }
            </div>
        </div>
    )
}

export default TeacherInfoPanel