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

        if (!fileInputRef.current?.files?.[0]) {
            toast.error("Please select an image.");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("date", new Date(date).toISOString());

        formData.append("image", fileInputRef.current.files[0]);

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

            console.log("data123", JSON.stringify(data, null, 2));
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

        const file = fileInputRef.current?.files?.[0];

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

        if (!file && !preview) {
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

            const selectedFile = fileInputRef.current?.files?.[0];

            if (selectedFile) {
                formData.append("image", selectedFile);
            } else if (preview) {
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
        <div>
            {loading && <Loader />}

            <div className="max-w-3xl mx-auto my-8">

                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Add New Blog</h1>
                </div>


                <div className="bg-white shadow-md rounded-lg p-6 border">
                    <form className="space-y-6">


                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Blog Title</label>
                            <Input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Description</label>
                            <Textarea
                                className="w-full border rounded-lg px-3 py-2 resize-none overflow-hidden focus:outline-none focus:border-primary"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                                placeholder="Write blog description..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Blog Date</label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-white"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>


                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Status</label>
                            <select
                                className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-primary"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Draft</option>
                                <option>Published</option>
                            </select>
                        </div>

                        {/* Blog Image */}
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Blog Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-white"
                            />

                            {/* Preview */}
                            {preview && (
                                <div className="relative mt-3 w-56 h-36 group">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg border shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm opacity-90 hover:bg-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>

                    <div className="flex gap-4 justify-center mt-6">
                        {blogId ? (
                            <button
                                type="submit"
                                className="px-4 py-1 bg-primary text-white rounded-lg text-md shadow hover:opacity-90 transition"
                                onClick={handleUpdate}
                            >
                                Update Blog
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-1 bg-primary text-white rounded-lg text-md shadow hover:opacity-90 transition"
                                onClick={handleSubmit}
                            >
                                Save Blog
                            </button>
                        )}

                        <button
                            onClick={() => router.push("/blogs")}
                            className="px-4 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-md shadow"
                        >
                            Back
                        </button>
                    </div>
                </div>

                {/* Buttons */}

            </div>

        </div>
    )
}

export default AddBlog