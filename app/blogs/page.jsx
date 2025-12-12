"use client";
import MainLayout from '@/components/layout/mainLayout'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { fetchAllBlogsService } from '@/service/blogs/blogs.service';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { setAllBlogs } from '@/store/slices/blogs/blogs.slice';
import BlogRowSkeleton from '@/components/skeleton/blogSkeleton';
import BlogRow from '@/components/blog/blogCard';
import { Input } from '@/components/ui/input';
import { FileX } from "lucide-react";

const page = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1
    });
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const dispatch = useDispatch();

    const blogsData = async () => {

        try {
            setIsLoading(true)
            const data = await fetchAllBlogsService(page, limit, search)

            if (data) {
                dispatch(setAllBlogs(data?.data?.blogs || []));
                setPagination({
                    page: data?.data?.pagination?.page,
                    totalPages: data?.data?.pagination?.totalPages,
                });
            }
        }
        catch (err) {
            toast.error(err?.response?.data?.result || "Login failed. Please try again.");
        }
        finally {
            setIsLoading(false)
        }
    }


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
            <div className="max-w-6xl mx-auto ">
                <div className="flex justify-end items-center  p-6">
                    {/* <h1 className="text-3xl font-bold">Blogs</h1> */}
                    <button
                        onClick={() => router.push("/blogs/add")}
                        className="px-5 py-2 bg-primary text-white rounded"
                    >
                        + Add New Blog
                    </button>
                </div>

                <div className='flex flex-col gap-2 my-4'>
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}

                        placeholder="Search Blog......"
                    />
                </div>

                <div className="w-full space-y-4">

                    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                        <div className="w-full overflow-x-auto">

                            <div className="min-w-[700px] flex items-center gap-4 px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">

                                <div className="flex-1 min-w-[300px]">Blog Details</div>

                                <div className="w-[110px] text-center">Status</div>

                                <div className="w-[120px] text-center">Date</div>

                                <div className="w-[40px] text-right"></div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <BlogRowSkeleton />
                                ) : (
                                    blogs?.length > 0 ? (
                                        blogs.map((blog) => (
                                            <BlogRow key={blog._id} blog={blog} onDelete={handleDelete} />
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-w-[700px]">
                                            <div className="bg-gray-100 rounded-full p-4 mb-3">
                                                <FileX className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <h3 className="text-sm font-medium text-gray-900">No blogs found</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Get started by creating your first blog post.
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-2 py-1 rounded border bg-primary text-white transition ${page === 1 ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                >
                    Previous
                </button>

                <span className="font-semibold">
                    Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                    disabled={page === pagination.totalPages || blogs?.length === 0}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-1 rounded border bg-primary text-white transition ${page === pagination.totalPages ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                >
                    Next
                </button>
            </div>


        </MainLayout>
    )
}

export default page