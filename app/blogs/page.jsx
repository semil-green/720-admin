"use client";
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { fetchAllBlogsService } from "@/service/blogs/blogs.service";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setAllBlogs } from "@/store/slices/blogs/blogs.slice";
import BlogRowSkeleton from "@/components/skeleton/blogSkeleton";
import BlogRow from "@/components/blog/blogRow";
import { Input } from "@/components/ui/input";
import { FileX } from "lucide-react";
import { BlogsPagination } from "@/components/pagination/blogsPagination";
import { handleUnauthorized } from "@/lib/lib/handleUnauthorized";

const page = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const dispatch = useDispatch();

    const blogsData = async () => {
        try {
            setIsLoading(true);
            const data = await fetchAllBlogsService(page, limit, search);

            if (data) {
                dispatch(setAllBlogs(data?.data?.blogs || []));
                setPagination({
                    page: data?.data?.pagination?.page,
                    totalPages: data?.data?.pagination?.totalPages,
                });
            }
        } catch (err) {
            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error(err?.response?.data?.result || "Failed to fetch blog data");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        blogsData();
    }, [page, debouncedSearch]);

    const blogs = useSelector((state) => state.blogSlice.blogs);

    const handleDelete = (id) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-0 lg:px-0 ">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
                    <div></div>

                    <button
                        onClick={() => router.push("/blogs/add")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary/90 transition"
                    >
                        + Add New Blog
                    </button>
                </div>

                <div className="mb-5">
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search blogs by title or Description"
                        className="max-w-md"
                    />
                </div>

                <div className="">
                    <div className="w-full overflow-x-auto">
                        <div className="divide-y divide-gray-100">
                            {isLoading ? (
                                <BlogRowSkeleton />
                            ) : blogs?.length > 0 ? (
                                blogs.map((blog) => (
                                    <div key={blog._id}>
                                        <BlogRow blog={blog} onDelete={handleDelete} />
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-w-[700px]">
                                    <div className="bg-gray-100 rounded-full p-4 mb-4">
                                        <FileX className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        No blogs found
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 max-w-sm">
                                        We couldn’t find any blogs matching your search. Try a
                                        different keyword or create a new blog.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BlogsPagination page={page} setPage={setPage} pagination={pagination} />

        </MainLayout>
    );
};

export default page;
