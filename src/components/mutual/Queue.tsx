import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import AppointmentAPI from "../../api/appointment.api";
import { showSuccessToast, showErrorToast } from "../../utils/toast.util";
import userApi from "../../api/user.api";
import MedicalRecordAPI from "../../api/medical_record.api";
import { setTabId } from "../admin/Sidebar";

interface Appointment {
  _id: string;
  customer_id: string;
}

interface MedicalRecord {
  _id: string;
  customer_id: string;
  doctor_id: string;
  diagnosis: string;
  prescription: Array<{
    item_id: string;
    type: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  notes?: string;
  createdAt: string;
}

const Queue = () => {
  const [data, setData] = useState<Appointment[]>([]);
  const [userNames, setUserNames] = useState<{
    [key: string]: string;
  }>({});
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await AppointmentAPI.getByStatus("move_to_queue");
      setData(response.data);

      const uniqueUserIds = new Set([
        ...response.data.map((app: Appointment) => app.customer_id),
      ]);

      const namePromises = Array.from(uniqueUserIds).map(async (userId) => {
        const userResponse = await userApi.getById(userId);
        return { id: userId, name: userResponse.data.name };
      });

      const userNames = await Promise.all(namePromises);
      const nameMap = userNames.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {} as { [key: string]: string });

      setUserNames(nameMap);
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicalRecords = async (customerId: string) => {
    try {
      setLoading(true);
      const response = await MedicalRecordAPI.getMedical_recordByIdCustomer(
        customerId
      );
      setMedicalRecords(response.data);
      setSelectedAppointment(customerId);
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChangeStatus = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await AppointmentAPI.update(appointmentId, newStatus);
      if (response.status === 200) {
        showSuccessToast(response.data.message);
        fetchAppointments();
      }
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Hàng đợi</h2>
          <div className="col-md-6">
            {data.map((appointment) => (
              <div
                key={appointment._id}
                className="col-12 mb-4"
                style={{ cursor: "pointer" }}
                onClick={() => fetchMedicalRecords(appointment.customer_id)}
              >
                <div
                  className={`card h-100 shadow-sm ${
                    selectedAppointment === appointment.customer_id
                      ? "border-primary"
                      : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">
                        Lịch hẹn #{appointment._id.slice(-6)}
                      </h5>
                    </div>
                    <div className="mb-3">
                      <p className="card-text mb-1">
                        <i className="bi bi-person me-2"></i>
                        Khách hàng:{" "}
                        {userNames[appointment.customer_id] || "Đang tải..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          {selectedAppointment && (
            <div>
              <h3 className="mb-3">Lịch sử khám bệnh</h3>
              {medicalRecords.map((record) => (
                <div key={record._id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      Chẩn đoán: {record.diagnosis}
                    </h5>
                    {record.prescription && record.prescription.length > 0 && (
                      <div className="mt-3">
                        <h6>Đơn thuốc:</h6>
                        <hr />
                        <ul className="list-unstyled">
                          {record.prescription.map((item, index) => (
                            <li key={index} className="mb-2">
                              <strong>Loại:</strong> {item.type}
                              <br />
                              <strong>Liều lượng:</strong> {item.dosage}
                              <br />
                              <strong>Tần suất:</strong> {item.frequency}
                              <br />
                              <strong>Thời gian:</strong> {item.duration}
                              <hr />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <h6 className="card-text mb-1">
                      Thời gian: {formatDateTime(record.createdAt)}
                    </h6>
                    {record.notes && (
                      <div className="mt-3">
                        <h6>Ghi chú:</h6>
                        <p>{record.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="btn btn-primary"
            onClick={() => setTabId("nav-examination-tab")}
          >
            Khám bệnh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Queue;
