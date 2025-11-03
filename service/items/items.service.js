import axios from "axios"

export const getAllItemsService = async (page, limit, search, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token")

        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product?search=${search}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
            , {
                headers: {
                    Authorization: auth_token
                }
            })

        return data?.data
    } catch (err) {
        return err
    }
}

export const addNewItemService = async (data) => {

    try {

        const auth_token = localStorage.getItem("token")

        const addItem = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return addItem?.data
    }
    catch (error) {
        throw error;
    }
}

export const getitemById = async (itemId) => {

    try {
        const auth_token = localStorage.getItem("token")

        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product/${itemId}`, {
            headers: {
                Authorization: auth_token
            }
        })


        return data?.data?.data
    }
    catch (error) {
        return error
    }
}

export const deleteItemService = async (itemId) => {
    try {
        const auth_token = localStorage.getItem("token")

        const data = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product/${itemId}`, {
            headers: {
                Authorization: auth_token
            }
        })

        return data?.data
    }
    catch (error) {
        return error
    }
}

export const allCollectionsService = async () => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/collection?page=1&limit=10000`,

            {
                headers: {
                    Authorization: auth_token
                }
            })

        return result?.data?.data
    }
    catch (error) {
        return error
    }
}

export const updateItemService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product/${id}`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const duplicateProductService = async (product_id) => {

    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product/duplicate/${product_id}`, {}, {
            headers: {
                Authorization: auth_token
            }
        })

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const activateProductService = async (product_id) => {

    try {

        const auth_token = localStorage.getItem("token")

        const activateService = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product/update-status`,
            {
                product_id: product_id,
                status: true
            },
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return activateService?.data
    }
    catch (error) {
        return error
    }
}