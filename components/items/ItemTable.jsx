import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";

export default function ItemTable({
    data,
    onDelete,
    sortState,
    page,
    limit,
    setPage,
    totalItems,
    openEditModal,
}) {
    const router = useRouter()
    const handleEdit = (item) => {
        router.push(`/items/new?id=${item}`)
    }

    const storeColumns = (onEdit, onDelete) => [
        {
            accessorKey: "Title",
            header: "Product",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-3 min-w-[200px] max-w-xs">
                        <img
                            src={item.thumbnail_image ?? "https://i.pravatar.cc/100"}
                            alt="image"
                            width={50}
                            height={50}
                            className="rounded-full flex-shrink-0"
                        />
                        <div className="flex flex-col overflow-hidden">
                            <div className="font-semibold truncate">
                                {item?.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                                {item?.sku}
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "categories",
            header: "Category",
            cell: ({ row }) => {
                const categories = row.original.categories || [];

                return (
                    <div className="flex flex-col min-w-[150px] max-w-xs break-words">
                        {categories.length > 0 &&
                            categories
                                .filter((cat) => cat !== null)
                                .map((cat, index) => (
                                    <span key={index} className="">
                                        {cat}
                                    </span>
                                ))
                        }
                    </div>
                );
            },
        },
        {
            accessorKey: "Quantity",
            header: "Quantity/Unit",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {row.original?.quantity} in stock
                </div>
            ),
        },
        {
            accessorKey: "serve_person",
            header: "Serve Person",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {row.original?.serve_person}
                </div>
            ),
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
                            <DropdownMenuItem
                                onClick={() => {
                                    handleEdit?.(item.product_id)
                                    openEditModal()
                                }}
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
                                        <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => onDelete(item.product_id)}
                                        >
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

    const totalPages = Math.max(1, Math.ceil(totalItems / limit))

    const table = useReactTable({
        data,
        columns: storeColumns(() => { }, onDelete),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sortState,
            pagination: {
                pageIndex: page - 1,
                pageSize: limit,
            },
        },
        manualPagination: true,
        pageCount: totalPages,
    })

    return (
        <div className="rounded border p-4 pt-0 shadow overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="whitespace-nowrap">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="align-top">
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
