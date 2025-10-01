import axios from "axios"

export const getDayOffByStoreId = async (storeId) => {
    const auth_token = localStorage.getItem("token")

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/day-off/get-day-off-by-store-id/${storeId}`,
            {
                headers: {
                    Authorization: auth_token,
                }
            }
        );
        return response.data;
    }
    catch (error) {
        return error
    }
};


export const saveDayOff = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/day-off`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data;
    }
    catch (error) {
        return error
    }
}

export const deleteDayOff = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/day-off/${id}`,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }
    catch (error) {
        return error
    }
}