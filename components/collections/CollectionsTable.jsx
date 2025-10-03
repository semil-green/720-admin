'use client';

import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';
import { MoreVertical, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { activateCollectionsService, deleteCollectionService } from '@/service/collections/collections.service';
import { toast } from "sonner";
import { activateCollection, deleteCollection } from '@/store/slices/collections/collections.slice';
import { useDispatch } from "react-redux";

export default function CollectionsTable({ allCollectionsData, totalPage, page, setPage, totalRecordCount }) {

    const router = useRouter();
    const dispatch = useDispatch();

    const handleDelete = async (collectionId) => {

        const res = await deleteCollectionService(collectionId);

        if (res?.status === 200) {
            dispatch(deleteCollection(collectionId))
            toast.success("Deleted", { description: "Collection deleted successfully" });
        }
    }

    const handleCollectionActivate = async (collection) => {

        try {

            const { collection_id, status } = collection

            const updatedStatus = status == true ? false : true

            const res = await activateCollectionsService(collection_id, updatedStatus)

            if (res?.status == 200 || res?.status == 201) {

                const updatedCollection = { ...collection, status: updatedStatus };
                dispatch(activateCollection(updatedCollection));
            }
        }
        catch (error) {
            toast.error("Failed to update status");
        }

    }

    const columns = [
        {
            header: 'Product',
            accessorKey: 'title',
            cell: ({ row }) => {
                const { image, title } = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <Image
                            src={image}
                            alt={"image"}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                        />
                        <span>{title}</span>
                    </div>
                );
            },
        },
        {
            header: 'Products',
            accessorKey: 'no_of_products',
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const value = getValue();
                return value ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>;
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const collection = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => router.push(`/collections/new?id=${collection.collection_id}`)}
                            >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Collection?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(collection.collection_id)}>
                                            Confirm Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-green-600 hover:text-white hover:bg-green-600 rounded-sm">
                                            <ShieldCheck className="mr-2 h-4 w-4" />
                                            Activate
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Activate Collection?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to activate this Collection?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleCollectionActivate(collection)}>

                                                Confirm Activate
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: allCollectionsData,
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
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {page} of {totalPage} , <span className='ml-4'>  Total : {totalRecordCount}</span>
                </span>
                <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(p + 1, totalPage))}
                    disabled={page === totalPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
