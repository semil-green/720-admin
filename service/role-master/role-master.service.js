import axios from "axios"
export const getAllRoles = async () => {

    try {

        const auth_token = localStorage.getItem("token")
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/role-master`,

            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }
    catch (error) {
        return error
    }
}