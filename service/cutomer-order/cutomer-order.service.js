import axios from "axios";

export const getAllCustomerOrdersService = async (
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

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL
            }/api/admin-customer-orders?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );

        return result?.data;
    } catch (error) {
        return error;
    }
};

export const getCustomerOrderByIdService = async (order_id) => {
    const auth_token = localStorage.getItem("token");
    try {
        const fetchData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/admin-customer-orders/order/${order_id}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );

        return fetchData?.data;
    } catch (error) {
        return error;
    }
};

export const fetchOrderStatusTypesService = async () => {
    try {
        const auth_token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/admin-customer-orders/order-statuses`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return response?.data;
    } catch (error) {
        return error;
    }
};

export const updateOrderStatusService = async (order_id, order_status) => {
    try {
        const auth_token = localStorage.getItem("token");
        const updateOrderStatus = await axios.put(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/admin-customer-orders/order-statuses/${order_id}`,
            { order_status: order_status },
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return updateOrderStatus?.data;
    } catch (error) {
        return error;
    }
};

export const getCustomerOrdersHistoryService = async (customer_id, page) => {
    try {
        const auth_token = localStorage.getItem("token");

        const fetchData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/customer/customers/orders/${customer_id}?page=${page}`,
            { headers: { Authorization: auth_token } }
        );

        return fetchData?.data
    } catch (error) {
        return error;
    }
};

export const updatePaymentStatusService = async (order_id, payment_status) => {

    try {
        const auth_token = localStorage.getItem("token");

        const updatePaymentStatus = await axios.put(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/admin-customer-orders/update-payment-status`,
            { orderId: order_id, paymentStatus: payment_status },
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return updatePaymentStatus?.data;
    } catch (error) {
        throw error;
    }

};