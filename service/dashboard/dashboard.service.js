import axios from "axios";

export const getDashboardOrdersService = async (
    filter,
    start_date,
    end_date
) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (filter) params.append("filter", filter);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/order/get-order-dashboard?${params.toString()}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );

        return result?.data;
    } catch (error) {
        return error;
    }
};


export const getAllDashboardItemService = async (filter, start_date, end_date, type, limit) => {
    try {
        const auth_token = localStorage.getItem("token");
        const params = new URLSearchParams();

        if (filter) params.append("filter", filter);
        if (type) params.append("type", type);
        if (limit) params.append("limit", limit);

        if (filter === "custom" && start_date && end_date) {
            params.append("start_date", start_date);
            params.append("end_date", end_date);
        }

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/order/get-selling-items?${params.toString()}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );

        return result?.data;
    } catch (error) {
        return error;
    }
};

