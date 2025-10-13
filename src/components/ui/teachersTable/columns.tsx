import type { LabelVariant, TeacherDTO } from "@/types/types"
import type { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Label from "../Label"
import { Icons } from "@/assets"

export const columns: ColumnDef<TeacherDTO>[] = [
    {
        accessorKey: "id",
        header: "No",
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: "fullName",
        header: "Ad, Soyad, Ata adı",
        cell: ({ row }) => <div>{row.original.fullName}</div>,
    },
    {
        accessorKey: "personalInformation.gender",
        header: "Cinsi",
        cell: ({ row }) => <div>{row.original.personalInformation.gender}</div>,
    },
    {
        accessorKey: "personalInformation.fincode",
        header: "Finkod",
        cell: ({ row }) => <div>{row.original.personalInformation.fincode}</div>,
    },
    {
        accessorKey: "personalInformation.birthDate",
        header: "Doğum tarixi",
        cell: ({ row }) => <div>{row.original.personalInformation.birthDate}</div>,
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
        accessorKey: "academicInformation.maxHours",
        header: "Cəm",
        cell: ({ row }) => {
            const hours = row.original.academicInformation.maxHours
            return <div>{hours || "-"}</div>
        },
    },
    {
        accessorKey: "academicInformation.languagesTaught",
        header: "Tədris apardığı dillər",
        cell: ({ row }) => {
            const languages = row.original.academicInformation.languagesTaught
            return (
                <div className="flex gap-1 flex-nowrap">
                    {languages.map((lang, idx) => {
                        const variant: LabelVariant = lang == "Azərbaycan" ? "success" : lang === "İngilis" ? "purple" : lang === "Rus" ? "blue" : "warning"
                        return (
                            <Label
                                key={idx}
                                variant={variant}
                                className="w-fit !rounded-2xl"
                            >
                                {lang === "Azərbaycan" ? "Aze" :
                                    lang === "İngilis" ? "İng" :
                                        lang === "Rus" ? "Ru" :
                                            lang === "Türk" ? "Türk" : lang}
                            </Label>
                        )
                    })}
                </div>
            )
        },
    },
    {
        accessorKey: "academicInformation.department",
        header: "Əsas kafedra",
        cell: ({ row }) => <div>{row.original.academicInformation.department}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status
            const variant: LabelVariant = status === "Əmr var" ? "success" :
                status === "Əmr gözləyir" ? "warning" :
                    "error"

            return (
                <Label
                    className="w-fit !rounded-2xl"
                    variant={variant}
                >
                    {status}
                </Label>
            )
        },
    },
    {
        id: "actions",
        header: "",
        cell: () => {
            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button className="h-6 w-6 grid place-items-center cursor-pointer focus:outline-secondary">
                            <Icons.dotsVertical width={20} height={20} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[248px] gap-0.5 flex flex-col">
                        <DropdownMenuItem >
                            <Icons.file width={16} height={16} className="text-sidebar-icon-color" />
                            Detallar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="mb-1">
                            <Icons.edit width={16} height={16} className="text-sidebar-icon-color" />
                            Düzəliş et
                        </DropdownMenuItem>
                        <div className="absolute left-0 right-0 w-full h-[1px] top-[81px] bg-table-border"></div>
                        <DropdownMenuItem className="text-red-600">
                            <Icons.trashBin width={16} height={16} />
                            Sil
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]