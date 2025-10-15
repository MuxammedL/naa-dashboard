import type { TeacherDTO } from "@/types/types"
import type { ColumnDef } from "@tanstack/react-table"
import Label from "../Label"
import TeacherActionsCell from "../TeacherActionsCell"

export const columns: ColumnDef<TeacherDTO>[] = [
    {
        accessorKey: "id",
        header: "No",
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: "academicInformation.department",
        header: "Cinsi",
        cell: ({ row }) => <div>{row.original.academicInformation.department}</div>,
    },
    {
        accessorKey: "fullName",
        header: "Ad, Soyad, Ata adı",
        cell: ({ row }) => <div>{row.original.fullName}</div>,
    },
    {
        accessorKey: "personalInformation.fincode",
        header: "Finkod",
        cell: ({ row }) => <div>{row.original.personalInformation.fincode}</div>,
    },
    {
        accessorKey: "personalInformation.gender",
        header: "Cinsi",
        cell: ({ row }) => <div>{row.original.personalInformation.gender}</div>,
    },
    {
        accessorKey: "academicInformation.positionType",
        header: "Ştat vahidi",
        cell: ({ row }) => (
            <Label variant="ghost" size="small" className="w-fit">
                {row.original.academicInformation.positionType}
            </Label>
        ),
    },
    {
        accessorKey: "personalInformation.username",
        header: "İstifadəçi adı",
        cell: ({ row }) => <div>{row.original.personalInformation.username}</div>,
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => <TeacherActionsCell teacherID={row.original.id} />,
    },
]