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
import { updateCategoryStatusService } from "@/service/category/category.service";
import { updatedPaginatedCategoryStatus } from "@/store/slices/category/category.slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
const CategoryTable = ({ data, onEdit }) => {

    const dispatch = useDispatch();
    const onToggleStatus = async (id, newStatus) => {
        try {
            const res = await updateCategoryStatusService({
                id,
                status: newStatus,
            });

            if (res?.status == 200) {

                dispatch(updatedPaginatedCategoryStatus(res.data.result));

                toast.success(
                    newStatus ? "Category activated" : "Category deactivated"
                );
            }
        } catch (err) {
            toast.error("Failed to update category status");
        }
    };

    return (
        <div className="rounded border shadow overflow-x-auto">
            <Table className="table-fixed min-w-[1100px] w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[14%]">Name</TableHead>
                        <TableHead className="w-[14%]">Slug</TableHead>
                        <TableHead className="w-[38%]">Description</TableHead>
                        <TableHead className="w-[14%]">Tags</TableHead>
                        <TableHead className="w-[10%]">Status</TableHead>
                        <TableHead className="w-[10%] text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell className="font-medium">
                                    {category.name}
                                </TableCell>

                                <TableCell className="text-muted-foreground">
                                    {category.slug}
                                </TableCell>

                                <TableCell className="whitespace-normal break-words">
                                    {category.description || "-"}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {category.tags?.length > 0 ? (
                                            category.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${category.status
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {category.status ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>

                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => onEdit(category)}
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        className={
                                                            category.status
                                                                ? "text-red-600 focus:text-red-600"
                                                                : "text-green-600 focus:text-green-600"
                                                        }
                                                        onSelect={(e) => e.preventDefault()}
                                                    >
                                                        {category.status ? (
                                                            <>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            {category.status
                                                                ? "Deactivate Category?"
                                                                : "Activate Category?"}
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {category.status
                                                                ? "This category will no longer be visible to users."
                                                                : "This category will become active and visible to users."}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                onToggleStatus(category._id, !category.status)
                                                            }
                                                            className={
                                                                category.status
                                                                    ? "bg-red-600 hover:bg-red-700"
                                                                    : "bg-green-600 hover:bg-green-700"
                                                            }
                                                        >
                                                            {category.status ? "Deactivate" : "Activate"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>


                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-center text-muted-foreground"
                            >
                                No categories found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CategoryTable;
