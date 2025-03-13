import axios from "axios";

const API_USER_URL = "/api/users";

export const getAllUsersByRole = async (role: string) => {
    const response = await axios.get(`${API_USER_URL}/getAll/${role}`);
    return response;
};



