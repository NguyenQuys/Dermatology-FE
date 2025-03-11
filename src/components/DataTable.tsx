import React from "react";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, item: any, index?: number) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  actions?: (item: any) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading,
  actions,
}) => {
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
                {actions && <td>{actions(item)}</td>}
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
