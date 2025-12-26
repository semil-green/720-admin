"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
    return (
        <div className="rounded border shadow overflow-x-auto animate-pulse">
            <Table className="table-fixed min-w-[1100px] w-full">
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columns }).map((_, index) => (
                            <TableHead key={index} className="py-4">
                                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <TableCell key={colIndex} className="py-5">
                                    <div className="h-4 w-full bg-gray-200 rounded" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableSkeleton;
