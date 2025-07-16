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
    amount: '₹2,220.00',
  },
  {
    name: 'Dipshankar Sur',
    emailStatus: 'Not subscribed',
    location: 'Gurgaon HR, India',
    orders: '5 orders',
    amount: '₹2,400.00',
  },
  {
    name: 'Dipshankar Sur',
    emailStatus: 'Not subscribed',
    location: 'Gurgaon HR, India',
    orders: '3 orders',
    amount: '₹300.00',
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

export default function UserAllTables() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      {/* Custom Headings */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium text-gray-600">
        <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">Unfulfilled</button>
        <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">Unpaid</button>
        <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">Open</button>
        <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">Archived</button>
        <button className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">Local Delivery</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          {/* Removed <thead> */}
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
