import axios from "axios";

export const getALlCitiesService = async () => {
    try {

        const auth_token = localStorage.getItem("token")

        const data = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/city`, {
            headers: {
                Authorization: auth_token
            }
        })
        return data?.data
    } catch (err) {

        return err
    }
}