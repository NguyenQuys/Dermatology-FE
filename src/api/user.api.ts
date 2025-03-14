import axios from "axios";
import { User } from "../models/user.model";

const API_USER_URL = "/api/users";
const API_AUTH_URL = "/api/auth";

export const getAllUsersByRole = async (role: string) => {
    const response = await axios.get(`${API_USER_URL}/getAll/${role}`);
    return response;
};

export const addUser = async (user: User): Promise<string> => {
    try {
        const response = await axios.post(`${API_AUTH_URL}/register`, user);
        return response.data.message;
    } catch (error: any) {
        return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
}


