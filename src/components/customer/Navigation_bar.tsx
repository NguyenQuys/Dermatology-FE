import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navigation_bar = () => {
  const navigate = useNavigate();

  const { user, token, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

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
          <Link to="/" className="trang-ch2" style={{ textDecoration: "none" }}>
            Trang chủ
          </Link>
          <Link
            to="/products"
            className="s-n-ph-m2"
            style={{ textDecoration: "none" }}
          >
            Sản phẩm
          </Link>
          <Link
            to="/appointment"
            className="t-l-ch-t-v-n"
            style={{ textDecoration: "none" }}
          >
            Đặt lịch tư vấn
          </Link>
          <Link
            to="/diagnosis"
            className="chu-n-o-n"
            style={{ textDecoration: "none" }}
          >
            Chuẩn đoán
          </Link>
          <Link
            to="/shopping"
            className="mua-h-ng"
            style={{ textDecoration: "none" }}
          >
            Giỏ hàng
          </Link>
        </div>
        {!token ? (
          <div className="sign-in">
            <Link
              to="/login"
              className="text-danger fw-bold"
              style={{ textDecoration: "none" }}
            >
              Đăng nhập
            </Link>
          </div>
        ) : (
          <div className="sign-in">
            <a
              onClick={handleLogout}
              className="text-danger fw-bold"
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              Đăng xuất
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation_bar;
