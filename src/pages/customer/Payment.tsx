import styles from "../../assets/customer/payment/style.module.css";
import CityAPI from "../../api/city.api";
import { useEffect, useState } from "react";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

const products = [
  {
    id: 1,
    name: "Sữa rửa mặt",
    description: "Làm sạch làn da",
    price: 150000,
    quantity: 2,
    image: "/src/assets/general/pic1.jpg",
  },
  {
    id: 2,
    name: "Nước tẩy trang",
    description: "Làm sạch, dưỡng ẩm làn da",
    price: 200000,
    quantity: 1,
    image: "/src/assets/general/pic1.jpg",
  },
];

const ProductItem = ({ product }: { product: any }) => {
  return (
    <div className={styles.frame23}>
      <div className="row">
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <img
            className="rounded-4"
            width={150}
            height={200}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="col-md-7">
          <div className={styles.productInfo}>
            <div className={styles.productName}>
              <span className={styles.productNameMain}>{product.name}</span>
              <br />
              <span className={styles.productNameSub}>
                {product.description}
              </span>
            </div>
            <div className={styles.price}>
              Giá bán: {product.price.toLocaleString()} đ
            </div>
            <div className={styles.quantity}>Số lượng: {product.quantity}</div>
            <div className={styles.totalPrice}>
              Số tiền: {(product.price * product.quantity).toLocaleString()} đ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const shippingFee = 30000;
  const totalAmount =
    products.reduce((sum, p) => sum + p.price * p.quantity, 0) + shippingFee;

  const handlePaymentMethod = (method: string) => {
    setPaymentMethod(method);

    if (method === "delivery") {
      const fetchProvinces = async () => {
        const provinces = await CityAPI.getAllCity();
        setProvinces(provinces);
      };
      fetchProvinces();
      inputAddress();
    }
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      const districts = await CityAPI.getDistricts(selectedProvince);
      setDistricts(districts);
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    inputAddress();
  }, [selectedDistrict]);

  const inputAddress = () => {
    return (
      <div>
        <h4>Chọn địa chỉ giao hàng</h4>
        <div className="d-flex gap-3">
          <div>
            <label className="form-label">
              Tỉnh/Thành phố:
              <select
                className="form-control"
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedProvince && (
            <div className="d-flex gap-3">
              <div>
                <label className="form-label">
                  Quận/Huyện:
                  <select className="form-control">
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label className="form-label">
                  Địa chỉ:
                  <input type="text" className="form-control" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.thanhtoan}>
      <div className={styles.frame22}>
        <div className={styles.sanpham}>Sản phẩm:</div>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}

        <div className={styles.frame25}>
          <div className="d-flex align-items-center">
            <div className="fw-bold">Phương thức thanh toán:</div>
            <div>
              <div className="d-flex gap-2 px-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handlePaymentMethod("at_store")}
                >
                  Nhận tại cửa hàng
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handlePaymentMethod("delivery")}
                >
                  Vận chuyển
                </button>
              </div>
            </div>
          </div>
          {paymentMethod === "delivery" && inputAddress()}
          <div className="py-3">
            <span className="fw-bold fs-5">Phí vận chuyển:</span>{" "}
            <span className="fw-bold text-danger fs-5">
              {shippingFee.toLocaleString()} đ
            </span>{" "}
          </div>
          <div className={styles.tongtien}>
            <span className="fw-bold">Tổng tiền:</span>{" "}
            <span className="text-danger">
              {totalAmount.toLocaleString()} đ
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
