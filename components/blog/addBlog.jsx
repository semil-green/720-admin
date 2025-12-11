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
    const [date, setDate] = useState(new Date());
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

        if (!fileInputRef.current?.files?.[0]) {
            toast.error("Please select an image.");
            return;
        }

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

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("date", new Date().toISOString());
        formData.append("image", fileInputRef.current.files[0]);

        try {
            setLoading(true);
            const saveBlog = await addNewBlogService(formData);

            if (saveBlog?.status === 200) {
                toast.success("Blog added successfully.");
                router.push("/dashboard");
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
            setDate(data?.date || null);
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

        if (!file && !preview) {
            toast.error("Please select an image.");
            return;
        }

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

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("id", blogId);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("status", status);
            formData.append("date", date);

            const selectedFile = fileInputRef.current?.files?.[0];

            if (selectedFile) {
                formData.append("image", selectedFile);
            } else if (preview) {
                formData.append("image", preview);
            }

            const updateBlog = await updateBlogService(formData);

            if (updateBlog?.status === 200) {
                toast.success("Blog updated successfully.");
                router.push("/dashboard");
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

            <div className="mx-auto flex justify-end">

            </div>
            <div className="max-w-3xl mx-auto my-4">
                {/* Page Title */}
                <div className="flex flex-col md:flex-row  items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Add New Blog</h1>

                </div>

                {/* Form */}
                <form className="space-y-6">
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
                            className="w-full border rounded px-3 py-2 resize-none overflow-hidden"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            placeholder="Write blog description..."
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
                </form>
                <div className="flex gap-4 justify-center my-4">

                    {
                        blogId ?
                            (<button
                                type="submit"
                                className=" px-4 py-1.5 bg-primary text-white rounded text-lg"
                                onClick={handleUpdate}
                            >
                                Update Blog
                            </button>)
                            :
                            (<button
                                type="submit"
                                className=" px-4 py-1.5 bg-primary text-white rounded text-lg"
                                onClick={handleSubmit}

                            >
                                Save Blog
                            </button>)
                    }

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddBlog