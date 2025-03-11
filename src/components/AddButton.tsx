import React, { useState } from "react";
import Modal from "./Modal";

function AddButton() {
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Thêm mới" />
    </>
  );
}

export default AddButton;
