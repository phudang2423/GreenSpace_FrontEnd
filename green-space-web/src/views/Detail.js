import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ Thêm dòng này
import NumDownUp from "../Component/number-down-up/NumDownUp";
import Tabs from "../Component/TabInDetail/Tabs";
import HandAddToCart from "../Component/Card-Product/AddToCart";
import { showToast } from "../Component/Card-Product/common/ToastNotification";
import axios from "axios";
import { fetchCartItems } from "./Redux/CartSlice";

const Detail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Thêm dòng này
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${slug}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product || !product.imageUrl) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % product.imageUrl.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [product]);

  const changeMainImage = (index) => {
    setCurrentIndex(index);
  };

  const tabData = [
    { id: "description", label: "Đặc điểm của cây", icon: "📄", content: <p>{product?.description}</p> },
    { id: "about", label: "Cách chăm sóc cây", icon: "ℹ️", content: <p>Trống</p> },
    { id: "warranty", label: "Đánh giá", icon: "🔧", content: <p>Trống</p> },
    {
      id: "faq",
      label: "Hỏi đáp",
      icon: "❓",
      content: (
        <div>
          <h3 className="font-bold text-lg mb-3">Hỏi Đáp Nhanh</h3>
          <ul>
            <li>Bao lâu thì cần tưới nước cho cây?</li>
            <li>Làm thế nào để biết cây thiếu nước?</li>
            <li>Tôi nên đặt cây ở đâu để cây phát triển tốt?</li>
          </ul>
        </div>
      ),
    },
  ];

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
  

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="product-image ml-32">
          <img
            src={`https://drive.google.com/thumbnail?id=${product.imageUrl[currentIndex]}`}
            alt={product.name}
            className="w-full h-96 rounded-lg shadow-lg"
          />
          <div className="thumbnail-images mt-4 flex gap-4 justify-center">
            {product.imageUrl.slice(0, 3).map((image, index) => (
              <img
                key={index}
                src={`https://drive.google.com/thumbnail?id=${image}`}
                alt={`${product.name} thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                  currentIndex === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => changeMainImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-green-600">
              {new Intl.NumberFormat("vi-VN").format(product.price)} VNĐ
            </span>
            {product.price !== product.originalPrice && (
              <span className="text-sm line-through text-gray-500">
                {new Intl.NumberFormat("vi-VN").format(product.originalPrice)} VNĐ
              </span>
            )}
          </div>
          <p className="text-lg text-gray-700 mb-4">Còn lại: {product.stockQuantity} sản phẩm</p>
          <div className="flex space-x-28 mb-8">
          <NumDownUp quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div className="flex gap-4 mb-6">
            <button
              className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:text-white hover:bg-green-700 transition duration-300"
              onClick={() => handleAddToCart(product)}
            >
              Thêm vào giỏ hàng
            </button>

            <button
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
              onClick={() => navigate("/")}
            >
              Mua hàng
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300"
              onClick={() => alert("Chat với Zalo")}
            >
              Chat Zalo
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
};

export default Detail;
