import axios from "axios"

export const getAllDarkStorePackagingCenter = async () => {
    try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc`)

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const addNewDarkStorePackagingCenter = async (data) => {
    try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/add`, data)

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const updateDarkStorePackagingCenter = async (id, data) => {
    try {

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/update/${id}`, data)
        return result?.data
    }
    catch (error) {
        return error
    }
}

export const deleteDarkStorePackagingCenterService = async (id) => {
    try {
        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/delete/${id}`)
        return result?.data
    }
    catch (error) {
        return error
    }
}