import axios from "axios";
import { Comestic } from "../models/comestic.model";

const API_COMESTIC_URL = "/api/comestic";

export const getAllCometics = async () => {
    const response = await axios.get(`${API_COMESTIC_URL}/getAll`);
    return response;
};

export const addComestic = async (comestic: Comestic): Promise<string> => {
    try {
        const response = await axios.post(`${API_COMESTIC_URL}/add`, comestic);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
};



