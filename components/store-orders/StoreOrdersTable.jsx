'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Button } from '../ui/button';

const data = [
    {
        orderNumber: 'ORD-1001',
        orderDateTime: '2025-07-16 10:30 AM',
        product: 'Fish Curry Cut',
        store: 'Store A - Kolkata',
        storeRemarks: 'Urgent delivery',
        demandedQty: 50,
        transferredQty: 45,
        pcRemarks: 'Partial stock available',
        transferDateTime: '2025-07-16 12:15 PM',
    },
    {
        orderNumber: 'ORD-1002',
        orderDateTime: '2025-07-16 11:15 AM',
        product: 'Chicken Drumsticks',
        store: 'Store B - Delhi',
        storeRemarks: 'Deliver by EOD',
        demandedQty: 30,
        transferredQty: 30,
        pcRemarks: 'Completed',
        transferDateTime: '2025-07-16 01:00 PM',
    },
];

export default function StoreOrdersTable({ openAddStoreOrder }) {
    const columns = [
        {
            header: 'Order No.',
            accessorKey: 'orderNumber',
        },
        {
            header: 'Order Date & Time',
            accessorKey: 'orderDateTime',
        },
        {
            header: 'Product',
            accessorKey: 'product',
        },
        {
            header: 'Store',
            accessorKey: 'store',
        },
        {
            header: 'Store Remarks',
            accessorKey: 'storeRemarks',
        },
        {
            header: 'Demanded Qty',
            accessorKey: 'demandedQty',
        },
        {
            header: 'Transferred Qty',
            accessorKey: 'transferredQty',
        },
        {
            header: 'PC Remarks',
            accessorKey: 'pcRemarks',
        },
        {
            header: 'Transfer Date & Time',
            accessorKey: 'transferDateTime',
        },
        {
            header: 'Action',
            cell: () => (
                <Button className="text-sm" onClick={openAddStoreOrder}>
                    Transfer
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-4">
            <div className="overflow-x-auto rounded border shadow bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-left">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2 text-sm text-gray-800">
                                        {flexRender(
                                            cell.column.columnDef.cell ??
                                            cell.column.columnDef.accessorKey,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
