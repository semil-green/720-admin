import axios from 'axios'

export const getAllCollectionsService = async () => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/collection`,

            {
                headers: {
                    Authorization: auth_token
                }
            }
        )
        return result?.data?.data
    }
    catch (error) {
        return error
    }
}

export const deleteCollectionService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/collection/${id}`,
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

export const searchProductsService = async (searchText) => {
    try {
        const auth_token = localStorage.getItem("token");
        const result = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/product/getAllProductbySearch`,
            {
                params: { search: searchText },
                headers: {
                    Authorization: auth_token
                }
            }
        );
        return result?.data?.data
    } catch (error) {
        return error;
    }
};

export const addNewCollectionService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/collection`, data,
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

export const getCollectionsById = async (collectionId) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/collection/${collectionId}`, {
            headers: {
                Authorization: auth_token
            }
        })
        return result?.data?.data
    }
    catch (error) {
        return error
    }
}

export const updateCollectionService = async (collectionId, data) => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/collection/update/${collectionId}`, data, {
            headers: {
                Authorization: auth_token
            }
        })
        return result?.data
    }
    catch (error) {
        return error
    }
}