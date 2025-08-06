'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash2, MoreVertical } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { deleteVendor } from '@/store/slices/vendor-master/vendor-master.slice';
import { deleteVendorService } from '@/service/vendor-master/vendor-master.service';

export default function VendorsTable({
    vendorData,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
}) {
    const dispatch = useDispatch();

    const handleDelete = async (id) => {

        const res = await deleteVendorService(id);
        if (res?.status === 200) {
            dispatch(deleteVendor(id));
            toast.success("Deleted", { description: "Vendor deleted successfully" });
        } else {
            toast.error("Failed to delete vendor");
        }
    };

    const columns = [
        {
            header: 'Vendor Name',
            accessorKey: 'vendor_name',
        },
        {
            header: 'GST',
            accessorKey: 'gst',
        },
        {
            header: 'Contact',
            cell: ({ row }) => (
                <div className="text-sm text-gray-800 space-y-1">
                    <div><strong>Phone:</strong> {row.original.contact_number}</div>
                    <div><strong>GPay:</strong> {row.original.gpay_number}</div>
                </div>
            ),
        },
        {
            header: 'UPI / Bank',
            cell: ({ row }) => (
                <div className="text-sm text-gray-800 space-y-1">
                    <div><strong>UPI:</strong> {row.original.upi_id}</div>
                    <div><strong>Bank:</strong> {row.original.account_name}</div>
                </div>
            ),
        },
        {
            header: 'Address',
            accessorKey: 'address',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const vendor = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/vendors/new?id=${vendor.id}`}>
                                    <div className="flex items-center">
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </div>
                                </Link>
                            </DropdownMenuItem>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Vendor?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(vendor.id)}>
                                            Confirm Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: vendorData?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: totalPages,
    });

    return (
        <div className="rounded border p-4 pt-0 shadow">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
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
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-3 text-sm text-gray-800">
                                    {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        Previous
                    </Button>
                    <span className="text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                        Next
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Rows per page:</span>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {[2, 5, 10, 20].map((val) => (
                            <option key={val} value={val}>
                                {val}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
