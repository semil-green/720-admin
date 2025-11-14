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


export const addNewCustomerService = async (customerData) => {

    try {
        const auth_token = localStorage.getItem("token");

        const addNewCustomer = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/customer/customer-admin`, customerData,

            { headers: { Authorization: auth_token } }
        )

        return addNewCustomer
    }
    catch (err) {
        throw err
    }
}

export const getCustomerByIdService = async (customer_id) => {

    try {
        const auth_token = localStorage.getItem("token");

        const getData = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/customer/customer-admin/${customer_id}`,

            { headers: { Authorization: auth_token } }
        )

        return getData?.data
    }
    catch (err) {
        throw err
    }
}

export const updateCustomerService = async (customer_id, customerData) => {

    try {
        const auth_token = localStorage.getItem("token");

        const updateCustomer = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/customer/customer-admin/${customer_id}`, customerData,

            { headers: { Authorization: auth_token } }
        )

        return updateCustomer?.data
    }
    catch (err) {
        throw err
    }
}