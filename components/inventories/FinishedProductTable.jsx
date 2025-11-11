
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function FinishedProductTable({ data, totalPage, page, setRawItemPage }) {
    const storeColumns = () => [

        {
            accessorKey: "Title",
            header: "Product",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-3">
                        <img src={item?.product_image} alt="image" width={50} height={50} className="rounded-full" />
                        <div className="">
                            <div >{item?.product_name}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "sku",
            header: "SKU"
        },
        {
            accessorKey: "committed",
            header: "Committed"
        },
        {
            accessorKey: "in_hand",
            header: "Available"
        },
        {
            accessorKey: "on_hand",
            header: "On hand"
        },
    ]

    const table = useReactTable({
        data,
        columns: storeColumns(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 50,
            },
        },
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
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="px-4 py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="text-center py-6 text-muted-foreground"
                            >
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={() => setRawItemPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {page} of {totalPage}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setRawItemPage((p) => Math.min(totalPage, p + 1))}
                    disabled={page >= totalPage}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
