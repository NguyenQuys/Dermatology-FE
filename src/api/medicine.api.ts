import axios from "axios";
import { Medicine } from "../models/medicine.model";

const API_MEDICINE_URL = "/api/medicine";

export const getAllMedicines = async () => {
    const response = await axios.get(`${API_MEDICINE_URL}/getAll`);
    return response;
};

export const addMedicine = async (medicine: Medicine): Promise<string> => {
    try {
        const response = await axios.post(`${API_MEDICINE_URL}/add`, medicine);
        return response.data.message;
    } catch (error: any) {
        return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
}
