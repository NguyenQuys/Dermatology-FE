import { useEffect, useState } from "react";
import userApi from "../../api/user.api";
import medical_recordApi from "../../api/medical_record.api";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Information = () => {
  const [userData, setUserData] = useState<any>(null);
  const [medical_recordData, setMedical_RecordData] = useState<any>(null);
  const [isOpenMedicalRecord, setIsOpenMedicalRecord] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await userApi.getUserById(user.id);
      setUserData(response.data);
    };

    const fetchMedicalRecord = async () => {
      const response = await medical_recordApi.getMedical_recordByIdCustomer(
        user.id
      );
      setMedical_RecordData(response.data);
    };

    fetchUserData();
    fetchMedicalRecord();
  }, []);

  const handleSetOpenMedicalRecord = () => {
    setIsOpenMedicalRecord(true);
  };

  const getMembershipLabel = (level: string) => {
    switch (level) {
      case "gold":
        return <span className="badge bg-warning text-dark">Vàng</span>;
      case "silver":
        return <span className="badge bg-secondary">Bạc</span>;
      case "bronze":
        return <span className="badge bg-warning">Đồng</span>;
      default:
        return <span className="badge bg-info">Thành viên</span>;
    }
  };

  const getGender = (gender: string) => {
    switch (gender) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      default:
        return "Khác";
    }
  };

  return (
    <div className="container m-5">
      {!isOpenMedicalRecord ? (
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: "500px" }}>
            <h2 className="text-center">
              Xin chào,{" "}
              <span className="fw-bold text-danger">
                {userData ? userData.name : "Đang tải..."}
              </span>
            </h2>
            <hr />
            <div className="mb-3">
              <h5>
                <strong>Thứ hạng: </strong>
                {getMembershipLabel(userData?.membership?.level)}
              </h5>
            </div>
            <div>
              <p>
                <strong>Email:</strong>{" "}
                {userData ? userData.email : "Đang tải..."}
              </p>
              <p>
                <strong>Tuổi:</strong> {userData ? userData.age : "Đang tải..."}
              </p>
              <p>
                <strong>Giới tính:</strong>{" "}
                {getGender(userData ? userData.gender : "")}
              </p>
            </div>
            <div className="text-center mt-3">
              <button
                onClick={handleSetOpenMedicalRecord}
                className="btn btn-lg fw-bold text-white"
                style={{
                  backgroundColor: "rgb(220, 53, 69)",
                  padding: "12px 24px",
                  borderRadius: "60px",
                }}
              >
                Xem lịch sử khám
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-4 shadow-lg m-5">
          <h2 className="text-center mb-3">📋 Lịch sử khám bệnh</h2>
          {medical_recordData?.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Chẩn đoán</th>
                  <th>Ngày khám</th>
                </tr>
              </thead>
              <tbody>
                {medical_recordData.map((record: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.diagnosis}</td>
                    <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-muted">
              Không có lịch sử khám bệnh.
            </p>
          )}
          <div className="text-center mt-3">
            <button
              onClick={() => setIsOpenMedicalRecord(false)}
              className="btn btn-lg fw-bold text-white"
              style={{
                backgroundColor: "rgb(220, 53, 69)",
                padding: "12px 24px",
                borderRadius: "60px",
              }}
            >
              Quay lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Information;
