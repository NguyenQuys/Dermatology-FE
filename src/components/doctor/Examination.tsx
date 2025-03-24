import React, { useState, useEffect } from "react";
import ComesticApi from "../../api/comestic.api";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  _id: string;
  name: string;
  image: string;
}

// Định nghĩa kiểu dữ liệu cho đơn thuốc
interface Prescription {
  id: number;
  searchQuery: string;
  selectedProduct: string;
  searchResults: Product[];
  category: string;
  dosage: string;
  frequency: string;
}

const Examination = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: Date.now(),
      searchQuery: "",
      selectedProduct: "",
      searchResults: [],
      category: "",
      dosage: "",
      frequency: "",
    },
  ]);

  const addPrescription = () => {
    const id = Date.now();
    setPrescriptions((prev) => [
      ...prev,
      {
        id,
        searchQuery: "",
        selectedProduct: "",
        searchResults: [],
        category: "",
        dosage: "",
        frequency: "",
      },
    ]);
  };

  const removePrescription = (id: number) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSearchChange = (id: number, query: string) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, searchQuery: query, selectedProduct: "" } : p
      )
    );
  };

  const handleInputChange = (
    id: number,
    field: "category" | "dosage" | "frequency",
    value: string
  ) => {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  useEffect(() => {
    prescriptions.forEach((prescription) => {
      if (!prescription.searchQuery.trim()) {
        setPrescriptions((prev) =>
          prev.map((p) =>
            p.id === prescription.id ? { ...p, searchResults: [] } : p
          )
        );
        return;
      }

      const delaySearch = setTimeout(async () => {
        try {
          const response = await ComesticApi.search(prescription.searchQuery);
          setPrescriptions((prev) =>
            prev.map((p) =>
              p.id === prescription.id
                ? { ...p, searchResults: response.data }
                : p
            )
          );
        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
          setPrescriptions((prev) =>
            prev.map((p) =>
              p.id === prescription.id ? { ...p, searchResults: [] } : p
            )
          );
        }
      }, 300);
      return () => clearTimeout(delaySearch);
    });
  }, [prescriptions.map((p) => p.searchQuery).join()]);

  const handleProductSelect = (id: number, productName: string) => {
    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              selectedProduct: productName,
              searchQuery: "",
              searchResults: [],
            }
          : p
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Khám bệnh</h2>
      <form>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Tên bệnh nhân:</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" name="ten_benh_nhan" />
          </div>
        </div>

        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Chuẩn đoán:</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" name="chuan_doan" />
          </div>
        </div>

        <h5>Đơn thuốc</h5>
        {prescriptions.map((p) => (
          <div key={p.id} className="medicine-group border p-3 mb-3">
            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Phân loại:</label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="phan_loai[]"
                  value={p.category}
                  onChange={(e) =>
                    handleInputChange(p.id, "category", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Chọn phân loại
                  </option>
                  <option value="medicine">Thuốc</option>
                  <option value="comestic">Mỹ phẩm</option>
                  <option value="treatment">Trị liệu</option>
                </select>
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Sản phẩm:</label>
              <div className="col-sm-9 position-relative">
                <input
                  name="search"
                  className="form-control"
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={p.selectedProduct || p.searchQuery}
                  onChange={(e) => handleSearchChange(p.id, e.target.value)}
                  onFocus={() => handleSearchChange(p.id, p.searchQuery)}
                />
                {p.searchResults.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100 mt-2 shadow"
                    style={{ zIndex: 1000 }}
                  >
                    {p.searchResults.map((product) => (
                      <li
                        key={product._id}
                        className="list-group-item d-flex justify-content-between"
                        onClick={() => handleProductSelect(p.id, product.name)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle me-3"
                            src={product.image}
                            alt={product.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                          {product.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Liều lượng:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="lieu_luong[]"
                  value={p.dosage}
                  onChange={(e) =>
                    handleInputChange(p.id, "dosage", e.target.value)
                  }
                  placeholder="Ví dụ: 1 viên/lần"
                />
              </div>
            </div>

            <div className="mb-3 row">
              <label className="col-sm-3 col-form-label">Tần suất:</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="tan_suat[]"
                  value={p.frequency}
                  onChange={(e) =>
                    handleInputChange(p.id, "frequency", e.target.value)
                  }
                  placeholder="Ví dụ: 2 lần/ngày"
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removePrescription(p.id)}
            >
              Xóa
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={addPrescription}
        >
          +
        </button>

        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label">Ghi chú:</label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              name="ghi_chu"
              rows={3}
            ></textarea>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default Examination;
