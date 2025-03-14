import React, { useState } from "react";
import { addTreatment } from "../api/treatment.api";
import { Treatment } from "../models/treatment.model";
import { assignTypeSideBar } from "./AddButton";
import * as showNotification from "../utils/toast.util";

interface Row {
  header: string;
  accessor: string;
  type: "text" | "number" | "email" | "password";
}

interface ModalProps {
  rows: Row[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
  typeModal: string;
}

let Modal: React.FC<ModalProps> = ({
  rows = [],
  isOpen,
  onClose,
  title,
  typeModal,
}) => {
  if (!isOpen) return null;

  const initialFormData = rows.reduce(
    (acc, row) => ({ ...acc, [row.accessor]: row.type === "number" ? 0 : "" }),
    {} as Record<string, string | number>
  );

  const [formData, setFormData] = useState(initialFormData);
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Xử lý thay đổi dữ liệu nhập
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSave = async () => {
    setError(null);

    typeModal = assignTypeSideBar;
    try {
      const dataToSend = {
        ...formData,
      };

      if (typeModal === "comestic" && category) {
        dataToSend.type = category;
      }

      //await addTreatment(dataToSend as unknown as Treatment);
      showNotification.showErrorToast("Lưu thành công!");

      onClose();
    } catch (error) {
      setError("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

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
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              {(() => {
                if (rows.length === 0) {
                  return <p>Không có dữ liệu để hiển thị</p>;
                }

                if (typeModal === "comestic") {
                  return (
                    <>
                      {rows.map((row, index) => (
                        <div className="mb-3" key={index}>
                          <label htmlFor={row.accessor} className="form-label">
                            {row.header}
                          </label>
                          <input
                            type={row.type}
                            className="form-control"
                            id={row.accessor}
                            value={formData[row.accessor] || ""}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      ))}
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Phân loại
                        </label>
                        <select
                          className="form-control"
                          id="category"
                          value={category}
                          onChange={handleCategoryChange}
                          required
                        >
                          <option value="" disabled>
                            Chọn phân loại
                          </option>
                          <option value="cleanser">Sữa rửa mặt</option>
                          <option value="makeup_remover">Tẩy trang</option>
                          <option value="mask">Mặt nạ</option>
                        </select>
                      </div>
                    </>
                  );
                }

                return rows.map((row, index) => (
                  <div className="mb-3" key={index}>
                    <label htmlFor={row.accessor} className="form-label">
                      {row.header}
                    </label>
                    <input
                      type={row.type}
                      className="form-control"
                      id={row.accessor}
                      value={formData[row.accessor] || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ));
              })()}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
