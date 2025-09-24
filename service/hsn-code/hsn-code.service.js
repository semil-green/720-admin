import axios from "axios"

export const getAllHSNCodeService = async () => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/hsn-code`,

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

export const addNewHSnCoddeService = async (data) => {
    try {

        const auth_token = localStorage.getItem("token")

        const addHsn = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/hsn-code`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return addHsn?.data
    }

    catch (error) {
        return error
    }
}

export const updateHsnCodeService = async (hsn_id, data) => {

    const auth_token = localStorage.getItem("token")

    try {

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/hsn-code/${hsn_id}`, data,
            {
                headers: {
                    Authorization: auth_token
                }
            }
        )

        return result?.data
    }
    catch (err) {
        return err
    }

}

export const deleteHsnCodeService = async (hsn_id) => {

    const auth_token = localStorage.getItem("token")

    try {
        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/hsn-code/${hsn_id}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return result?.data
    }
    catch (err) {
        return err
    }
}