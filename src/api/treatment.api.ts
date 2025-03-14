import axios from "axios";
import { Treatment } from "../models/treatment.model";

const API_TREATMENT_URL = "/api/treatment";

export const getAllTreatments = async () => {
    const response = await axios.get(`${API_TREATMENT_URL}/getAll`);
    return response;
};

export const addTreatment = async (treatment: Treatment) => {
    try {
        const response = await axios.post(`${API_TREATMENT_URL}/add`, treatment);
        return response;
    } catch (error) {
        console.error("Error adding treatment:", error);
        return [];
    }
}


