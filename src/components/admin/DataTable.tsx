import React, { useState } from "react";
import DetailButton from "./DetailButton";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, item: any, index?: number) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  actions?: (item: any) => React.ReactNode; // cho nut detail
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
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
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render
                      ? column.render(item[column.accessor], item, index)
                      : item[column.accessor]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleOpenModal(index)}
                  >
                    Chi tiết
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
