
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreVertical, Pencil, Trash2 } from "lucide-react"

export default function BestSellingTable({ data }) {
    const router = useRouter()

    const storeColumns = () => [
        {
            accessorKey: "title",
            header: "Item",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-3">
                        <img src={item?.thumbnail_image} alt="image" width={50} height={50} className="rounded-full" />
                        <div className="">
                            <div className="font-semibold">{item?.title}</div>
                            <div className="">{item?.sku} / ₹{item?.price} per {item?.unit}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "unit",
            header: "Units",
        },
        {
            accessorKey: "total_revenue",
            header: "Total Revenue",
            cell: ({ row }) => {
                const item = row.original
                return (<div>₹{item?.total_revenue}</div>)
            }
        }
    ]

    const table = useReactTable({
        data,
        columns: storeColumns(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="rounded border px-4 shadow w-full">
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
                    {table.getRowModel().rows?.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={table.getAllColumns().length} className="text-center py-6 text-gray-500">
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    )
}
