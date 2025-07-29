import axios from "axios"

export const getAllStatesService = async () => {
    try {
        const fetchStates = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/state`)

        return fetchStates?.data
    }
    catch (error) {
        console.log("Failed to get all states")
        throw new error;
    }
}