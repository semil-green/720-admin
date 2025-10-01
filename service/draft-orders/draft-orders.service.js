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

export const getSlotByPincodeAndStoreIdService = async (pincode, store_id) => {

    try {

        const auth_token = localStorage.getItem("token");

        const fetchSlotData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/draft-orders/getSlotByPincodeAndStoreId/${pincode}/${store_id}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return fetchSlotData?.data
    }
    catch (error) {
        return error
    }
}

export const addNewDraftOrderService = async (data) => {

    try {
        const auth_token = localStorage.getItem("token");

        const saveDraftOrder = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/draft-orders/addOrderByDraftOrder`, data, {
            headers: {
                Authorization: auth_token
            }
        });
        return saveDraftOrder?.data
    }
    catch (error) {
        return error
    }
}

export const createNewPidgeOrderService = async (data) => {

    try {
        const auth_token = localStorage.getItem("token");

        const createPidge = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/draft-orders/createPidgeOrderByDraftOrder`, data, {
            headers: {
                Authorization: auth_token
            }
        });
        return createPidge?.data
    }
    catch (error) {
        return error
    }
}