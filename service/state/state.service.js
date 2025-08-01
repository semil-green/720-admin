import axios from "axios"

export const getAllStatesService = async () => {
    try {
        const auth_token = localStorage.getItem("token")

        const fetchStates = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/state`,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return fetchStates?.data
    }
    catch (error) {
        return error
    }
}