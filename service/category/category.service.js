import axios from "axios";

export const addNewCategoryService = async (formData) => {
    try {
        const auth_token = localStorage.getItem("auth_token");

        const saveCategory = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/category/create`,
            formData,
            {
                headers: {
                    authorization: auth_token,
                },
            }
        );

        return saveCategory
    } catch (err) {
        throw err;
    }
}

export const fetchAllCategoriesService = async (page, limit) => {
    try {
        const auth_token = localStorage.getItem("auth_token");

        const fetchCategories = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/category/all`,
            {
                params: {
                    page,
                    limit,
                },
                headers: {
                    authorization: auth_token,
                },
            }
        );

        return fetchCategories?.data
    } catch (err) {
        throw err;
    }
}

export const updateCategoryService = async (formData) => {
    try {
        const auth_token = localStorage.getItem("auth_token");

        const updateCategory = await axios.put(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/category/edit`,
            formData,
            {
                headers: {
                    authorization: auth_token,
                },
            }
        );

        return updateCategory
    } catch (err) {
        throw err;
    }
}

export const updateCategoryStatusService = async (payload) => {
    try {
        const auth_token = localStorage.getItem("auth_token");

        return await axios.put(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/category/update-status`,
            payload,
            {
                headers: {
                    authorization: auth_token,
                },
            }
        );
    } catch (err) {
        throw err;
    }
};
