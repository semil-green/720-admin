
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog"
import { ArrowUpDown, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { deleteInwardMaterialService } from "@/service/inward-material/inward-material.service"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { deleteInwardMaterial } from "@/store/slices/inward-material/inward-material.slice"
export default function ItemTable({ data, totalPages, page, setPage, limit }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleDeleteInwardItem = async (id) => {
        const result = await deleteInwardMaterialService(id);

        if (result?.status === 200 || result?.status === 201) {
            dispatch(deleteInwardMaterial(id))
            toast.success("Deleted", { description: "Inward product deleted successfully." });
        }

    }
    const storeColumns = (onEdit) => [
        {
            accessorKey: "raw_item",
            header: "Inward Materials",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-3">
                        <div className="font-semibold">{item?.raw_item}</div>
                        <div className="">{item?.sku}</div>
                    </div>
                )
            }
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="">10</div>
                )
            }
        },
        {
            accessorKey: "batch",
            header: "Batch",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="">{item.batch}</div>
                )
            }
        },
        {
            accessorKey: "vendor_name",
            header: "Vendor",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="">{item.vendor_name}</div>
                )
            }
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="">{item.date}</div>
                )
            }
        },
        {
            accessorKey: "time",
            header: "Time",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="">{item.time}</div>
                )
            }
        },
        {
            accessorKey: "unit",
            header: "Unit",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="">Gram</div>
                )
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/inward-items/new?id=${item.inwardmaterial_id}`)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        delete
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteInwardItem(item.inwardmaterial_id)}>
                                            Confirm Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns: storeColumns(),
        pageCount: totalPages,
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize: limit,
            },
        },
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === "function"
                    ? updater({ pageIndex: page - 1, pageSize: limit })
                    : updater;

            setPage(newPagination.pageIndex + 1);
        },
    });


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
                    {table.getRowModel().rows.length > 0 ? (
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
                            <TableCell colSpan={storeColumns().length} className="text-center py-6">
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
