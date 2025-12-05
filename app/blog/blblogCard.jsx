"use client";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function BlogRow({ blog, onDelete }) {
    const router = useRouter();

    return (
        <div className="flex items-center gap-6 py-4 px-6 border-b hover:bg-gray-50 transition">

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
                    <p className="text-sm text-gray-500 truncate">
                        {blog.description}
                    </p>
                </div>
            </div>

            {/* Status + Date */}
            <div className="flex items-center gap-6 flex-[1.2] text-sm text-gray-600 min-w-0">
                <span
                    className={`px-2 py-1 rounded text-xs text-white shrink-0 ${blog.status === "Published" ? "bg-green-600" : "bg-yellow-600"
                        }`}
                >
                    {blog.status || "Draft"}
                </span>

                <span className="truncate">{blog.date || "N/A"}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end flex-[0.8] shrink-0">
                <button
                    // onClick={() => router.push(`/admin/blog/edit/${blog.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                    <Pencil size={16} /> Edit
                </button>

                <button
                    // onClick={() => onDelete(blog.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                >
                    <Trash2 size={16} /> Delete
                </button>
            </div>
        </div>
    );
}
