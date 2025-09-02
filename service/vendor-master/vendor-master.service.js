import axios from "axios"

export const getAllVendorsService = async (page, limit, search, sortBy, sortType) => {
    try {
        const auth_token = localStorage.getItem("token")


        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortType) params.append("sortOrder", sortType);

        const fetchResult = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master?${params.toString()}`, {
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

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master`, data, {
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

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/vendor-master/update/${id}`, data, {
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