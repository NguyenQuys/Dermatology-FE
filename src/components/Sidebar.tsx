import React, { useState } from "react";
import * as services from "../api/general.api";
import DataTable from "./DataTable";
import AddButton from "./AddButton";

function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabClick = async (tabId: string) => {
    if (activeTab === tabId) return;
    setActiveTab(tabId);
    setLoading(true);
    setData(null);

    try {
      const entities = await services.selectTab(tabId);
      setData(entities);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const userColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Họ tên", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (value: string) =>
        value === "active" ? "Đang hoạt động" : "Không hoạt động",
    },
  ];

  const comesticColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Tên", accessor: "name" },
    { header: "Phân loại", accessor: "category" },
    { header: "Giá", accessor: "price" },
    { header: "Số lượng", accessor: "quantity" },
    {
      header: "Trạng thái",
      accessor: "isHidden",
      render: (value: boolean) =>
        value ? "Đang hoạt động" : "Không hoạt động",
    },
  ];

  const medicineColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Tên", accessor: "name" },
    { header: "Giá", accessor: "price" },
    { header: "Số lượng", accessor: "quantity" },
  ];

  const treatmentColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Tên", accessor: "name" },
    { header: "Giá", accessor: "price" },
  ];

  const actions = (item: any) => (
    <button className="btn btn-primary">Chi tiết</button>
  );

  const getColumns = () => {
    if (
      ["nav-doctor-tab", "nav-pharmacist-tab", "nav-customer-tab"].includes(
        activeTab
      )
    ) {
      return userColumns;
    } else if (activeTab === "nav-comestic-tab") {
      return comesticColumns;
    } else if (activeTab === "nav-medicine-tab") {
      return medicineColumns;
    } else if (activeTab === "nav-treatment-tab") {
      return treatmentColumns;
    }

    return userColumns; // default
  };

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-category p-0">Người dùng</li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-doctor-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-doctor-tab")}
            >
              <span className="menu-title">Bác sĩ</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-pharmacist-tab"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-pharmacist-tab")}
            >
              <span className="menu-title">Dược sĩ</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-customer-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-customer-tab")}
            >
              <span className="menu-title">Khách hàng</span>
            </a>
          </li>

          <li className="nav-item nav-category">Thuốc - Trị liệu - Mỹ phẩm</li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-medicine-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-medicine-tab")}
            >
              <span className="menu-title">Thuốc</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-treatment-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-treatment-tab")}
            >
              <span className="menu-title">Trị liệu</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-comestic-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-comestic-tab")}
            >
              <span className="menu-title">Mỹ phẩm</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container p-3">
        <div className="col-lg-12">
          {activeTab !== "nav-customer-tab" ? (
            <AddButton type={activeTab} />
          ) : null}
        </div>
        <DataTable
          columns={getColumns() as any}
          data={data || []}
          loading={loading}
          actions={actions}
        />
      </div>
    </>
  );
}

export default Sidebar;
