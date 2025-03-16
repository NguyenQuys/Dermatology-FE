import { useEffect, useState } from "react";
import { tabIdFromSidebar } from "./Sidebar";
import UserAPI from "../../api/user.api";

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
  const [data, setData] = useState<any>(null);

  const getRows = (): Row[] => {
    const commonRows = [
      { header: "Tên", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Tuổi", accessor: "age" },
      {
        header: "Trạng thái",
        accessor: "status",
        render: (value: string) =>
          value === "active" ? "Đang hoạt động" : "Không hoạt động",
      },
      { header: "Ngày đăng ký", accessor: "createdAt" },
      { header: "Cập nhật gần nhất", accessor: "updatedAt" },
    ];

    switch (tabIdFromSidebar) {
      case "nav-doctor-tab":
      case "nav-pharmacist-tab":
        return [
          ...commonRows,
          {
            header: "Giới tính",
            accessor: "gender",
            render: (value: string) =>
              value === "male" ? "Nam" : value === "female" ? "Nữ" : "Khác",
          },
        ];

      case "nav-customer-tab":
        return [
          ...commonRows,
          { header: "Giới tính", accessor: "gender" },
          {
            header: "Level",
            accessor: "membership.level",
            render: (value) => value || "Chưa có",
          },
          {
            header: "Tích điểm",
            accessor: "membership.points",
            render: (value) => value ?? 0,
          },
          {
            header: "Tiền tích lũy",
            accessor: "membership.total_spent",
            render: (value) => value ?? 0,
          },
        ];

      case "nav-comestic-tab":
        return data?.reviews?.length > 0
          ? [
              {
                header: "Đánh giá",
                accessor: "reviews",
                render: () =>
                  data.reviews.map((review: any, index: number) => (
                    <div key={index} className="border p-2 mb-2">
                      <p>
                        <strong>Id khách hàng:</strong> {review.customer_id}
                      </p>
                      <p>
                        <strong>Bình luận:</strong> {review.comment}
                      </p>
                      <p>
                        <strong>Điểm số:</strong> {review.rating}
                      </p>
                      <p>
                        <strong>Thời gian:</strong>{" "}
                        {new Date(review.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  )),
              },
            ]
          : [
              {
                header: "Đánh giá",
                accessor: "reviews",
                render: () => "Không có đánh giá nào",
              },
            ];

      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiMap: Record<string, any> = {
          "nav-pharmacist-tab": UserAPI.getUserById,
          "nav-doctor-tab": UserAPI.getUserById,
          "nav-customer-tab": UserAPI.getUserById,
        };

        const apiFunction = apiMap[tabIdFromSidebar];
        if (apiFunction) {
          const response = await apiFunction(idItem);
          console.log("Dữ liệu từ API:", response);
          setData(response);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [idItem]);

  const rows = getRows();

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
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
              {rows.map((row, index) => (
                <div className="mb-3" key={index}>
                  {tabIdFromSidebar === "nav-comestic-tab" ? (
                    row.render ? (
                      row.render(data[row.accessor])
                    ) : (
                      <p>
                        {row.header}:{" "}
                        {data?.[row.accessor] || "Không có dữ liệu"}
                      </p>
                    )
                  ) : (
                    <>
                      <label htmlFor={row.accessor} className="form-label">
                        {row.header}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={row.accessor}
                        value={
                          row.accessor.includes("membership.")
                            ? data?.membership?.[row.accessor.split(".")[1]] ||
                              ""
                            : row.render
                            ? row.render(data?.[row.accessor])
                            : data?.[row.accessor] || ""
                        }
                        readOnly
                      />
                    </>
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailButton;
