'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '../ui/button';

const data = [
    {
        name: 'Dipshankar Sur',
        emailStatus: 'Not subscribed',
        location: 'Gurgaon HR, India',
        orders: '2 orders',
        amount: '₹2,625.00',
    },
    {
        name: 'Prarthita Sengupta',
        emailStatus: 'Subscribed',
        location: 'West Delhi DL, India',
        orders: '1 order',
        amount: '₹329.00',
    },
    {
        name: 'Samit Ray',
        emailStatus: 'Not subscribed',
        location: 'Noida UP, India',
        orders: '6 orders',
        amount: '₹5,800.25',
    },
];

const columns = [

    // {
    //     header: 'Customer name',
    //     accessorKey: 'customer_name',
    //     cell: info => {
    //         const value = info.getValue();
    //         return (
    //             <Link
    //                 href={`/customer/${value.replace(/\s+/g, '-').toLowerCase()}`}
    //             >
    //                 {value}
    //             </Link>
    //         );
    //     },
    // },
    {
        header: 'Customer name',
        accessorKey: 'customer_name',
        cell: ({ row }) => {
            const customerName = row.original.customer_name;
            const customerId = row.original.customer_id;

            return (
                <Link href={`/customer/${customerId}`} className=" underline underline-offset-2">
                    {customerName}
                </Link>
            );
        },
    },
    {
        header: 'Contact Number',
        accessorKey: 'mobile_no',
    },
    {
        header: 'Total orders',
        accessorKey: 'total_orders',
    },
    {
        header: 'Amount spent',
        accessorKey: 'total_spent',
    },
];

export default function CustomerTable({ data, page, setPage, totalPages }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="py-4">
            <div className="overflow-x-auto rounded-lg shadow border">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-50 text-left">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* <tbody className="divide-y divide-gray-100">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-800">
                                        {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody> */}

                    <tbody className="divide-y divide-gray-100">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-3 text-sm text-gray-800"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={table.getAllColumns().length}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    No records found
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                <div className="flex items-center justify-between mt-4 px-4 py-4">
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
        </div>
    );
}
