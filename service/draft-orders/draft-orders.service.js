import axios from "axios";

export const fetchCustomersDfService = async (search) => {
    try {
        const auth_token = localStorage.getItem("token");
        const params = new URLSearchParams();

        if (search) params.append("search", search);

        const searchUser = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL
            }/api/v1/draft-orders/getCustomer?${params.toString()}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );

        return searchUser?.data;
    } catch (error) {
        return error;
    }
};

export const getUserAddesssByIdService = async (customer_id) => {

    try {
        const auth_token = localStorage.getItem("token");

        const fetchUserAddress = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/draft-orders/getAddressByCustomer/${customer_id}`, { headers: { Authorization: auth_token } });

        return fetchUserAddress?.data
    }
    catch (error) {
        return error
    }
}

export const getStoresAvailableForUser = async (pincode) => {

    try {
        const auth_token = localStorage.getItem("token");

        const fetchAvailableStoresData = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/draft-orders/getStoreByPincode/${pincode}`, { headers: { Authorization: auth_token } });

        return fetchAvailableStoresData?.data
    }
    catch (error) {
        return error
    }
}

export const searchProductForDraftOrderService = async (store_id, productName) => {

    try {

        const auth_token = localStorage.getItem("token");

        const fetchproductData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/draft-orders/getProductsByStore/${store_id}?search=${productName}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return fetchproductData?.data
    }
    catch (error) {
        return error
    }
}