
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog"
import { ArrowUpDown, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { deleteOrderRequest } from "@/store/slices/order-request/order-request.slice"
import { deleteOrderRequestService } from "@/service/order-request/order-requet.service"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteFeedbackService } from "@/service/feedback/feedback.service"
import { deleteFeedback } from "@/store/slices/feedback/feedback.slice"
export default function FeedbackTable({ data, openAddStoreOrder, setEditData, page, totalPages, setPage }) {

    const dispatch = useDispatch();
    const router = useRouter();
    const handleFeedbackDelete = async (id) => {

        try {

            const res = await deleteFeedbackService(id)

            if (res?.status == 200) {
                dispatch(deleteFeedback(id));
                toast.success("Deleted", { description: "Order Request deleted successfully" });
            }
        }
        catch (error) {
            toast.error("Failed to delete order request");
        }

    }
    const columns = [
        {
            accessorKey: "customer_name",
            header: "Customer",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <img
                            src={item?.feedback_upload}
                            alt={item?.customer_name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="font-semibold break-words whitespace-normal flex-grow min-w-[12ch]">
                            {item?.customer_name || "-"}
                        </div>
                    </div>
                );
            },
        },

        {
            accessorKey: "feedback",
            header: "Feedback",
            cell: ({ row }) => {
                const item = row.original
                return <div>{item?.feedback || "-"}</div>
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
                            <DropdownMenuItem onClick={() => router.push(`/feedback/new?id=${item?.feedback_id}`)} >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Feedback?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleFeedbackDelete(item.feedback_id)} >

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
        columns,
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
        <div className="rounded border p-4 pt-0 shadow overflow-x-auto">
            <Table className="min-w-full border-separate border-spacing-0 table-auto">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-left align-top whitespace-normal break-words p-2 bg-gray-50"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="align-top">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="whitespace-normal break-words p-2 align-top text-sm"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="text-center pt-6 text-md font-medium"
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
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                >
                    Next
                </Button>
            </div>
        </div>


    )
}
