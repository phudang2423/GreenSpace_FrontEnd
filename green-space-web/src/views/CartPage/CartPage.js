import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../../Component/ConfirmModal/ConfirmModal"; // Import modal xác nhận
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { showToast } from "../../Component/Card-Product/common/ToastNotification";


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const username = localStorage.getItem("username");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!username) {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      return;
    }
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${username}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put("http://localhost:8080/api/cart/update", {
        id: itemId,
        quantity: newQuantity,
      });
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const openConfirmModal = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    try {
      await axios.delete(`http://localhost:8080/api/cart/delete/${selectedProductId}`);
      setCartItems(cartItems.filter(item => item.id !== selectedProductId));
    showToast("success", "Xóa thành công!");

    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
    setModalOpen(false);
  };

  const goToPage = (slug) => {
    if (slug) {
      navigate(`/products/${slug}`);
    } else {
      console.error("Không tìm thấy slug của sản phẩm!");
    }
  };
  

  return (
    <div className="container mx-auto p-5">
  <h2 className="text-2xl font-bold mb-4">Giỏ Hàng</h2>

  {cartItems.length === 0 ? (
    <p>Giỏ hàng của bạn đang trống!</p>
  ) : (
    <div className="flex gap-6">
      {/* Bảng sản phẩm */}
      <div className="w-full lg:w-2/3">
        <table className="table-auto w-full text-left border border-collapse border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Hình ảnh</th>
              <th className="border px-4 py-2">Tên sản phẩm</th>
              <th className="border px-4 py-2">Giá</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">
                  <img
                    src={`https://drive.google.com/thumbnail?id=${item.imageUrl}`}
                    alt={item.name}
                    className="w-24 h-20 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">
                  {new Intl.NumberFormat("vi-VN").format(item.price)} VNĐ
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-16 text-center border px-2 py-1"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          updateQuantity(item.id, newQuantity);
                        }
                      }}
                    />
                  </div>
                </td>
                <td className="border px-4 py-2 space-y-1">
                  <button
                    onClick={() => goToPage(item.slug)}
                    className="block w-full px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => openConfirmModal(item.id)}
                    className="block w-full px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bảng tổng tiền */}
      <div className="w-full lg:w-1/3 border rounded-lg p-4 shadow-md h-fit">
        <h3 className="text-xl font-semibold mb-4">Tổng Thanh Toán</h3>
        <div className="text-lg font-medium">
          {new Intl.NumberFormat("vi-VN").format(
            cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
          )}{" "}
          VNĐ
        </div>
        <button className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
                onClick={() => navigate("/checkout")}>
          Thanh toán
        </button>
        <button className="mt-6 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700"
                onClick={() => navigate("/")}>
          Tiếp tục mua hàng
        </button>
      </div>
    </div>
  )}

  <ConfirmModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    onConfirm={confirmDelete}
  />
</div>

  );
  
};

export default CartPage;
