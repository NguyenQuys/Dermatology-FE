import axios from "axios";

const API_OTP_URL = "/api/otp";

class OtpAPI {
  async verifyOtp(otp: string) {
    try {
      const response = await axios.post(`${API_OTP_URL}/verifyOTP`, { otp });
      return response;
    } catch (error: any) {
      throw Object.assign(new Error(error.response), {
        status: 401,
      });
    }
  }
}

export default new OtpAPI();
