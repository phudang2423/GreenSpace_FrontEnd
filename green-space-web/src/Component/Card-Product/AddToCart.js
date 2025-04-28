import React, { useState } from "react";
import axios from "axios";

const AddToCart = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false); // Để theo dõi trạng thái loading
  const username = localStorage.getItem("username"); // Lấy username từ localStorage

  const handleAddToCart = async () => {
    if (!username) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      // Có thể chuyển hướng đến trang đăng nhập nếu cần
      return;
    }

    setIsLoading(true); // Bắt đầu loading

    try {
      const response = await axios.post("http://localhost:8080/api/cart/add", {
        username,
        productId: product.id,
        quantity: 1, // Số lượng mặc định là 1, bạn có thể tuỳ chỉnh
      });
      alert(response.data); // Hiển thị thông báo từ backend
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>
        Giá: {product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
      </p>
      <button 
        onClick={handleAddToCart} 
        className="add-to-cart-btn" 
        disabled={isLoading} // Disable nút khi đang loading
      >
        {isLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"} {/* Hiển thị thông báo loading */}
      </button>
    </div>
  );
};

export default AddToCart;
