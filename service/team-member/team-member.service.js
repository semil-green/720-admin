import axios from "axios";

export const addNewTeamMemberService = async (formData) => {

    try {
        const auth_token = localStorage.getItem("auth_token");

        const saveTeamMember = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/user/create`, formData,

            {
                headers: {
                    authorization: auth_token,
                },
            }
        )

        return saveTeamMember
    }
    catch (err) {
        throw err
    }
}

export const fetchAllTeamMemberService = async (page, limit, search) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const fetchTeamMembers = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/user/all`,
            {
                params: {
                    page,
                    limit,
                    search
                },
                headers: {
                    authorization: auth_token,
                },
            }
        )

        return fetchTeamMembers
    } catch (err) {
        throw err
    }
}

export const updateTeamMemberService = async (payload) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const updateTeamMember = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/user/edit`, payload,
            {
                headers: {
                    authorization: auth_token,
                },
            }
        )

        return updateTeamMember
    } catch (err) {
        throw err
    }
}

export const updateTeamMemberStatusService = async (payload) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const updateStatus = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/user/update-status`, payload,
            {
                headers: {
                    authorization: auth_token,
                },
            }
        )

        return updateStatus
    } catch (err) {
        throw err
    }
}

export const updateTeamMemberPasswordService = async (payload) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const updatePassword = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/user/update-password`, payload,
            {
                headers: {
                    authorization: auth_token,
                },
            }
        )

        return updatePassword
    } catch (err) {
        throw err
    }
}