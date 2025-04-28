import React, { Component } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Nav.scss";
import SearchComponent from "../../Component/SearchComponent/SearchComponent";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuOpen: false,
      username: localStorage.getItem("username") || "", // Lấy username từ localStorage
    };
  }

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  handleLogout = () => {
    // Xóa username khỏi localStorage khi đăng xuất
    localStorage.removeItem("username");
    this.setState({ username: "" });
  };

  render() {
    return (
      <>
        {/* Header Section */}
        <div className="bg-green-500 text-white">
          <div className="container mx-auto flex justify-between items-center py-3 px-4">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2 ml-10">
              <img
                className="w-14 h-14 rounded-full bg-white"
                src="https://drive.google.com/thumbnail?id=1_r_nrRMVCzN6VcNiaUz9ndWYKCT7mtAq"
                alt="Green Space Logo"
              />
              <span className="text-xl font-bold">Green Space</span>
            </NavLink>

            {/* Hotline & Cart */}
            <div className="flex items-center space-x-6">
              {/* Hotline */}
              <div className="flex items-center text-lg">
                <FaPhoneAlt className="mr-2 scale-125" />
                <span className="font-bold hidden md:block text-2xl">0123.456.789</span>
              </div>
              {/* Cart */}
              <NavLink
                to="/cart"
                className="flex items-center bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition"
              >
                <CiShoppingCart className="mr-2 scale-150" />
                <span className="hidden md:block text-xl">Giỏ Hàng</span>
              </NavLink>

              {/* User Icon with Dropdown */}
              <div className="relative group">
                <button className="flex items-center bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
                  <FaUser className="mr-2 scale-150" />
                  <span className="hidden md:block text-xl">
                    {this.state.username ? this.state.username : "Tài Khoản"}
                  </span>
                </button>
                <div className="absolute right-0 hidden group-hover:block bg-white text-green-600 w-40 shadow-lg z-10 rounded-lg">
                  {this.state.username ? (
                    <>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-green-700 w-max hover:text-white rounded-t text-xl"
                      >
                        Trang Cá Nhân
                      </NavLink>
                      <button
                        onClick={this.handleLogout} // Đăng xuất
                        className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b text-xl w-full text-left"
                      >
                        Đăng Xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/LoginPage"
                        className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t text-xl"
                      >
                        Đăng Nhập
                      </NavLink>
                      <NavLink
                        to="/SignIn"
                        className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b text-xl"
                      >
                        Đăng Ký
                      </NavLink>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  className="text-white hover:text-orange-400 transition"
                  onClick={this.toggleMobileMenu}
                >
                  <MdMenu className="scale-150" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="bg-green-600">
          <div className="container mx-auto flex justify-center items-center py-3 px-4">
            {/* Navigation Links */}
            <nav className="ml-8 flex space-x-6 font-medium no-underline text-xl">
              <NavLink to="/" className="hover:text-yellow-400 text-yellow-200">
                Trang Chủ
              </NavLink>
              <div className="relative group">
                <NavLink to="/services" className="text-white hover:text-yellow-300">
                  Dịch Vụ
                </NavLink>
                <div className="absolute left-0 w-max hidden group-hover:block bg-white text-green-600 shadow-lg z-10 rounded-lg">
                  <NavLink
                    to="/service/rent-plants"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t"
                  >
                    Cho Thuê Cây Cảnh
                  </NavLink>
                  <NavLink
                    to="/service/consult-fengshui"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white"
                  >
                    Tư Vấn Cây Phong Thủy
                  </NavLink>
                  <NavLink
                    to="/service/care-plants"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b"
                  >
                    Chăm Sóc, Bảo Dưỡng Cây
                  </NavLink>
                </div>
              </div>
              <div className="relative group">
                <a href="/#" className="text-white hover:text-yellow-300">
                  Cẩm Nang Cây Cảnh
                </a>
                <div className="absolute left-0 hidden group-hover:block w-max bg-white text-green-600 shadow-lg z-10 rounded-lg">
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t"
                  >
                    Kiến Thức Cây Cảnh
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b"
                  >
                    Chăm Sóc Cây Cảnh
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a href="/#" className="text-white hover:text-yellow-300">
                  Phụ Kiện
                </a>
                <div className="absolute left-0 hidden group-hover:block w-max bg-white text-green-600 w-48 shadow-lg z-10 rounded-lg">
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t"
                  >
                    Chậu Cây
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white"
                  >
                    Dụng Cụ Làm Vườn
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white"
                  >
                    Giá Đỡ Cây
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white"
                  >
                    Hạt Giống
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b"
                  >
                    Phụ Kiện Trang Trí
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a href="/#" className="text-white hover:text-yellow-300">
                  Chính Sách
                </a>
                <div className="absolute left-0 hidden group-hover:block w-max bg-white text-green-600 w-60 shadow-lg z-10 rounded-lg">
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t"
                  >
                    Hướng Dẫn Mua Hàng
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white"
                  >
                    Chính Sách Đổi Trả Hàng
                  </a>
                  <a
                    href="/#"
                    className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b"
                  >
                    Chính Sách Bảo Mật
                  </a>
                </div>
              </div>
            </nav>
            
            {/* Search Bar */}
            <SearchComponent />
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
