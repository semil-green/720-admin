import axios from "axios"

export const getAllUsersService = async (page, limit) => {
    try {

        const auth_token = localStorage.getItem("token")

        const fetchUserData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        );

        return fetchUserData?.data;
    } catch (error) {
        return error;
    }
};


export const addNewUserService = async (data) => {
    try {

        const auth_token = localStorage.getItem("token")

        const addUser = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/add`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return addUser
    }
    catch (error) {
        return error
    }
}

export const updateUserService = async (userId, data) => {

    try {
        const auth_token = localStorage.getItem("token")

        const updateUser = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/update/${userId}`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return updateUser?.data
    }
    catch (error) {
        return error
    }
}

export const userLoginService = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/login`,
            data,

        );
        return { success: true, ...response.data };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || "Login failed",
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                success: false,
                message: "No response from server",
            };
        } else {
            return {
                success: false,
                message: "Something went wrong",
            };
        }
    }
};

export const deleteUseService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/delete/${id}`,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )
        return result?.data
    }
    catch (error) {
        console.log("Failed to delete user")
        throw error
    }
} 