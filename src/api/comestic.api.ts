import axios from "axios";

const API_COMETIC_URL = "/api/comestic";

export const getAllCometics = async () => {
    const response = await axios.get(`${API_COMETIC_URL}/getAll`);
    return response;
};



