"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addNewBlogService, fetchBlogsByIdService, updateBlogService } from "@/service/blogs/blogs.service";
import { toast } from "sonner";
import Loader from "../loader/loader";

const AddBlog = ({ blogId }) => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Published");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [date, setDate] = useState(() => {
        const today = new Date().toISOString().split("T")[0];
        return today;
    });
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!title) {
            toast.error("Please enter title");
            return;
        }

        if (!description) {
            toast.error("Please enter description");
            return;
        }

        if (!status) {
            toast.error("Please select status");
            return;
        }

        if (!image) {
            toast.error("Please select an image.");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("date", new Date(date).toISOString());

        formData.append("image", image);

        try {
            setLoading(true);
            const saveBlog = await addNewBlogService(formData);

            if (saveBlog?.status === 200) {
                toast.success("Blog added successfully.");
                router.push("/blogs");
            }
        } catch (err) {
            toast.error(err?.response?.data?.result || "Failed to add new blog.");
        } finally {
            setLoading(false);
        }
    };


    const fetchBlogbyId = async () => {

        if (!blogId) return;
        try {

            setLoading(true);

            const fetchData = await fetchBlogsByIdService(blogId)
            const data = fetchData?.result;

            setTitle(data?.title || "");
            setDescription(data?.description || "");
            setStatus(data?.status || "Published");
            setPreview(data?.image ? data.image : null);
            setImage(data?.image || null);
            setDate(
                data?.date
                    ? new Date(data.date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
            );

        }
        catch (err) {
            toast.error(err?.response?.data?.result || "Failed to fetch blog data");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogbyId();
    }, [blogId])

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title) {
            toast.error("Please enter title");
            return;
        }

        if (!description) {
            toast.error("Please enter description");
            return;
        }

        if (!status) {
            toast.error("Please select status");
            return;
        }

        if (!image && !preview) {
            toast.error("Please select an image.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("id", blogId);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("status", status);
            formData.append("date", new Date(date).toISOString());

            /**
             * IMAGE HANDLING
             * ----------------
             * If user selected a new image → send File
             * Else → send existing image URL
             */
            if (image) {
                // NEW IMAGE SELECTED
                formData.append("image", image);
            } else {
                // IMAGE NOT CHANGED → SEND EXISTING URL
                formData.append("image", preview);
            }

            const updateBlog = await updateBlogService(formData);

            if (updateBlog?.status === 200) {
                toast.success("Blog updated successfully.");
                router.push("/blogs");
            }
        } catch (err) {
            toast.error(err?.response?.data?.result || "Failed to update blog.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {loading && <Loader />}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                    <form className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Title <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter blog title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Description <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                                rows={5}
                                placeholder="Write your blog description here..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Publish Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option>Draft</option>
                                    <option>Published</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Featured Image <span className="text-red-500">*</span>
                            </label>

                            {!preview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                                                ⬆️
                                            </div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative rounded-lg overflow-hidden border">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            setImage(null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                            }
                                        }}
                                        className="absolute top-3 right-3 h-8 w-8 bg-red-500 text-white
                                   rounded-full flex items-center justify-center hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center mt-6">
                    <button
                        onClick={() => router.push("/blogs")}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Back
                    </button>

                    <button
                        onClick={blogId ? handleUpdate : handleSubmit}
                        className="px-6 py-3 bg-primary text-white rounded-lg  shadow-sm"
                    >
                        {blogId ? "Update Blog Post" : "Publish Blog Post"}
                    </button>
                </div>

            </div>
        </div>
    );

}

export default AddBlog