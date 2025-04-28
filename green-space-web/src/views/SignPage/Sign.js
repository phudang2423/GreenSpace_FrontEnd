import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../Component/Card-Product/common/ToastNotification";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài tài khoản và mật khẩu
    if (username.length < 6) {
      setErrorMessage("Tài khoản phải có ít nhất 6 ký tự!");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và Nhập lại mật khẩu không khớp!");
      return;
    }

    // Gửi yêu cầu đăng ký tới backend
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password, // Gửi mật khẩu thô, backend sẽ mã hóa bằng Bcrypt
      });
      showToast("success", "Đăng ký thành công!");
      resetForm(); // Reset form sau khi đăng ký thành công
      setErrorMessage("");
    } catch (error) {
      // Xử lý lỗi từ backend
      if (error.response && error.response.status === 400) {
        // alert(error.response.data); // "Tên người dùng đã tồn tại."
        showToast("error", "Tên người dùng đã tồn tại." );
        resetForm(); // Reset form nếu có lỗi

      } else {
        alert("Có lỗi xảy ra.");
      }
      showToast("error", "Có lỗi xảy ra. Vui lòng thử lại.");
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");}
  };

  return (
    <div className="wrapper flex items-center justify-center w-full min-h-screen bg-gray-100 p-8">
      <div className="form-container w-full max-w-md mx-auto p-8 bg-white shadow-2xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Ký Tài Khoản</h1>

        {/* Hiển thị thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}

        {/* Hiển thị thông báo thành công nếu có */}
        {successMessage && (
          <div className="mb-4 text-green-500 text-center">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Tài khoản:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              minLength="6" // Ràng buộc độ dài tối thiểu
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu:
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                minLength="6" // Ràng buộc độ dài tối thiểu
                required
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {isPasswordVisible ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nhập lại mật khẩu:
            </label>
            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {isConfirmPasswordVisible ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Đăng ký
          </button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <NavLink
            to="/Dang-nhap"
            className="text-sm text-indigo-600 hover:underline"
          >
            Đã có tài khoản? Đăng nhập
          </NavLink>
          <NavLink
            to="/RessetPassword"
            className="text-sm text-gray-500 hover:underline"
          >
            Quên mật khẩu?
          </NavLink>
        </div>

        <div className="text-center mt-4">
          <NavLink
            to="/"
            className="text-sm text-gray-500 hover:underline"
          >
            Trở về trang chủ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sign;