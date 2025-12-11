"use client";
import { useState } from "react";
import { Pencil, Trash2, MoreVertical, Upload, FileX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { updateBlogStatusService } from "@/service/blogs/blogs.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateBlogStatus } from "@/store/slices/blogs/blogs.slice";
import { useRouter } from "next/navigation";
export default function BlogRow({ blog, onDelete }) {
    const [openStatusDialog, setOpenStatusDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [selectedBlogStatus, setSelectedBlogStatus] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();
    const handleOpenStatusDialog = (id, status) => {
        setSelectedBlogId(id);
        setSelectedBlogStatus(status);
        setOpenStatusDialog(true);
    };

    const handleConfirmStatusChange = async () => {
        const newStatus = selectedBlogStatus === "Draft" ? "Published" : "Draft";

        dispatch(updateBlogStatus({ ...blog, status: newStatus }));

        try {
            const updateStatus = await updateBlogStatusService(selectedBlogId, newStatus);
            if (updateStatus?.status !== 200) {
                dispatch(updateBlogStatus({ ...blog, status: selectedBlogStatus }));
                toast.error("Failed to update blog status.");
            } else {
                toast.success("Blog status updated successfully.");
            }
        } catch {
            dispatch(updateBlogStatus({ ...blog, status: selectedBlogStatus }));
            toast.error("Failed to update blog status.");
        } finally {
            setOpenStatusDialog(false);
        }
    };


    const handleOpenDeleteDialog = (id) => {
        setSelectedBlogId(id);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        onDelete(selectedBlogId);
        setOpenDeleteDialog(false);
    };

    const formattedDate = new Date(blog?.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });


    return (
        <div className="min-w-max flex items-center gap-6 py-4 px-6 border-b hover:bg-gray-50 transition">

            <div className="flex items-center gap-4 flex-[2] min-w-0">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded">
                    <img
                        src={blog?.image || "default.jpg"}
                        alt={blog?.title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{blog?.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {blog?.description?.split(" ").slice(0, 10).join(" ") + "..."}
                    </p>
                </div>
            </div>


            {/* Status + Date */}
            <div className="flex items-center gap-6 flex-[1.2] text-sm text-gray-600 min-w-0">
                <span
                    className={`px-2 py-1 rounded text-md font-medium text-white shrink-0 text-center inline-block min-w-[80px] ${blog?.status === "Published" ? "bg-green-600" : "bg-yellow-600"
                        }`}
                >
                    {blog.status || "Draft"}
                </span>
                <span className="truncate">{formattedDate || "N/A"}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end flex-[0.8] shrink-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-gray-200 rounded">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {/* Edit */}
                        <DropdownMenuItem className="hover:!bg-blue-600 hover:text-white cursor-pointer"
                            onClick={() => router.push(`/dashboard/add/?id=${blog?._id}`)}
                        >
                            <Pencil className="mr-2 h-4 w-4 hover:text-white" /> Edit
                        </DropdownMenuItem>

                        {/* Publish / Draft */}
                        <DropdownMenuItem
                            onClick={() => handleOpenStatusDialog(blog?._id, blog?.status)}
                            className="flex gap-2 items-center hover:!bg-blue-600 hover:text-white cursor-pointer"
                        >
                            {blog?.status === "Draft" ? (
                                <>
                                    <Upload size={16} className="mr-2 h-4 w-4 hover:text-white" /> Publish
                                </>
                            ) : (
                                <>
                                    <FileX size={16} className="mr-2 h-4 w-4 hover:text-white" /> Make Draft
                                </>
                            )}
                        </DropdownMenuItem>

                        {/* Delete */}
                        {/* <DropdownMenuItem
                            onClick={() => handleOpenDeleteDialog(blog._id)}
                            className="flex gap-2 items-center hover:!bg-red-600 hover:text-white cursor-pointer"
                        >
                            <Trash2 size={16} /> Delete
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Status Dialog */}
            <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {selectedBlogStatus === "Draft" ? "Publish Blog?" : "Make Blog Draft?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to {selectedBlogStatus === "Draft" ? "publish" : "make this blog draft"}?
                            This action can be reversed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleConfirmStatusChange}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Dialog */}
            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this blog post? This action cannot
                            be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleConfirmDelete}
                        >
                            Confirm Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
