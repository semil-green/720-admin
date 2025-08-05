"use client";

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
import { Loader2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { toast } from "sonner"
import { deleteSlotService } from "@/service/picode-wise-slot/picode-wise-slot.service";
import { deletePincodeSlot } from "@/store/slices/picode-wise-slot/picode-wise-slot.service";
import { useDispatch } from "react-redux";


export default function SlotTable({ allSlotsOfPincode, isLoading, onEdit }) {
    const dispatch = useDispatch();

    const handleDelete = async (id) => {

        const res = await deleteSlotService(id);

        if (res?.status === 200) {
            dispatch(deletePincodeSlot(id));
            toast.success("Deleted", { description: "Slot deleted successfully" });
        }
        else {
            toast.error("Failed to delete slot");
        }
    };
    const columns = [
        {
            accessorKey: "slot_name",
            header: "Slot",
        },
        {
            accessorKey: "from_time",
            header: "From",
        },
        {
            accessorKey: "to_time",
            header: "To",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const slot = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(slot)}>
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
                                        <AlertDialogTitle>Delete Slot?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this slot? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(slot.id)}>
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
        data: allSlotsOfPincode,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full mx-auto mt-10">
            <div className="overflow-hidden rounded-xl shadow border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="!bg-[#fff0dc]">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-md font-semibold text-gray-800 text-center"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-6">
                                    <Loader2 className="animate-spin h-5 w-5 mx-auto text-primary" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-sm text-gray-700 py-3 text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center text-sm text-gray-500 py-6"
                                >
                                    No slots found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
