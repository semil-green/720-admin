import axios from "axios";

export const fetchAlltagsService = async () => {
    try {
        const auth_token = localStorage.getItem("token");

        const fetchData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/tags`,
            { headers: { Authorization: auth_token } }
        );

        return fetchData;
    } catch (error) {
        return error;
    }
};

export const addNewTagService = async (tag_name) => {
    try {
        const auth_token = localStorage.getItem("token");

        const addNewTag = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/tags/create`,
            { tag_name },
            { headers: { Authorization: auth_token } }
        );

        return addNewTag;
    } catch (error) {
        return error;
    }
};
