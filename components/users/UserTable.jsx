import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";
import { MoreVertical, Pencil, Trash2, Eye, EyeOff, Copy } from "lucide-react";
import { editUserData } from "@/store/slices/user-slice/user.slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


export default function UserTable({ data, onDelete, page, limit, totalPages, setPage, setLimit }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState({}); // per-user visibility state

    const handleTogglePassword = (userId) => {
        setShowPassword((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    const handleCopyPassword = async (password) => {
        try {
            await navigator.clipboard.writeText(password);
            toast.success("Password copied to clipboard");
        } catch {
            toast.error("Failed to copy password");
        }
    };
    const handleSetPage = (newPage) => {
        const pageNum = Number(newPage);
        if (!isNaN(pageNum) && pageNum >= 1) {
            setPage(pageNum);
        }
    };

    const handleSetLimit = (newLimit) => {
        const parsed = Number(newLimit);
        if (!isNaN(parsed)) {
            setLimit(parsed);
            handleSetPage(1);
        }
    };

    const columns = [
        {
            accessorKey: "Profile",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <img
                        src={user.profile_image || "https://i.pravatar.cc/100"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-sm"
                    />
                );
            },
        },
        { accessorKey: "full_name", header: "Name" },
        { accessorKey: "contact_number", header: "Mobile No" },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "password",
            header: "Password",
            cell: ({ row }) => {
                const user = row.original;
                const isVisible = showPassword[user.id];
                const passwordText = isVisible ? user.password : "********";
                return (
                    <div className="flex items-center gap-2">
                        <span className="font-mono">{passwordText}</span>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleTogglePassword(user.id)}
                            className="h-6 w-6"
                        >
                            {isVisible ? (
                                <EyeOff className="h-4 w-4 text-slate-600" />
                            ) : (
                                <Eye className="h-4 w-4 text-slate-600" />
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleCopyPassword(user.password)}
                            className="h-6 w-6"
                        >
                            <Copy className="h-4 w-4 text-slate-600" />
                        </Button>
                    </div>
                );
            },
        },
        { accessorKey: "name", header: "Role" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original;
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
                                    router.push(`/users/new?id=${user.id}`);
                                    dispatch(editUserData(user));
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
                                        <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete(user.id)}>
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
                        data.map((user, index) => (
                            <TableRow key={index}>
                                {columns.map((col) => (
                                    <TableCell key={col.accessorKey || col.id}>
                                        {col.cell
                                            ? col.cell({ row: { original: user } })
                                            : user[col.accessorKey]}
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
