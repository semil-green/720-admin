"use client";
import MainLayout from '@/components/layout/mainLayout'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import BlogCard from '../blog/blblogCard';
import BlogRow from '../blog/blblogCard';

const page = () => {
    const router = useRouter();

    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Top 10 Travel Destinations",
            description: "Explore the most exciting places in 2025...",
            image: "https://source.unsplash.com/random/800x600/?travel",
            status: "Published",
            date: "2022-01-01"
        },
        {
            id: 2,
            title: "Learn React in 30 Days",
            description: "Roadmap to become a React developer step by step...",
            image: "https://source.unsplash.com/random/800x600/?coding",
            status: "Published",
            date: "2022-01-01"
        },
        {
            id: 3,
            title: "Why Fitness Matters",
            description: "Fitness is not just a routine, it's a lifestyle...",
            image: "https://source.unsplash.com/random/800x600/?fitness",
            status: "Draft",
            date: "2022-01-01"
        },
    ]);

    const handleDelete = (id) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
    };
    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto ">
                {/* Header + Add Button */}
                <div className="flex justify-between items-center mb-6 p-6">
                    <h1 className="text-3xl font-bold">Blogs</h1>
                    <button
                        onClick={() => router.push("/dashboard/add")}
                        className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        + Add New Blog
                    </button>
                </div>

                {/* Table Header */}
                {/* Scroll wrapper for full table */}
                <div className="w-full overflow-x-auto">
                    {/* Inner width should expand to trigger scrolling */}
                    <div className="min-w-max">

                        {/* Table Header */}
                        <div className="flex items-center gap-6 py-3 px-6 bg-gray-100 font-semibold text-gray-700 border-y">
                            <div className="flex-[2] min-w-0">Blog</div>
                            <div className="flex items-center gap-6 flex-[1.2] min-w-0">
                                <span className="inline-block min-w-[80px]">Status</span>
                                <span>Date</span>
                            </div>
                            <div className="flex-[0.8] text-right shrink-0">Actions</div>
                        </div>

                        {/* Blog List */}
                        <div className="border rounded-b-lg px-0">
                            {blogs.map((blog) => (
                                <BlogRow key={blog.id} blog={blog} onDelete={handleDelete} />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </MainLayout>
    )
}

export default page