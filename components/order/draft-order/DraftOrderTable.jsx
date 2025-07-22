'use client'

import React from 'react'
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

const DraftOrderTable = () => {
    const draftOrders = [
        {
            orderId: 'D1212',
            Date: '2022-01-01',
            Customer: 'John Doe',
            Status: 'Completed',
            Total: '₹ 750 INR',
        },
        {
            orderId: 'D1213',
            Date: '2022-01-02',
            Customer: 'Jane Smith',
            Status: 'Open',
            Total: '₹ 1200 INR',
        },
        {
            orderId: 'D1214',
            Date: '2022-01-03',
            Customer: 'Ravi Kumar',
            Status: 'Completed',
            Total: '₹ 980 INR',
        },
        {
            orderId: 'D1215',
            Date: '2022-01-04',
            Customer: 'Priya Patel',
            Status: 'Open',
            Total: '₹ 450 INR',
        },
        {
            orderId: 'D1216',
            Date: '2022-01-05',
            Customer: 'Ahmed Khan',
            Status: 'Completed',
            Total: '₹ 1320 INR',
        },
    ]

    const columns = [
        {
            accessorKey: 'orderId',
            header: 'Order ID',
            cell: ({ row }) => <span className="font-medium">{row.original.orderId}</span>,
        },
        {
            accessorKey: 'Date',
            header: 'Date',
            cell: ({ row }) => <span>{row.original.Date}</span>,
        },
        {
            accessorKey: 'Customer',
            header: 'Customer',
            cell: ({ row }) => <span>{row.original.Customer}</span>,
        },
        {
            accessorKey: 'Status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.Status
                return (
                    <span
                        className={`text-sm font-medium ${status === 'Open'
                            ? 'text-yellow-600'
                            : status === 'Completed'
                                ? 'text-green-600'
                                : 'text-gray-600'
                            }`}
                    >
                        {status}
                    </span>
                )
            },
        },
        {
            accessorKey: 'Total',
            header: 'Total',
            cell: ({ row }) => <span className="font-medium">{row.original.Total}</span>,
        },
    ]

    const table = useReactTable({
        data: draftOrders,
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
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </div>
    )
}

export default DraftOrderTable
