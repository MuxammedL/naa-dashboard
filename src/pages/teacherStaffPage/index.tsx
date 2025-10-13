import TeacherStaffControls from "@/components/app/teacherStaffControls"
import TeacherStaffTitle from "@/components/app/teacherStaffTitle"

const TeacherStaffPage = () => {
    return (
        <section className="px-6 py-4 flex flex-col gap-4 w-full">
            <TeacherStaffTitle />
            <TeacherStaffControls />
        </section>
    )
}

export default TeacherStaffPage 