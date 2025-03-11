import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

function Modal({ isOpen, onClose, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Hiệu ứng mờ nền
      tabIndex={-1}
      onClick={onClose} // Đóng modal khi click nền
    >
      <div
        className="modal-dialog modal-lg"
        onClick={(e) => e.stopPropagation()} // Ngăn modal bị đóng khi click vào nội dung
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
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tên
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Giá
                </label>
                <input type="number" className="form-control" id="price" />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Số lượng
                </label>
                <input type="number" className="form-control" id="quantity" />
              </div>
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
            <button type="button" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
