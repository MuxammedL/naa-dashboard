import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { TeacherTableProps } from "@/types/props"
import { Icons } from "@/assets"

export function TeacherSearchTable<TValue>({
    columns,
    data,
    isLoading
}: TeacherTableProps<TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <>
            <div className="flex gap-2 items-center text-text-color pb-2 border-b border-b-light-gray">
                <Icons.users width={20} height={20} />
                <p className="label1 font-semibold">Axtarış nəticələri</p>
            </div>
            <div className="w-full h-full flex flex-col gap-4 justify-between overflow-hidden">
                <div className="overflow-auto rounded-md border max-h-full border-table-border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {isLoading ?
                                Array.from({ length: 10 }).map((_, rowIdx) => (
                                    <TableRow key={rowIdx}>
                                        {columns.map((_, colIdx) => (
                                            <TableCell key={colIdx}>
                                                <div className="h-4 loading-state rounded w-full">
                                                    &nbsp;
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                                : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            Nəticə tapılmadı.
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}