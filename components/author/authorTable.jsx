"use client";
import { useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { MoreVertical, Pencil, Trash2, CheckCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
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
import { useDispatch } from "react-redux";
import { updateAuthorStatusService } from "@/service/author/author.service";
import { updateAllAuthorsStatus, updatePaginatedAuthorStatus } from "@/store/slices/author/author.slice";
import { toast } from "sonner";
import { handleUnauthorized } from "@/lib/lib/handleUnauthorized";
const AuthorTable = ({ data, onEdit }) => {

    const [openDropdown, setOpenDropdown] = useState(null);

    const dispatch = useDispatch();
    const onToggleStatus = async (id, newStatus) => {
        try {
            const res = await updateAuthorStatusService({
                id,
                status: newStatus,
            });

            if (res?.status == 200) {

                dispatch(updatePaginatedAuthorStatus(res.data.result));
                dispatch(updateAllAuthorsStatus(res.data.result))
                toast.success(
                    newStatus ? "Author activated" : "Author deactivated"
                );
                setOpenDropdown(null);
            }
        } catch (err) {

            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Failed to update author status");
            }
        }
    };
    return (
        <div className="rounded border shadow overflow-x-auto">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-3">Name</TableHead>
                        <TableHead className="px-4 py-3">Slug</TableHead>
                        <TableHead className="px-4 py-3">Status</TableHead>
                        <TableHead className="px-4 py-3 text-center">Actions</TableHead>
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

                                <TableCell className="text-center">
                                    <DropdownMenu

                                        open={openDropdown === author._id}
                                        onOpenChange={(open) =>
                                            setOpenDropdown(open ? author._id : null)
                                        }>
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
                                                onClick={() => onEdit(author)}
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem
                                                        className={
                                                            author.status
                                                                ? "text-red-600 focus:text-red-600"
                                                                : "text-green-600 focus:text-green-600"
                                                        }
                                                        onSelect={(e) => e.preventDefault()}
                                                    >
                                                        {author.status ? (
                                                            <>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            {author.status
                                                                ? "Deactivate Author?"
                                                                : "Activate Author?"}
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {author.status
                                                                ? "This author will no longer be visible to users."
                                                                : "This author will become active and visible to users."}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                onToggleStatus(author._id, !author.status)
                                                            }
                                                            className={
                                                                author.status
                                                                    ? "bg-red-600 hover:bg-red-700"
                                                                    : "bg-green-600 hover:bg-green-700"
                                                            }
                                                        >
                                                            {author.status ? "Deactivate" : "Activate"}
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
