import axios from "axios"
export const getAllRoles = async () => {

    try {

        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/role-master`)

        return result?.data
    }
    catch (error) {
        return error
    }
}