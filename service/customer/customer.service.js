import axios from "axios";

export const getAllCustomerService = async (page, limit, search, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/customer/customers?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );

        return result?.data
    } catch (error) {
        return error;
    }
};
