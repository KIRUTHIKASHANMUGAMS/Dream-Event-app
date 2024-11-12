import config from "../../config"
import axios from "axios";

const api = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
});

export const upcomingEvent = async (data) => {
    try {
        const response = await api.get(config.upcomingEvent, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};


export const upcomingEventById = async (id) => {
    try {
        console.log("id", id)

        const response = await api.get(config.upcomingEventById,
            {
                params: id
            }

        );
        console.log("responseiiiiiiiiiiii" , response)
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};


export const nearBYEvent = async (id) => {
    try {
        const data = {
            userId: id
        };

        const response = await api.post(config.nearByEventList,data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};


export const popularEvent = async () => {
    try {
     
        const response = await api.get(config.popularEvent);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};

export const seatBooking = async (data) => {
    try {
       

        const response = await api.post(config.seatBooking,data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};



export const ticketBookingStatus = async (data) => {
    try {
      const event={
        userId:data
      } 

        const response = await api.post(config.ticketBookingStatus,event);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error);
        }
    }
};

