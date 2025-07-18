'use client'

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Eye, MoreVertical } from 'lucide-react'
import Link from 'next/link'

export default function OrderTable({ data, onViewOrder, onDelete }) {
    const storeColumns = (onViewOrder, onDelete) => [
        {
            accessorKey: 'orderId',
            header: 'Order ID',
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <Link
                        href={`/orders/${order.orderId}`}
                        className='border-b border-black pb-[1px]'
                    >
                        {order.orderId}
                    </Link>
                );
            },
        },
        {
            accessorKey: 'name',
            header: 'Customer Name',
            cell: ({ row }) => {
                const order = row.original
                return (
                    <Link
                        href={`/orders/${order.orderId}`}
                    >
                        <span className="font-semibold border-b border-black pb-[1px] inline-block">
                            {order.name}
                        </span>
                    </Link>
                )

            },
        },

        {
            accessorKey: 'TotalPrice',
            header: 'Total Price',
            cell: ({ row }) => (
                <div className="text-sm font-medium">₹{row.original.TotalPrice}</div>
            ),
        },
        {
            accessorKey: 'PaymentStatus',
            header: 'Payment Status',
            cell: ({ row }) => {
                const status = row.original.PaymentStatus
                return (
                    <div
                        className={`text-sm font-medium ${status === 0
                            ? 'text-yellow-600'
                            : status === 1
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                    >
                        {status === 0
                            ? 'Pending'
                            : status === 1
                                ? 'Success'
                                : 'Failed'}
                    </div>
                )
            },
        },
        {
            accessorKey: 'OrderStatus',
            header: 'Order Status',
            cell: ({ row }) => {
                const status = row.original.OrderStatus
                return (
                    <div
                        className={`text-sm font-medium ${status === 0
                            ? 'text-yellow-600'
                            : status === 1
                                ? 'text-purple-600'
                                : 'text-green-600'
                            }`}
                    >
                        {status === 0
                            ? 'Pending'
                            : status === 1
                                ? 'In Progress'
                                : 'Delivered'}
                    </div>
                )
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const order = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onViewOrder(order)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Order
                            </DropdownMenuItem>
                            {/* Optional delete code can go here */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns: storeColumns(onViewOrder, onDelete),
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
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
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
                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
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
