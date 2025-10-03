import axios from "axios"

export const getAllDarkStorePackagingCenter = async (queryParams) => {

    const auth_token = localStorage.getItem("token")

    // const params = {};

    // if (queryParams.type) params.type = queryParams.type;
    // if (queryParams.page) params.page = queryParams.page;
    // if (queryParams.limit) params.limit = queryParams.limit;
    // if (queryParams.sortBy) params.sortBy = queryParams.sortBy;
    // if (queryParams.sortType) params.sortType = queryParams.sortType;
    // if (queryParams.search && queryParams.search.trim() !== "") {
    //     params.search = queryParams.search.trim();
    // }

    try {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc`,
            {
                params: queryParams,
                headers: {
                    Authorization: auth_token,
                }
            }
        );
        return response.data;
    }
    catch (error) {
        return error
    }
};


export const addNewDarkStorePackagingCenter = async (data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.post(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/add`, data,
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

export const updateDarkStorePackagingCenter = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token")

        const result = await axios.put(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/update/${id}`, data,
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

export const deleteDarkStorePackagingCenterService = async (id) => {
    try {

        const auth_token = localStorage.getItem("token")

        const result = await axios.delete(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/delete/${id}`,
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

export const allDarkStoresOfUserService = async () => {
    try {
        const auth_token = localStorage.getItem("token")
        const result = await axios.get(`${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/user/all-dark-stores-of-user`, {
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

export const getAllPincodesOfStoreOrPackagingCenter = async (storeId, page, limit, search, sortBy, sortOrder) => {

    try {

        const auth_token = localStorage.getItem("token")

        const params = new URLSearchParams();

        if (storeId) params.append("storeId", storeId);
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (sortBy) params.append("sortBy", sortBy);

        const fetchData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/ds-pc/get-pincode?${params.toString()}`,
            { headers: { Authorization: auth_token } }
        );

        return fetchData?.data;
    }
    catch (error) {
        return error
    }
}