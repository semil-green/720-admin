"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddBlogPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Draft");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
            <div className="mx-auto flex justify-end">

            </div>
            <div className="max-w-3xl mx-auto my-4">
                {/* Page Title */}
                <div className="flex flex-col md:flex-row  items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Add New Blog</h1>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blog Title */}
                    <div>
                        <label className="block font-medium mb-1">Blog Title</label>
                        <Input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Blog Description */}
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <Textarea
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary:hover"
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
                    {/* <div>
                        <label className="block font-medium mb-1">Cover Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-48 h-32 object-cover rounded border"
                            />
                        )}
                    </div> */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary mt-2"
                    />

                    {preview && (
                        <div className="relative mt-3 w-48 h-32">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded border"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                    }
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                                ×
                            </button>
                        </div>
                    )}
                    {/* Submit */}
                    <div className="flex gap-4 justify-center my-4">
                        <button
                            type="submit"
                            className=" px-4 py-1.5 bg-primary text-white rounded text-lg"
                        >
                            Save Blog
                        </button>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded"
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
