import React, { useState, useEffect } from "react";
import axios from "axios";
import { showToast } from "../../Component/Card-Product/common/ToastNotification";

// Hàm định dạng ngày sinh
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AccountInfoModal = ({ userInfo, onClose, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    setEditedInfo({ ...userInfo });
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
  
      await axios.put(`http://localhost:8080/users/${username}`, {
        displayName: editedInfo.displayName,
        email: editedInfo.email,
        phone: editedInfo.phone,
        dob: editedInfo.dob,
      });
  
      showToast("success", "Cập nhật thông tin thành công!");
      setIsEditing(false);
      onClose();
  
      // Tải lại trang sau khi cập nhật thành công
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      showToast("error", error.response?.data?.message || "Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    console.log("Mật khẩu mới:", editedInfo.newPassword); // Debug giá trị

    if ((editedInfo.newPassword || "").length < 6) {
      showToast("error", "Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    if (editedInfo.newPassword !== editedInfo.confirmNewPassword) {
      showToast("error", "Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      setLoading(true);

      // Gửi yêu cầu đổi mật khẩu tới backend
      await axios.put(`http://localhost:8080/api/auth/change-password`, {
        username: username,
        oldPassword: editedInfo.oldPassword,
        newPassword: editedInfo.newPassword,
      });

      showToast("success", "Đổi mật khẩu thành công!");
      setIsChangingPassword(false);
      onClose();
      setLoading(true);
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      showToast("error", error.response?.data?.message || "Đổi mật khẩu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEditing
            ? "Chỉnh sửa thông tin"
            : isChangingPassword
            ? "Đổi mật khẩu"
            : "Thông tin tài khoản"}
        </h2>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Tên hiển thị:</label>
              <input
                type="text"
                name="displayName"
                value={editedInfo.displayName || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={editedInfo.email || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={editedInfo.dob || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                disabled={!!userInfo.dob}
              />
            </div>

            <div>
              <label className="block font-medium">Số điện thoại:</label>
              <input
                type="tel"
                name="phone"
                value={editedInfo.phone || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className={`flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        ) : isChangingPassword ? (
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Mật khẩu hiện tại:</label>
              <input
                type="password"
                name="oldPassword"
                value={editedInfo.oldPassword || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Mật khẩu mới:</label>
              <input
                type="password"
                name="newPassword"
                value={editedInfo.newPassword || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={editedInfo.confirmNewPassword || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setIsChangingPassword(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className={`flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Đang lưu..." : "Đổi mật khẩu"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div>
                <strong>Tên hiển thị:</strong> {userInfo.displayName}
              </div>
              <div>
                <strong>Email:</strong> {userInfo.email}
              </div>
              <div>
                <strong>Ngày sinh:</strong> {formatDate(userInfo.dob)}
              </div>
              <div>
                <strong>Số điện thoại:</strong> {userInfo.phone}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={() => setIsEditing(true)}
              >
                Thay đổi thông tin cá nhân
              </button>
              <button
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                onClick={() => setIsChangingPassword(true)}
              >
                Đổi mật khẩu
              </button>
              <button
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={onLogout}
              >
                Đăng xuất
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountInfoModal;