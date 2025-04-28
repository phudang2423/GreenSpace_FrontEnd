import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../Component/Card-Product/common/ToastNotification";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Đơn hàng đang chờ xử lý";
      case "PROCESSING ":
          return "Đơn hàng đang được xử lý";
      case "SHIPPED":
          return "Đơn hàng đang được giao";
      case "DELIVERED":
          return "Đơn hàng đã được giao";
      case "CANCELLED":
          return "Đơn hàng đã bị hủy";
      default:
          return "Status không xác định";
      }
  };

  useEffect(() => {
    if (!username) {
      showToast("warning", "Vui lòng đăng nhập để xem lịch sử mua hàng!");
      navigate("/Dang-nhap");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/user/${username}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử mua hàng:", error);
        showToast("error", "Không thể tải lịch sử mua hàng. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4 text-lg">Đang tải lịch sử mua hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Lịch sử mua hàng</h2>
      {orders.length === 0 ? (
        <p className="text-gray-700">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-semibold mb-2">Mã đơn hàng: {order.orderCode}</h3>
              <p className="text-gray-700 mb-2">
                <strong>Thời gian đặt hàng:</strong> {new Date(order.createdAt).toLocaleString("vi-VN")}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Processing"
                      ? "text-yellow-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {translateStatus(order.status)}
                </span>
              </p>
              <h4 className="text-md font-semibold mb-2">Sản phẩm:</h4>
              <ul className="list-disc pl-6">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item.name} - {item.quantity} x {item.price.toLocaleString()} VNĐ
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2">
                <strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()} VNĐ
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;