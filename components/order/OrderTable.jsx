"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderTable({ data, totalPages, page, setPage }) {
    const storeColumns = () => [
        {
            accessorKey: "order_id",
            header: "Order ID",
            cell: ({ row }) => {
                const order = row.original;
                return <Link href={`/orders/${order.order_id}`}>{order?.order_id}</Link>;
            },
        },
        {
            accessorKey: "created_date",
            header: "Created",
            cell: ({ row }) => {
                const rawDate = row.original?.created_date;
                if (!rawDate) return <span>-</span>;

                const date = new Date(rawDate);

                const formatted = date.toLocaleString("en-GB", {
                    timeZone: "UTC",
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });

                return <span className="text-md">{formatted}</span>;
            },
        },
        {
            accessorKey: "customer_name",
            header: "Customer",
            cell: ({ row }) => (
                <Link href={`/orders/${row.original.order_id}`}>
                    <span className="text-md">{row.original?.customer_name}</span>
                </Link>
            ),
        },
        {
            accessorKey: "final_price",
            header: "Total",
            cell: ({ row }) => <div className="text-md">₹ {row?.original?.final_price}</div>,
        },
        {
            accessorKey: "payment_status_name",
            header: "Payment Status",
            cell: ({ row }) => {
                const status = row.original.payment_status_name;

                let statusClass = "text-gray-500";
                switch (status) {
                    case "Pending":
                        statusClass = "text-yellow-600";
                        break;
                    case "Success":
                        statusClass = "text-emerald-500";
                        break;
                    case "Failed":
                        statusClass = "text-red-600";
                        break;
                    case "RefundInitiated":
                        statusClass = "text-orange-500";
                        break;
                    case "Refunded":
                        statusClass = "text-blue-600";
                        break;
                    default:
                        statusClass = "text-gray-500";
                }

                return (
                    <div className={`text-sm px-4 ${statusClass}`}>
                        {status || "Null"}
                    </div>
                );
            },
        },
        {
            accessorKey: "payment_mode",
            header: "Payment Mode",
            cell: ({ row }) => {
                const status = row.original.payment_mode;
                return (
                    <div
                        className={`text-sm font-medium px-4 ${status === "Razorpay"
                            ? "text-purple-500"
                            : status === "COD"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                    >
                        {status || "Unknown"}
                    </div>
                );
            },
        },
        {
            accessorKey: "order_items_count",
            header: "Items",
            cell: ({ row }) => <span className="text-md">{row.original.order_items_count}</span>,
        },
        {
            accessorKey: "address",
            header: "Destination",
            cell: ({ row }) => <span className="text-md">{row.original?.address}</span>,
        },
    ];

    const table = useReactTable({
        data,
        columns: storeColumns(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="rounded border p-4 pt-0 shadow">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="px-4">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="px-4 py-2">
                                        <div className="py-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={table.getAllColumns().length} className="text-center py-4 text-gray-500">
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            <div className="flex items-center justify-between mt-4">
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
