import React, { useState } from "react";
import Modal from "./Modal";

interface AddButtonProps {
  type: string;
}

const AddButton: React.FC<AddButtonProps> = ({ type }) => {
  let typeSideBar = () => {
    switch (type) {
      case "nav-customer-tab":
        return "customer";
      case "nav-doctor-tab":
        return "doctor";
      case "nav-pharmacist-tab":
        return "pharmacist";
      case "nav-comestic-tab":
        return "comestic";
      case "nav-medicine-tab":
        return "medicine";
      case "nav-treatment-tab":
        return "treatment";
      default:
        return "";
    }
  };

  const getRows = () => {
    switch (typeSideBar()) {
      case "pharmacist":
      case "doctor":
        return [
          { header: "Tên", accessor: "name", type: "text" },
          { header: "Email", accessor: "email", type: "email" },
          { header: "Mật khẩu", accessor: "password", type: "password" },
          { header: "Tuổi", accessor: "age", type: "number" },
        ];
      case "comestic":
      case "medicine":
        return [
          { header: "Tên", accessor: "name", type: "text" },
          { header: "Giá", accessor: "price", type: "number" },
          { header: "Số lượng hàng", accessor: "quantity", type: "number" },
        ];
      case "treatment":
        return [
          { header: "Tên", accessor: "name", type: "text" },
          { header: "Giá", accessor: "price", type: "number" },
        ];
      default:
        return [];
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleOpenModal}
      >
        Thêm
      </button>

      <Modal
        rows={getRows() as any}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Thêm mới"
        type={typeSideBar()}
      />
    </>
  );
};

export default AddButton;
