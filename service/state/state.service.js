import axios from "axios"


export const getAllStatesService = async (page, limit, search, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        const fetchStates = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/state?${params.toString()}`,
            {
                headers: { Authorization: auth_token },
            }
        );

        return fetchStates?.data;
    } catch (error) {
        return error;
    }
};

export const addNewStateService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const addNewState = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/state`, data, {
            headers: { Authorization: auth_token },
        })

        return addNewState?.data
    }
    catch (error) {
        return error
    }
}

export const updateStateService = async (state_id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const updateState = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/state/${state_id}`, data, {
            headers: { Authorization: auth_token },
        })

        return updateState?.data
    }
    catch (error) {
        return error
    }
}

export const deleteStateService = async (state_id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const deleteState = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/state/${state_id}`, {
            headers: { Authorization: auth_token },
        })

        return deleteState?.data
    }
    catch (error) {
        return error
    }
}