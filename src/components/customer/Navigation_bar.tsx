import { Link } from "react-router-dom";

const Navigation_bar = () => {
  return (
    <div className="nav-bar">
      <div className="rectangle-1"></div>
      <div className="navigation">
        <div className="nav-items">
          <div className="logo">
            <div className="oskin-tr-m-n-chu-n-y-khoa2">
              <span>
                <span className="oskin-tr-m-n-chu-n-y-khoa-2-span"></span>
                <span className="oskin-tr-m-n-chu-n-y-khoa-2-span2">
                  OSKIN
                  <br />
                </span>
                <span className="oskin-tr-m-n-chu-n-y-khoa-2-span3">
                  TRỊ MỤN CHUẨN Y KHOA
                </span>
              </span>
            </div>
          </div>
          <Link to="/" className="trang-ch2">
            Trang chủ
          </Link>
          <Link to="/products" className="s-n-ph-m2">
            Sản phẩm
          </Link>
          <Link to="/consultation" className="t-l-ch-t-v-n">
            Đặt lịch tư vấn
          </Link>
          <Link to="/shopping" className="mua-h-ng">
            Mua hàng
          </Link>
          <Link to="/diagnosis" className="chu-n-o-n">
            Chuẩn đoán
          </Link>
        </div>
        <div className="sign-in">
          <Link to="/sign-in" className="text-danger fw-bold">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation_bar;
