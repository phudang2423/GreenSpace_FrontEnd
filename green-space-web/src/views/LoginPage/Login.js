import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../Component/Card-Product/common/ToastNotification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset lỗi trước khi gửi yêu cầu

    try {
      // Gửi yêu cầu đăng nhập đến backend
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password, // Gửi mật khẩu thô, backend sẽ kiểm tra với mật khẩu đã mã hóa
      });

      // Hiển thị thông báo đăng nhập thành công
      showToast("success", "Đăng nhập thành công!");

      // Lưu thông tin người dùng (username) vào localStorage
      localStorage.setItem("username", username);

      // Điều hướng tới trang chủ
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);

      // Xử lý lỗi từ backend
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Sai tài khoản hoặc mật khẩu";
        setErrorMessage(errorMessage);
        showToast("error", errorMessage);
      } else {
        setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại sau!");
        showToast("error", "Đã xảy ra lỗi, vui lòng thử lại sau!");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo trạng thái ẩn/hiện mật khẩu
  };

  return (
    <div className="wrapper flex items-center justify-center w-full min-h-screen bg-gray-100 p-8">
      <div className="form-container w-full max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Nhập</h1>

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        {/* Form đăng nhập */}
        <form onSubmit={handleSubmit}>
          <div className="inputBox mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Tài khoản:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="inputBox mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 bottom-3 text-gray-600"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Đăng nhập
          </button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <NavLink to="/Dang-ky" className="text-sm text-indigo-600 hover:underline">
            Chưa có tài khoản? Đăng ký
          </NavLink>
          <NavLink to="/RessetPassword" className="text-sm text-gray-500 hover:underline">
            Quên mật khẩu?
          </NavLink>
        </div>

        <div className="text-center mt-4">
          <NavLink to="/" className="text-sm text-gray-500 hover:underline">
            Trở về trang chủ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;