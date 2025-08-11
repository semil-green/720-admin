import axios from "axios"

export const getAllCategoriesService = async () => {

    const auth_token = localStorage.getItem("token")

    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/category`,

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