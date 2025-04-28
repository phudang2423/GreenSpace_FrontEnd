import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.scss";
import SearchComponent from "../../Component/SearchComponent/SearchComponent";
import ConfirmModal from "../Nav/ConfirmLogOut";
import AccountInfoModal from "../../Component/Account/AccountInfoModal";
import axios from "axios";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State để hiển thị popup

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    setIsModalOpen(true); // Chỉ mở modal xác nhận đăng xuất, không đóng modal thông tin cá nhân
  };

  const confirmLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setIsModalOpen(false); // Đóng modal xác nhận
    setShowModal(false); // Đóng modal thông tin cá nhân
    navigate("/");
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Chỉ đóng modal xác nhận, giữ nguyên modal thông tin cá nhân
  };

  const openAccountInfo = () => {
    setShowModal(true); // Mở modal thông tin cá nhân
  };

  const closeAccountInfo = () => {
    setShowModal(false); // Đóng modal thông tin cá nhân
  };

  const handleCartClick = () => {
    if (!username) {
      setShowLoginPopup(true); // Hiển thị popup nếu không có username
    } else {
      navigate("/CartPage"); // Điều hướng đến trang giỏ hàng nếu đã đăng nhập
    }
  };

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:8080/username/${username}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error("Lỗi lấy thông tin:", err));
    }
  }, [username]);

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
            <button
              onClick={handleCartClick}
              className="flex items-center bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition"
            >
              <CiShoppingCart className="mr-2 scale-150" />
              <span className="hidden md:block text-xl">Giỏ Hàng</span>
            </button>

            {/* User Icon with Dropdown */}
            <div className="relative group">
              <button className="flex items-center bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
                <FaUser className="mr-2 scale-150" />
                <span className="hidden md:block text-xl">
                  {username ? username : "Tài Khoản"}
                </span>
              </button>
              <div className="absolute right-0 hidden group-hover:block bg-white text-green-600 w-40 shadow-lg z-10 rounded-lg">
                {username ? (
                  <>
                    <button
                      onClick={openAccountInfo}
                      className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t text-xl w-full text-left"
                    >
                      Trang Cá Nhân
                    </button>

                    <NavLink
                      to="/lich-su-mua-hang"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-white text-xl w-full text-left"
                    >
                      Đơn hàng
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-b text-xl w-full text-left"
                    >
                      Đăng Xuất
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/Dang-nhap"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-white rounded-t text-xl"
                    >
                      Đăng Nhập
                    </NavLink>
                    <NavLink
                      to="/Dang-ky"
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
                onClick={toggleMobileMenu}
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

            {/* Dịch Vụ với Droplist */}
            <div className="relative group">
              <button className="text-white hover:text-yellow-300">
                Dịch Vụ
              </button>
              <div className="absolute hidden group-hover:block bg-white text-green-600 w-56 shadow-lg z-10 rounded-lg">
              <NavLink
                  to="/Giao-hang-tan-noi"
                  className="block px-4 py-2 text-nowrap hover:bg-green-700 hover:text-white rounded text-lg"
                >
                  Giao hàng tận nơi
                </NavLink>

                <NavLink
                  to="/Chinh-sach-doi-tra-hang"
                  className="block px-4 py-2 text-nowrap hover:bg-green-700 hover:text-white rounded text-lg"
                >
                  Chính sách đổi trả hàng
                </NavLink>
              </div>
            </div>

            <NavLink to="/Cam-nang-cay-canh" className="text-white hover:text-yellow-300">
              Cẩm Nang Cây Cảnh
            </NavLink>
            <NavLink to="/Phu-kien" className="text-white hover:text-yellow-300">
              Phụ Kiện
            </NavLink>
            <NavLink to="/Ho-tro" className="text-white hover:text-yellow-300">
              Hỗ Trợ
            </NavLink>
          </nav>

          {/* Search Bar */}
          <SearchComponent />
        </div>
      </div>

      {/* Modal Xác Nhận Đăng Xuất */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={cancelLogout} // Sử dụng hàm cancelLogout thay vì đóng trực tiếp
        onConfirm={confirmLogout}
      />

      {/* Modal Thông Báo Đăng Nhập */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center relative">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-2 right-2  text-gray-500 hover:text-red-700 text-2xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Thông báo</h2>
            <p className="text-gray-700 mb-4">Vui lòng đăng nhập để sử dụng chức năng này!</p>
            <button
              onClick={() => {
                setShowLoginPopup(false);
                navigate("/Dang-nhap");
              }}
              className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      )}

      {/* Modal Thông Tin Cá Nhân */}
      {showModal && (
        <AccountInfoModal
          userInfo={userInfo}
          onClose={closeAccountInfo}
          onEdit={() => alert("Chuyển sang trang chỉnh sửa thông tin cá nhân...")}
          onChangePassword={() => alert("Chuyển sang trang đổi mật khẩu...")}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Nav;