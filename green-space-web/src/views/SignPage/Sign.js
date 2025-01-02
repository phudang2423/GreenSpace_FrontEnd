import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Sign extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      dob: "",
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
      errorMessage: "",
      successMessage: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;

    // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      this.setState({ errorMessage: "Mật khẩu và Nhập lại mật khẩu không khớp!" });
      return;
    }

    // Gửi yêu cầu đăng ký tới backend
    try {
      const response = await axios.post("http://localhost:8080/register", this.state);
      this.setState({ successMessage: response.data, errorMessage: "" });
      alert("Đăng ký thành công!");
    } catch (error) {
      this.setState({ errorMessage: error.response?.data || "Đăng ký thất bại", successMessage: "" });
    }
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      isConfirmPasswordVisible: !prevState.isConfirmPasswordVisible,
    }));
  };

  render() {
    return (
      <>
        <div className="wrapper flex items-center justify-center w-full min-h-screen bg-gray-100 p-8">
          <div className="form-container w-full max-w-7xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Ký Tài Khoản</h1>
            
            {/* Hiển thị thông báo lỗi nếu có */}
            {this.state.errorMessage && (
              <div className="mb-4 text-red-500 text-center">{this.state.errorMessage}</div>
            )}

            {/* Hiển thị thông báo thành công nếu có */}
            {this.state.successMessage && (
              <div className="mb-4 text-green-500 text-center">{this.state.successMessage}</div>
            )}

            <form onSubmit={this.handleSubmit}>
              <div className="inputBox grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Tài khoản:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu:
                  </label>
                  <div className="relative">
                    <input
                      type={this.state.isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={this.togglePasswordVisibility}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {this.state.isPasswordVisible ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập lại mật khẩu:
                  </label>
                  <div className="relative">
                    <input
                      type={this.state.isConfirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={this.toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {this.state.isConfirmPasswordVisible ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại:
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    onInput={(e) => {
                      if (e.target.value.length > 10) {
                        e.target.value = e.target.value.slice(0, 10); // Giới hạn 10 kí tự
                      }
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày sinh:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
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
                to="/LoginPage"
                className="text-sm text-indigo-600 hover:underline"
              >
                Đã có tài khoản? Đăng nhập
              </NavLink>
              <NavLink
                to="/"
                className="text-sm text-gray-500 hover:underline"
              >
                Trở về trang chủ
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Sign;
