import { useState } from "react";
import AuthAPI from "../../api/auth.api";
import * as showNotification from "../../utils/toast.util";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showNotification.showErrorToast("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const response = await AuthAPI.login(username, password);
    if (response.status === 200) {
      showNotification.showSuccessToast(response.data.message);
      console.log(response.data.message);
      navigate("/verifyOtp");
    } else {
      showNotification.showErrorToast(response.data.message);
    }
  };

  return (
    <div className="login-frame mx-auto">
      <h2 className="login-title">Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Tên đăng nhập:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu:
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          ĐĂNG NHẬP
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
