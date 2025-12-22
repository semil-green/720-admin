"use client";
import { useState } from "react";
import { Pencil, Trash2, MoreHorizontal, Upload, FileX, Calendar, Eye, Edit } from "lucide-react";
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
                toast.success(
                    `Blog ${newStatus === "Published" ? "published" : "moved to drafts"}.`
                );
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
            <div className="bg-white border-2 rounded-lg shadow-md hover:shadow-md transition overflow-visible md:overflow-hidden my-4 hover:border-[#00D4FF]
    focus-within:border-[#00D4FF]">
                <div className="flex flex-col sm:flex-row">

                    <div className="sm:w-64 w-full flex items-center justify-center px-4 py-4 sm:py-6">
                        <div className="w-full aspect-[4/3] max-h-[180px] overflow-hidden bg-gray-100 rounded-lg">
                            <img
                                src={blog?.image || "/placeholder.jpg"}
                                alt={blog?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 p-6 sm:pl-8">
                        <div className="flex items-start justify-between gap-4">

                            <div className="flex-1 min-w-0 pr-2">
                                <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 leading-snug min-h-[3.25rem] mb-2">
                                    {blog?.title || "Untitled Blog"}
                                </h2>

                                <p className="text-gray-600 line-clamp-2 leading-relaxed min-h-[3rem] mb-4 max-w-[100%]"
                                    dangerouslySetInnerHTML={{ __html: blog?.description || "No description provided." }}

                                />

                                <div className="flex items-center text-sm text-gray-500 gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formattedDate}</span>

                                    <span className="mx-1 text-gray-400">|</span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${isPublished
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-amber-100 text-amber-800"
                                            }`}
                                    >
                                        {blog?.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-5">

                            <button
                                className="flex items-center gap-2  py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                                onClick={() => router.push(`/blogs/add/?slug=${blog?.slug}`)}

                            >
                                <Edit size={18} />
                                Edit
                            </button>

                            <button
                                onClick={() => handleOpenStatusDialog(blog?._id, blog?.status)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${isPublished
                                    ? "text-amber-600 hover:bg-amber-50"
                                    : "text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                {isPublished ? (
                                    <>
                                        <FileX size={18} />
                                        Move to Draft
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} />
                                        Move to Publish
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {selectedBlogStatus === "Draft"
                                ? "Publish Blog Post?"
                                : "Draft Blog Post?"}
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
                            className={
                                selectedBlogStatus === "Draft"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-amber-600 hover:bg-amber-700"
                            }
                            onClick={handleConfirmStatusChange}
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>


    );
}
