import BlogDetailPage from '@/components/blog/blogDetailPage'
import React from 'react'

const page = async ({ params }) => {

    const { slug } = await params

    return (
        <div>
            <BlogDetailPage slug={slug} />
        </div>
    )
}

export default page