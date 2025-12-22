import axios from "axios";

export const getAllAuthorsService = async (page, limit) => {

    try {
        const auth_token = localStorage.getItem("auth_token");

        const fetchAuthors = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/author/all`, {
            params: {
                page,
                limit
            },
            headers: {
                authorization: auth_token,
            },
        });

        return fetchAuthors
    } catch (err) {
        throw err;
    }
}

export const addNewAuthorService = async (formData) => {

    try {
        const auth_token = localStorage.getItem("auth_token");

        const saveAuthor = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/author/create`, formData, {
            headers: {
                authorization: auth_token,
            },
        });

        return saveAuthor
    } catch (err) {
        throw err;
    }
}

export const updateAuthorService = async (payload) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const updateAuthor = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/author/edit`, payload, {
            headers: {
                authorization: auth_token,
            },
        });

        return updateAuthor
    }
    catch (err) {
        throw err;
    }
}


export const updateAuthorStatusService = async (payload) => {

    try {

        const auth_token = localStorage.getItem("auth_token");

        const updateStatus = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/author/update-status`, payload, {
            headers: {
                authorization: auth_token,
            },
        });

        return updateStatus
    }
    catch (err) {
        throw err;
    }
}