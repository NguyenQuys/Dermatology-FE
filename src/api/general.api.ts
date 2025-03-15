import axios from "axios";
import * as comesticApi from "./comestic.api";
import * as medicineApi from "./medicine.api";
import * as treatmentApi from "./treatment.api";
import UserAPI from "./user.api";

const API_BASE_URL = "/api";

export const selectTab = async (tabId: string) => {
  if (tabId === "nav-doctor-tab") {
    return await getAll("doctor");
  } else if (tabId === "nav-pharmacist-tab") {
    return await getAll("pharmacist");
  } else if (tabId === "nav-customer-tab") {
    return await getAll("customer");
  } else if (tabId === "nav-medicine-tab") {
    return await getAll("medicine");
  } else if (tabId === "nav-treatment-tab") {
    return await getAll("treatment");
  } else if (tabId === "nav-comestic-tab") {
    return await getAll("comestic");
  }
  return null;
};

export const getAll = async (type: string) => {
  try {
    let response;

    if(type === "doctor")
      response = await UserAPI.getAllUsersByRole("doctor");
    else if(type === "pharmacist")
      response = await UserAPI.getAllUsersByRole("pharmacist");
    else if(type === "customer")
      response = await UserAPI.getAllUsersByRole("customer");
    else if (type === "medicine") 
      response = await medicineApi.getAllMedicines();
     else if (type === "treatment") 
      response = await treatmentApi.getAllTreatments();
     else 
      response = await comesticApi.getAllCometics();
    
    await new Promise((resolve) => setTimeout(resolve, 200));
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
