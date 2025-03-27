import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import comesticApi from "../../api/comestic.api";
import customerApi from "../../api/user.api";
import { ShoppingCart } from "lucide-react";

interface Review {
  _id: string;
  customer_id: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface Comestic {
  _id: string;
  name: string;
  category: string;
  price: number;
  isHidden: boolean;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  quantity: number;
  image: string;
}

const DetailComestic: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [comestic, setComestic] = useState<Comestic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComestic = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await comesticApi.getComesticById(id as string);

        setComestic(response.data);
      } catch (error) {
        console.error("Error fetching comestic:", error);
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchComestic();
    }
  }, [id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!comestic) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy sản phẩm
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* Phần hình ảnh sản phẩm */}
        <div className="col-md-6">
          <div className="product-gallery">
            <div className="main-image mb-3">
              <img
                style={{ height: "310px", width: "100%", objectFit: "cover" }}
                src={comestic.image}
                alt={comestic.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="col-md-6">
          <h2 className="mb-3">{comestic.name}</h2>
          <p className="text-muted mb-3">Danh mục: {comestic.category}</p>

          <div className="d-flex align-items-center mb-3">
            <div className="rating me-3">
              <span className="text-warning">★</span>{" "}
              <span>{comestic.averageRating.toFixed(1)}</span>
            </div>
            <div className="reviews-count">
              <span className="text-muted">
                {comestic.reviews.length} đánh giá
              </span>
            </div>
          </div>

          <div className="price mb-4">
            <h3 className="text-danger">{comestic.price.toLocaleString()} đ</h3>
          </div>

          <div className="quantity mb-4">
            <label className="form-label">Số lượng:</label>
            <div className="input-group" style={{ width: "150px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <input
                style={{ width: "2px" }}
                type="number"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div>
            <small className="text-muted">
              Còn lại: {comestic.quantity} sản phẩm
            </small>
          </div>

          <div className="d-grid gap-2 d-flex justify-content-start">
            <button className="btn btn-success">MUA NGAY</button>

            <button className="btn btn-primary">
              <ShoppingCart size={32} color="white" />
              &nbsp; THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>
      </div>

      {/* Phần đánh giá */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">ĐÁNH GIÁ SẢN PHẨM</h3>
          {comestic.reviews.map((review, index) => (
            <div key={review._id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">
                      Người dùng {review.customer_id.slice(-6)}
                    </h6>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-warning">
                          {index < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                    </small>
                  </div>
                </div>
                <p className="card-text">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailComestic;
