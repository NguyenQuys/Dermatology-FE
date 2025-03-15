import axios from "axios";
import { User } from "../models/user.model";

const API_USER_URL = "/api/users";
const API_AUTH_URL = "/api/auth";

class UserAPI {
  async getAllUsersByRole(role: string) {
    const response = await axios.get(`${API_USER_URL}/getAll/${role}`);
    return response;
  }

  async addUser(user: User): Promise<string> {
    try {
      const response = await axios.post(`${API_AUTH_URL}/register`, user);
      return response.data.message;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }

  async getUserById(id: string) {
    try {
      const response = await axios.post(`${API_USER_URL}/getById`,{id});
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }
}

export default new UserAPI;
