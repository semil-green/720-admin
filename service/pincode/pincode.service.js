import axios from "axios"

export const addNewPincodeService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode/add`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    } catch (error) {
        return error
    }
}

export const updatePincodeService = async (pincodeId, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode/update/${pincodeId}`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    } catch (error) {
        return error
    }
}

export const deletePincodeService = async (pincodeId) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/pincode/delete/${pincodeId}`,
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