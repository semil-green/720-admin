import axios from "axios";

export const fetchAllBlogsService = async (page, limit) => {
    try {
        const auth_token = localStorage.getItem("auth_token");

        const fetchBlogs = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/blog/all`,
            { page, limit },
            {
                headers: {
                    authorization: auth_token,
                }
            }
        );

        return fetchBlogs;
    } catch (err) {
        throw err;
    }
};


export const addNewBlogService = async (formData) => {
    try {
        const auth_token = localStorage.getItem("auth_token");

        const saveBlog = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/blog/create`,
            formData,
            {
                headers: {
                    authorization: auth_token,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return saveBlog;
    } catch (err) {
        throw err;
    }
};


export const updateBlogStatusService = async (blogId, newStatus) => {

    try {
        const auth_token = localStorage.getItem("auth_token");

        const updateStatus = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/blog/update-status`,
            {
                id: blogId,
                status: newStatus
            },
            {
                headers: {
                    authorization: auth_token,
                }
            }
        )

        return updateStatus
    }
    catch (err) {
        throw err
    }
}

export const fetchBlogsByIdService = async (blogId) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const fetchBlog = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/blog/get-by-id/${blogId}`, {},
            {
                headers: {
                    authorization: auth_token,
                }
            }
        )

        return fetchBlog?.data
    }
    catch (err) {
        throw err
    }
}


export const updateBlogService = async (formData) => {

    try {
        const auth_token = localStorage.getItem("auth_token");

        const updateBlog = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/blog/edit`,
            formData,
            {
                headers: {
                    authorization: auth_token,
                }
            }
        )

        return updateBlog
    }
    catch (err) {
        throw err
    }
}