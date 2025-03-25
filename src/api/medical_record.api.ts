import axios from "axios";

const API_MEDICAL_RECORD_DATA = "/api/medical_record";

class Medical_recordAPI {
  async getMedical_recordByIdCustomer(_id: string) {
    try {
      const response = await axios.post(
        `${API_MEDICAL_RECORD_DATA}/getByCustomerId`,
        { _id }
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
  }

  async add(data: any) {
    try {
      const response = await axios.post(`${API_MEDICAL_RECORD_DATA}/add`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
  }
}

export default new Medical_recordAPI();
