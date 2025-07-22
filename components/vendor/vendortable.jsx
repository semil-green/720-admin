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
        address: '123 Coastal Street, Bay Area',
        pincode: '560001',
        phone: '+91-9876543210',
        email: 'fishvendor@example.com',
        bankDetails: {
            name: 'State Bank of India',
            accountNo: 'XXXXXXXX1234',
            ifsc: 'SBIN0001234'
        },
        attachments: ['License.pdf', 'PanCard.jpg']
    },
    {
        image: "/images/fish-image.png",
        title: 'Chicken Drumstick',
        product: 24,
        condition: 'Frozen',
        address: '456 Chicken Lane, Meat Market',
        pincode: '400011',
        phone: '+91-8765432109',
        email: 'chickenvendor@example.com',
        bankDetails: {
            name: 'HDFC Bank',
            accountNo: 'XXXXXXXX5678',
            ifsc: 'HDFC0005678'
        },
        attachments: ['GST_Certificate.pdf']
    },
    {
        image: "/images/fish-image.png",
        title: 'Organic Eggs',
        product: 12,
        condition: 'New',
        address: '789 Organic Avenue, Farm Town',
        pincode: '110022',
        phone: '+91-9988776655',
        email: 'eggvendor@example.com',
        bankDetails: {
            name: 'ICICI Bank',
            accountNo: 'XXXXXXXX4321',
            ifsc: 'ICIC0004321'
        },
        attachments: ['Registration.docx']
    },
];

const columns = [
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
        header: 'Condition',
        accessorKey: 'condition',
        cell: info => {
            const value = info.getValue();
            const color =
                value === 'New'
                    ? 'bg-green-100 text-green-700'
                    : value === 'Fresh'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700';
            return (
                <span className={`px-2 py-1 text-sm rounded-full font-medium ${color}`}>
                    {value}
                </span>
            );
        },
    },
    {
        header: 'Contact Info',
        cell: ({ row }) => {
            const { phone, email } = row.original;
            return (
                <div className="text-sm text-gray-800 space-y-1">
                    <div><strong>Phone:</strong> {phone}</div>
                    <div><strong>Email:</strong> {email}</div>
                </div>
            );
        },
    },
    {
        header: 'Address & Pincode',
        cell: ({ row }) => {
            const { address, pincode } = row.original;
            return (
                <div className="text-sm text-gray-800 space-y-1">
                    <div><strong>Address:</strong> {address}</div>
                    <div><strong>Pincode:</strong> {pincode}</div>
                </div>
            );
        },
    },
    {
        header: 'Bank Details',
        cell: ({ row }) => {
            const { bankDetails } = row.original;
            return (
                <div className="text-sm text-gray-800 space-y-1">
                    <div><strong>Bank:</strong> {bankDetails.name}</div>
                    <div><strong>A/C:</strong> {bankDetails.accountNo}</div>
                    <div><strong>IFSC:</strong> {bankDetails.ifsc}</div>
                </div>
            );
        },
    },
    {
        header: 'Attachments',
        cell: ({ row }) => {
            const { attachments } = row.original;
            return (
                <ul className="text-sm list-disc list-inside text-gray-800">
                    {attachments.map((file, i) => (
                        <li key={i}>{file}</li>
                    ))}
                </ul>
            );
        },
    },
];

export default function VendorsTable() {
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
                                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-800 align-top">
                                        {flexRender(
                                            cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
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
