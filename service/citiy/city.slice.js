import axios from "axios";

export const getALlCitiesService = async (page, limit, search, sortBy, sortOrder) => {
    try {

        const auth_token = localStorage.getItem("token")

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/city?${params.toString()}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return data?.data
    } catch (err) {

        return err
    }
}

export const addNewCityService = async (data) => {
    try {

        const auth_token = localStorage.getItem("token")

        const addItem = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/city`, data, {
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

export const updateCityService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const updateItem = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/city/${id}`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return updateItem?.data
    }
    catch (error) {
        return error
    }
}

export const deleteCityService = async (city_id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const deleteItem = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/city/${city_id}`, {
            headers: {
                Authorization: auth_token
            }
        })

        return deleteItem?.data
    }
    catch (error) {
        return error
    }
}