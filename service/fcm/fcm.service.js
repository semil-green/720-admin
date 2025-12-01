import axios from "axios";

export const sendFcmService = async (data) => {

    const auth_token = localStorage.getItem("token")
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/save-fcm-token`,
        {
            fcmToken: data
        },
        {
            headers: {
                Authorization: auth_token
            }
        }

    );
    return response;
};