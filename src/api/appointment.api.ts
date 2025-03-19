import axios from "axios";
import { Appointment } from "../models/appointment.model";

const API_APPOINTMENT_URL = "/api/appointment";

class AppointmentAPI {
  async createAppointment(appointment: Appointment) {
    try {
      const response = await axios.post(
        `${API_APPOINTMENT_URL}/addByCustomer`,
        appointment
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new AppointmentAPI();
