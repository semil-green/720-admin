"use client";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
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
    AlertDialogAction
} from "@/components/ui/alert-dialog";

export default function BlogRow({ blog, onDelete }) {
    const router = useRouter();

    return (
        // ensure wrapper has full width and can scroll
        <div >
            {/* make inner container allowed to grow wider than wrapper */}
            <div className="min-w-max flex items-center gap-6 py-4 px-6 border-b hover:bg-gray-50 transition">

                {/* Image + Title + Description */}
                <div className="flex items-center gap-4 flex-[2] min-w-0">
                    <img
                        src={"/default.jpg"}
                        alt={blog.title}
                        className="w-20 h-14 object-cover rounded"
                    />

                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                            {blog.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {blog.description.split(" ").slice(0, 20).join(" ") + "..."}
                        </p>


                    </div>
                </div>

                {/* Status + Date */}
                <div className="flex items-center gap-6 flex-[1.2] text-sm text-gray-600 min-w-0">
                    <span
                        className={`px-2 py-1 rounded text-md font-medium text-white shrink-0 text-center inline-block min-w-[80px] ${blog.status === "Published" ? "bg-green-600" : "bg-yellow-600"
                            }`}
                    >
                        {blog.status || "Draft"}
                    </span>

                    <span className="truncate">{blog.date || "N/A"}</span>
                </div>

                {/* Actions Dropdown */}
                <div className="flex items-center justify-end flex-[0.8] shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-gray-200 rounded">
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            {/* Edit */}
                            {/* <DropdownMenuItem
                                onClick={() => router.push(`/admin/blog/edit/${blog.id}`)}
                            >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem> */}
                            <DropdownMenuItem
                                // onClick={() => router.push(`/admin/blog/edit/${blog.id}`)}
                                className="hover:!bg-blue-600 hover:text-white cursor-pointer"
                            >
                                <Pencil className="mr-2 h-4 w-4 hover:text-white" /> Edit
                            </DropdownMenuItem>


                            {/* Delete with confirmation */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="hover:!bg-red-600 hover:text-white">
                                        <Trash2 className="mr-2 h-4 w-4 hover:!bg-red-600 hover:text-white" /> Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete this blog post? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => onDelete(blog.id)}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Confirm Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
