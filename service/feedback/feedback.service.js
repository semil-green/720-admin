import axios from "axios";

export const getFeedbackService = async (page, limit, search, sort, sortBy) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();

        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);
        if (sortBy) params.append("sortBy", sortBy);

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL
            }/api/v1/feedback?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );
        return result?.data;
    } catch (error) {
        return error;
    }
};

export const addNewFeedbackService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const saveNewFeedback = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/feedback`,
            data,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );

        return saveNewFeedback?.data;
    } catch (error) {
        return error;
    }
};

export const getFeedbackByIdService = async (feedback_id) => {
    try {
        const auth_token = localStorage.getItem("token");

        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/feedback/${feedback_id}`,
            { headers: { Authorization: auth_token } }
        );
        return result?.data;
    } catch (error) {
        return error;
    }
};


export const updateFeedbackService = async (feedback_id, data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const updateData = await axios.put(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/feedback/update/${feedback_id}`, data,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );

        return updateData?.data

    }
    catch (error) {
        return error
    }
}

export const deleteFeedbackService = async (feedback_id) => {
    try {

        const auth_token = localStorage.getItem("token")

        const deleteRecord = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/feedback/${feedback_id}`,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return deleteRecord?.data
    }
    catch (error) {
        return error
    }
}