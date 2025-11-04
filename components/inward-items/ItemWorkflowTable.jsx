
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
import { deleteWorkflowService } from "@/service/work-flow/workflow.service"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { deleteWorkFlow } from "@/store/slices/work-flow/workflow.slice"

export default function ItemWorkflowTable({ data, totalPages, page, setPage, limit }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleDelete = async (workflow_id) => {
        const res = await deleteWorkflowService(workflow_id);
        if (res?.status === 200 || res?.status === 201) {
            toast.success("Deleted", { description: "Workflow deleted successfully" });
            dispatch(deleteWorkFlow(workflow_id));
        }
    };

    const storeColumns = () => [
        {
            accessorKey: "outputs",
            header: "Output Products",
            cell: ({ row }) => {
                const outputs = row.original.outputs || [];
                return outputs.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {outputs.map((out, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <img
                                    src={out.thumbnail_image}
                                    alt={out.title}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <div>
                                    <div className="font-semibold">{out.title}</div>
                                    <div className="text-sm">{out.sku}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="text-gray-400 text-sm">No outputs</span>
                );
            },
        },
        {
            accessorKey: "inputs",
            header: "Input Raw Items",
            cell: ({ row }) => {
                const inputs = row.original.inputs || [];
                return inputs.length > 0 ? (
                    <div className="grid gap-3">
                        {inputs.map((inp, i) => (
                            <div key={i}>
                                <div className="font-semibold">{inp.raw_item}</div>
                                <div className="text-xs">Sku : {inp.sku}</div>
                                <div className="text-xs">Qty : {inp.quantity}</div>
                                <div className="text-xs">Unit : {inp.unit}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="text-gray-400 text-sm">No inputs</span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    router.push(`/inward-items/new-workflow?id=${item?.workflow_id}`)
                                }
                            >
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
                                        <AlertDialogTitle>Delete Workflow?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this workflow? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(item.workflow_id)}>
                                            Confirm Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: Array.isArray(data) ? data : [],
        columns: storeColumns(),
        pageCount: totalPages,
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize: limit,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 50,
            },
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
                    {table?.getRowModel()?.rows?.length > 0 ? (
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
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="text-center py-6 text-gray-500"
                            >
                                No workflow found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>


            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </Button>
            </div>

        </div>
    );
}

