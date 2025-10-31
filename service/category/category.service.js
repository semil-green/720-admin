import axios from "axios"

export const getAllCategoriesService = async (page, limit, searchCategories, sortBy, sortOrder) => {

    const auth_token = localStorage.getItem("token")


    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (searchCategories) params.append("search", searchCategories);
    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/category?${params.toString()}`,

            {
                headers: {
                    Authorization: auth_token
                }
            }
        )
        return result?.data
    }
    catch (error) {
        return error
    }
}

export const addNewCategoryService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/category`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const updateCategoryService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/category/update/${id}`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const deleteCategoryService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/category/${id}`,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const activateCateoryService = async (category_id, status) => {

    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/category/update-status`, { category_id, status },
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }

    catch (error) {
        return error
    }
}