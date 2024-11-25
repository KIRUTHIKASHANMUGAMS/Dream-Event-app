import config from "../../config"
import axios from "axios";

const api = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
});

export const AddBookmark = async (data) => {
    try {
        const response = await api.post(config.AddBookMarks, data);
        console.log("response" ,response)
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};

export const DeleteBookMark = async (id) => {
    try {
        const url = `${config.bookMarksdelete}?id=${id}`;
        
        const response = await api.delete(url);
        console.log("delete" ,response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};


export const bookMarkById = async (id) => {
    try {


        const url = `${config.bookMarkById}?userId=${id}`; // Construct the URL

        const response = await api.get(url);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};


