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

                <div className="w-full overflow-x-auto">
                    <div className="min-w-max">

                        <div className="flex items-center gap-6 py-3 px-6 bg-gray-100 font-semibold text-gray-700 border-y">
                            <div className="flex-[2] min-w-0">Blog</div>
                            <div className="flex items-center gap-6 flex-[1.2] min-w-0">
                                <span className="inline-block min-w-[80px]">Status</span>
                                <span>Date</span>
                            </div>
                            <div className="flex-[0.8] text-right shrink-0">Actions</div>
                        </div>

                        <div className="border rounded-b-lg px-0">

                            {
                                isLoading ? (<BlogRowSkeleton />) : (
                                    <>
                                        {
                                            blogs?.length > 0 ? blogs?.map((blog, index) => (
                                                <BlogRow key={blog._id} blog={blog} onDelete={handleDelete} />
                                            )) : (
                                                <div className="p-4 text-center text-gray-500">
                                                    No blog found.
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }

                        </div>

                    </div>
                </div>

            </div>


            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded border bg-primary text-white transition ${page === 1 ? "opacity-40 cursor-not-allowed" : ""
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
                    className={`px-4 py-2 rounded border bg-primary text-white transition ${page === pagination.totalPages ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                >
                    Next
                </button>
            </div>


        </MainLayout>
    )
}

export default page