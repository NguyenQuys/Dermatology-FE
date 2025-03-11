import axios from "axios";

const API_USER_URL = "/api/users";

export const displayText = (tabId: string) => {
  if (tabId === "nav-doctor-tab") {
    return getAllUsersByRole("doctor");
  }
  if (tabId === "nav-pharmacist-tab") {
    return getAllUsersByRole("pharmacist");
  }
  if (tabId === "nav-customer-tab") {
    return getAllUsersByRole("customer");
  }
  return null;
};

// Hàm fetch data từ API
const getAllUsersByRole = async (role: string) => {
  try {
    const response = await axios.get(`${API_USER_URL}/getAll/${role}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return "Lỗi tải dữ liệu";
  }
};
