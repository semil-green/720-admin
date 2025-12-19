import axios from "axios";

export const getAllAuthorsService = async () => {

    try {
        const auth_token = localStorage.getItem("auth_token");

        const fetchAuthors = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/author/all`, {
            headers: {
                authorization: auth_token,
            },
        });

        return fetchAuthors
    } catch (err) {
        throw err;
    }
}