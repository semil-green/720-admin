"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

const AuthorTable = ({ data }) => {
    return (
        <div className="rounded border shadow overflow-x-auto">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-3">Name</TableHead>
                        <TableHead className="px-4 py-3">Slug</TableHead>
                        <TableHead className="px-4 py-3">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((author) => (
                            <TableRow key={author._id}>
                                <TableCell className="font-medium px-4 py-3">
                                    {author.name}
                                </TableCell>

                                <TableCell className="text-muted-foreground px-4 py-3">
                                    {author.slug}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${author.status
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {author.status ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="text-center text-muted-foreground"
                            >
                                No authors found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AuthorTable;
