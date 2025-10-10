"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteStateService } from "@/service/state/state.service";
import { deleteState } from "@/store/slices/state/state.slice";
import { toast } from "sonner";
import { deleteHsnCodeService } from "@/service/hsn-code/hsn-code.service";
import { deleteHsnCode } from "@/store/slices/hsn-code/hsn-code.slice";

const HsnTable = ({ data, setEditData, isHsnModalOpen }) => {

    const dispatch = useDispatch();
    const handleSetPage = (newPage) => {
        if (newPage >= 1) setPage(newPage);
    };
    const handleSetLimit = (newLimit) => {
        setLimit(newLimit);
        handleSetPage(1);
    };

    const handleDelete = async (id) => {

        const res = await deleteHsnCodeService(id);

        if (res?.status === 200 || res?.status === 201) {
            dispatch(deleteHsnCode(id));
            toast.success("Deleted", { description: "HSN code deleted successfully" });
        }

        else {

            toast.error(res?.response?.data?.message || "Failed to delete HSN code");
        }

    };

    const columns = [
        { accessorKey: "hsn_no", header: "HSN Number" },
        { accessorKey: "gst_percentage", header: "GST Percentage" },
        { accessorKey: "hsn_code", header: "HSN Code" },
        { accessorKey: "remarks", header: "Remakrs" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const state = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    isHsnModalOpen(true);
                                    setEditData(state);
                                }}
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
                                        <AlertDialogTitle>Delete State?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(state.hsn_id)}>
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

    return (
        <div className="rounded border p-4 pt-0 shadow">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.accessorKey || col.id}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((state) => (
                            <TableRow key={state.hsn_id}>
                                {columns.map((col) => (
                                    <TableCell key={col.accessorKey || col.id}>
                                        {col.cell
                                            ? col.cell({ row: { original: state } })
                                            : state[col.accessorKey]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default HsnTable;
