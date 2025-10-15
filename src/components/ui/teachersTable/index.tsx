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
import { Icons } from "@/assets"
import { useDrawerController } from "@/hooks/useDrawerController"
import { DrawerKey } from "@/enum/DrawerKey"
import type { TeacherTableProps } from "@/types/props"

export function TeacherTable<TValue>({
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
    const { openDrawer, setActiveID } = useDrawerController();

    return (
        <div className="w-full h-full flex flex-col gap-4 justify-between">
            <div className="overflow-hidden rounded-md border h-full border-table-border">
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
                                        onClick={() => {
                                            setActiveID(row.original.id);
                                            openDrawer(DrawerKey.TEACHERSTAFFDETAIL)
                                        }}
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
                        className="h-10 w-10 disabled:opacity-50 grid place-items-center text-sidebar-text-color cursor-pointer"
                    >
                        <Icons.chevronDown width={20} height={20} className="rotate-90" />
                    </button>

                    <span className="label1 grid place-items-center font-semibold h-10 w-10 text-sidebar-text-color">
                        {table.getState().pagination.pageIndex + 1}
                    </span>

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-10 w-10 disabled:opacity-50 grid place-items-center text-sidebar-text-color cursor-pointer"
                    >
                        <Icons.chevronDown width={20} height={20} className="-rotate-90" />
                    </button>
                </div>

                <div className="flex items-center relative">
                    <select
                        id="page-size"
                        className="h-10 relative z-[1] w-[128px] cursor-pointer outline-0 py-[10px] appearance-none rounded-lg border px-2 text-sm border-table-border font-semibold label1"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 15, 20, 50].map((pageSize) => (
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