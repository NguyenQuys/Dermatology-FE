import axios from "axios";

const API_AUTH_URL = "/api/auth";

class AuthAPI {
  async login(name: string, password: string) {
    try {
      const response = await axios.post(`${API_AUTH_URL}/login`, {
        name,
        password,
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new AuthAPI();
