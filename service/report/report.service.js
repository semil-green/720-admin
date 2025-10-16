import axios from "axios";

export const salesOverTimeService = async (start_date, end_date) => {
    try {
        const auth_token = localStorage.getItem("token");

        const getData = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/reports/sales-over-time?from_date=${start_date}&to_date=${end_date}`,
            { headers: { Authorization: auth_token } }
        );

        return getData?.data;
    } catch (error) {
        return error;
    }
};

export const salesByProductService = async (start_date, end_date) => {

    try {

        const auth_token = localStorage.getItem("token");

        const fetchdata = await axios.get(
            `${process.env.NEXT_PUBLIC_DB_CONNECTION_URL}/api/v1/reports/sales-by-product?from_date=${start_date}&to_date=${end_date}`,
            { headers: { Authorization: auth_token } }
        );

        return fetchdata?.data
    }
    catch (error) {
        return error
    }
}
