"use client";

import { fetchBlogsbySlugService } from "@/service/blogs/blogs.service";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "../loader/loader";

const BlogDetailPage = ({ slug }) => {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);
                const res = await fetchBlogsbySlugService(slug);
                setBlogData(res?.result);
            } catch (err) {
                toast.error("Something went wrong. Failed to fetch blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) return <Loader />;
    if (!blogData) return null;

    const cleanBlogHTML = (html) => {
        return html
            .replace(/<p><br\s*\/?><\/p>/gi, "")
            .replace(/<p>\s*<\/p>/gi, "");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {blogData?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                <span>
                    By <span className="font-medium text-gray-700">{blogData?.author?.name}</span>
                </span>
                <span>•</span>
                <span className="inline-block  text-sm font-medium text-primary">
                    {blogData?.category?.name}
                </span>
                <span>•</span>
                <span>
                    {new Date(blogData?.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
                <span>•</span>
                <span
                    className={`font-medium ${blogData?.status === "Published"
                        ? "text-green-600"
                        : "text-yellow-600"
                        }`}
                >
                    {blogData?.status}
                </span>
            </div>

            {blogData?.image && (
                <div className="w-full h-[280px] md:h-[400px] overflow-hidden rounded-xl mb-8">
                    <img
                        src={blogData.image}
                        alt={blogData.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <article
                className="blog-content max-w-none"
                dangerouslySetInnerHTML={{
                    __html: cleanBlogHTML(blogData.description),
                }}
            />

        </div>
    );
};

export default BlogDetailPage;
