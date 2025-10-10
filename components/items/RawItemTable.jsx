
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
import { ArrowUpDown, MoreVertical, Pencil, Trash2, ShieldCheck } from "lucide-react"
import { deleteRawItemService, rawItemActivateService } from "@/service/raw-item/raw-item.service"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { activateRawItem, deleteRawItem } from "@/store/slices/raw-ittem/raw-item.store"

export default function RawItemTable({ data, onDelete, page, limit, setPage, totalPages, setEditRawItem, openEditModal, totalRawItemCount }) {

    const router = useRouter()
    const dispatch = useDispatch()
    const handleDelete = async (id) => {

        const res = await deleteRawItemService(id);

        if (res?.status == 200 || res?.status == 201) {
            toast.success("Deactivated", { description: "Raw Item Deactivated successfully" });

            dispatch(deleteRawItem(id));
        }
        else {
            toast.error("Failed to delete raw item");
        }
    }

    const handlerawItemActivate = async (raw_item_id) => {

        const res = await rawItemActivateService(raw_item_id)

        if (res?.status == 200 || res?.status == 201) {
            toast.success("Activated", { description: "Raw Item Activated successfully" });

            dispatch(activateRawItem(raw_item_id));
        }
        else {
            toast.error("Failed to Activate raw item");
        }
    }

    const storeColumns = (onEdit, onDelete) => [
        {
            accessorKey: "raw_item",
            header: "Raw Item"
        },
        {
            accessorKey: "unit",
            header: "Unit",
        },
        {
            accessorKey: "sku",
            header: "SKU",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const value = getValue();
                return value ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>;
            },
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
                            <DropdownMenuItem onClick={() => { setEditRawItem(item), openEditModal() }}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>

                            {
                                item.status ? (<AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Deactivate
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
                                            <AlertDialogAction onClick={() => handleDelete(item.raw_id)}>
                                                Confirm Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>) : (<AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-green-600 hover:text-white hover:bg-green-600 rounded-sm">
                                            <ShieldCheck className="mr-2 h-4 w-4" />
                                            Activate
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Activate Collection?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to activate this Collection?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handlerawItemActivate(item.raw_id)}>

                                                Confirm Activate
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>)
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns: storeColumns(
            (store) => { },
            onDelete
        ),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: -1
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
                    {table.getRowModel().rows.length ? (
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
                            <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>

                <span className="text-sm">
                    Page {page} of {totalPages} , <span>Total : {totalRawItemCount}</span>
                </span>

                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0}
                >
                    Next
                </Button>

            </div>
        </div>
    )
}
