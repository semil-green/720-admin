
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function InventoryRawItemTable({ data, totalPage, rawItemPage, setRawItemPage }) {

    const storeColumns = () => [
        {
            accessorKey: "raw_item",
            header: "Raw Item",
        },
        {
            accessorKey: "sku",
            header: "SKU"
        },
        {
            accessorKey: "in_hand",
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
                                <TableHead key={header.id} className="px-4 py-3">
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
                                <TableCell key={cell.id} className="px-4 py-3">
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
                    onClick={() => setRawItemPage((p) => Math.max(1, p - 1))}
                    disabled={rawItemPage <= 1}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {rawItemPage} of {totalPage}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setRawItemPage((p) => Math.min(totalPage, p + 1))}
                    disabled={rawItemPage >= totalPage}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
