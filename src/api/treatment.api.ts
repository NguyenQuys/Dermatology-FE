import axios from "axios";

const API_TREATMENT_URL = "/api/treatment";

export const getAllTreatments = async () => {
    const response = await axios.get(`${API_TREATMENT_URL}/getAll`);
    return response;
};



