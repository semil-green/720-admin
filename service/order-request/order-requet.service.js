import axios from "axios";

export const getAllOrderRequestService = async (page, limit, search, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (sortBy) params.append("sortBy", sortBy);
        if (search) params.append("search", search);

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/order-request?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );
        return result?.data;
    } catch (error) {
        return error;
    }
};

export const addNewOrderRequestService = async (data) => {
    try {

        const auth_token = localStorage.getItem("token");

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/order-request/create`, data, {
            headers: { Authorization: auth_token },
        });

        return result?.data;
    } catch (error) {
        return error;
    }
};

export const updateOrderRequestService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token");
        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/order-request/update/${id}`, data, {
            headers: { Authorization: auth_token },
        });
        return result?.data;
    } catch (error) {
        return error;
    }
};

export const deleteOrderRequestService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token");
        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/order-request/delete/${id}`, {
            headers: { Authorization: auth_token },
        });
        return result?.data;
    } catch (error) {
        return error;
    }
};