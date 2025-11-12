import axios from "axios"

export const getALlWorkFlowService = async (page, limit, search, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token")

        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/work-flow?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return data?.data
    } catch (err) {
        return err
    }
}

export const addNewWorkFlowService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const addItem = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/work-flow`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return addItem?.data
    }
    catch (error) {
        return error
    }
}

export const deleteWorkflowService = async (workflow_id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const data = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/work-flow/${workflow_id}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return data?.data
    } catch (err) {
        throw err
    }
}

export const getWorkflowbyIdService = async (workflow_id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/work-flow/${workflow_id}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return data?.data?.data
    } catch (err) {
        return err
    }
}

export const editWorkflowService = async (workflow_id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/work-flow/update/${workflow_id}`, data, {
            headers: {
                Authorization: auth_token
            }
        })

        return result?.data
    }
    catch (error) {
        throw error
    }
}