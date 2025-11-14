'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '../ui/button';

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
        header: 'Customer Id',
        accessorKey: 'customer_id',
    },
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
        header: 'Success orders',
        accessorKey: 'success_orders',
    },
    {
        header: 'Failed/Pendng orders',
        accessorKey: 'failed_pending_orders',
    },
    {
        header: 'Total orders',
        accessorKey: 'total_orders',
    },
    {
        header: 'Amount spent',
        accessorKey: 'total_spent',
    },
    {
        header: 'Edit ',
        accessorKey: 'customer_id',
        cell: ({ row }) => {
            const customerId = row.original.customer_id;

            return (
                <Link href={`/customer/add?id=${customerId}`} className=" underline underline-offset-4">
                    Edit
                </Link>
            );
        },
    },
];

export default function CustomerTable({ data, page, setPage, totalPages }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 50,
            },
        },
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
