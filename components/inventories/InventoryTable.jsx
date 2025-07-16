
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function InventoryTable({ data }) {
    const router = useRouter()

    const storeColumns = () => [
        {
            accessorKey: "Title",
            header: "Product",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-3">
                        <img src={item.Image} alt="image" width={50} height={50} className="rounded-full" />
                        <div className="">
                            <div className="font-semibold">{item.Title}</div>
                            <div className="">{item.SKU}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "Locked",
            header: "Locked"
        },
        {
            accessorKey: "InStock",
            header: "In Stock"
        },
        {
            accessorKey: "InHand",
            header: "In Hand"
        },
    ]

    const table = useReactTable({
        data,
        columns: storeColumns(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="rounded border p-4 pt-0 shadow">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </span>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    )
}
