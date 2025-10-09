'use client'

import React, { useEffect } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setOrderStatus } from '@/store/slices/order-status/order-status.slice'
import { fetchOrderStatusTypesService } from '@/service/cutomer-order/cutomer-order.service'
import Link from "next/link";

const DraftOrderTable = ({ data, page, setPage, totalPages }) => {

    const dispatch = useDispatch();
    const orderStatus = useSelector((state) => state.orderStatusSlice.allOrderStatus)
    const fetchOrderStatus = async () => {
        try {
            const res = await fetchOrderStatusTypesService();

            if (res?.status == 200 || res?.status == 201) {
                dispatch(setOrderStatus(res?.data))
            }
        } catch (error) {
            toast.error("Failed to fetch order status");
        }
    };
    useEffect(() => {
        if (!orderStatus || orderStatus.length === 0) {
            fetchOrderStatus();
        }
    }, [orderStatus]);

    const columns = [
        {
            accessorKey: 'order_id',
            header: 'Order ID',
            cell: ({ row }) => {
                const order = row.original;
                return <Link
                    href={`/draft-orders/${order.order_id}`}
                    className="underline underline-offset-4 text-md"
                >
                    {row.original?.order_id}
                </Link>
            }
        },
        {
            accessorKey: "created_date",
            header: "Created",
            cell: ({ row }) => {
                const rawDate = row.original?.created_date;
                if (!rawDate) return <span>-</span>;

                const date = new Date(rawDate);

                const formatted = date.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });

                return <span className="text-md">{formatted}</span>;
            },
        },
        {
            accessorKey: 'customer_name',
            header: 'Customer',
            cell: ({ row }) => <span>{row.original.customer_name}</span>,
        },
        {
            accessorKey: "order_status",
            header: "Order Status",
            cell: ({ row }) => {
                const statusValue = row?.original?.order_status;
                const statusLabel = orderStatus.find(s => s.value === statusValue)?.label || "Unknown";
                return <div className="text-md">{statusLabel}</div>;
            },
        },
        {
            accessorKey: 'order_items_count',
            header: 'Items',
            cell: ({ row }) => <span className="font-medium">{row.original.order_items_count}</span>,
        },
        {
            accessorKey: 'item_order_price',
            header: 'Total',
            cell: ({ row }) => <span className="font-medium">{row.original.item_order_price}</span>,
        },
    ]

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="mt-4 rounded border p-4 pt-0 shadow">
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
                <TableBody >
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="!py-4" >
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

export default DraftOrderTable
