import axios from "axios";

const API_BASE_URL = "/api";

export const selectTab = async (tabId: string) => {
  if (tabId === "nav-doctor-tab") {
    return await getAllUsersByRole("doctor");
  } else if (tabId === "nav-pharmacist-tab") {
    return await getAllUsersByRole("pharmacist");
  } else if (tabId === "nav-customer-tab") {
    return await getAllUsersByRole("customer");
  } else if (tabId === "nav-medicine-tab") {
    return await getAllMTCs("medicine");
  } else if (tabId === "nav-treatment-tab") {
    return await getAllMTCs("treatment");
  } else if (tabId === "nav-comestic-tab") {
    return await getAllMTCs("comestic");
  }
  return null;
};

const getAllUsersByRole = async (role: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/getAll/${role}`);
    await new Promise((resolve) => setTimeout(resolve, 200));

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// medicine, treatment, cosmetic
const getAllMTCs = async (type: string) => {
  try {
    let response;

    if (type === "medicine") {
      response = await axios.get(`${API_BASE_URL}/medicine/getAll`);
    } else if (type === "treatment") {
      response = await axios.get(`${API_BASE_URL}/treatment/getAll`);
    } else {
      response = await axios.get(`${API_BASE_URL}/comestic/getAll`);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
