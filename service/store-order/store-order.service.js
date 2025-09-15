import axios from "axios";

export const fetchStoreOrderService = async (
    page,
    limit,
    search,
    sortBy,
    sortOrder
) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        const fetchData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL
            }/api/store-orders/orders?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );

        return fetchData?.data;
    } catch (error) {
        return error;
    }
};

export const handleStoreOrderTransferService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.put(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/store-orders/update-order`,
            data,
            {
                headers: { Authorization: auth_token },
            }
        );
        return result?.data
    } catch (error) {
        return error;
    }
};
