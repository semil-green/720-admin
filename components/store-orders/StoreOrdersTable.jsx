"use client";

import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Button } from "../ui/button";

export default function StoreOrdersTable({
    data,
    onTransferClick,
    page,
    totalPages,
    setPage,
    setDisplayTransferFields,
    setEditData
}) {
    const columns = [
        {
            header: "Order No.",
            accessorKey: "id",
        },
        {
            header: "Order Date & Time",
            accessorKey: "created_at",
            cell: ({ row }) => {
                const date = new Date(row.original.created_at);
                const formattedDate = date.toLocaleDateString("en-GB");
                const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                });
                return `${formattedDate} ${formattedTime}`;
            },
        },
        {
            header: "Product",
            accessorKey: "product.title",
        },
        {
            header: "Store",
            accessorKey: "packaging_center.store_name",
        },
        {
            header: "Store Remarks",
            accessorKey: "remarks",
        },
        {
            header: "Demanded Qty",
            accessorKey: "quantity",
        },
        {
            header: "Transferred Qty",
            accessorKey: "transferred_quantity",
            cell: ({ row }) => row.original.transferred_quantity ?? 0,
        },
        {
            header: "PC Remarks",
            accessorKey: "transferred_remarks",
            cell: ({ row }) => row.original.transferred_remarks ?? "-",
        },
        {
            header: "Transfer Date & Time",
            accessorKey: "transferred_date",
            cell: ({ row }) => {
                const dateValue = row.original.transferred_date;
                if (!dateValue) return "-";

                const date = new Date(dateValue);
                const formattedDate = date.toLocaleDateString("en-GB");
                const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                });

                return `${formattedDate} ${formattedTime}`;
            },
        },
        {
            header: "Action",
            cell: ({ row }) => (
                <Button
                    className="text-sm"
                    onClick={() => { onTransferClick(row.original), setDisplayTransferFields(true), setEditData(row.original) }}
                >
                    Transfer
                </Button>
            ),
        },
    ];

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

        <div className="overflow-x-auto rounded border shadow bg-white mt-4">
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
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
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
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={table.getVisibleFlatColumns().length}
                                className="px-4 py-6 text-center text-gray-500 text-sm"
                            >
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

            <div className="flex items-center justify-between mt-4 px-3 py-3">

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

    );
}
