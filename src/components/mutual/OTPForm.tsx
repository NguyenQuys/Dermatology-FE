import { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";
import { useOtpAPI } from "../../api/otp.api";
import { useNavigate } from "react-router-dom";

const OTPForm = () => {
  const { verifyOtp, resendOtp } = useOtpAPI();
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendOtp = async () => {
    const response = await resendOtp();
    if (response.status === 200) {
      showSuccessToast("Mã OTP đã được gửi lại qua email của bạn");
    } else {
      showErrorToast(response.data.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      showErrorToast("Vui lòng nhập mã OTP!");
      return;
    }

    try {
      const response = await verifyOtp(otpCode);
      if (response.status === 200) {
        showSuccessToast(response.data.message);
        switch (response.data.role) {
          case "doctor":
            navigate("/doctor");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "pharmacist":
            navigate("/pharmacist");
            break;
          default:
            navigate("/");
        }
      } else {
        showErrorToast(response.data.message);
      }
    } catch (error) {
      showErrorToast("Xác thực thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-frame mx-auto">
      <h2 className="login-title">Nhập mã OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập mã OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <div className="mt-3 countdown-timer">
          {countdown > 0
            ? `Gửi lại mã sau: ${countdown}s`
            : "Bạn có thể gửi lại mã OTP!"}
        </div>
        <button type="submit" className="btn btn-danger w-100 mt-3">
          XÁC NHẬN
        </button>
      </form>
      {canResend && (
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => {
            setCountdown(5);
            handleResendOtp();
          }}
        >
          Gửi lại mã OTP
        </button>
      )}
    </div>
  );
};

export default OTPForm;
