import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    type ColumnDef,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Icons } from "@/assets"

interface TeacherTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function TeacherTable<TData, TValue>({
    columns,
    data,
}: TeacherTableProps<TData, TValue>) {
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
        <div className="w-full h-full flex flex-col gap-4 justify-between">
            <div className="overflow-hidden rounded-md border border-table-border">
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
                        {table.getRowModel().rows?.length ? (
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
            <div className="flex items-center gap-5 h-fit">
                <div className="flex items-center gap-0.5">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-10 w-10 grid place-items-center text-sidebar-text-color cursor-pointer"
                    >
                        <Icons.chevronDown width={20} height={20} className="rotate-90" />
                    </button>

                    <span className="text-[14px] leading-5 grid place-items-center font-semibold h-10 w-10 text-sidebar-text-color">
                        {table.getState().pagination.pageIndex + 1}
                    </span>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-10 w-10 grid place-items-center text-sidebar-text-color cursor-pointer"
                    >
                        <Icons.chevronDown width={20} height={20} className="-rotate-90" />
                    </button>
                </div>

                <div className="flex items-center relative">
                    <select
                        id="page-size"
                        className="h-10 relative z-[1] w-[128px] cursor-pointer outline-0 py-[10px] appearance-none rounded-lg border px-2 text-sm border-table-border font-semibold text-[14px] leading-5"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize} / Səhifə
                            </option>
                        ))}
                    </select>
                    <Icons.chevronDown width={20} height={20} className="absolute right-2 top-[10px] z-0" />
                </div>
            </div>
        </div>
    )
}