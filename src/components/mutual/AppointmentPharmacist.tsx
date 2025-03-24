import { useEffect, useState } from "react";
import AppointmentAPI from "../../api/appointment.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";
import userApi from "../../api/user.api";

interface Appointment {
  _id: string;
  customer_id: string;
  doctor_id: string;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AppointmentPharmacist = () => {
  const [data, setData] = useState<Appointment[]>([]);
  const [userNames, setUserNames] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await AppointmentAPI.getAll();
      setData(response.data);

      const uniqueUserIds = new Set([
        ...response.data.map((app: Appointment) => app.customer_id),
        ...response.data.map((app: Appointment) => app.doctor_id),
      ]);

      const namePromises = Array.from(uniqueUserIds).map(async (userId) => {
        try {
          const userResponse = await userApi.getById(userId);
          return { id: userId, name: userResponse.data.name };
        } catch (error) {
          console.error(`Lỗi khi lấy thông tin user ${userId}:`, error);
          return { id: userId, name: "Không xác định" };
        }
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "move_to_queue":
        return <span className="badge bg-info">Đang chờ khám</span>;
      case "confirmed":
        return <span className="badge bg-success">Đã xác nhận</span>;
      case "cancelled":
        return <span className="badge bg-danger">Đã hủy</span>;
      default:
        return <span className="badge bg-secondary">Không xác định</span>;
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

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return <div className="alert alert-info m-3">Không có lịch hẹn nào</div>;
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Danh sách lịch hẹn</h2>
      <div className="row">
        {data
          .filter((appointment) => appointment.status !== "move_to_queue")
          .map((appointment) => (
            <div key={appointment._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      Lịch hẹn #{appointment._id.slice(-6)}
                    </h5>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="mb-3">
                    <p className="card-text mb-1">
                      <i className="bi bi-person me-2"></i>
                      Khách hàng:{" "}
                      {userNames[appointment.customer_id] || "Đang tải..."}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-person-vcard me-2"></i>
                      Bác sĩ:{" "}
                      {userNames[appointment.doctor_id] || "Đang tải..."}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-calendar me-2"></i>
                      Thời gian: {formatDateTime(appointment.date)}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-clock-history me-2"></i>
                      Tạo lúc: {formatDateTime(appointment.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        handleChangeStatus(appointment._id, "move_to_queue")
                      }
                    >
                      Chuyển qua bác sĩ
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleChangeStatus(appointment._id, "cancelled")
                      }
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppointmentPharmacist;
