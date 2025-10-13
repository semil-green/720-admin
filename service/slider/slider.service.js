import axios from "axios"

export const getAllSlidersService = async (page, limit) => {
    try {
        const auth_token = localStorage.getItem("token")
        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/slider?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return data?.data?.data
    }
    catch (error) {
        return error
    }
}

export const addNewSliderService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/slider`, data, {
            headers: {
                Authorization: auth_token
            }
        })
        return result?.data
    }
    catch (error) {
        return error
    }
}

export const getSliderByIdService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/slider/${id}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return result?.data
    }
    catch (error) {
        return error
    }
}

export const updateSliderService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/slider/update/${id}`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return result?.data
    }
    catch (error) {
        return error
    }
}

export const deleteSliderService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/slider/${id}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return result?.data
    }
    catch (error) {
        return error
    }
}

export const updateSliderStatusService = async (slider_id, status) => {

    try {
        const updateStatus = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/slider/update-status`, {
            slider_id,
            status
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        return updateStatus?.data
    }
    catch (error) {
        return error
    }
}