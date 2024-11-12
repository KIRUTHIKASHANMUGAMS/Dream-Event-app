import axios from "axios";
import config from "../../config";

const api = axios.create({
    baseURL: config.baseURL,
    headers: config.headers,
});

export const registerUser = async (data) => {
    try {
        const response = await api.post(config.register, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Registration failed');
        } else {
            throw new Error(error);
        }
    }
};

export const login = async (data)=>{
    try{
        const response=await api.post(config.login,data);
        return response.data;
    }catch(error){
        if(error.response){
            throw new Error (error.response.data.message)
        }else{
            throw new Error (error)
        }
    }
}

export const forgotpassword = async (data)=>{
    try{
        const response=await api.post(config.forgotpassword,data);
        return response.data;
    }catch(error){
        if(error.response){
            throw new Error (error.response.data.message)
        }else{
            throw new Error (error)
        }
    }
}




export const verifyotp = async (data)=>{
    try{
        const response=await api.post(config.verifyotp,data);
        return response.data;
    }catch(error){
        if(error.response){
            throw new Error (error.response.data.message)
        }else{
            throw new Error (error)
        }
    }
}
export const resetpassword = async (data)=>{
    try{
        const response=await api.post(config.resetpassword,data);
        return response.data;
    }catch(error){
        if(error.response){
            throw new Error (error.response.data.message)
        }else{
            throw new Error (error)
        }
    }
}