import axios from "axios"

export const getAllDarkStorePackagingCenter = async (queryParams) => {

    const auth_token = localStorage.getItem("token")

    try {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc`,
            {
                params: queryParams,
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


export const addNewDarkStorePackagingCenter = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/add`, data,
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

export const updateDarkStorePackagingCenter = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/update/${id}`, data,
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

export const deleteDarkStorePackagingCenterService = async (id) => {
    try {

        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/delete/${id}`,
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