"use client"

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

export default function SlotTable({ pinCodeSLot }) {
    const columns = [
        {
            accessorKey: "slot",
            header: "Slot",
        },
        {
            accessorKey: "from",
            header: "From",
        },
        {
            accessorKey: "to",
            header: "To",
        },
    ];

    const table = useReactTable({
        data: pinCodeSLot,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full mx-auto mt-10">

            <div className="overflow-hidden rounded-xl shadow border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="!bg-[#fff0dc] ">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-md font-semibold text-gray-800 text-center "
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="text-sm text-gray-700 py-3 text-center">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

