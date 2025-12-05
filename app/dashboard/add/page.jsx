"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/mainLayout";

export default function AddBlogPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Draft");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // If API call: create new FormData()
        const newBlog = {
            title,
            description,
            status,
            image: preview, // replace with uploaded image URL from API
            date: new Date().toLocaleDateString("en-GB"),
        };

        console.log("Saved Blog:", newBlog);

        // After API success
        router.push("/admin/blog"); // redirect to listing
    };

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto p-6">
                {/* Page Title */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Add New Blog</h1>
                    <button
                        onClick={() => router.push("/admin/blog")}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blog Title */}
                    <div>
                        <label className="block font-medium mb-1">Blog Title</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Blog Description */}
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block font-medium mb-1">Status</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option>Draft</option>
                            <option>Published</option>
                        </select>
                    </div>

                    {/* Image Upload + Preview */}
                    <div>
                        <label className="block font-medium mb-1">Cover Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-48 h-32 object-cover rounded border"
                            />
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded text-lg"
                    >
                        Save Blog
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}
