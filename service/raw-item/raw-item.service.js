import axios from "axios";

export const getAllRawItemsService = async (page, limit, searchRawItem, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/rawitem?search=${searchRawItem}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        const allowedSortBy = ["raw_item", "sku", "unit"];
        const allowedSortOrder = ["ASC", "DESC"];

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
        return error
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