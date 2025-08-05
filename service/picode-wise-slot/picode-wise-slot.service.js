import axios from "axios";

export const getAllSlotsforPincodeService = async (dark_store_packaging_center_id, pincode_id) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode-wise-slot`,
            {
                dark_store_packaging_center_id,
                pincode_id
            },
            {
                headers: {
                    Authorization: auth_token,
                    "Content-Type": "application/json"
                }
            }
        );

        return result?.data;
    } catch (error) {
        return error;
    }
};


export const addNewSlotService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode-wise-slot/add`, data, {
            headers: {
                Authorization: auth_token,
            }
        });

        return result?.data
    } catch (error) {
        return error;
    }
};

export const updateSlotService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode-wise-slot/update/${id}`, data, {
            headers: {
                Authorization: auth_token,
            }
        });

        return result?.data
    } catch (error) {
        return error;
    }
};

export const deleteSlotService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode-wise-slot/delete/${id}`, {
            headers: {
                Authorization: auth_token,
            }
        });

        return result?.data
    } catch (error) {
        return error;
    }
};