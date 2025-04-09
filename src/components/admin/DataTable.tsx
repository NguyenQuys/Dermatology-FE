import React, { useState } from "react";
import DetailButton from "./DetailButton";
import { tabIdFromSidebar, setTabId } from "./Sidebar";
import comesticApi from "../../api/comestic.api";
import medicineApi from "../../api/medicine.api";
import userApi from "../../api/user.api";
import { showSuccessToast, showErrorToast } from "../../utils/toast.util";
import treatmentApi from "../../api/treatment.api";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, item: any, index: number) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  actions?: (item: any) => React.ReactNode; // cho nut detail
}

interface ComesticProps {
  _id: string;
  name: string;
  category: string;
  price: number;
}

const DataTable: React.FC<DataTableProps> = ({
  columns = [],
  data = [],
  loading,
  actions,
}) => {
  // State to track which row has an open modal
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  const handleDelete = async (id: string) => {
    let response = null;
    if (confirm("Xác nhận xóa?")) {
      switch (tabIdFromSidebar) {
        case "nav-doctor-tab":
        case "nav-customer-tab":
        case "nav-pharmacist-tab":
          response = await userApi.delete(id);
          if (response.status === 200) {
            showSuccessToast(response.data.message);
            setTabId(tabIdFromSidebar);
          } else {
            showErrorToast(response.data.message);
          }
          break;
        case "nav-medicine-tab":
          response = await medicineApi.delete(id);
          if (response.status === 200) {
            showSuccessToast(response.data.message);
            setTabId(tabIdFromSidebar);
          } else {
            showErrorToast(response.data.message);
          }
          break;
        case "nav-treatment-tab":
          response = await treatmentApi.delete(id);
          if (response.status === 200) {
            showSuccessToast(response.data.message);
            setTabId(tabIdFromSidebar);
          }
          break;
        case "nav-comestic-tab":
          response = await comesticApi.delete(id);
          if (response.status === 200) {
            showSuccessToast(response.data.message);
            setTabId(tabIdFromSidebar);
          }
          break;
      }
    }
  };

  if (!columns || columns.length === 0) {
    return <div>Không có dữ liệu để hiển thị</div>;
  }

  return (
    <div className="table-responsive pt-3">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="bg-primary text-white">
                {column.header}
              </th>
            ))}

            {actions && <th className="bg-primary text-white">Hành động</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center"
              >
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render
                      ? column.render(item[column.accessor], item, index)
                      : item[column.accessor]}
                  </td>
                ))}
                {actions && (
                  <td>
                    {tabIdFromSidebar === "nav-treatment-tab" ||
                    tabIdFromSidebar === "nav-medicine-tab" ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-info text-white"
                        onClick={() => handleOpenModal(index)}
                      >
                        Chi tiết
                      </button>
                    )}
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(item._id)}
                    >
                      Xóa
                    </button>

                    {/* Modal is only rendered when its index matches the open one */}
                    {openModalIndex === index && (
                      <DetailButton
                        type="doctor"
                        isOpen={true}
                        onClose={handleCloseModal}
                        title="Chi tiết"
                        idItem={item._id}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
