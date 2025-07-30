import axios from "axios"

export const getAllUsersService = async () => {

    try {

        const fetchUserData = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user`)

        return fetchUserData?.data
    }
    catch (error) {

        console.log("Error in getting all users data ")
        throw error
    }
}

export const addNewUserService = async (data) => {
    try {

        const addUser = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/add`, data)

        return addUser
    }
    catch (error) {
        console.log("Error in adding new user ")
        throw error
    }
}

export const updateUserService = async (userId, data) => {

    try {
        const updateUser = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/update/${userId}`, data)

        return updateUser?.data
    }
    catch (error) {
        console.log("Failed to update user data")
        throw error
    }
}

export const userLoginService = async (data) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/login`,
            data
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
