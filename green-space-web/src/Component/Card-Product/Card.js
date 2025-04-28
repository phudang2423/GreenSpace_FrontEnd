import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, fetchCartItems } from "../../views/Redux/CartSlice";
import { showToast } from "../../Component/Card-Product/common/ToastNotification"; // Kiểm tra lại đường dẫn

const Card = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Chuyển hướng đến trang chi tiết sản phẩm
  const goToPage = (slug) => {
    navigate(`/products/${slug}`);
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (product) => {
    const username = localStorage.getItem("username");
    
    if (!username) {
      showToast("error", "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/Dang-nhap");
      return;
    }
  
    const productId = product.id || product.productId;
    if (!productId) {
      showToast("error", "Sản phẩm không hợp lệ!");
      return;
    }
  
    const imageUrl =
      Array.isArray(product.imageUrl) && product.imageUrl.length > 0
        ? product.imageUrl[0]
        : "default-image-url.jpg";
  
    const cartItem = {
      username,
      productId,
      name: product.name,
      price: product.price,
      imageUrl,
      quantity: 1,
      slug: product.slug,
    };
  
    try {
      const response = await axios.post("http://localhost:8080/api/cart/add", cartItem);
      console.log(response.data); // Kiểm tra dữ liệu trả về từ server
      dispatch(fetchCartItems(username)); // Load lại danh sách giỏ hàng từ API
    
      showToast("success", "Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      showToast("error", "Không thể thêm sản phẩm. Vui lòng thử lại!");
    }    
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-7">
      {products.map((product) => {
        const discountPercentage = (
          ((product.originalPrice - product.price) / product.originalPrice) *
          100
        ).toFixed(0);

        const displayDiscount = discountPercentage.endsWith(".00")
          ? parseInt(discountPercentage)
          : discountPercentage;

        const imageUrl =
          product.imageUrl && product.imageUrl[0]
            ? product.imageUrl[0]
            : "default-image-url.jpg";

        return (
          <div
            key={product.id}
            className="w-full bg-stone-100 rounded-xl p-1 shadow-lg duration-300 hover:shadow-xl hover:scale-105 hover:bg-green-300"
          >
            <img
              src={`https://drive.google.com/thumbnail?id=${imageUrl}`}
              alt={product.name}
              className="h-72 object-cover rounded-xl"
            />
            <div className="p-2">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <span>
                {new Intl.NumberFormat("vi-VN").format(product.price)} VNĐ
              </span>
              {product.price !== product.originalPrice && (
                <div className="flex items-center gap-1">
                  <span className="text-sm line-through opacity-75">
                    {new Intl.NumberFormat("vi-VN").format(
                      product.originalPrice
                    )}{" "}
                    VNĐ
                  </span>
                  <span className="font-bold text-sm p-2 bg-yellow-300 rounded-s-2xl text-gray-600 inline-block whitespace-nowrap ml-3">
                    Giảm {displayDiscount}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={() => goToPage(product.slug)}
                className="px-5 py-1 rounded-lg text-xl font-bold bg-gray-300 hover:bg-green-500 hover:text-white"
              >
                Xem
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="px-4 py-1 rounded-lg font-bold text-xl bg-gray-300 hover:bg-green-500 hover:text-white"
              >
                <img
                  src="https://res.cloudinary.com/dhax0ee73/image/upload/f_auto,q_auto/v1/green-space/gycavzuncbod0r49kixq"
                  alt="Cart"
                  className="w-6"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
