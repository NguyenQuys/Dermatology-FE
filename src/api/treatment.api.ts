import axios from "axios";
import { Treatment } from "../models/treatment.model";

const API_TREATMENT_URL = "/api/treatment";

class TreatmentAPI {
  async getAllTreatments() {
    const response = await axios.get(`${API_TREATMENT_URL}/getAll`);
    return response;
  }

  async addTreatment(treatment: Treatment): Promise<string> {
    try {
      const response = await axios.post(`${API_TREATMENT_URL}/add`, treatment);
      return response.data.message;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }
}

export default new TreatmentAPI();
