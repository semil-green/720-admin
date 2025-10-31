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
import { MoreVertical, Pencil, Trash2, Copy, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation";
import { activateProductService, duplicateProductService } from "@/service/items/items.service"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { activateItem, duplicateItem } from "@/store/slices/items/items.slice"
export default function ItemTable({
    data,
    onDelete,
    sortState,
    page,
    limit,
    setPage,
    totalItems,
    totalProductCount
}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleEdit = (item) => {
        router.push(`/items/new?id=${item}`)
    }

    const handleDuplicate = async (product_id) => {

        try {

            const res = await duplicateProductService(product_id)
            if (res?.status == 200 || res?.status == 201) {
                toast.success("Product duplicated successfully")
                dispatch(duplicateItem({ oldId: product_id, newId: res?.data?.product_id }));

            }

        }
        catch (error) {
            toast.error("Failed to duplicate product")
        }
    }

    const handleProductActivate = async (product_id) => {

        try {

            const res = await activateProductService(product_id)

            if (res?.status == 200 || res?.status == 201) {
                toast.success("Product activated successfully")
                dispatch(activateItem(product_id))
            }

        }
        catch (error) {
            toast.error("Failed to activate product")
        }
    }
    const storeColumns = (onEdit, onDelete) => [
        {
            accessorKey: "product_id",
            header: "ID",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {row.original?.product_id}
                </div>
            ),
        },
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
            header: "Quantity / Unit",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    {row.original?.quantity} {row.original?.unit}
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
                            <DropdownMenuItem
                                onClick={() => {
                                    handleEdit?.(item.product_id)
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-blue-600 hover:text-white hover:bg-blue-600 rounded-sm">
                                        <Copy className="mr-2 h-4 w-4" />
                                        Duplicate
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Duplicate Item?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to duplicate this item? A copy will be created with the same details.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDuplicate(item.product_id)}
                                        >
                                            Confirm Duplicate
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

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
                                            <AlertDialogTitle>Deactivate Item?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to deactivate?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => onDelete(item.product_id)}
                                            >
                                                Confirm Deactivate
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
                                            <AlertDialogAction onClick={() => handleProductActivate(item.product_id)}>

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
                    Page {page} of {totalPages} , <span>Total : {totalProductCount}</span>
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
