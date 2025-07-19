'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import Link from 'next/link';
import Image from 'next/image';

const data = [
    {
        image: "/images/fish-image.png",
        title: 'Fish Curry Cut',
        product: 17,
        condition: 'Fresh',
    },
    {
        image: "/images/fish-image.png",
        title: 'Chicken Drumstick',
        product: 24,
        condition: 'Frozen',
    },
    {
        image: "/images/fish-image.png",
        title: 'Organic Eggs',
        product: 12,
        condition: 'New',
    },
];

const columns = [
    {
        id: 'select',
        header: () => <input type="checkbox" />,
        cell: () => <input type="checkbox" />,
    },
    {
        header: '',
        accessorKey: 'image',
        cell: info => (
            <Image
                src={info.getValue()}
                alt="Product Image"
                width={40}
                height={40}
                className="rounded object-cover"
            />
        ),
    },
    {
        header: 'Title',
        accessorKey: 'title',
        cell: info => {
            const value = info.getValue();
            return (
                <Link href={`/collections/${value.replace(/\s+/g, '-').toLowerCase()}`}>
                    {value}
                </Link>
            );
        },
    },
    {
        header: 'Products',
        accessorKey: 'product',
    },
    {
        header: 'Product conditions',
        accessorKey: 'condition',
        cell: info => {
            const value = info.getValue();
            const color = value === 'New' ? 'bg-green-100 text-green-700' :
                value === 'Fresh' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700';
            return (
                <span className={`px-2 py-1 text-sm rounded-full font-medium ${color}`}>
                    {value}
                </span>
            );
        },
    },
];

export default function CollectionsTable() {
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
