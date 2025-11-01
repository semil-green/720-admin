import axios from "axios";

export const getDiscountsService = async (
    page,
    limit,
    search,
    type,
    sortBy,
    sortOrder
) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (type) params.append("type", type);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (sortBy) params.append("sortBy", sortBy);
        if (search) params.append("search", search);

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL
            }/api/discount?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );

        return result?.data;
    } catch (error) {
        return error;
    }
};

export const addNewDiscount = async (data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/discount/create`,
            data,
            { headers: { Authorization: auth_token } }
        );

        return result?.data;
    } catch (error) {
        return error;
    }
};

export const getDiscountByIdService = async (discount_id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/discount/${discount_id}`, { headers: { Authorization: auth_token } })

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const updateDiscountService = (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/discount/update/${id}`, data, { headers: { Authorization: auth_token } })

        return result
    }
    catch (error) {
        return error
    }
}

export const deleteDiscountService = (id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/discount/delete/${id}`, { headers: { Authorization: auth_token } })

        return result
    }
    catch (error) {
        return error
    }
}

export const activateDiscountService = async (discountId) => {

    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/discount/activate/${discountId}`, {}, { headers: { Authorization: auth_token } })

        return result
    }
    catch (error) {
        return error
    }
}