import axios from "axios"

export const fetchAllRawMaterialService = async (page, limit, storeId, search, sort, sortBy) => {
    try {

        const auth_token = localStorage.getItem("token")

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (storeId) params.append("store_id", storeId);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        if (sortBy) params.append("sortBy", sortBy);

        const fetchData = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inventories/raw-materials?${params.toString()}`, {
            headers: {
                Authorization: auth_token
            }
        })

        return fetchData?.data
    }
    catch (error) {
        return error
    }
}

export const fetchFinishedMaterialService = async (page, limit, storeId, search, sort, sortBy) => {
    try {

        const auth_token = localStorage.getItem("token")

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (storeId) params.append("store_id", storeId);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        if (sortBy) params.append("sortBy", sortBy);

        const fetchData = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inventories/finished-products?${params.toString()}`, {
            headers: {
                Authorization: auth_token
            }
        })

        return fetchData?.data
    }
    catch (error) {
        return error
    }
}