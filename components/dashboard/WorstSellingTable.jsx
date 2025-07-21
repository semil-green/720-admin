
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function WorstSellingTable({ data }) {
    const router = useRouter()

    const storeColumns = () => [
        {
            accessorKey: "Name",
            header: "Item",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-3">
                        <img src={item.Image} alt="image" width={50} height={50} className="rounded-full" />
                        <div className="">
                            <div className="font-semibold">{item.Name}</div>
                            <div className="">{item.SKU} / ₹{item.Price} per 300g</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "Units",
            header: "Units",
        },
        {
            accessorKey: "TotalRevenue",
            header: "Total Revenue",
            cell: ({ row }) => {
                const item = row.original
                return (<div>₹{item.TotalRevenue}</div>)
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
        </div>
    )
}
