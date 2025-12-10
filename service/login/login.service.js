import axios from "axios";

export const loginService = async (email, password) => {

    try {

        const verifyLogin = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/user/login`,
            {
                email,
                password
            }
        )

        return verifyLogin
    }
    catch (err) {
        throw err
    }
}