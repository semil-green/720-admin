import AddBlog from "@/components/blog/addBlog";
import MainLayout from "@/components/layout/mainLayout";
const page = async ({ searchParams }) => {

    const blogId = await searchParams

    return (
        <MainLayout>
            <AddBlog blogId={blogId?.id} />
        </MainLayout>
    );
}

export default page