import { Link } from "react-router-dom";

const Navigation_bar = () => {
  return (
    <nav className="nav-bar">
      <div className="rectangle-1"></div>
      <div className="navigation">
        <div className="nav-items">
          <div className="logo">
            <div className="oskin-tr-m-n-chu-n-y-khoa2">
              <span>OSKIN</span>
              <br />
              <span>TRỊ MỤN CHUẨN Y KHOA</span>
            </div>
          </div>
          <div className="trang-ch2">Trang chủ</div>
          <div className="s-n-ph-m2">Sản phẩm</div>
          <div className="t-l-ch-t-v-n">Đặt lịch tư vấn</div>
          <div className="mua-h-ng">Mua hàng</div>
          <div className="chu-n-o-n">Chuẩn đoán</div>
        </div>
        <div className="sign-in">
          <Link to="/sign-in" className="sign-in-button text text-danger">
            Đăng nhập
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation_bar;
