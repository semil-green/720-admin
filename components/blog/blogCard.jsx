"use client";
import { useState } from "react";
import { Pencil, Trash2, MoreHorizontal, Upload, FileX, Calendar } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
                toast.success(`Blog ${newStatus === "Published" ? "published" : "moved to drafts"}.`);
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

    const isPublished = blog?.status === "Published";
    const statusStyles = isPublished
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-amber-50 text-amber-700 border-amber-200";

    return (
        <>
            <div className="group flex items-center gap-4 py-3 px-6 border-b border-gray-100 bg-white hover:hover:bg-blue-50 transition-colors min-w-[700px]">

                <div className="flex items-center gap-4 flex-1 min-w-[300px]">
                    <div className="flex-shrink-0 relative h-12 w-16 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                        <img
                            src={blog?.image || "/placeholder.jpg"}
                            alt={blog?.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate text-sm">
                            {blog?.title || "Untitled Blog"}
                        </h3>
                        <p className="text-sm text-gray-500 truncate mt-0.5">
                            {blog?.description || "No description provided."}
                        </p>
                    </div>
                </div>

                <div className="flex-shrink-0 w-[110px] flex justify-center">
                    <span
                        className={`inline-flex items-center justify-center w-[85px] px-2 py-0.5 rounded-full text-xs font-semibold border ${statusStyles}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isPublished ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        {blog.status || "Draft"}
                    </span>
                </div>

                <div className="flex-shrink-0 w-[120px] text-sm text-gray-500 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{formattedDate}</span>
                </div>

                <div className="flex-shrink-0 w-[40px] flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="h-8 w-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                                onClick={() => router.push(`/blogs/add/?id=${blog?._id}`)}
                                className="cursor-pointer"
                            >
                                <Pencil className="mr-2 h-4 w-4 text-gray-500" /> Edit Blog
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => handleOpenStatusDialog(blog?._id, blog?.status)}
                                className="cursor-pointer"
                            >
                                {isPublished ? (
                                    <>
                                        <FileX className="mr-2 h-4 w-4 text-gray-500" /> Unpublish
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4 text-gray-500" /> Publish
                                    </>
                                )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => handleOpenDeleteDialog(blog._id)}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {selectedBlogStatus === "Draft" ? "Publish Blog Post?" : "Revert to Draft?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {selectedBlogStatus === "Draft"
                                ? "This blog post will be visible to all visitors."
                                : "This blog post will be hidden from your site."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className={selectedBlogStatus === "Draft" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700"}
                            onClick={handleConfirmStatusChange}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove the blog and its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}