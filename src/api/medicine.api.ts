import axios from "axios";

const API_MEDICINE_URL = "/api/medicine";

export const getAllMedicines = async () => {
    const response = await axios.get(`${API_MEDICINE_URL}/getAll`);
    return response;
};



