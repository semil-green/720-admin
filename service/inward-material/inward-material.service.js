import axios from "axios";

export const getAllInwardMatrialService = async (page, limit, search, packagingstore_id, sortBy, sortOrder) => {
    try {
        const auth_token = localStorage.getItem("token");

        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (search) params.append("search", search);
        if (packagingstore_id) params.append("packagingstore_id", packagingstore_id);
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);

        const url = `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inward-material?${params.toString()}`;

        const data = await axios.get(url, {
            headers: {
                Authorization: auth_token,
            },
        });

        return data?.data?.data;
    } catch (err) {
        return err;
    }
};


export const addNewInwardmaterialService = async (data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const addNewInwardMaterial = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inward-material`,
            data,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return addNewInwardMaterial?.data;
    } catch (error) {
        return error;
    }
};

export const deleteInwardMaterialService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token");

        const deleteInwardMaterial = await axios.delete(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inward-material/${id}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return deleteInwardMaterial?.data;
    } catch (error) {
        return error;
    }
}

export const getInwardMaterialByIdService = async (id) => {
    try {
        const auth_token = localStorage.getItem("token");

        const getInwardMaterial = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inward-material/${id}`,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return getInwardMaterial?.data;
    } catch (error) {
        return error;
    }
}

export const updateInwardMaterialService = async (id, data) => {
    try {
        const auth_token = localStorage.getItem("token");

        const updateInwardMaterial = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/inward-material/update/${id}`,
            data,
            {
                headers: {
                    Authorization: auth_token,
                },
            }
        );
        return updateInwardMaterial?.data;
    } catch (error) {
        return error;
    }
}