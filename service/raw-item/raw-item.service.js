import axios from "axios";

export const getAllRawItemsService = async (page, limit, search, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);



        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/rawitem?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );

        return result?.data?.data;
    } catch (error) {
        return error;
    }
};

export const addNewRawItemService = async (data) => {
    try {

        const auth_token = localStorage.getItem("token")

        const addItem = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/rawitem`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return addItem?.data
    }
    catch (error) {
        return error
    }
}

export const updateRawItemService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/rawitem/update/${id}`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return result?.data
    }
    catch (error) {
        throw error
    }
}

export const deleteRawItemService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/rawitem/${id}`, {
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

export const rawItemActivateService = async (raw_item_id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/rawitem/update-status`, {
            raw_id: raw_item_id,
            status: true
        },
            {
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