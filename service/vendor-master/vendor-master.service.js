import axios from "axios"

export const getAllVendorsService = async (queryParams) => {
    try {
        const auth_token = localStorage.getItem("token")

        const fetchResult = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master`, {
            params: queryParams,
            headers: {
                Authorization: auth_token
            }
        })

        return fetchResult?.data
    }
    catch (error) {
        return error
    }
}

export const addNewVendorService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master/add`, data, {
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

export const updateVendorService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master/update/${id}`, data, {
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

export const deleteVendorService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master/delete/${id}`, {
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