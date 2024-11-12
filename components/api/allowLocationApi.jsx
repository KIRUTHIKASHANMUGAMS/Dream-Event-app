import config from "../../config"
import axios from "axios";

const api = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
});

export const allowLocation = async (data) => {
    try {
        const response = await api.post(config.allowLocation, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};