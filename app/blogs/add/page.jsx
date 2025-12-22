import AddBlog from "@/components/blog/addBlog";
import MainLayout from "@/components/layout/mainLayout";
const page = async ({ searchParams }) => {

    const blogId = await searchParams

    return (
        <MainLayout>
            <AddBlog blogSlug={blogId?.slug} />
        </MainLayout>
    );
}

export default page