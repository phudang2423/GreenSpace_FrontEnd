import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Sử dụng useNavigate
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu lỗi
  const [showPassword, setShowPassword] = useState(false); // State để kiểm soát việc ẩn/hiện mật khẩu
  const navigate = useNavigate(); // Hook điều hướng

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset lỗi

    try {
      // Gửi yêu cầu đăng nhập đến backend
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      // Lưu username vào localStorage
      localStorage.setItem("username", username);

      // Hiển thị thông báo đăng nhập thành công
      alert(response.data); 

      // Điều hướng đến trang dashboard sau khi đăng nhập thành công
      navigate("/"); 
    } catch (error) {
      // Nếu có lỗi từ backend (401 hoặc lỗi khác)
      console.error("Lỗi khi đăng nhập:", error);
      if (error.response && error.response.status === 401) {
        // Nếu lỗi 401 Unauthorized, hiển thị thông báo lỗi
        setErrorMessage("Thông tin đăng nhập không hợp lệ");
      } else {
        // Nếu có lỗi khác, hiển thị thông báo lỗi chung
        setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Đảo trạng thái hiển thị mật khẩu
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
              type={showPassword ? "text" : "password"} // Nếu showPassword true, hiển thị text, ngược lại hiển thị password
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
          <NavLink to="/SignIn" className="text-sm text-indigo-600 hover:underline">
            Chưa có tài khoản? Đăng ký
          </NavLink>
          <NavLink to="/" className="text-sm text-gray-500 hover:underline">
            Trở về trang chủ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
