import TeacherInfoPanel from "@/components/app/teacherInfoPanel"
import TeacherStaffControls from "@/components/app/teacherStaffControls"
import TeacherStaffDetailsPanel from "@/components/app/teacherStaffDetailsPanel"
import TeacherStaffTitle from "@/components/app/teacherStaffTitle"
import { TeacherTable } from "@/components/ui/teachersTable"
import { columns } from "@/components/ui/teachersTable/columns"
import { TeacherInfoControllerProvider } from "@/context/TeacherInfoControllerProvider"
import { TeacherService } from "@/services/TeacherService"
import type { TeacherDTO } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const TeacherStaffPage = () => {
    const {
        data: teachers = [],
        isLoading,
        error
    } = useQuery<TeacherDTO[]>({
        queryKey: ['teachers'],
        queryFn: async () => {
            const res = await TeacherService.getTeachers();
            return res;
        },
    })

    if (error) {
        return (
            <div className="flex flex-col w-full items-center justify-center min-h-[200px]">
                <span className="text-red-500">
                    {error instanceof Error ? error.message : "Xəta baş verdi"}
                </span>
            </div>
        );
    }

    return (
        <TeacherInfoControllerProvider>
            <section className="px-6 py-4 flex flex-col gap-4 w-full h-full relative">
                <TeacherStaffTitle />
                <TeacherStaffControls />
                <TeacherTable data={teachers} columns={columns} isLoading={isLoading} />
                <TeacherStaffDetailsPanel />
                <TeacherInfoPanel />
            </section>
        </TeacherInfoControllerProvider>
    )
}

export default TeacherStaffPage