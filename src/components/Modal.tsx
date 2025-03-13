import React from "react";

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
  type: string;
}

const Modal: React.FC<ModalProps> = ({
  rows = [],
  isOpen,
  onClose,
  title,
  type,
}) => {
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
              {(() => {
                if (rows.length === 0) {
                  return <p>Không có dữ liệu để hiển thị</p>;
                }

                if (type === "comestic") {
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
                            required
                          />
                        </div>
                      ))}
                      <label htmlFor="category" className="form-label">
                        Phân loại
                      </label>
                      <select className="form-control">
                        <option value="" selected disabled>
                          Chọn phân loại
                        </option>
                        <option value="cleanser">Sữa rửa mặt</option>
                        <option value="makeup_remover">Tẩy trang</option>
                        <option value="mask">Mặt nạ</option>
                      </select>
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
            <button type="button" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
