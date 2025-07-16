'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import Link from 'next/link';

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
    {
        id: 'select',
        header: () => <input type="checkbox" />,
        cell: () => <input type="checkbox" />,
    },
    {
        header: 'Customer name',
        accessorKey: 'name',
        cell: info => {
            const value = info.getValue();
            return (
                <Link href={`/customer/${value.replace(/\s+/g, '-').toLowerCase()}`} >
                    {value}
                </Link>
            );
        },
    },
    {
        header: 'Email subscription',
        accessorKey: 'emailStatus',
        cell: info => {
            const value = info.getValue();
            return (
                <span
                    className={`px-2 py-1 text-sm rounded-full font-medium ${value === 'Subscribed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    {value}
                </span>
            );
        },
    },
    {
        header: 'Location',
        accessorKey: 'location',
    },
    {
        header: 'Orders',
        accessorKey: 'orders',
    },
    {
        header: 'Amount spent',
        accessorKey: 'amount',
    },
];

export default function CustomerTable() {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-4">
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
                    <tbody className="divide-y divide-gray-100">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-800">
                                        {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
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
