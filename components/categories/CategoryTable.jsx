
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog"
import { ArrowUpDown, MoreVertical, Pencil, Trash2 } from "lucide-react"

export default function CategoryTable({ data, onEdit, onDelete, onOpenSubCategoryModal, totalRecordCount }) {

    const storeColumns = (onEdit, onDelete, onOpenSubCategoryModal) => [
        {
            accessorKey: "category_image",
            header: "Image",
            cell: ({ row }) => {
                const category = row.original;
                return (
                    <img
                        src={category?.category_image || "https://i.pravatar.cc/100"}
                        alt="Image"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                );
            },
        },
        {
            accessorKey: "category_name",
            header: ({ column }) => (
                <Button variant="ghost" >
                    Category
                </Button>
            ),
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
                const category = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(category)}>
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
                                        <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(category.category_id)}>
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
        data,
        columns: storeColumns(
            onEdit,
            onDelete,
            onOpenSubCategoryModal
        ),
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
                            <TableCell colSpan={table.getAllColumns().length} className="text-center font-semibold">
                                No categories found
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
                    Page {table.getState().pagination.pageIndex + 1} of{" "} {table.getPageCount()} , <span className="ml-4"> Total : {totalRecordCount}</span>
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
