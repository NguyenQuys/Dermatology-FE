import { useEffect, useState } from "react";
import { tabIdFromSidebar } from "./Sidebar";
import UserAPI from "../api/user.api";

interface Row {
  header: string;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

interface DetailButtonProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  idItem: string;
}

const DetailButton: React.FC<DetailButtonProps> = ({
  onClose,
  title,
  idItem,
}) => {
  const [data, setData] = useState<any>(null); // State để lưu thông tin từ API

  // Lấy danh sách các cột hiển thị dựa vào tab đang mở
  const getRows = (): Row[] | null => {
    switch (tabIdFromSidebar) {
      case "nav-doctor-tab":
      case "nav-pharmacist-tab":
        return [
          { header: "Tên", accessor: "name" },
          { header: "Email", accessor: "email" },
          { header: "Tuổi", accessor: "age" },
          {
            header: "Giới tính",
            accessor: "gender",
            render: (value: string) => {
              if (value === "male") return "Nam";
              if (value === "female") return "Nữ";
              return "Khác";
            },
          },
          {
            header: "Trạng thái",
            accessor: "status",
            render: (value: string) =>
              value === "active" ? "Đang hoạt động" : "Không hoạt động",
          },
          { header: "Ngày đăng ký", accessor: "createdAt" },
          { header: "Cập nhật gần nhất", accessor: "updatedAt" },
        ];
      case "nav-customer-tab":
        return [
          { header: "Tên", accessor: "name" },
          { header: "Email", accessor: "email" },
          { header: "Tuổi", accessor: "age" },
          { header: "Giới tính", accessor: "gender" },
          { header: "Trạng thái", accessor: "status" },
          { header: "Ngày đăng ký", accessor: "createdAt" },
          { header: "Cập nhật gần nhất", accessor: "updatedAt" },
        ];
      case "nav-comestic-tab":
      case "nav-medicine-tab":
      case "nav-treatment-tab":
        return [];
      default:
        return [];
    }
  };

  // Gọi API lấy dữ liệu theo ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (tabIdFromSidebar) {
          case "nav-pharmacist-tab":
          case "nav-doctor-tab":
          case "nav-customer-tab":
            response = await UserAPI.getUserById(idItem);
            break;
          default:
            return;
        }

        setData(response);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [idItem]); // Gọi lại mỗi khi `idItem` thay đổi

  const rows = getRows() || [];

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {rows.length === 0 ? (
                <p>Không có dữ liệu để hiển thị</p>
              ) : (
                rows.map((row, index) => (
                  <div className="mb-3" key={index}>
                    <label htmlFor={row.accessor} className="form-label">
                      {row.header}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={row.accessor}
                      value={
                        data
                          ? row.render
                            ? row.render(data[row.accessor])
                            : data[row.accessor] || ""
                          : ""
                      }
                      readOnly
                    />
                  </div>
                ))
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailButton;
