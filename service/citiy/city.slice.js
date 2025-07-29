import axios from "axios";

export const getALlCitiesService = async () => {
    try {
        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/city`)
        return data?.data
    } catch (err) {
        console.error("Failed to fetch cities:")
        throw new err
    }
}