import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Component/Load-Page/LoadingSpinner";
import { showToast } from "../../Component/Card-Product/common/ToastNotification";

const CheckoutPage = () => {
  const username = localStorage.getItem("username");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup xác nhận đặt hàng
  const navigate = useNavigate();
  const [ipAddress, setIpAddress] = useState("");

  const shippingFee = 30000;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const total = subtotal + shippingFee;

  // Lấy giỏ hàng từ DB
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!username) {
        showToast("warning", "Vui lòng đăng nhập để xem giỏ hàng!");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/cart/${username}`);
        setCartItems(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        showToast("error", "Lỗi giỏ hàng. Vui lòng thử lại!");
      }
    };

    fetchCartItems();
  }, [username]);

  // Lấy thông tin user từ DB
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/username/${username}`);
        const result = response.data;

        // Điền sẵn thông tin vào các input
        setEmail(result.email || "");
        setFullName(result.displayName || "");
        setPhone(result.phone || "");
        setAddress(result.address || "");
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        showToast("error", "Không thể tải thông tin người dùng. Vui lòng thử lại!");
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  // Lấy địa chỉ IP
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ IP:", error);
      }
    };

    fetchIpAddress();
  }, []);

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !address) {
      showToast("error", "Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const orderData = {
      username,
      email,
      fullName,
      phone,
      address,
      shippingFee,
      totalAmount: total,
      paymentMethod,
      ipAddress, // Gửi địa chỉ IP đến backend
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      orderCode: `${paymentMethod}-${Date.now()}`, // Tạo mã đơn hàng tạm thời
    };

    try {
      setLoading(true);

      if (paymentMethod === "COD") {
        // Xử lý thanh toán COD
        const res = await axios.post("http://localhost:8080/api/orders", orderData);
        showToast("success", "Đặt hàng thành công!");
        navigate("/order-success", { state: { orderData: res.data } });
      } else if (paymentMethod === "ONLINE") {
        // Xử lý thanh toán online qua VNPay
        const response = await axios.post("http://localhost:8080/api/payment/create", {
          amount: total, // Tổng số tiền cần thanh toán
          orderInfo: `Thanh toán đơn hàng #${orderData.orderCode}`, // Thông tin đơn hàng
          orderType: "PLANT_ORDER", // Loại đơn hàng
          orderId: orderData.orderCode, // Mã đơn hàng
        });

        if (response.data.data) {
          // Lưu thông tin đơn hàng vào localStorage trước khi chuyển hướng
          localStorage.setItem("pendingOrder", JSON.stringify(orderData));
          // Điều hướng đến URL thanh toán VNPay
          window.location.href = response.data.data;
        } else {
          showToast("error", "Không nhận được URL thanh toán từ hệ thống!");
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      showToast("error", "Đã xảy ra lỗi khi tạo thanh toán. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Popup xác nhận đặt hàng */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Xác nhận đặt hàng</h2>
            <p className="mb-4">
              Bạn có chắc chắn muốn đặt hàng với phương thức thanh toán{" "}
              <strong>{paymentMethod === "COD" ? "COD" : "Online"}</strong>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowPopup(false)} // Đóng popup
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handlePlaceOrder} // Xác nhận đặt hàng
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nội dung trang */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thông tin giao hàng */}
        <div className="md:col-span-2 border p-6 rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                className="w-full border px-4 py-2 rounded bg-gray-100"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label className="block font-medium">Tên hiển thị</label>
              <input
                className="w-full border px-4 py-2 rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">Số điện thoại</label>
              <input
                className="w-full border px-4 py-2 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium">Địa chỉ nhận hàng</label>
              <textarea
                className="w-full border px-4 py-2 rounded"
                rows={3}
                placeholder="Tầng, số nhà, đường, quận/huyện, tỉnh/thành"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-600">
              Phí giao hàng: {shippingFee.toLocaleString()} VNĐ
            </p>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="border p-6 rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
          <table className="w-full text-left border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Sản phẩm</th>
                <th className="border p-2 text-center">Số lượng</th>
                <th className="border p-2 text-right">Giá</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2 text-center">{item.quantity}</td>
                  <td className="border p-2 text-right">
                    {(item.price * item.quantity).toLocaleString()} VNĐ
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="border p-2 font-semibold">
                  Tạm tính
                </td>
                <td className="border p-2 text-right">
                  {subtotal.toLocaleString()} VNĐ
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="border p-2 font-semibold">
                  Thành tiền
                </td>
                <td className="border p-2 text-right">
                  {total.toLocaleString()} VNĐ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
          <option value="ONLINE">Thanh toán online</option>
        </select>
      </div>

      {/* Nút đặt hàng */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/CartPage")}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded mr-4"
        >
          TRANG TRƯỚC
        </button>

        <button
          onClick={() => setShowPopup(true)} // Hiển thị popup xác nhận
          disabled={loading}
          className={`bg-lime-500 hover:bg-lime-600 text-white font-bold px-6 py-3 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? <LoadingSpinner text="Đang xử lý..." /> : "ĐẶT HÀNG"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;