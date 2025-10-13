import TeacherStaffControls from "@/components/app/teacherStaffControls"
import TeacherStaffTitle from "@/components/app/teacherStaffTitle"
import { TeacherTable } from "@/components/ui/teachersTable"
import { columns } from "@/components/ui/teachersTable/columns"
import { TeacherSerivce } from "@/services/TeacherService"
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
            const res = await TeacherSerivce.getTeachers();
            return res;
        },
    })

    if (isLoading) {
        return (
            <div className="grid place-items-center w-full min-h-[400px]">
                <div className="flex items-center gap-2 justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span>Yüklənir...</span>
                </div>
            </div>
        );
    }

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
        <section className="px-6 py-4 flex flex-col gap-4 w-full">
            <TeacherStaffTitle />
            <TeacherStaffControls />
            <TeacherTable data={teachers} columns={columns} />
        </section>
    )
}

export default TeacherStaffPage